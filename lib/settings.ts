import prisma from "@/lib/prisma";

export interface WebsiteSettingsData {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  visitingHours: string;
}

export const DEFAULT_SETTINGS: WebsiteSettingsData = {
  companyName: "MOHS Venice City",
  tagline: "Your Property Partner | Uttara - Purbachal",
  phone: "+880 1711-000000",
  email: "info@mohsvenicecity.com",
  address: "Uttara - Purbachal Link Road, Sector 3, Dhaka, Bangladesh",
  visitingHours: "Sat - Thu: 9:00 AM - 7:00 PM (Fri open for site visits)",
};

export async function getWebsiteSettings(): Promise<WebsiteSettingsData> {
  try {
    const records = await prisma.websiteSetting.findMany();
    const map = records.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      companyName: map.companyName || DEFAULT_SETTINGS.companyName,
      tagline: map.tagline || DEFAULT_SETTINGS.tagline,
      phone: map.phone || DEFAULT_SETTINGS.phone,
      email: map.email || DEFAULT_SETTINGS.email,
      address: map.address || DEFAULT_SETTINGS.address,
      visitingHours: map.visitingHours || DEFAULT_SETTINGS.visitingHours,
    };
  } catch (error) {
    console.error("Failed to load website settings from DB, using defaults:", error);
    return DEFAULT_SETTINGS;
  }
}
