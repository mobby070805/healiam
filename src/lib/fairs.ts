import { site } from "@/lib/site";

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
  /** Detail page copy, rewritten per fair (client approved, 6 Nov 2026); facts from healiam.com/fairs/<slug>. */
  readonly intro: string;
  readonly parking: string;
  readonly venueNote: string;
  /** Towns near the venue, closest first, from the Healiam_Fair_City_Pages sheet (within 10 km). */
  readonly nearbyTowns?: readonly string[];
  /** Street View viewpoint healiam.com/fairs uses for this venue; without one, the address is used. */
  readonly streetView?: { readonly pano: string; readonly heading: number };
  /** Alt text for the venue photo, as on healiam.com/fairs. */
  readonly photoAlt?: string;
};

/** Google Maps search link for a fair's address. */
export function fairMapsUrl(fair: Fair): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fairAddressQuery(fair))}`;
}

// "Venue, street, City, ST 12345", skipping a missing venue (healiam.com/fairs leaves a stray
// leading comma for Lawrenceville, which is why its photo is broken there).
function fairAddressQuery(fair: Fair): string {
  return [fair.venue, fair.street, `${fair.locality}, ${fair.region} ${fair.postalCode}`].filter(Boolean).join(", ");
}

export type FairPhoto = { readonly src: string; readonly alt: string };

/** The venue's Street View photo, built the way healiam.com/fairs builds it. Null until a key is set. */
export function fairPhoto(fair: Fair): FairPhoto | null {
  if (!site.googleMapsKey) return null;
  const view = fair.streetView
    ? `pano=${fair.streetView.pano}&heading=${fair.streetView.heading}&pitch=0&fov=75`
    : `location=${encodeURIComponent(fairAddressQuery(fair))}`;
  return {
    src: `https://maps.googleapis.com/maps/api/streetview?size=640x400&${view}&key=${site.googleMapsKey}`,
    alt: fair.photoAlt ?? `Street view of the ${fair.city} blood testing fair location`,
  };
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
      "A morning of preventive blood testing in west Plano, upstairs at Brightway Insurance in the Coit Crossing plaza. One panel covers thyroid, cholesterol, kidney, liver, iron and Vitamin D, and you book it yourself with no doctor's order.",
    parking:
      "Park free in the surface lot out front. Suite 270A is on the upper level, and the ADA spaces are closest to the main doors.",
    venueNote:
      "The fair runs from a professional office on the second floor of Coit Crossing. A licensed phlebotomist takes two vials in a private room, and your report lands in the Healiam app 4 to 5 business days later.",
    nearbyTowns: ["Frisco", "Far North Dallas", "Allen"],
    photoAlt: "Street view of Plano, TX blood testing fair location",
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
      "Healiam's fair for Arlington and Grand Prairie, on the third floor of the Watson Road professional building. Book the full preventive panel online; you won't need a referral or an insurance card.",
    parking:
      "There's a free lot at the building. Go through the main lobby and take the elevator up to suite 318. ADA parking is beside the entrance.",
    venueNote:
      "Goldmine Enterprise hosts the fair in suite 318. Your draw is two vials with a licensed phlebotomist, and results follow in the app within 4 to 5 business days.",
    photoAlt: "Street view of Arlington, TX blood testing fair location",
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
      "Healiam sets up at Rahway Pharmacy on Irving Street, a few minutes' walk from the NJ Transit station. Come for one preventive panel covering blood count, thyroid, cholesterol, kidneys and more, with no referral needed.",
    parking:
      "Street parking on Irving Street is free, and there's a public lot a block to the east. By train, it's a short walk from Rahway station. The entrance is at street level and step-free.",
    venueNote:
      "The draw happens inside Rahway Pharmacy, in a private space with a licensed phlebotomist. Two vials, a few minutes, and you're back on Irving Street; results reach the app in 4 to 5 business days.",
    nearbyTowns: ["Linden", "Clark", "Carteret", "Roselle", "Woodbridge", "Cranford", "Garwood", "Roselle Park"],
    photoAlt: "Street view of Rahway, NJ blood testing fair location",
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
      "A preventive blood testing morning on Irving Street in Denver's Berkeley neighborhood. The panel takes in thyroid, kidney, iron, Vitamin D, HbA1c and a full blood count, and there's no doctor's order or insurance involved.",
    parking:
      "The lot right next to the building is free. ADA spaces are the ones closest to the main entrance.",
    venueNote:
      "Healiam's licensed phlebotomists run the Denver fair at 3955 Irving St. Expect two vials and a few minutes in a private setting; results show up in your app 4 to 5 business days afterwards.",
    nearbyTowns: ["Edgewater", "Wheat Ridge", "Arvada", "Westminster", "Lakewood", "Commerce City", "Federal Heights"],
    streetView: { pano: "5xH2ktceGjdc3HxNCcK7jg", heading: 177.85 },
    photoAlt: "Street view of 3955 Irving St, Denver, CO",
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
      "Healiam's south-metro fair, held at the Centennial Public Works building on South Eagle Street. One panel checks your blood count, thyroid, kidneys, iron and more, with no referral or insurance to sort out first.",
    parking:
      "Use the free lot in front of the building. Accessible spaces sit closest to the door.",
    venueNote:
      "The draw takes place inside the Public Works building with a licensed phlebotomist: two vials, then you're on your way. Your report follows in the app 4 to 5 business days later.",
    streetView: { pano: "G_NtunpMcU52YxXg6_WF4w", heading: 86.15 },
    photoAlt: "City of Centennial Public Works building",
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
      "Healiam's Georgia fair, on Longleaf Blvd in Lawrenceville, the Gwinnett County seat. Book a preventive panel covering blood count, thyroid, kidney, liver, iron and Vitamin D, without a doctor's order.",
    parking:
      "Parking on site costs nothing, and the ADA-accessible spaces are right by the entrance.",
    venueNote:
      "Licensed phlebotomists handle every draw at 755 Longleaf Blvd. It's two vials in a private setting, and the report lands in your Healiam app 4 to 5 business days on.",
    nearbyTowns: ["Grayson", "Snellville"],
    photoAlt: "Street view of Lawrenceville, GA blood testing fair location",
  },
];

/** "Texas, New Jersey, Colorado and Georgia" style list of states with an upcoming fair. */
export function fairStatesList(list: readonly Fair[] = fairs): string {
  const states = [...new Set(list.map((f) => f.state))];
  return states.length < 2 ? (states[0] ?? "") : `${states.slice(0, -1).join(", ")} and ${states[states.length - 1]}`;
}
