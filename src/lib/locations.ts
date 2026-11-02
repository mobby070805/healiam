// The header's Locations menu: each state with a fair, its state page if it has one, and its fair
// cities. Built from lib/fairs.ts and the state page data, so a new fair or state page shows up here
// without touching the menu.

import { fairPhoto, fairs, type FairPhoto } from "@/lib/fairs";
import { site } from "@/lib/site";
import { page as texas } from "@/lib/pages/texas-blood-test";
import { colorado } from "@/lib/pages/colorado-blood-testing";
import { newJersey } from "@/lib/pages/new-jersey-blood-testing";
import { georgia } from "@/lib/pages/georgia-blood-testing";

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
};

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
