import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, signAdminToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const identifier = (body.identifier || body.email || body.username || "").toLowerCase().trim();
    const password = body.password;

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, error: "Username/Email and password are required" },
        { status: 400 }
      );
    }

    // Lookup user by email OR username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: "Account is disabled. Please contact the Super Administrator." },
        { status: 403 }
      );
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid username/email or password" },
        { status: 401 }
      );
    }

    // Parse permissions list
    let permissions: string[] = [];
    if (user.permissions) {
      try {
        permissions = JSON.parse(user.permissions);
      } catch {
        permissions = user.permissions.split(",").map((p) => p.trim());
      }
    }

    // Sign JWT token with role and permissions
    const token = signAdminToken({
      userId: user.id,
      name: user.name,
      email: user.email,
      username: user.username || "",
      role: user.role,
      permissions,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        permissions,
      },
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
