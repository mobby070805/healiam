import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";
import { page } from "@/lib/pages/texas-blood-test";
import { home } from "@/lib/pages/home";
import { tests } from "@/lib/pages/tests";
import { fairsPage } from "@/lib/pages/fairs";
import { about } from "@/lib/pages/about";
import { contact } from "@/lib/pages/contact";
import { demo } from "@/lib/pages/demo";
import { fairs } from "@/lib/fairs";
import { employer } from "@/lib/pages/employer";
import { colorado } from "@/lib/pages/colorado-blood-testing";
import { newJersey } from "@/lib/pages/new-jersey-blood-testing";

// Only live pages. Add new landing pages from their data files here.
const livePages = [home, tests, fairsPage, about, demo, employer, contact, page, colorado, newJersey];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...livePages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p.path === "/" ? 1 : 0.8,
    })),
    ...fairs.map((fair) => ({
      url: `${site.url}/fairs/${fair.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
