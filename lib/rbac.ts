export interface AdminPayload {
  userId: string;
  name?: string;
  email: string;
  username?: string;
  phone?: string;
  role: "SUPER_ADMIN" | "SUB_ADMIN" | "ADMIN" | string;
  permissions: string[];
}

// Module definitions with granular actions
export const ADMIN_MODULES = [
  { id: "properties", label: "Properties", description: "Manage residential plots & flats", icon: "Home" },
  { id: "projects", label: "Township Projects", description: "Manage township overview and project details", icon: "FolderKanban" },
  { id: "enquiries", label: "Client Enquiries", description: "Manage client inquiries and leads", icon: "MessageSquare" },
  { id: "site_visits", label: "Site Visits", description: "Manage customer site visit requests", icon: "CalendarCheck" },
  { id: "gallery", label: "Photo Gallery", description: "Manage project gallery photos", icon: "ImageIcon" },
  { id: "reviews", label: "Customer Reviews", description: "Manage buyer testimonials", icon: "Star" },
  { id: "settings", label: "Website Settings", description: "Edit company contact info and metadata", icon: "Settings" },
] as const;

export type ModuleId = (typeof ADMIN_MODULES)[number]["id"];
export type PermissionKey = ModuleId; // backward compat alias

// Available actions per module
export const MODULE_ACTIONS = ["view", "add", "edit", "delete"] as const;
export type ModuleAction = (typeof MODULE_ACTIONS)[number];

export const ACTION_LABELS: Record<ModuleAction, string> = {
  view: "View",
  add: "Add / Create",
  edit: "Edit / Update",
  delete: "Delete",
};

export const COOKIE_NAME = "mohs_admin_token";

/**
 * Check if admin has access to a module, optionally at a specific action level.
 * 
 * Permissions format (stored as JSON string array):
 *   - Legacy: ["properties", "enquiries"]         → full access to those modules
 *   - Granular: ["properties.view", "properties.add", "enquiries.view"]
 * 
 * Examples:
 *   hasPermission(admin, "properties")          → true if ANY properties permission exists
 *   hasPermission(admin, "properties", "add")   → true if properties.add OR full "properties" exists
 *   hasPermission(admin, "properties", "delete") → true only if properties.delete OR full "properties" exists
 */
export function hasPermission(
  admin: AdminPayload | null | undefined,
  module: string,
  action?: ModuleAction
): boolean {
  if (!admin) return false;
  // Super admins have full access
  if (admin.role === "SUPER_ADMIN" || admin.role === "ADMIN") return true;
  if (!Array.isArray(admin.permissions)) return false;

  // Check for full module access (legacy format: "properties")
  if (admin.permissions.includes(module)) return true;

  if (action) {
    // Check for specific action: "properties.add"
    return admin.permissions.includes(`${module}.${action}`);
  }

  // Check if ANY action exists for this module: "properties.view", "properties.add", etc.
  return admin.permissions.some((p) => p.startsWith(`${module}.`));
}

/**
 * Get all granted actions for a specific module
 */
export function getModuleActions(
  admin: AdminPayload | null | undefined,
  module: string
): ModuleAction[] {
  if (!admin) return [];
  if (admin.role === "SUPER_ADMIN" || admin.role === "ADMIN") {
    return [...MODULE_ACTIONS];
  }
  if (!Array.isArray(admin.permissions)) return [];

  // Legacy full-module permission
  if (admin.permissions.includes(module)) {
    return [...MODULE_ACTIONS];
  }

  return MODULE_ACTIONS.filter((action) =>
    admin.permissions.includes(`${module}.${action}`)
  );
}

export function isSuperAdmin(admin: AdminPayload | null | undefined): boolean {
  if (!admin) return false;
  return admin.role === "SUPER_ADMIN" || admin.role === "ADMIN";
}

/**
 * Parse a permissions JSON string into a string array.
 * Handles both JSON arrays and comma-separated strings.
 */
export function parsePermissions(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return raw.split(",").map((s) => s.trim()).filter(Boolean);
  }
}
