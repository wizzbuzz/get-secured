import { cookies } from "next/headers";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username")?.value ?? null;
  const userId = cookieStore.get("user_id")?.value ?? null;
  const userRole = cookieStore.get("user_role")?.value ?? null;
  const sessionToken = cookieStore.get("session_token")?.value ?? null;

  return {
    username,
    userId,
    sessionToken,
    userRole,
    isLoggedIn: Boolean(sessionToken || username),
  };
}
