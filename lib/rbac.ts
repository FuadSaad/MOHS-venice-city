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

export const COOKIE_NAME = "mohs_admin_token";

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
