import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin, isSuperAdmin, hashPassword } from "@/lib/auth";

// PUT /api/admin/sub-admins/[id] - Update sub-admin details, permissions, status or password
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin || !isSuperAdmin(admin)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Super Admin access required." },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const { name, email, username, phone, password, permissions, isActive, role } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Safety check: Prevent deactivating the active Super Admin
    if (existingUser.id === admin.userId && isActive === false) {
      return NextResponse.json(
        { success: false, error: "You cannot deactivate your own Super Admin account" },
        { status: 400 }
      );
    }

    const updateData: any = {};

    if (name) updateData.name = name.trim();
    if (phone !== undefined) updateData.phone = phone?.trim() || null;
    if (email && email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
      });
      if (emailTaken) {
        return NextResponse.json(
          { success: false, error: "This email is already in use by another admin" },
          { status: 409 }
        );
      }
      updateData.email = email.toLowerCase().trim();
    }

    if (username && username !== existingUser.username) {
      const usernameTaken = await prisma.user.findUnique({
        where: { username: username.toLowerCase().trim() },
      });
      if (usernameTaken) {
        return NextResponse.json(
          { success: false, error: "This username is already taken" },
          { status: 409 }
        );
      }
      updateData.username = username.toLowerCase().trim();
    }

    if (password && password.trim().length >= 6) {
      updateData.passwordHash = await hashPassword(password.trim());
    }

    if (Array.isArray(permissions)) {
      updateData.permissions = JSON.stringify(permissions);
    }

    if (typeof isActive === "boolean") {
      updateData.isActive = isActive;
    }

    if (role && (role === "SUPER_ADMIN" || role === "SUB_ADMIN")) {
      updateData.role = role;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        phone: true,
        role: true,
        permissions: true,
        isActive: true,
        updatedAt: true,
      },
    });

    let parsedPermissions: string[] = [];
    if (updatedUser.permissions) {
      try {
        parsedPermissions = JSON.parse(updatedUser.permissions);
      } catch {
        parsedPermissions = updatedUser.permissions.split(",").map((s) => s.trim());
      }
    }

    return NextResponse.json({
      success: true,
      message: "Admin account updated successfully",
      user: {
        ...updatedUser,
        permissions: parsedPermissions,
      },
    });
  } catch (error: any) {
    console.error("Update sub-admin error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update sub-admin" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/sub-admins/[id] - Delete a sub-admin
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin || !isSuperAdmin(admin)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Super Admin access required." },
        { status: 403 }
      );
    }

    const { id } = params;

    if (id === admin.userId) {
      return NextResponse.json(
        { success: false, error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (targetUser.role === "SUPER_ADMIN" || targetUser.role === "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Super Admin accounts cannot be deleted directly" },
        { status: 403 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Sub-admin deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete sub-admin error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete sub-admin" },
      { status: 500 }
    );
  }
}
