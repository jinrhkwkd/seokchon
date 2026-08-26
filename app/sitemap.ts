import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/faq", "/location", "/media"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
