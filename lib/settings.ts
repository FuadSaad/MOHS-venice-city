import prisma from "@/lib/prisma";

export interface WebsiteSettingsData {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  visitingHours: string;
  map1Image: string;
  map1Title: string;
  map1Subtitle: string;
  map1Keyword: string;
  map2Image: string;
  map2Title: string;
  map2Subtitle: string;
  map2Keyword: string;
  mapModulesJson: string;
}

export const DEFAULT_SETTINGS: WebsiteSettingsData = {
  companyName: "MOHS Venice City",
  tagline: "Your Property Partner | Uttara - Purbachal",
  phone: "+880 1711-000000",
  email: "info@mohsvenicecity.com",
  address: "Uttara - Purbachal Link Road, Sector 3, Dhaka, Bangladesh",
  visitingHours: "Sat - Thu: 9:00 AM - 7:00 PM (Fri open for site visits)",
  map1Image: "/images/map-interactive.jpg",
  map1Title: "Sector 1",
  map1Subtitle: "Corporate & Commercial Zone",
  map1Keyword: "Sector 1",
  map2Image: "/images/map-interactive-2.jpg",
  map2Title: "Sector 2",
  map2Subtitle: "Premium Residential Zone",
  map2Keyword: "Sector 2",
  mapModulesJson: "",
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
      map1Image: map.map1Image || DEFAULT_SETTINGS.map1Image,
      map1Title: map.map1Title || DEFAULT_SETTINGS.map1Title,
      map1Subtitle: map.map1Subtitle || DEFAULT_SETTINGS.map1Subtitle,
      map1Keyword: map.map1Keyword || DEFAULT_SETTINGS.map1Keyword,
      map2Image: map.map2Image || DEFAULT_SETTINGS.map2Image,
      map2Title: map.map2Title || DEFAULT_SETTINGS.map2Title,
      map2Subtitle: map.map2Subtitle || DEFAULT_SETTINGS.map2Subtitle,
      map2Keyword: map.map2Keyword || DEFAULT_SETTINGS.map2Keyword,
      mapModulesJson: map.mapModulesJson || DEFAULT_SETTINGS.mapModulesJson,
    };
  } catch (error) {
    console.error("Failed to load website settings from DB, using defaults:", error);
    return DEFAULT_SETTINGS;
  }
}
