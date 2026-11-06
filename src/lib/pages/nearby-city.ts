// Shared facts for nearby city pages: cities with no Healiam fair of their own (owner, 6 Nov 2026).
// Only facts live here. Every sentence is written on each city's own page, never shared.

import { fairs, type Fair } from "@/lib/fairs";
import { cityPage } from "@/lib/city-pages";

/** A state's fairs, soonest first, so the fair happening first is always listed first (owner, 6 Nov 2026). */
export const fairsIn = (region: string): readonly Fair[] =>
  fairs.filter((f) => f.region === region).toSorted((a, b) => a.date.localeCompare(b.date));

/** "Sat, Nov 14" */
export const shortDate = (f: Fair) => f.dateLabel.replace(/,\s*\d{4}$/, "");

/** "Plano on Sat, Nov 14 and Grand Prairie on Sat, Nov 21", soonest first. */
export const datesIn = (region: string) => fairsIn(region).map((f) => `${f.locality} on ${shortDate(f)}`).join(" and ");

/** The Texas (DFW) fairs and their dates. */
export const dfwFairs = fairsIn("TX");
export const dfwDates = () => datesIn("TX");

/** The city page at `path`, with its straight-line miles from the city center to each fair's address. */
export function nearby(path: string) {
  const page = cityPage(path);
  if (!page.miles) throw new Error(`nearby-city: ${path} has no distances in lib/city-pages.ts`);
  const miles = page.miles;
  /** Miles to one fair, by slug. Throws if the distance is missing, so a typo can't print "undefined". */
  const to = (slug: string): number => {
    const m = miles[slug];
    if (m === undefined) throw new Error(`nearby-city: no distance from ${page.city} to ${slug}`);
    return m;
  };
  return {
    city: page.city,
    miles,
    to,
    toPlano: miles["plano-tx"],
    toGrandPrairie: miles["arlington-tx"],
    distanceFrom: { city: page.city, miles },
  };
}
