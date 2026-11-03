// Content for the healiam.com homepage. Components only lay this out.
// Facts come from healiam.com (home, tests, fairs, FAQ, employer and about pages).
// House style: US English, no em or en dashes, no invented numbers.

import { site } from "@/lib/site";
import { fairs } from "@/lib/fairs";

const price = site.price.display;
const book = site.bookingUrl;

export const home = {
  path: "/",
  meta: {
    title: `Preventive Blood Test for ${price} | 50+ Markers | Healiam`,
    description: `One preventive blood panel for ${price}: 50+ markers incl. thyroid, cholesterol, Vitamin D and HbA1c. No referral or insurance. Results in 4 to 5 days.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Health fairs", href: "#fairs" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    eyebrow: "The future of wellness",
    // Two accent words, matching the approved design.
    titleParts: [
      { text: "80% of medical ", accent: false },
      { text: "decisions", accent: true },
      { text: " start with your ", accent: false },
      { text: "blood.", accent: true },
    ],
    // One paragraph, not two. The marker list and the lab detail live on /tests.
    sub: `Affordable preventive blood testing with no doctor's referral and no insurance required. One ${price} panel, 50+ markers, CLIA-certified results in 4 to 5 business days.`,
    watch: { label: "See how it works", href: "#how-it-works" },
    // short: the label used on phones, where both buttons share one row.
    primary: { label: "Book an appointment", short: "Book now", href: book },
    // The two store icons sit in the button instead of a generic download glyph, so it is
    // obvious at a glance that the app is on both stores.
    secondary: {
      label: "Download the Healiam app",
      short: "Get the app",
      href: "#app",
      icons: [
        { src: "/badges/app-store-icon.png", alt: "App Store" },
        { src: "/badges/google-play-icon.png", alt: "Google Play" },
      ],
    },
  },

  // Hero phones. Illustrative sample only (labelled "Sample"), not a real customer.
  heroPhones: {
    ariaLabel:
      "Three Healiam app screens: a results list with Vitamin D flagged low, a Vitamin D trend graph rising back into range, and a booking screen listing nearby health fairs.",
    results: {
      title: "Results",
      sub: "Sample · 50+ markers",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Thyroid", "Lipids"],
      rows: [
        { name: "Vitamin D", value: "18", unit: "ng/mL", low: true, pos: 12 },
        { name: "TSH", value: "2.1", unit: "mIU/L", low: false, pos: 48 },
        { name: "HbA1c", value: "5.2", unit: "%", low: false, pos: 42 },
        { name: "LDL", value: "92", unit: "mg/dL", low: false, pos: 55 },
        { name: "Hemoglobin", value: "14.6", unit: "g/dL", low: false, pos: 52 },
      ],
    },
    graph: {
      title: "Vitamin D",
      sub: "Last 3 draws",
      chip: "Back in range",
      points: [
        { label: "Mar", value: "18" },
        { label: "Jul", value: "27" },
        { label: "Nov", value: "41" },
      ],
    },
    // Fairs come straight from lib/fairs.ts, so this screen never shows a stale date.
    booking: {
      title: "Book a visit",
      sub: "Upcoming health fairs",
      note: "New fairs are added every month, so check back for a date near you.",
    },
  },

  trust: [
    // Short enough to hold one line each in the two-up strip on a 375px phone.
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "Microscope", label: "FDA-approved equipment" },
    { icon: "Users", label: "3,000+ families served" },
  ],

  why: {
    eyebrow: "Why Healiam",
    title: "Know where you stand, without the runaround",
    sub: "Most people skip bloodwork because of referrals, insurance and a bill nobody can predict up front. Healiam removes all three.",
    reasons: [
      {
        icon: "CircleDollarSign",
        title: "One flat price",
        line: `${price} covers the whole panel. No copay, no deductible, no surprise bill weeks later.`,
      },
      {
        icon: "Stethoscope",
        title: "No referral needed",
        line: "Book it yourself online. You do not need to see a primary care doctor first.",
      },
      {
        icon: "FileCheck",
        title: "Results your doctor can use",
        line: "CLIA-certified partner labs, with a PDF report you can share at your next visit.",
      },
      {
        icon: "MapPin",
        title: "A fair near you",
        line: "Morning health fairs in your area, so you can test before work and still be fasting.",
      },
    ],
    // Side by side, line for line, so the two routes answer the same questions in the same
    // order. The hospital figures are Healiam's own published comparison, not our estimate.
    // Healiam's own video, from youtube.com/@healiam_co. The poster is a frame from it,
    // saved locally so the page makes no Google request until someone presses play.
    video: {
      id: "XxLR2IzRDdA",
      poster: "/video/healiam-intro.jpg",
      label: "Play the Healiam video",
    },

    compare: {
      eyebrow: "What it costs",
      title: "The same bloodwork, two very different bills",
      sub: "The hospital route charges you twice before anyone reads a result: once to get the order, once for the tests themselves. Neither number is posted up front.",
      usual: { label: "Typical hospital route", note: "Billed separately, after the fact." },
      ours: { label: "Healiam", note: "One charge, on the day you book." },
      // Kept short on purpose: all three columns have to read on a 375px phone.
      rows: [
        {
          step: "The order",
          usual: { line: "Provider visit first", value: "$50 to $500" },
          ours: { line: "Not needed", value: "Included" },
        },
        {
          step: "The tests",
          usual: { line: "Only what they order", value: "$50 to $600+" },
          ours: { line: "50+ markers", value: "Included" },
        },
        {
          step: "Paying",
          usual: { line: "Copay and deductible", value: "Varies" },
          ours: { line: "Card or HSA", value: "Same price" },
        },
      ],
      totalLabel: "Total",
      totalNote: "Before any treatment begins.",
      usualTotal: "$100 to $800+",
      oursTotal: price,
      // Healiam's own line, from healiam.com.
      kicker: "Your money goes toward getting cured, not toward getting diagnosed.",
      cta: { label: `Book for ${price}`, href: book },
      source: "Hospital route figures as published on healiam.com.",
    },
  },

  // The panel, as healiam.com presents it: six named groups with their own line-art icons
  // (saved to public/panel/), and a link out for the full list. Icons ship black, so the
  // dark band whitens them with .icon-white.
  panel: {
    eyebrow: "Comprehensive panel",
    titleParts: [
      { text: "One panel. ", accent: false },
      { text: "Everything you need.", accent: true },
    ],
    items: [
      { name: "CBC", icon: "/panel/cbc.png" },
      { name: "Thyroid", icon: "/panel/thyroid.png" },
      { name: "Kidney", icon: "/panel/kidney.png" },
      { name: "Vitamin D", icon: "/panel/vitamin-d.png" },
      { name: "Iron", icon: "/panel/iron.png" },
      { name: "HbA1c", icon: "/panel/hba1c.png" },
    ],
    cta: { label: "View all tests", href: site.links.tests },
  },

  howItWorks: {
    eyebrow: "Three steps",
    title: "How it works",
    steps: [
      { icon: "CalendarCheck", title: "Book in two minutes", line: "Pick a health fair near you and claim a morning slot online." },
      { icon: "Syringe", title: "Give two vials", line: "A licensed phlebotomist draws your sample in under seven minutes, after an 8 to 12 hour fast." },
      { icon: "Smartphone", title: "Read your results", line: "Every marker with its range and trend in the Healiam app, in 4 to 5 business days." },
    ],
    cta: {
      primary: { label: "Book my visit", href: book },
      secondary: { label: "Try the app demo", href: site.links.demo },
    },
  },

  // The app. Every claim here comes from the two store listings (checked 29 Oct 2026):
  // "over 50 tests without the need for a doctor's order or insurance" and
  // "fast, accurate, certified and historically traceable blood tests".
  app: {
    eyebrow: "The Healiam app",
    title: "Your results live in your pocket",
    sub: "Free on iPhone and Android.",
    // One line each on a phone. The long version of all this is the section above.
    points: [
      "All 50+ results, each against its range.",
      "Every panel kept, so you can see the trend.",
      "Book your next one, no order or insurance.",
    ],
    scanNote: "Point your phone camera at a code, or tap a badge.",
    stores: [
      {
        name: "App Store",
        caption: "iPhone",
        href: site.app.appStore,
        qr: "/qr/app-store.svg",
        badge: { src: "/badges/app-store.svg", alt: "Download on the App Store", width: 540, height: 160 },
      },
      {
        name: "Google Play",
        caption: "Android",
        href: site.app.playStore,
        qr: "/qr/google-play.svg",
        badge: { src: "/badges/google-play.svg", alt: "Get it on Google Play", width: 239, height: 71 },
      },
    ],
  },

  story: {
    eyebrow: "Client story",
    title: "One panel found what months of visits missed",
    beats: [
      {
        icon: "CircleAlert",
        label: "The struggle",
        text: "Months of fatigue, brain fog and low mood. Each doctor visit ended with a new theory or another referral.",
      },
      {
        icon: "Receipt",
        label: "The cost",
        text: "Specialist visits, narrow tests and mounting bills, still without a clear answer.",
      },
      {
        icon: "Lightbulb",
        label: "The answer",
        text: "One Healiam panel showed a severe Vitamin D deficiency. With a simple supplement, she felt like herself again within weeks.",
      },
    ],
    quote:
      "I spent months and hundreds of dollars going back and forth with doctors. One Healiam test gave me the full picture in days.",
    author: "Healiam client",
    fine: "Individual results vary. Share your results with your doctor before making changes.",
  },

  fairs: {
    eyebrow: "Health fairs",
    title: "Find a health fair near you",
    sub: "Fairs run 8:00 to 10:00 AM with licensed phlebotomists, so you can test while you are still fasting. Walk-ins welcome.",
    list: fairs,
    noFair: {
      title: "No fair nearby?",
      line: "We add new fairs every month. Tell us where you need one and we will let you know when it is booked.",
      cta: { label: "Request a fair near you", href: site.links.contact },
    },
    cta: {
      primary: { label: "Book a fair visit", href: book },
      secondary: { label: "See all fairs", href: site.links.fairs },
    },
  },

  employers: {
    eyebrow: "For employers",
    title: "Give your team preventive blood testing",
    line: "Add Healiam to your benefits package to help employees catch health issues early and feel looked after at work.",
    cta: { label: "Healiam for employers", href: site.links.employer },
  },

  // The six questions healiam.com asks, in its own words. Only two edits: the price comes
  // from site.price so it reads $95, and the at-home sentence is gone because we do not
  // offer at-home draws (owner, 29 Oct 2026).
  faq: {
    eyebrow: "Questions",
    title: "Frequently asked",
    items: [
      {
        q: "What is Healiam?",
        a: `Healiam runs morning health fairs where a licensed phlebotomist draws two vials for a 50+ marker preventive panel, for ${price} with no referral or insurance. Results arrive in the Healiam app in 4 to 5 business days.`,
      },
      {
        q: "How much does a test cost?",
        a: `We charge ${price} for our panel.`,
      },
      {
        q: "Do you accept insurance?",
        a: "We accept regular credit cards or HSA cards. Our tests are cheaper than many insurance plans' co-pays on hospital panels.",
      },
      {
        q: "Can my doctor use these results?",
        a: "Yes, they can. Our partner labs are CLIA certified, so your doctor will accept them.",
      },
      {
        q: "What labs do you use?",
        a: "We take your samples to Rocky Mountain Labs and Bhoomi Ventures. They are both CLIA certified, and use FDA approved machinery.",
      },
      {
        q: "Is fasting required?",
        a: "Yes, anywhere from 8-12 hours. See our tests page for more information.",
      },
      {
        q: "What is your privacy policy?",
        a: "Our partner labs adhere to strict HIPAA compliance standards as do we, ensuring that your data is protected both in transit and at rest. We do not share any information about yourself or your results with any third party.",
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: `Book your ${price} blood panel`,
    sub: "Pick a health fair near you, fast overnight, and read your results in the app within 4 to 5 business days.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: `${price} full blood panel`,
    sub: "50+ markers, no referral",
    cta: { label: "Book now", href: book },
  },
} as const;
