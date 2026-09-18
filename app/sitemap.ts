import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Una sola página: el sitemap existe sobre todo para que los buscadores
// tengan un punto de entrada declarado y la fecha de última modificación.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
