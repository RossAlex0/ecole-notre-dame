import type { MetadataRoute } from "next";
import { ROUTES } from "@/utils/constants/navigation";
import { SITE_URL } from "@/utils/constants/site";

// Home first with the highest priority, then the legal pages.
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: route === ROUTES.home ? "monthly" : "yearly",
    priority: route === ROUTES.home ? 1 : 0.3,
  }));
}
