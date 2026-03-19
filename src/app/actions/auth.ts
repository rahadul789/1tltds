import { fetchCurrentUser, submitJson } from "@/app/lib/api";

type AuthState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

async function submitAuthAction(
  endpoint: string,
  formData: FormData
): Promise<AuthState> {
  return submitJson(`/api/auth/${endpoint}`, {
    entries: Array.from(formData.entries()).map(([key, value]) => [
      key,
      typeof value === "string" ? value : value.name,
    ]),
  });
}

export async function signup(_prevState: unknown, formData: FormData) {
  const result = await submitAuthAction("signup", formData);

  if (result?.success) {
    window.location.assign("/dashboard");
  }

  return result;
}

export async function login(_prevState: unknown, formData: FormData) {
  const result = await submitAuthAction("login", formData);

  if (result?.success) {
    window.location.assign("/dashboard");
  }

  return result;
}

export async function changePassword(_prevState: unknown, formData: FormData) {
  const result = await submitAuthAction("change-password", formData);

  if (result?.success) {
    window.location.assign("/dashboard?success=password-changed");
  }

  return result;
}

export async function requestPasswordReset(
  _prevState: unknown,
  formData: FormData
) {
  return submitAuthAction("request-password-reset", formData);
}

export async function resetPassword(_prevState: unknown, formData: FormData) {
  const result = await submitAuthAction("reset-password", formData);

  if (result?.success) {
    window.location.assign("/1tltd-login?reset=success");
  }

  return result;
}

export async function updatec() {
  return { success: true };
}

export async function logout() {
  await submitJson("/api/auth/logout");
}

export async function loggedInUser() {
  return fetchCurrentUser<{
    id: number;
    name: string;
    email: string;
    role: string;
  }>();
}
