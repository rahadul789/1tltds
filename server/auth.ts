import crypto from "node:crypto";
import type { Express, Request } from "express";
import bcrypt from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";
import {
  ChangePasswordSchema,
  LoginFormSchema,
  SignupFormSchema,
} from "../src/app/lib/definitions";
import { db } from "./db";
import { passwordResetTokens, settings, usersTable } from "./db/schema";
import { sendResetEmail } from "./mail";
import { createSession, deleteSession, getSessionUser } from "./session";

function entriesToFormData(entries: unknown): FormData {
  const formData = new FormData();

  if (Array.isArray(entries)) {
    for (const entry of entries) {
      if (Array.isArray(entry) && entry.length >= 2) {
        formData.append(String(entry[0]), String(entry[1]));
      }
    }
  }

  return formData;
}

async function requireUser(req: Request) {
  const sessionUser = await getSessionUser(req);

  if (!sessionUser) {
    return null;
  }

  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, sessionUser.id))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

export function registerAuthRoutes(app: Express) {
  app.post("/api/auth/signup", async (req, res) => {
    const formData = entriesToFormData(req.body?.entries);
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      pin: formData.get("pin"),
    });

    if (!validatedFields.success) {
      return res.status(400).json({
        errors: validatedFields.error.flatten().fieldErrors,
      });
    }

    const { name, email, password, pin } = validatedFields.data;
    const existingUser = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({
        errors: {
          email: ["Email already exists. Please log in instead."],
        },
      });
    }

    const [pinRecord] = await db.select().from(settings).limit(1);

    if (pinRecord?.REGISTER_PIN !== pin) {
      return res.status(400).json({
        errors: {
          pin: ["Pin is incorrect. Please contact support."],
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ id: usersTable.id, role: usersTable.role });

    const user = data[0];

    if (!user) {
      return res.status(500).json({
        message: "An error occurred while creating your account.",
      });
    }

    await createSession(res, user);
    return res.json({ success: true });
  });

  app.post("/api/auth/login", async (req, res) => {
    const formData = entriesToFormData(req.body?.entries);
    const parsed = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsed.success) {
      return res.status(400).json({
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsed.data;
    const rows = await db
      .select({
        id: usersTable.id,
        password: usersTable.password,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    const user = rows[0];

    if (!user) {
      return res.status(400).json({
        errors: { password: ["Invalid email or password."] },
      });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return res.status(400).json({
        errors: { password: ["Invalid email or password."] },
      });
    }

    await createSession(res, user);
    return res.json({ success: true });
  });

  app.get("/api/auth/me", async (req, res) => {
    const user = await requireUser(req);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json(user);
  });

  app.post("/api/auth/logout", async (_req, res) => {
    deleteSession(res);
    return res.json({ success: true });
  });

  app.post("/api/auth/change-password", async (req, res) => {
    const user = await requireUser(req);

    if (!user) {
      return res.status(401).json({
        message: "You must be logged in to change your password.",
      });
    }

    const formData = entriesToFormData(req.body?.entries);
    const parsed = ChangePasswordSchema.safeParse({
      oldPassword: formData.get("oldPassword"),
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsed.success) {
      return res.status(400).json({
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { oldPassword, newPassword } = parsed.data;
    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
      return res.status(400).json({
        errors: { oldPassword: ["Old password is incorrect."] },
      });
    }

    const hashed = await bcrypt.hash(newPassword ?? "", 10);

    await db
      .update(usersTable)
      .set({ password: hashed })
      .where(eq(usersTable.id, user.id));

    return res.json({ success: true });
  });

  app.post("/api/auth/request-password-reset", async (req, res) => {
    const formData = entriesToFormData(req.body?.entries);
    const email = formData.get("email")?.toString();

    if (!email) {
      return res.status(400).json({ message: "Please provide your email." });
    }

    const user = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
      .then((rows) => rows[0]);

    if (!user) {
      return res.json({
        message: "If this email exists, you'll receive a reset link shortly.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await db.insert(passwordResetTokens).values({
      userId: user.id,
      token,
      expiresAt,
    });

    await sendResetEmail(email, token);

    return res.json({
      message: "If this email exists, a reset link was sent.",
    });
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    const formData = entriesToFormData(req.body?.entries);
    const token = formData.get("token")?.toString();
    const newPassword = formData.get("newPassword")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords did not match." });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "Please provide a new password." });
    }

    if (!token) {
      return res.status(400).json({ message: "Invalid or expired reset link." });
    }

    const record = await db
      .select({
        userId: passwordResetTokens.userId,
        expiresAt: passwordResetTokens.expiresAt,
      })
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, token),
          gt(passwordResetTokens.expiresAt, new Date())
        )
      )
      .limit(1)
      .then((rows) => rows[0]);

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired reset link." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await db
      .update(usersTable)
      .set({ password: hashed })
      .where(eq(usersTable.id, record.userId));

    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    return res.json({ success: true });
  });
}
