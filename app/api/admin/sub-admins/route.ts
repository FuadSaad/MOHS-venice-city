import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin, isSuperAdmin, hashPassword } from "@/lib/auth";

// GET /api/admin/sub-admins - List all users (Super Admin only)
export async function GET() {
  try {
    const admin = await getSessionAdmin();
    if (!admin || !isSuperAdmin(admin)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Super Admin access required." },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        employeeId: true,
        username: true,
        phone: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const parsedUsers = users.map((u) => {
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
        permissions,
      };
    });

    return NextResponse.json({ success: true, users: parsedUsers });
  } catch (error: any) {
    console.error("Fetch sub-admins error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sub-admins" },
      { status: 500 }
    );
  }
}

// POST /api/admin/sub-admins - Create new sub-admin
export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin || !isSuperAdmin(admin)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Super Admin access required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, email, employeeId, username, phone, password, permissions } = body;

    if (!name || !email || !username || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, username, and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = username.toLowerCase().trim();
    const cleanEmployeeId = employeeId ? employeeId.trim() : null;

    if (cleanUsername.length < 3) {
      return NextResponse.json(
        { success: false, error: "Username must be at least 3 characters long" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "An admin with this email already exists" },
        { status: 409 }
      );
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username: cleanUsername },
    });
    if (existingUsername) {
      return NextResponse.json(
        { success: false, error: "This username is already taken. Please choose another." },
        { status: 409 }
      );
    }

    // Check if employeeId already exists
    if (cleanEmployeeId) {
      const existingEmployeeId = await prisma.user.findUnique({
        where: { employeeId: cleanEmployeeId },
      });
      if (existingEmployeeId) {
        return NextResponse.json(
          { success: false, error: "This Employee ID is already assigned to someone else." },
          { status: 409 }
        );
      }
    }

    const passwordHash = await hashPassword(password);
    const assignedPermissions = Array.isArray(permissions) ? permissions : [];

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        employeeId: cleanEmployeeId,
        username: cleanUsername,
        phone: phone?.trim() || null,
        passwordHash,
        role: "SUB_ADMIN",
        permissions: JSON.stringify(assignedPermissions),
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        employeeId: true,
        username: true,
        phone: true,
        role: true,
        permissions: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Sub-admin '${cleanUsername}' created successfully`,
      user: {
        ...newUser,
        permissions: assignedPermissions,
      },
    });
  } catch (error: any) {
    console.error("Create sub-admin error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create sub-admin" },
      { status: 500 }
    );
  }
}
