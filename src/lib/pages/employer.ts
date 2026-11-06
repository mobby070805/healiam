// Content for /employer, from https://healiam.com/employer.
// Their four benefit themes are kept; the prose is cut to something a busy HR lead can scan,
// and the page gains what the original was missing: how a workplace fair actually runs,
// what it costs, and a way to start one. No invented minimums, tiers or billing terms.

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { labMeasurementCount } from "@/lib/panel";

const price = site.price.display;
const hostSubject = encodeURIComponent("Healiam health fair for our team");
const hostMail = `mailto:${site.email}?subject=${hostSubject}`;

export const employer = {
  path: "/employer",
  meta: {
    title: "Preventive Blood Testing for Your Team | Healiam for Employers",
    description: `Bring a Healiam health fair to your workplace. One ${price} screening panel per person with every test included, licensed phlebotomists on site, no insurance and no referral.`,
  },
  nav: [
    { label: "Why it works", href: "#benefits" },
    { label: "How it runs", href: "#how" },
    { label: "What it costs", href: "#cost" },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "For employers" }],

  hero: {
    eyebrow: "For employers",
    titleParts: [
      { text: "Why choose ", accent: false },
      { text: "Healiam", accent: true },
      { text: " for your team?", accent: false },
    ],
    sub: "The strength of any organization is its people, and their health shows up directly in your business outcomes. We bring preventive blood testing to your workplace, with no insurance and no referrals to arrange.",
    primary: { label: "Talk to us about your team", short: "Talk to us", href: hostMail },
    secondary: { label: "See what's tested", href: site.links.tests },
  },

  benefits: {
    eyebrow: "Benefits",
    title: "Here's why",
    sub: "Four reasons employers put preventive screening in front of their teams.",
    items: [
      {
        icon: "TrendingUp",
        title: "Enhanced productivity",
        line: "A problem caught early rarely becomes a sick week. Preventive screening addresses health issues before they escalate, so your team stays focused on the work.",
      },
      {
        icon: "HeartHandshake",
        title: "Elevated morale",
        line: "A good workplace covers mental and emotional health, not just physical. Offering preventive health says plainly that you take your team's wellbeing seriously.",
      },
      {
        icon: "UserCheck",
        title: "Reduced attrition",
        line: "Turnover costs money, knowledge and momentum. Investing in your team's health builds the kind of loyalty that keeps good people where they are.",
      },
      {
        icon: "ThumbsUp",
        title: "Happier, healthier people",
        line: "People manage their health better when they can actually see their numbers. The app keeps every panel and its history, so progress is visible.",
      },
    ],
    closing:
      "Putting Healiam in your benefits package does more than add a service. It puts wellness at the centre of how your organization works.",
  },

  how: {
    eyebrow: "How it runs",
    title: "A fair at your workplace",
    sub: "A morning, a room and licensed phlebotomists. You do not need to be a clinic.",
    steps: [
      {
        icon: "Mail",
        title: "Tell us the basics",
        line: "Where you are and roughly how many people are interested. We take it from there.",
      },
      {
        icon: "CalendarCheck",
        title: "We agree a date",
        line: `Fairs run ${fairHours.label}, so your team can test before work while they are still fasting.`,
      },
      {
        icon: "Syringe",
        title: "We come to you",
        line: "Licensed phlebotomists set up on site. Two vials each, about seven minutes per person.",
      },
      {
        icon: "Smartphone",
        title: "Results go to them",
        line: "Every result lands in each person's own app in 4 to 5 business days. You never see their data.",
      },
    ],
    privacyNote:
      "Results belong to the individual, not the employer. We and our partner labs follow HIPAA standards, and no result is ever shared with you.",
  },

  cost: {
    eyebrow: "What it costs",
    title: "One price per person",
    sub: "No insurance to verify, no referrals to collect, no per-company setup fee.",
    price,
    priceLine: "per person, for the full panel",
    includes: [
      `${labMeasurementCount} lab measurements from one draw`,
      "Licensed phlebotomists on site",
      "CLIA-certified partner labs, FDA-approved equipment",
      "Results in the Healiam app in 4 to 5 business days",
    ],
    note: "How a workplace fair is billed is something we will agree with you directly.",
    cta: { label: "Talk to us about your team", href: hostMail },
    secondary: { label: "See every marker", href: site.links.tests },
  },

  finalCta: {
    title: "Bring preventive testing to your team",
    sub: `One ${price} panel per person with every test included, at your workplace.`,
    primary: { label: "Talk to us", href: hostMail },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },
} as const;
