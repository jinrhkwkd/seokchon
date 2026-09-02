import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/schema";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/menu",
    "/group",
    "/faq",
    "/location",
    "/media",
    "/blog",
  ];
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  }));

  return [...staticEntries, ...postEntries];
}
