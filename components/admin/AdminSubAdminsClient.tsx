"use client";

import React, { useState } from "react";
import {
  Shield,
  ShieldCheck,
  UserPlus,
  Key,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Lock,
  User,
  Mail,
  Search,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  Users,
  Home,
  FolderKanban,
  MessageSquare,
  CalendarCheck,
  Image as ImageIcon,
  Star,
  Settings,
} from "lucide-react";
import { ADMIN_MODULES } from "@/lib/rbac";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string | null;
  role: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

const MODULE_ICONS: Record<string, any> = {
  properties: Home,
  projects: FolderKanban,
  enquiries: MessageSquare,
  site_visits: CalendarCheck,
  gallery: ImageIcon,
  reviews: Star,
  settings: Settings,
};

export default function AdminSubAdminsClient({
  initialUsers,
  currentAdminId,
}: {
  initialUsers: AdminUser[];
  currentAdminId: string;
}) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formPermissions, setFormPermissions] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState("");

  const showNotice = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreate = () => {
    setFormName("");
    setFormEmail("");
    setFormUsername("");
    setFormPassword("");
    setFormPermissions(["properties", "enquiries"]); // default reasonable permissions
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormUsername(user.username || "");
    setFormPermissions(user.permissions || []);
    setIsEditModalOpen(true);
  };

  const handleOpenPassword = (user: AdminUser) => {
    setSelectedUser(user);
    setNewPassword("");
    setIsPasswordModalOpen(true);
  };

  const togglePermission = (modId: string) => {
    setFormPermissions((prev) =>
      prev.includes(modId) ? prev.filter((p) => p !== modId) : [...prev, modId]
    );
  };

  const selectAllPermissions = () => {
    setFormPermissions(ADMIN_MODULES.map((m) => m.id));
  };

  const clearAllPermissions = () => {
    setFormPermissions([]);
  };

  // Create Sub-Admin
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formUsername || !formPassword) {
      showNotice("error", "Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/admin/sub-admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          username: formUsername,
          password: formPassword,
          permissions: formPermissions,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUsers([data.user, ...users]);
        setIsCreateModalOpen(false);
        showNotice("success", data.message || "Sub-admin created successfully!");
      } else {
        showNotice("error", data.error || "Failed to create sub-admin.");
      }
    } catch (err: any) {
      showNotice("error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Edit Permissions / Details
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/sub-admins/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          username: formUsername,
          permissions: formPermissions,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users.map((u) => (u.id === selectedUser.id ? data.user : u)));
        setIsEditModalOpen(false);
        showNotice("success", "Sub-admin permissions updated successfully!");
      } else {
        showNotice("error", data.error || "Failed to update sub-admin.");
      }
    } catch (err: any) {
      showNotice("error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newPassword || newPassword.length < 6) {
      showNotice("error", "Password must be at least 6 characters.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/sub-admins/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsPasswordModalOpen(false);
        showNotice("success", `Password updated for ${selectedUser.name}!`);
      } else {
        showNotice("error", data.error || "Failed to update password.");
      }
    } catch (err: any) {
      showNotice("error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Active/Disabled
  const handleToggleStatus = async (user: AdminUser) => {
    const newStatus = !user.isActive;
    try {
      const res = await fetch(`/api/admin/sub-admins/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users.map((u) => (u.id === user.id ? { ...u, isActive: newStatus } : u)));
        showNotice(
          "success",
          `${user.name} has been ${newStatus ? "activated" : "deactivated"}.`
        );
      } else {
        showNotice("error", data.error || "Failed to toggle status.");
      }
    } catch (err: any) {
      showNotice("error", "Failed to update status.");
    }
  };

  // Delete Sub-Admin
  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to permanently delete sub-admin "${user.name}" (${user.username || user.email})?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/sub-admins/${user.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users.filter((u) => u.id !== user.id));
        showNotice("success", data.message || "Sub-admin deleted successfully.");
      } else {
        showNotice("error", data.error || "Failed to delete sub-admin.");
      }
    } catch (err) {
      showNotice("error", "Failed to delete sub-admin.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.username && u.username.toLowerCase().includes(q))
    );
  });

  const superAdminCount = users.filter((u) => u.role === "SUPER_ADMIN" || u.role === "ADMIN").length;
  const subAdminCount = users.filter((u) => u.role === "SUB_ADMIN").length;
  const activeCount = users.filter((u) => u.isActive).length;

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-lg transition-all animate-fade-in ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E7E5] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00695C] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading tracking-tight">
            Sub-Admin & Team Management
          </h1>
          <p className="text-xs sm:text-sm text-[#657278] mt-1">
            As Super Admin, create child admins with custom usernames, passwords, and granular page edit access.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 bg-[#00695C] hover:bg-[#005B50] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create New Sub-Admin</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E5] shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#657278] font-bold uppercase">Total Admins</p>
            <p className="text-xl sm:text-2xl font-black text-[#12262D]">{users.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E5] shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D6A84F] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#657278] font-bold uppercase">Super Admins</p>
            <p className="text-xl sm:text-2xl font-black text-[#12262D]">{superAdminCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E5] shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00695C] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#657278] font-bold uppercase">Sub-Admins</p>
            <p className="text-xl sm:text-2xl font-black text-[#12262D]">{subAdminCount}</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E7E5] shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-[#657278] font-bold uppercase">Active Status</p>
            <p className="text-xl sm:text-2xl font-black text-emerald-600">{activeCount}</p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-soft overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E2E7E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, username, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
            />
          </div>
          <span className="text-xs text-[#657278] font-semibold">
            Showing {filteredUsers.length} of {users.length} accounts
          </span>
        </div>

        {/* Admins Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#F5F8F8] text-[#657278] uppercase text-[11px] font-bold tracking-wider border-b border-[#E2E7E5]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Admin User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Assigned Permissions</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E5]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#657278]">
                    No admins found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSuper = user.role === "SUPER_ADMIN" || user.role === "ADMIN";
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Credentials */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                              isSuper
                                ? "bg-amber-100 text-amber-800 border border-amber-300 shadow-xs"
                                : "bg-emerald-100 text-[#00695C] border border-emerald-200"
                            }`}
                          >
                            {isSuper ? "👑" : user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#12262D]">{user.name}</span>
                              {user.id === currentAdminId && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-[#657278]">
                              <span className="font-mono text-[#00695C] bg-[#E8F5F3] px-1.5 py-0.5 rounded">
                                @{user.username || "admin"}
                              </span>
                              <span>•</span>
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4">
                        {isSuper ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-200">
                            <span>👑 Super Admin</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
                            <Shield className="w-3 h-3" />
                            <span>Sub-Admin</span>
                          </span>
                        )}
                      </td>

                      {/* Permissions Chips */}
                      <td className="py-4 px-4 max-w-xs sm:max-w-md">
                        {isSuper ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Full Unrestricted System Access
                          </span>
                        ) : user.permissions && user.permissions.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {user.permissions.map((p) => {
                              const mod = ADMIN_MODULES.find((m) => m.id === p);
                              const IconComponent = MODULE_ICONS[p] || Check;
                              return (
                                <span
                                  key={p}
                                  className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1"
                                >
                                  <IconComponent className="w-3 h-3 text-[#00695C]" />
                                  <span>{mod ? mod.label.replace(" Management", "") : p}</span>
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-xs text-rose-500 font-semibold italic">
                            No permissions granted
                          </span>
                        )}
                      </td>

                      {/* Active Status */}
                      <td className="py-4 px-4 text-center">
                        <button
                          disabled={isSuper}
                          onClick={() => handleToggleStatus(user)}
                          title={isSuper ? "Super Admin cannot be disabled" : "Click to toggle active status"}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                            user.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                              : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 cursor-pointer"
                          } ${isSuper ? "cursor-default opacity-90" : ""}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              user.isActive ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                          <span>{user.isActive ? "Active" : "Disabled"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Permissions button */}
                          {!isSuper && (
                            <button
                              onClick={() => handleOpenEdit(user)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#00695C] hover:bg-slate-100 transition-colors"
                              title="Edit Permissions & Details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}

                          {/* Change Password button */}
                          <button
                            onClick={() => handleOpenPassword(user)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="Reset / Change Password"
                          >
                            <Key className="w-4 h-4" />
                          </button>

                          {/* Delete button (only for sub-admins) */}
                          {!isSuper && (
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Sub-Admin"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE SUB-ADMIN MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E2E7E5] bg-[#F5F8F8] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5F3] text-[#00695C] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#12262D] font-heading">
                    Create New Sub-Admin
                  </h3>
                  <p className="text-xs text-[#657278]">
                    Set credentials and select which pages this sub-admin can access and edit.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#12262D] mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Rahman"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-[#12262D] mb-1">
                    Username (Login ID) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="text-xs font-bold text-slate-400 absolute left-3 top-2.5">@</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. tanvir_sales"
                      value={formUsername}
                      onChange={(e) => setFormUsername(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#12262D] mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="tanvir@mohs.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-[#12262D] mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Minimum 6 characters"
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Permissions Selector */}
              <div className="pt-2 border-t border-[#E2E7E5]">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <p className="text-xs font-extrabold text-[#12262D]">
                      Assign Page & Module Permissions:
                    </p>
                    <p className="text-[11px] text-[#657278]">
                      Selected pages will be visible in the sub-admin sidebar with editing rights.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={selectAllPermissions}
                      className="text-[11px] font-bold text-[#00695C] hover:underline"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={clearAllPermissions}
                      className="text-[11px] font-bold text-rose-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADMIN_MODULES.map((mod) => {
                    const isChecked = formPermissions.includes(mod.id);
                    const IconComponent = MODULE_ICONS[mod.id] || Check;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => togglePermission(mod.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? "bg-[#E8F5F3] border-[#00695C]/40 text-[#12262D] shadow-2xs"
                            : "bg-[#F5F8F8] border-[#E2E7E5] text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#00695C] focus:ring-[#00695C]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#12262D]">
                            <IconComponent className={`w-3.5 h-3.5 ${isChecked ? "text-[#00695C]" : "text-slate-400"}`} />
                            <span>{mod.label}</span>
                          </div>
                          <p className="text-[10px] text-[#657278] mt-0.5 leading-tight">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#E2E7E5] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#12262D] rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#00695C] hover:bg-[#005B50] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? <span>Creating...</span> : <span>Create Sub-Admin</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PERMISSIONS MODAL */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-white/20">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E2E7E5] bg-[#F5F8F8] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8F5F3] text-[#00695C] flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#12262D] font-heading">
                    Edit Permissions: {selectedUser.name}
                  </h3>
                  <p className="text-xs text-[#657278]">
                    Modify page access permissions and profile details.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#12262D] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#12262D] mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#12262D] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                />
              </div>

              {/* Permissions Selector */}
              <div className="pt-2 border-t border-[#E2E7E5]">
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-extrabold text-[#12262D]">
                    Active Permissions ({formPermissions.length} selected):
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={selectAllPermissions}
                      className="text-[11px] font-bold text-[#00695C] hover:underline"
                    >
                      Select All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={clearAllPermissions}
                      className="text-[11px] font-bold text-rose-600 hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADMIN_MODULES.map((mod) => {
                    const isChecked = formPermissions.includes(mod.id);
                    const IconComponent = MODULE_ICONS[mod.id] || Check;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => togglePermission(mod.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? "bg-[#E8F5F3] border-[#00695C]/40 text-[#12262D] shadow-2xs"
                            : "bg-[#F5F8F8] border-[#E2E7E5] text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#00695C] focus:ring-[#00695C]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#12262D]">
                            <IconComponent className={`w-3.5 h-3.5 ${isChecked ? "text-[#00695C]" : "text-slate-400"}`} />
                            <span>{mod.label}</span>
                          </div>
                          <p className="text-[10px] text-[#657278] mt-0.5 leading-tight">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#E2E7E5] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#12262D] rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#00695C] hover:bg-[#005B50] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? <span>Saving...</span> : <span>Save Changes</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-white/20">
            <div className="p-5 border-b border-[#E2E7E5] bg-[#F5F8F8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#12262D] font-heading">
                    Reset Password
                  </h3>
                  <p className="text-xs text-[#657278]">
                    For: <span className="font-bold text-[#12262D]">{selectedUser.name}</span> (@{selectedUser.username || selectedUser.email})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#12262D] mb-1">
                  New Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Enter at least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-9 py-2 text-xs sm:text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#12262D] rounded-xl text-xs font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#00695C] hover:bg-[#005B50] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? <span>Updating...</span> : <span>Update Password</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
