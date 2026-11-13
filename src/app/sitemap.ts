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
import { georgia } from "@/lib/pages/georgia-blood-testing";
import { newYork } from "@/lib/pages/new-york-blood-testing";
import { plano } from "@/lib/pages/plano-blood-testing";
import { denver } from "@/lib/pages/denver-blood-testing";
import { rahway } from "@/lib/pages/rahway-blood-testing";
import { lawrenceville } from "@/lib/pages/lawrenceville-blood-testing";
import { garland } from "@/lib/pages/garland-blood-testing";
import { dallas } from "@/lib/pages/dallas-blood-testing";
import { irving } from "@/lib/pages/irving-blood-testing";
import { arlington } from "@/lib/pages/arlington-blood-testing";
import { fortWorth } from "@/lib/pages/fort-worth-blood-testing";
import { newark } from "@/lib/pages/newark-blood-testing";
import { jerseyCity } from "@/lib/pages/jersey-city-blood-testing";
import { newYorkCity } from "@/lib/pages/new-york-city-blood-testing";
import { aurora } from "@/lib/pages/aurora-blood-testing";
import { atlanta } from "@/lib/pages/atlanta-blood-testing";
import { blog } from "@/lib/pages/blog";
import { articles } from "@/lib/blog/articles";

// Only live pages. Add new landing pages from their data files here.
const livePages = [home, tests, fairsPage, about, demo, employer, contact, page, colorado, newJersey, georgia, newYork, plano, denver, rahway, lawrenceville, garland, dallas, irving, arlington, fortWorth, newark, jerseyCity, newYorkCity, aurora, atlanta, blog];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...livePages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p.path === "/" ? 1 : 0.8,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/blog/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...fairs.map((fair) => ({
      url: `${site.url}/fairs/${fair.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
