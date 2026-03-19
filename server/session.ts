import type { Request, Response } from "express";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET ?? "development-session-secret";
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: number;
  role: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload as never)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(
  res: Response,
  user: { id: number; role: string }
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId: user.id,
    role: user.role,
    expiresAt,
  });

  res.cookie("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession(res: Response) {
  res.clearCookie("session", { path: "/" });
}

export async function getSessionUser(req: Request) {
  const session = req.cookies?.session;
  const payload = await decrypt(session);

  if (!payload?.userId) {
    return null;
  }

  return {
    id: Number(payload.userId),
    role: String(payload.role ?? "user"),
  };
}
