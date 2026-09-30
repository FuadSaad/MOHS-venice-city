import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { getWebsiteSettings, DEFAULT_SETTINGS } from "@/lib/settings";

export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getWebsiteSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(admin, "settings")) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const body = await req.json();
    const allowedKeys = ["companyName", "tagline", "phone", "email", "address", "visitingHours"];

    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        await prisma.websiteSetting.upsert({
          where: { key },
          update: { value: String(body[key]) },
          create: { key, value: String(body[key]) },
        });
      }
    }

    // Revalidate frontend layout & key pages
    revalidatePath("/", "layout");
    revalidatePath("/contact");
    revalidatePath("/about");
    revalidatePath("/admin/settings");

    const updated = await getWebsiteSettings();
    return NextResponse.json({ success: true, data: updated, message: "Settings saved successfully" });
  } catch (error: any) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update settings" }, { status: 500 });
  }
}
