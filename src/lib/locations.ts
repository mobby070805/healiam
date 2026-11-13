// States and cities for the header's Locations menu and the state pages' "other states" section.
// Built from lib/fairs.ts and the page lists, so a new fair, state page or city page shows up on its own.

import { fairPhoto, fairs, type FairPhoto } from "@/lib/fairs";
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

// ---- Header Locations menu (owner, 13 Nov 2026: same layout as the live healiam.com header): every
// state with a page, its state page, and its city pages, states in A to Z order as on the live site. Built from the page lists, so new pages appear on their own.

export type LocationsMenuGroup = {
  readonly state: string;
  readonly page?: LocationLink;
  readonly cities: readonly { readonly city: string; readonly href: string }[];
};

export function locationsMenu(): readonly LocationsMenuGroup[] {
  const regions = [...new Set([...fairs.map((f) => f.region), ...Object.keys(statePages)])];
  const stateOf = (region: string) => fairs.find((f) => f.region === region)?.state ?? statesWithoutFairs[region] ?? region;
  return regions
    .map((region) => ({
      state: stateOf(region),
      page: statePages[region],
      cities: cityPageList.filter((c) => c.region === region).map((c) => ({ city: c.city, href: c.href })),
    }))
    .filter((g) => g.page || g.cities.length > 0)
    .sort((a, b) => a.state.localeCompare(b.state));
}
