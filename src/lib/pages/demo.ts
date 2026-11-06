// Content for /demo, from https://healiam.com/demo.
// Corrections against the live page: no at-home visits (we do not offer them), the panel
// is 50+ markers rather than "6+", and the price follows site.price.

import { site } from "@/lib/site";
import { labMeasurementCount } from "@/lib/panel";

const price = site.price.display;

export const demo = {
  path: "/demo",
  meta: {
    title: "See How Healiam Works | Interactive Walkthrough",
    description:
      "Walk through every stage of a Healiam blood test, from creating an account to reading your results. No download and no sign-up needed.",
  },
  nav: [
    { label: "The journey", href: "#journey" },
    { label: "What's tested", href: site.links.tests },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "Demo" }],

  hero: {
    eyebrow: "Interactive demo",
    titleParts: [
      { text: "Walk through the ", accent: false },
      { text: "Healiam experience", accent: true },
    ],
    sub: "Step through each stage of the blood testing process, start to finish.",
    note: "No download and no account. This is a guided preview of how a Healiam test actually goes.",
  },

  journey: {
    eyebrow: "The journey",
    title: "Eight stages, start to finish",
    hint: "Tap a stage, or use the arrows and arrow keys.",
    stages: [
      {
        key: "account",
        nav: "Create account",
        icon: "UserPlus",
        title: "Create your account",
        line: "Sign up in under a minute with your email and phone number. Your health data stays private and HIPAA protected.",
        facts: ["HIPAA compliant by default", "No referral needed", "Secure, encrypted storage"],
      },
      {
        key: "who",
        nav: "Who's tested",
        icon: "Users",
        title: "Add who's getting tested",
        line: "Test yourself, or add the people you look after. Profiles are saved, so booking the next round takes seconds.",
        facts: ["Test yourself or loved ones", "Family profiles saved for next time", "One checkout for everyone"],
      },
      {
        key: "schedule",
        nav: "Schedule",
        icon: "CalendarCheck",
        title: "Pick a time and place",
        line: "Choose a morning health fair near you and claim a slot. Fairs run early, so you can test while you are still fasting.",
        facts: ["Health fairs across several states", "Morning slots before work", "Same-week appointments"],
      },
      {
        key: "panel",
        nav: "Choose panel",
        icon: "ClipboardList",
        title: "Select your test panel",
        line: `One comprehensive panel with ${labMeasurementCount} measurements. There is nothing to configure and nothing extra to buy.`,
        facts: [`${labMeasurementCount} measurements in one panel`, `Transparent ${price} pricing`, "No a la carte upsells"],
      },
      {
        key: "payment",
        nav: "Payment",
        icon: "CreditCard",
        title: "Pay securely",
        line: "Pay by card or HSA at checkout. You see the full price before you confirm, and nothing is added later.",
        facts: ["Credit or HSA accepted", "No hidden fees", "Often less than a hospital copay"],
      },
      {
        key: "draw",
        nav: "Blood draw",
        icon: "Syringe",
        title: "Quick, painless draw",
        line: "A licensed phlebotomist takes two vials. Most people are in and out in under seven minutes.",
        facts: ["Two vials, about 7 minutes", "Licensed phlebotomists", "Painless and efficient"],
      },
      {
        key: "lab",
        nav: "Lab",
        icon: "FlaskConical",
        title: "Your sample goes to the lab",
        line: "Samples are processed by our CLIA-certified partner labs on FDA-approved equipment.",
        facts: ["CLIA-certified partner labs", "FDA-approved machinery", "Results in 4 to 5 business days"],
      },
      {
        key: "results",
        nav: "Results",
        icon: "LineChart",
        title: "Get your full results",
        line: "Every marker arrives in the app with the range it is measured against, and your history beside it.",
        facts: ["Clear reference ranges", "Shareable with your doctor", "Saved to your profile"],
      },
    ],
    prev: "Back",
    next: "Next",
  },

  finalCta: {
    title: "Ready to try it for real?",
    sub: `Book your ${price} panel, or download the app first and look around.`,
    primary: { label: `Book for ${price}`, href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },
} as const;

export type DemoStage = (typeof demo.journey.stages)[number];
