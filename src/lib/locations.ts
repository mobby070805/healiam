// The header's Locations menu: each state with a fair, its state page if it has one, and its fair
// cities. Built from lib/fairs.ts and the state page data, so a new fair or state page shows up here
// without touching the menu.

import { fairPhoto, fairs, type FairPhoto } from "@/lib/fairs";
import { site } from "@/lib/site";
import { cityPageList } from "@/lib/city-pages";
import { page as texas } from "@/lib/pages/texas-blood-test";
import { colorado } from "@/lib/pages/colorado-blood-testing";
import { newJersey } from "@/lib/pages/new-jersey-blood-testing";
import { georgia } from "@/lib/pages/georgia-blood-testing";
import { newYork } from "@/lib/pages/new-york-blood-testing";

export type LocationLink = { readonly label: string; readonly href: string };
export type LocationCity = LocationLink & {
  /** "Sat, Nov 14" */
  readonly dateLabel: string;
  /** ISO date of the fair, so the menu can tell upcoming from past in the visitor's browser. */
  readonly date: string;
  /** Venue photo, or null until the Google Maps key is set. */
  readonly photo: FairPhoto | null;
};
export type LocationGroup = {
  readonly state: string;
  readonly statePage?: LocationLink;
  readonly cities: readonly LocationCity[];
};

const statePages: Record<string, LocationLink> = {
  TX: { label: "Blood testing in Texas", href: texas.path },
  CO: { label: "Blood testing in Colorado", href: colorado.path },
  NJ: { label: "Blood testing in New Jersey", href: newJersey.path },
  GA: { label: "Blood testing in Georgia", href: georgia.path },
  NY: { label: "Blood testing in New York", href: newYork.path },
};

/** States with a page but no Healiam fair of their own (owner, 6 Nov 2026). */
const statesWithoutFairs: Record<string, string> = { NY: "New York" };

/** States in the order they first appear in the fair list. */
export function locationGroups(): readonly LocationGroup[] {
  const regions = [...new Set(fairs.map((f) => f.region))];
  return regions.map((region) => {
    const list = fairs.filter((f) => f.region === region);
    return {
      state: list[0].state,
      statePage: statePages[region],
      cities: list.map((f) => ({
        label: f.city,
        href: f.detailsUrl,
        dateLabel: f.dateLabel.replace(/,\s*\d{4}$/, ""),
        date: f.date,
        photo: fairPhoto(f),
      })),
    };
  });
}

export const allFairsLink: LocationLink = { label: "All upcoming fairs", href: site.links.fairs };

// ---- Header menus (owner, 6 Nov 2026): "Fairs" lists the dated fair pages, "Locations" the evergreen
// state and city pages. Both are built from lib/fairs.ts, so new fairs and city pages appear on their own.

export type MenuItem = LocationLink & {
  /** "Sat, Nov 14": shown on fair items only, beside an upcoming dot or "Ended". */
  readonly dateLabel?: string;
  /** ISO date, so the menu can tell upcoming from past in the visitor's browser. */
  readonly date?: string;
  /** The state page: shown bold with an arrow, above the state's cities. */
  readonly strong?: boolean;
};
export type MenuGroup = { readonly state: string; readonly items: readonly MenuItem[] };
export type HeaderMenuData = {
  readonly label: string;
  readonly summary: string;
  readonly groups: readonly MenuGroup[];
  readonly footer?: LocationLink;
};

const regions = () => [...new Set(fairs.map((f) => f.region))];
const stateOf = (region: string) => fairs.find((f) => f.region === region)?.state ?? statesWithoutFairs[region] ?? region;

/** Fairs menu: every fair, by state, linking to its /fairs/<slug> page. */
export function fairsMenu(): HeaderMenuData {
  const groups = regions().map((region) => ({
    state: stateOf(region),
    items: fairs
      .filter((f) => f.region === region)
      .map((f) => ({ label: f.city, href: f.detailsUrl, dateLabel: f.dateLabel.replace(/,\s*\d{4}$/, ""), date: f.date })),
  }));
  return {
    label: "Fairs",
    summary: `${fairs.length} health fairs across ${groups.length} states`,
    groups,
    footer: allFairsLink,
  };
}

/** Locations menu: each state's page, then its city pages. No fair pages, no dates. */
export function locationsMenu(): HeaderMenuData {
  // Fair states first, then states with a page but no fair yet (New York).
  const allRegions = [...new Set([...regions(), ...Object.keys(statePages)])];
  const groups = allRegions.map((region) => {
    const statePage = statePages[region];
    const cities = cityPageList.filter((c) => c.region === region).map((c) => ({ label: c.city, href: c.href }));
    return { state: stateOf(region), items: [...(statePage ? [{ ...statePage, strong: true }] : []), ...cities] };
  }).filter((g) => g.items.length > 0);
  const cityCount = cityPageList.length;
  return {
    label: "Locations",
    summary: `Blood testing in ${groups.length} states and ${cityCount} cities`,
    groups,
  };
}
