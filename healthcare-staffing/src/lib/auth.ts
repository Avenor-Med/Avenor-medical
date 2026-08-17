// Simple HMAC-signed session cookie auth.
// Good enough for a prototype; swap for NextAuth / Clerk in production.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "./prisma";

const COOKIE_NAME = "hcs_session";
const ONE_WEEK = 60 * 60 * 24 * 7;

const SECRET = process.env.SESSION_SECRET || "dev-secret-do-not-use-in-prod";

export type Role = "ADMIN" | "RECRUITER" | "CS" | "PRACTITIONER" | "FACILITY";

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

function verify(payload: string, sig: string): boolean {
  const expected = sign(payload);
  if (expected.length !== sig.length) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export function setSessionCookie(userId: string) {
  const payload = `${userId}.${Date.now()}`;
  const sig = sign(payload);
  cookies().set(COOKIE_NAME, `${payload}.${sig}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_WEEK,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export function getSessionUserId(): string | null {
  const c = cookies().get(COOKIE_NAME);
  if (!c) return null;
  const parts = c.value.split(".");
  if (parts.length !== 3) return null;
  const [userId, ts, sig] = parts;
  if (!verify(`${userId}.${ts}`, sig)) return null;
  return userId;
}

export async function getSessionUser() {
  const id = getSessionUserId();
  if (!id) return null;
  return prisma.user.findUnique({
    where: { id },
    include: { practitioner: true, facilityUser: { include: { facility: true } } },
  });
}

export async function requireUser(allowedRoles?: Role[]) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (allowedRoles && !allowedRoles.includes(user.role as Role)) {
    redirect("/login?error=unauthorized");
  }
  return user;
}

export function dashboardPathForRole(role: string): string {
  switch (role) {
    case "ADMIN":        return "/admin/dashboard";
    case "RECRUITER":    return "/recruiter/dashboard";
    case "CS":           return "/cs/dashboard";
    case "PRACTITIONER": return "/practitioner/dashboard";
    case "FACILITY":     return "/facility/dashboard";
    default:             return "/login";
  }
}
