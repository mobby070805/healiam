// Content for /about, from https://healiam.com/about.
// Bios are Healiam's own words, lightly tightened. No invented credentials.

import { site } from "@/lib/site";
import { labMeasurementCount } from "@/lib/panel";

const price = site.price.display;
const book = site.bookingUrl;

export const about = {
  path: "/about",
  meta: {
    title: "About Healiam | Preventive Blood Testing Without the Runaround",
    description:
      "Healiam makes preventive blood testing affordable and accessible: one comprehensive panel, no referral and no insurance. Meet the team and read what we are building.",
  },
  nav: [
    { label: "The team", href: "#team" },
    { label: "Our mission", href: "#mission" },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "About" }],

  hero: {
    eyebrow: "Who we are",
    titleParts: [
      { text: "Building a ", accent: false },
      { text: "better way", accent: true },
      { text: " to check your health", accent: false },
    ],
    sub: "Ditch the long waits at the doctor's office, the copays and deductibles, and the bill that turns up weeks later. One panel, one price, no referral.",
    primary: { label: `Book for ${price}`, short: "Book now", href: book },
    secondary: { label: "See what's tested", href: site.links.tests },
  },

  team: {
    eyebrow: "Leadership",
    title: "Meet the team",
    sub: "Two founders, one between lab operations and software.",
    members: [
      {
        name: "Ram Krishnamoorthy",
        role: "Founder and CEO",
        photo: "/team/ram.jpg",
        lead: "Ram leads Healiam with a mission to make preventive healthcare accessible and affordable for everyone.",
        body: "He brings 30+ years across the financial and healthcare industries and is currently a Principal Architect at DaVita, with deep expertise in lab operations and the systems behind them. He is also a serial entrepreneur, having founded ventures such as GetACab in 2009, ahead of the ride-sharing wave.",
        facts: [] as readonly string[],
      },
      {
        name: "Sainath Ganesh",
        role: "Co-Founder",
        photo: "/team/sainath.jpg",
        lead: "Sainath is a software engineer with 5+ years building scalable systems and AI-driven products.",
        body: "He holds a Master's in Computer Science from the University of Illinois, and leads technology, cloud architecture and strategy at Healiam.",
        facts: [
          "20x hackathon winner",
          "Speaker at the UC Berkeley AI Summit",
          "Recognized by PM Narendra Modi for his innovative projects",
        ],
      },
    ],
  },

  mission: {
    eyebrow: "Our purpose",
    title: "Our mission",
    body: "We believe everyone deserves affordable, comprehensive blood testing without the barriers of insurance requirements or doctor's referrals. We are committed to democratizing healthcare by making preventive health monitoring accessible to all.",
    stats: [
      { value: "3,000+", label: "families served" },
      { value: `${labMeasurementCount}`, label: "measurements in one panel" },
      { value: price, label: "flat price, no insurance" },
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
