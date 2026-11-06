// Content for /fairs, from https://healiam.com/fairs.
// The fairs themselves come from lib/fairs.ts, so this page can never show a stale date.

import { site } from "@/lib/site";
import { fairs, fairHours, fairStatesList, type Fair } from "@/lib/fairs";

const price = site.price.display;
const book = site.bookingUrl;

/** Fairs grouped by state, in the order the states first appear. */
export function fairsByState(): readonly { readonly state: string; readonly list: readonly Fair[] }[] {
  const states = [...new Set(fairs.map((f) => f.state))];
  return states.map((state) => ({ state, list: fairs.filter((f) => f.state === state) }));
}

export const fairsPage = {
  path: "/fairs",
  meta: {
    title: "Blood Testing Fairs Near You | No Appointment Needed | Healiam",
    description: `Upcoming Healiam preventive blood testing fairs in ${fairStatesList()}. One ${price} screening panel with every test included, ${fairHours.label}, with no appointment, referral or insurance.`,
  },
  nav: [
    { label: "Upcoming fairs", href: "#upcoming" },
    { label: "How fairs work", href: "#community" },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "Fairs" }],

  hero: {
    eyebrow: "Health fairs",
    titleParts: [
      { text: "Find a blood testing ", accent: false },
      { text: "fair near you", accent: true },
    ],
    sub: "Stop by an upcoming Healiam health fair for an affordable, comprehensive preventive blood test panel. No appointment, referral or insurance required.",
    hours: `${fairHours.label}, every fair`,
    primary: { label: "Book an appointment", short: "Book now", href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  upcoming: {
    eyebrow: "Upcoming",
    title: "Where we are next",
    sub: (count: number) =>
      `${count} ${count === 1 ? "fair" : "fairs"} across ${fairStatesList()}. Book a slot to skip the wait.`,
    stateLine: (state: string) => `Upcoming blood testing fairs and blood drives in ${state}.`,
    detailsLabel: "View details",
    empty: "No fairs are scheduled right now. Tell us where you need one and we will let you know when it is booked.",
    emptyCta: { label: "Request a fair near you", href: site.links.contact },
  },

  community: {
    eyebrow: "Why fairs",
    title: "Bringing blood testing to your community",
    body: "Getting to a lab or a medical facility takes time most people do not have, so we bring the draw to places that are already easy to reach. Every fair is staffed by licensed phlebotomists, and your results arrive through our secure platform in 4 to 5 business days.",
    points: [
      { icon: "MapPin", title: "Close to home", line: "Pharmacies, offices and community buildings, not a hospital lab." },
      { icon: "Clock", title: "Before work", line: `${fairHours.label}, so you can test while you are still fasting.` },
      { icon: "UserCheck", title: "Licensed phlebotomists", line: "The same two vials and the same CLIA-certified labs, every time." },
      { icon: "Smartphone", title: "Results in the app", line: "Every marker with its range, 4 to 5 business days after your draw." },
    ],
  },

  finalCta: {
    title: "Blood testing made easy",
    sub: `One ${price} panel with every test included, and results in the app in 4 to 5 business days.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: `${price} health screening panel`,
    sub: "All tests in one panel",
    cta: { label: "Book now", href: book },
  },
} as const;
