import React from "react";
import prisma from "@/lib/prisma";
import { getSessionAdmin, isSuperAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSubAdminsClient from "@/components/admin/AdminSubAdminsClient";

export const revalidate = 0;

export default async function SubAdminsPage() {
  const admin = await getSessionAdmin();

  // Strict Super Admin protection
  if (!admin || !isSuperAdmin(admin)) {
    redirect("/admin");
  }

  const usersRaw = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      phone: true,
      role: true,
      permissions: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const users = usersRaw.map((u) => {
    let permissions: string[] = [];
    if (u.permissions) {
      try {
        permissions = JSON.parse(u.permissions);
      } catch {
        permissions = u.permissions.split(",").map((s) => s.trim());
      }
    }
    return {
      ...u,
      createdAt: u.createdAt.toISOString(),
      permissions,
    };
  });

  return <AdminSubAdminsClient initialUsers={users} currentAdminId={admin.userId} />;
}
