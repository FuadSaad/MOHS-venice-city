import { NextResponse } from "next/server";
import { getSessionAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: admin.userId },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        permissions: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    let permissions: string[] = [];
    if (user.permissions) {
      try {
        permissions = JSON.parse(user.permissions);
      } catch {
        permissions = user.permissions.split(",").map((p) => p.trim());
      }
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        ...user,
        permissions,
        isSuperAdmin: user.role === "SUPER_ADMIN" || user.role === "ADMIN",
      },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
