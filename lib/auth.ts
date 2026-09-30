import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "mohs_venice_city_fallback_jwt_secret_key_2026";
const COOKIE_NAME = "mohs_admin_token";

export interface AdminPayload {
  userId: string;
  name?: string;
  email: string;
  username?: string;
  role: "SUPER_ADMIN" | "SUB_ADMIN" | "ADMIN" | string;
  permissions: string[];
}

export const ADMIN_MODULES = [
  { id: "properties", label: "Properties Management", description: "Add, edit, delete residential plots & flats", icon: "Home" },
  { id: "projects", label: "Township Projects", description: "Edit township overview and project details", icon: "FolderKanban" },
  { id: "enquiries", label: "Client Enquiries", description: "View, update status, and manage client inquiries", icon: "MessageSquare" },
  { id: "site_visits", label: "Site Visit Requests", description: "Confirm and coordinate customer site visits", icon: "CalendarCheck" },
  { id: "gallery", label: "Photo Gallery", description: "Upload, reorder, and remove project gallery photos", icon: "ImageIcon" },
  { id: "reviews", label: "Customer Reviews", description: "Moderate and approve buyer testimonials", icon: "Star" },
  { id: "settings", label: "Website Settings", description: "Edit company contact numbers, address, and metadata", icon: "Settings" },
] as const;

export type PermissionKey = (typeof ADMIN_MODULES)[number]["id"];

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

export function hasPermission(admin: AdminPayload | null | undefined, permission: string): boolean {
  if (!admin) return false;
  if (admin.role === "SUPER_ADMIN" || admin.role === "ADMIN") return true;
  if (!Array.isArray(admin.permissions)) return false;
  return admin.permissions.includes(permission);
}

export function isSuperAdmin(admin: AdminPayload | null | undefined): boolean {
  if (!admin) return false;
  return admin.role === "SUPER_ADMIN" || admin.role === "ADMIN";
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export { COOKIE_NAME };
