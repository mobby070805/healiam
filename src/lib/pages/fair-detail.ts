// Shared content for every /fairs/<slug> page. The fair-specific parts (intro, parking,
// venue note, address, date) live on the fair itself in lib/fairs.ts.

import { site } from "@/lib/site";
import { fairHours, type Fair } from "@/lib/fairs";
import { labMeasurementCount } from "@/lib/panel";

const price = site.price.display;

export const fairDetail = {
  nav: [
    { label: "Getting there", href: "#directions" },
    { label: "What to expect", href: "#expect" },
    { label: "All fairs", href: "/fairs" },
  ],

  meta: (fair: Fair) => ({
    title: `Blood Testing Fair in ${fair.city} | ${fair.dateLabel} | Healiam`,
    description: `Healiam preventive blood testing fair in ${fair.city} on ${fair.dateLabel}, ${fairHours.label}. A ${price} panel with ${labMeasurementCount} measurements, no referral or insurance. ${fair.venue ? `${fair.venue}, ` : ""}${fair.street}.`,
  }),

  breadcrumb: (fair: Fair) => [
    { name: "Home", href: "/" },
    { name: "Fairs", href: "/fairs" },
    { name: fair.city },
  ],

  hero: {
    eyebrow: "Health fair",
    // One primary action and one secondary. "Get directions" belongs beside the address,
    // not as a third button of equal weight in the hero.
    primary: { label: `Book for ${price}`, short: "Book now", href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  when: {
    label: "Dates and hours",
    hoursLabel: "Hours",
    dateLabel: "Date",
    walkIn: "Walk-ins welcome. Booking a slot just means less waiting.",
  },

  directions: {
    eyebrow: "Getting there",
    title: "How to find us",
    locationLabel: "Location",
    mapsLabel: "Open in Google Maps",
    parkingLabel: "Parking",
  },

  expect: {
    eyebrow: "What to expect",
    title: "On the day",
    venueLabel: "The venue",
    bringLabel: "What to bring",
    bring: [
      "Your phone with the Healiam app installed",
      "A credit card or HSA card, no insurance needed",
      "An empty stomach: fast 8 to 12 hours, water is fine",
    ],
    panelLabel: "What's measured",
    panelLine: `${labMeasurementCount} measurements from two vials, across ${"11"} categories.`,
    panelCta: { label: "See every marker", href: site.links.tests },
  },

  otherFairs: {
    title: "Other upcoming fairs",
    cta: { label: "See all fairs", href: "/fairs" },
  },

  finalCta: {
    title: "Blood testing made easy",
    sub: `No insurance and no prescription. One ${price} panel, ${labMeasurementCount} measurements, results in the app in 4 to 5 business days.`,
    primary: { label: `Book for ${price}`, href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: (fair: Fair) => ({
    label: `${fair.city}, ${fair.dateLabel.replace(/^\w+,\s*/, "")}`,
    sub: `${fairHours.label} · ${price}`,
    cta: { label: "Book now", href: site.bookingUrl },
  }),
} as const;
