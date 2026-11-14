// Every city page, in one list. Two kinds (owner, 5 and 6 Nov 2026):
// - fair cities, which host a Healiam fair (`fair` is the fair's slug in lib/fairs.ts);
// - nearby cities, which don't, and point to the closest fairs with the distance to each (`miles`).
// The state pages' city section, the header's Locations menu and the fair cards all read this list.
// Paths and numbers only, so this file can be imported anywhere without pulling in the page data.

export type CityPage = {
  readonly city: string;
  readonly region: string;
  readonly label: string;
  readonly href: string;
  /** Slug of the fair this city hosts. */
  readonly fair?: string;
  /**
   * Nearby cities: straight-line miles from this city's center to each fair's address, keyed by fair slug
   * (this is how the client's city sheet measures). Coordinates from OpenStreetMap, checked 6 Nov 2026,
   * rounded to the nearest mile. The Grand Prairie fair's address isn't in OpenStreetMap or the Census
   * geocoder, so its ZIP (75050) center stands in for it: those figures can be a mile or two out.
   */
  readonly miles?: Readonly<Record<string, number>>;
};

export const cityPageList: readonly CityPage[] = [
  { city: "Plano", region: "TX", label: "Blood testing in Plano", href: "/locations/texas/plano", fair: "plano-tx" },
  { city: "Garland", region: "TX", label: "Blood testing in Garland", href: "/locations/texas/garland", miles: { "plano-tx": 13, "arlington-tx": 25 } },
  { city: "Dallas", region: "TX", label: "Blood testing in Dallas", href: "/locations/texas/dallas", miles: { "plano-tx": 20, "arlington-tx": 13 } },
  { city: "Irving", region: "TX", label: "Blood testing in Irving", href: "/locations/texas/irving", miles: { "plano-tx": 20, "arlington-tx": 6 } },
  { city: "Arlington", region: "TX", label: "Blood testing in Arlington", href: "/locations/texas/arlington", miles: { "plano-tx": 30, "arlington-tx": 5 } },
  { city: "Fort Worth", region: "TX", label: "Blood testing in Fort Worth", href: "/locations/texas/fort-worth", miles: { "plano-tx": 39, "arlington-tx": 18 } },
  { city: "Denver", region: "CO", label: "Blood testing in Denver", href: "/locations/colorado/denver", fair: "denver-co" },
  { city: "Aurora", region: "CO", label: "Blood testing in Aurora", href: "/locations/colorado/aurora", miles: { "denver-co": 9, "centennial-co": 11 } },
  { city: "Rahway", region: "NJ", label: "Blood testing in Rahway", href: "/locations/new-jersey/rahway", fair: "rahway-nj" },
  { city: "Newark", region: "NJ", label: "Blood testing in Newark", href: "/locations/new-jersey/newark", miles: { "rahway-nj": 10 } },
  { city: "Jersey City", region: "NJ", label: "Blood testing in Jersey City", href: "/locations/new-jersey/jersey-city", miles: { "rahway-nj": 14 } },
  { city: "New York City", region: "NY", label: "Blood testing in New York City", href: "/locations/new-york/new-york-city", miles: { "rahway-nj": 16 } },
  { city: "Lawrenceville", region: "GA", label: "Blood testing in Lawrenceville", href: "/locations/georgia/lawrenceville", fair: "lawrenceville-ga" },
  { city: "Atlanta", region: "GA", label: "Blood testing in Atlanta", href: "/locations/georgia/atlanta", miles: { "lawrenceville-ga": 26 } },
];

/** Fair slug to the city page of the city that hosts it. */
export const cityPages: Readonly<Record<string, { readonly label: string; readonly href: string }>> = Object.fromEntries(
  cityPageList.filter((c) => c.fair).map((c) => [c.fair as string, { label: c.label, href: c.href }]),
);

export function cityPage(href: string): CityPage {
  const page = cityPageList.find((c) => c.href === href);
  if (!page) throw new Error(`city-pages: no city page at "${href}"`);
  return page;
}
