"use client";

import React, { useState, useMemo } from "react";
import {
  UserPlus,
  Edit2,
  Trash2,
  Search,
  X,
  Users,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Shield,
  Key,
} from "lucide-react";
import { ADMIN_MODULES, MODULE_ACTIONS, ACTION_LABELS } from "@/lib/rbac";
import { motion, AnimatePresence } from "framer-motion";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string | null;
  phone?: string | null;
  role: string;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
}

interface Props {
  initialUsers: AdminUser[];
  currentAdminId: string;
}

export default function AdminSubAdminsClient({
  initialUsers,
  currentAdminId,
}: Props) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formEmployeeId, setFormEmployeeId] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPermissions, setFormPermissions] = useState<string[]>([]);

  const showNotice = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreate = () => {
    setModalMode("create");
    setFormName("");
    setFormEmail("");
    setFormEmployeeId("");
    setFormUsername("");
    setFormPhone("");
    setFormPassword("");
    setFormPermissions([]);
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormName(user.name || "");
    setFormEmail(user.email || "");
    setFormEmployeeId(user.employeeId || "");
    setFormUsername(user.username || "");
    setFormPhone(user.phone || "");
    setFormPassword(""); // Password is optional on edit
    setFormPermissions(user.permissions || []);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Permissions Helpers
  const togglePermission = (modId: string, action: string) => {
    const p = `${modId}.${action}`;
    setFormPermissions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const toggleModuleAll = (modId: string, checked: boolean) => {
    const actions = MODULE_ACTIONS.map((a) => `${modId}.${a}`);
    if (checked) {
      setFormPermissions((prev) => Array.from(new Set([...prev, ...actions])));
    } else {
      setFormPermissions((prev) => prev.filter((x) => !x.startsWith(`${modId}.`)));
    }
  };

  const isModuleFullySelected = (modId: string) => {
    return MODULE_ACTIONS.every((a) => formPermissions.includes(`${modId}.${a}`));
  };

  const grantAllPermissions = () => {
    const all = ADMIN_MODULES.flatMap((m) =>
      MODULE_ACTIONS.map((a) => `${m.id}.${a}`)
    );
    setFormPermissions(all);
  };

  const clearAllPermissions = () => {
    setFormPermissions([]);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formUsername) {
      showNotice("error", "Please fill in all required fields.");
      return;
    }
    if (modalMode === "create" && (!formPassword || formPassword.length < 6)) {
      showNotice("error", "Password is required and must be at least 6 characters.");
      return;
    }
    
    setLoading(true);

    const payload = {
      name: formName,
      email: formEmail,
      employeeId: formEmployeeId || null,
      username: formUsername,
      phone: formPhone,
      permissions: formPermissions,
      ...(formPassword ? { password: formPassword } : {}),
    };

    try {
      const url = modalMode === "create" 
        ? "/api/admin/sub-admins" 
        : `/api/admin/sub-admins/${selectedUser?.id}`;
      
      const method = modalMode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (modalMode === "create") {
          setUsers([data.user, ...users]);
          showNotice("success", "Employee created successfully.");
        } else {
          setUsers(users.map((u) => (u.id === selectedUser?.id ? data.user : u)));
          showNotice("success", "Employee updated successfully.");
        }
        handleCloseModal();
      } else {
        showNotice("error", data.error || "Failed to save employee.");
      }
    } catch (err: any) {
      showNotice("error", "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Status
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
        showNotice("success", `Employee status updated to ${newStatus ? "Active" : "Inactive"}.`);
      } else {
        showNotice("error", data.error || "Failed to update status.");
      }
    } catch (err: any) {
      showNotice("error", "Failed to update status.");
    }
  };

  // Delete User
  const handleDeleteUser = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to permanently delete "${user.name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/sub-admins/${user.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(users.filter((u) => u.id !== user.id));
        showNotice("success", "Employee deleted successfully.");
      } else {
        showNotice("error", data.error || "Failed to delete employee.");
      }
    } catch (err) {
      showNotice("error", "Failed to delete employee.");
    }
  };

  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.employeeId?.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-lg border min-w-[300px] ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
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
            <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-600 ml-4">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Team Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your team members, their roles, and system access permissions.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-[#00695C] hover:bg-[#005B50] text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by name, ID, username, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none transition-all"
            />
          </div>
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{filteredUsers.length} Employees</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 text-xs font-medium uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Employee ID</th>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSuper = user.role === "SUPER_ADMIN" || user.role === "ADMIN";
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-800">{user.name}</span>
                          <span className="text-xs text-slate-500">{user.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-slate-600 font-medium">{user.employeeId || "N/A"}</td>
                      <td className="py-3 px-6 text-slate-600 font-medium">@{user.username || "N/A"}</td>
                      <td className="py-3 px-6 text-slate-600">{user.phone || "N/A"}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                            isSuper
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {isSuper ? "Super Admin" : "Sub Admin"}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        <button
                          disabled={isSuper}
                          onClick={() => handleToggleStatus(user)}
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                            user.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          } ${!isSuper ? "hover:brightness-95 cursor-pointer" : "opacity-80 cursor-default"}`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="py-3 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!isSuper && (
                            <>
                              <button
                                onClick={() => handleOpenEdit(user)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Edit Employee"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                title="Delete Employee"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
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

      {/* Create / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={handleCloseModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="text-lg font-semibold text-slate-800">
                  {modalMode === "create" ? "Add New Employee" : "Edit Employee"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form id="employee-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Employee ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formEmployeeId}
                      onChange={(e) => setFormEmployeeId(e.target.value)}
                      placeholder="e.g. EMP-001"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Username <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      minLength={3}
                      value={formUsername}
                      onChange={(e) => setFormUsername(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Password {modalMode === "edit" ? <span className="text-slate-400 font-normal">(Leave empty to keep current)</span> : <span className="text-rose-500">*</span>}
                    </label>
                    <input
                      type="password"
                      required={modalMode === "create"}
                      minLength={6}
                      value={formPassword}
                      onChange={(e) => setFormPassword(e.target.value)}
                      placeholder={modalMode === "edit" ? "••••••••" : "Minimum 6 characters"}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-[#00695C]/20 focus:border-[#00695C] outline-none"
                    />
                  </div>
                </div>

                {/* Granular Permissions Matrix */}
                <div className="border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">Module Permissions</h3>
                      <p className="text-xs text-slate-500 mt-1">Configure granular access for each system module.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={clearAllPermissions}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700"
                      >
                        Clear All
                      </button>
                      <button
                        type="button"
                        onClick={grantAllPermissions}
                        className="text-xs font-medium text-[#00695C] hover:text-[#005B50] bg-[#00695C]/10 px-2.5 py-1 rounded"
                      >
                        Grant Full Access
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-600">
                        <tr>
                          <th className="py-2.5 px-4 w-1/3">Module Name</th>
                          {MODULE_ACTIONS.map((action) => (
                            <th key={action} className="py-2.5 px-4 text-center">
                              {ACTION_LABELS[action]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {ADMIN_MODULES.map((mod) => {
                          const isAllSelected = isModuleFullySelected(mod.id);
                          return (
                            <tr key={mod.id} className="hover:bg-slate-50/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-slate-800">{mod.label}</span>
                                  <label className="flex items-center gap-1.5 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={isAllSelected}
                                      onChange={(e) => toggleModuleAll(mod.id, e.target.checked)}
                                      className="rounded border-slate-300 text-[#00695C] focus:ring-[#00695C] cursor-pointer"
                                    />
                                    <span className="text-[10px] text-slate-500 font-medium">ALL</span>
                                  </label>
                                </div>
                              </td>
                              {MODULE_ACTIONS.map((action) => (
                                <td key={`${mod.id}-${action}`} className="py-3 px-4 text-center">
                                  <input
                                    type="checkbox"
                                    checked={formPermissions.includes(`${mod.id}.${action}`)}
                                    onChange={() => togglePermission(mod.id, action)}
                                    className="rounded border-slate-300 text-[#00695C] focus:ring-[#00695C] cursor-pointer h-4 w-4"
                                  />
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="employee-form"
                  disabled={loading}
                  className="px-5 py-2 bg-[#00695C] hover:bg-[#005B50] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                >
                  {loading ? "Saving..." : modalMode === "create" ? "Create Employee" : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
