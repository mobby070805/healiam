// Upcoming Healiam health fairs, copied from https://healiam.com/fairs.
// Dates go stale: re-check that page and update this list before each release.
// Last checked 29 Oct 2026: six fairs across Texas, New Jersey, Colorado and Georgia.

export type Fair = {
  readonly slug: string;
  readonly city: string;
  readonly state: string;
  readonly region: string;
  readonly venue?: string;
  readonly street: string;
  readonly locality: string;
  readonly postalCode: string;
  readonly date: string;
  readonly dateLabel: string;
  /** Local UTC offset on the fair date (for schema.org Event times). */
  readonly utcOffset: string;
  readonly detailsUrl: string;
  /** Detail page copy, from healiam.com/fairs/<slug>. */
  readonly intro: string;
  readonly parking: string;
  readonly venueNote: string;
  /** Towns near the venue, closest first, from the Healiam_Fair_City_Pages sheet (within 10 km). */
  readonly nearbyTowns?: readonly string[];
};

/** Google Maps search link for a fair's address. */
export function fairMapsUrl(fair: Fair): string {
  const q = [fair.venue, fair.street, `${fair.locality}, ${fair.region} ${fair.postalCode}`]
    .filter(Boolean)
    .join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export const fairHours = { label: "8:00 to 10:00 AM", start: "08:00", end: "10:00" } as const;

export const fairs: readonly Fair[] = [
  {
    slug: "plano-tx",
    city: "Plano, TX",
    state: "Texas",
    region: "TX",
    venue: "Brightway Insurance",
    street: "6832 Coit Rd, Suite 270A",
    locality: "Plano",
    postalCode: "75023",
    date: "2026-11-14",
    dateLabel: "Sat, Nov 14, 2026",
    utcOffset: "-06:00",
    detailsUrl: "/fairs/plano-tx",
    intro:
      "Join Healiam in Plano, Texas for a community preventive blood testing fair. The panel covers CBC, thyroid, kidney, Vitamin D, iron and HbA1c, with no doctor's referral or insurance required. Walk-ins welcome.",
    parking:
      "Free surface parking in front of the building. Look for suite 270A on the upper level. ADA-accessible spots are nearest the main doors.",
    venueNote:
      "Our Plano fair is in the Coit Crossing professional plaza on the second floor. Draws are done by licensed phlebotomists in a private setting, and results reach your Healiam portal within 4 to 5 business days.",
    nearbyTowns: ["Frisco", "Far North Dallas", "Allen"],
  },
  {
    slug: "arlington-tx",
    city: "Arlington, TX",
    state: "Texas",
    region: "TX",
    venue: "Goldmine Enterprise",
    street: "1106 N Watson Rd, Suite 318",
    locality: "Grand Prairie",
    postalCode: "75050",
    date: "2026-11-21",
    dateLabel: "Sat, Nov 21, 2026",
    utcOffset: "-06:00",
    detailsUrl: "/fairs/arlington-tx",
    intro:
      "Healiam brings affordable preventive blood testing to the Arlington and Grand Prairie area. The panel covers CBC, thyroid, kidney, Vitamin D, iron and HbA1c, with no referral or insurance required.",
    parking:
      "Free on-site parking in the building's lot. Enter the main lobby and take the elevator to suite 318. ADA-accessible parking sits near the entrance.",
    venueNote:
      "Our Arlington-area fair sits in the Watson Road professional building, suite 318 on the third floor. Staffed by licensed phlebotomists, with results returned through the Healiam portal in 4 to 5 business days.",
  },
  {
    slug: "rahway-nj",
    city: "Rahway, NJ",
    state: "New Jersey",
    region: "NJ",
    venue: "Rahway Pharmacy",
    street: "1421 Irving St",
    locality: "Rahway",
    postalCode: "07065",
    date: "2026-11-14",
    dateLabel: "Sat, Nov 14, 2026",
    utcOffset: "-05:00",
    detailsUrl: "/fairs/rahway-nj",
    intro:
      "Healiam's Rahway, New Jersey fair brings affordable preventive blood testing to the community. The panel covers CBC, thyroid, kidney, Vitamin D, iron and HbA1c, with no referral or insurance required.",
    parking:
      "Free street parking along Irving St, with a public lot one block east. It is a short walk from the Rahway NJ Transit station, and the entrance is ADA-accessible at street level.",
    venueNote:
      "Our Rahway fair is a street-level location on Irving Street, minutes from the train station. Staffed by licensed phlebotomists, with results returned through the Healiam portal in 4 to 5 business days.",
    nearbyTowns: ["Linden", "Clark", "Carteret", "Roselle", "Woodbridge", "Cranford", "Garwood", "Roselle Park"],
  },
  {
    slug: "denver-co",
    city: "Denver, CO",
    state: "Colorado",
    region: "CO",
    street: "3955 Irving St",
    locality: "Denver",
    postalCode: "80211",
    date: "2026-11-14",
    dateLabel: "Sat, Nov 14, 2026",
    utcOffset: "-07:00",
    detailsUrl: "/fairs/denver-co",
    intro:
      "Healiam's Denver, Colorado fair offers an affordable, comprehensive preventive blood panel covering CBC, thyroid, kidney, Vitamin D, iron and HbA1c. No doctor's referral or insurance required.",
    parking:
      "Free parking in the lot adjacent to the building. ADA-accessible parking sits nearest the main entrance.",
    venueNote:
      "Our Denver fair is on Irving Street in the Berkeley neighborhood. Staffed by licensed phlebotomists, with results returned through the Healiam portal in 4 to 5 business days.",
    nearbyTowns: ["Edgewater", "Wheat Ridge", "Arvada", "Westminster", "Lakewood", "Commerce City", "Federal Heights"],
  },
  {
    slug: "centennial-co",
    city: "Centennial, CO",
    state: "Colorado",
    region: "CO",
    venue: "Centennial Public Works",
    street: "7272 S Eagle Street",
    locality: "Centennial",
    postalCode: "80112",
    date: "2026-11-22",
    dateLabel: "Sun, Nov 22, 2026",
    utcOffset: "-07:00",
    detailsUrl: "/fairs/centennial-co",
    intro:
      "Healiam's Centennial, Colorado fair offers an affordable, comprehensive preventive blood panel covering CBC, thyroid, kidney, Vitamin D, iron and HbA1c. No doctor's referral or insurance required.",
    parking:
      "Free parking in the lot in front of the building. ADA-accessible parking sits nearest the entrance.",
    venueNote:
      "Our Centennial fair is at the Centennial Public Works building on South Eagle Street. Staffed by licensed phlebotomists, with results returned through the Healiam portal in 4 to 5 business days.",
  },
  {
    slug: "lawrenceville-ga",
    city: "Lawrenceville, GA",
    state: "Georgia",
    region: "GA",
    street: "755 Longleaf Blvd",
    locality: "Lawrenceville",
    postalCode: "30046",
    date: "2026-11-21",
    dateLabel: "Sat, Nov 21, 2026",
    utcOffset: "-05:00",
    detailsUrl: "/fairs/lawrenceville-ga",
    intro:
      "Healiam's Lawrenceville, Georgia fair offers an affordable, comprehensive preventive blood panel covering CBC, thyroid, kidney, Vitamin D, iron and HbA1c. No doctor's referral or insurance required.",
    parking:
      "Free parking on site. ADA-accessible parking sits nearest the entrance.",
    venueNote:
      "Our Lawrenceville fair is on Longleaf Blvd in the heart of Gwinnett County. Staffed by licensed phlebotomists, with results returned through the Healiam portal in 4 to 5 business days.",
    nearbyTowns: ["Grayson", "Snellville"],
  },
];

/** A state's fair cities for the same-state links section on its state page. */
export function stateCityLinks(region: string) {
  return fairs
    .filter((f) => f.region === region)
    .map((f) => ({
      city: f.city.replace(/,\s*[A-Z]{2}$/, ""),
      href: f.detailsUrl,
      dateLabel: f.dateLabel.replace(/,\s*\d{4}$/, ""),
      place: [f.venue, f.locality].filter(Boolean).join(", "),
      near: f.nearbyTowns ?? [],
    }));
}

/** "Texas, New Jersey, Colorado and Georgia" style list of states with an upcoming fair. */
export function fairStatesList(list: readonly Fair[] = fairs): string {
  const states = [...new Set(list.map((f) => f.state))];
  return states.length < 2 ? (states[0] ?? "") : `${states.slice(0, -1).join(", ")} and ${states[states.length - 1]}`;
}
