import type { MetadataRoute } from "next";

import { SITE_URL } from "./data/site";
import { caseStudies } from "./data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
