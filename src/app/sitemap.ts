import type { MetadataRoute } from "next";
import { stotraCategories } from "@/content/stotras";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = stotraCategories.map(
    (category) => ({
      url: `${SITE_URL}/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    })
  );

  return [...staticRoutes, ...categoryRoutes];
}
