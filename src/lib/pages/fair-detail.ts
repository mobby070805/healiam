// Shared labels for every /fairs/<slug> page. Everything a visitor reads as prose is per fair: intro,
// parking and venue note in lib/fairs.ts, headings, notes and the closing lines in lib/pages/fair-pages.ts.

import { site } from "@/lib/site";
import { fairHours, type Fair } from "@/lib/fairs";
import { fairPageCopy } from "@/lib/pages/fair-pages";

const price = site.price.display;

export const fairDetail = {
  nav: [
    { label: "Getting there", href: "#directions" },
    { label: "What to expect", href: "#expect" },
    { label: "All fairs", href: "/fairs" },
  ],

  meta: (fair: Fair) => ({
    title: `Blood Testing Fair in ${fair.city} | ${fair.dateLabel.replace(/^\w+,\s*/, "")} | Healiam`,
    description: `Healiam blood testing fair in ${fair.city}, ${fair.dateLabel}, ${fairHours.label}: one ${price} panel with every test included. ${fairPageCopy(fair.slug).metaLine}`,
  }),

  breadcrumb: (fair: Fair) => [
    { name: "Home", href: "/" },
    { name: "Fairs", href: "/fairs" },
    { name: fair.city },
  ],

  hero: {
    eyebrow: "Health fair",
    titleLead: "Blood testing fair in",
    // One primary action and one secondary. "Get directions" belongs beside the address,
    // not as a third button of equal weight in the hero.
    primary: { label: `Book for ${price}`, short: "Book now", href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  when: {
    label: "Dates and hours",
    hoursLabel: "Hours",
    dateLabel: "Date",
  },

  directions: {
    eyebrow: "Getting there",
    title: "How to find us",
    locationLabel: "Location",
    mapsLabel: "Open in Google Maps",
    parkingLabel: "Parking and access",
  },

  expect: {
    eyebrow: "What to expect",
    title: "On the day",
    venueLabel: "The venue",
    bringLabel: "What to bring",
    panelLabel: "What's measured",
    panelCta: { label: "See every marker", href: site.links.tests },
  },

  otherFairs: {
    title: "Other upcoming fairs",
    cta: { label: "See all fairs", href: "/fairs" },
  },

  finalCta: (fair: Fair) => ({
    ...fairPageCopy(fair.slug).finalCta,
    primary: { label: `Book for ${price}`, href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  }),

  sticky: (fair: Fair) => ({
    label: `${fair.city}, ${fair.dateLabel.replace(/^\w+,\s*/, "")}`,
    sub: `${fairHours.label} · ${price}`,
    cta: { label: "Book now", href: site.bookingUrl },
  }),
} as const;
