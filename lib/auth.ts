import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  AdminPayload,
  ADMIN_MODULES,
  PermissionKey,
  COOKIE_NAME,
  hasPermission,
  isSuperAdmin,
} from "./rbac";

export * from "./rbac";

const JWT_SECRET = process.env.JWT_SECRET || "mohs_venice_city_fallback_jwt_secret_key_2026";

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      userId: decoded.userId,
      name: decoded.name || "Administrator",
      email: decoded.email,
      username: decoded.username || "",
      phone: decoded.phone || "",
      role: decoded.role || "SUB_ADMIN",
      permissions: Array.isArray(decoded.permissions) ? decoded.permissions : [],
    };
  } catch (error) {
    return null;
  }
}

export async function getSessionAdmin(): Promise<AdminPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
