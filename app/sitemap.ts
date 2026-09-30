import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mohsvenicecity.com";

  // Static routes
  const staticRoutes = [
    "",
    "/plots",
    "/flats",
    "/properties",
    "/projects",
    "/gallery",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic property routes
  try {
    const properties = await prisma.property.findMany({
      where: { status: { not: "HIDDEN" } },
      select: { slug: true, updatedAt: true },
    });

    const propertyRoutes = properties.map((prop) => ({
      url: `${baseUrl}/properties/${prop.slug}`,
      lastModified: prop.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...propertyRoutes];
  } catch (e) {
    return staticRoutes;
  }
}
