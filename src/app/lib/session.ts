import { submitJson } from "./api";

export async function deleteSession() {
  await submitJson("/api/auth/logout");
}
