// Content for /locations/colorado, keyword "blood testing in Colorado".
// Design: the Texas page's sections, in the Texas order, unchanged (owner, 31 Oct 2026).
// Content: Colorado's own, written as an availability and booking guide: where Healiam tests in
// Colorado right now (Denver metro only), how to book, how to prepare, and the altitude note.
// Dates, venues and parking come from lib/fairs.ts. See docs/LOCATION-PAGES-AUDIT.md.

import { site } from "@/lib/site";
import { fairs, fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

export const coloradoFairs = fairs.filter((f) => f.region === "CO");

const [firstFair, lastFair] = [coloradoFairs[0], coloradoFairs[coloradoFairs.length - 1]];
const daysApart =
  firstFair && lastFair ? Math.round((Date.parse(lastFair.date) - Date.parse(firstFair.date)) / 86_400_000) : 0;

// "Denver Nov 14 · Centennial Nov 22"
const shortDates = coloradoFairs.map((f) => `${f.locality} ${f.dateLabel.replace(/^\w+,\s*|,\s*\d{4}$/g, "")}`).join(" · ");

export const colorado = {
  path: "/locations/colorado",
  // Client's SEO sheet: primary "blood testing in Colorado"; secondary "blood tests in Colorado",
  // "blood testing appointments Colorado", "blood testing near Denver".
  keyword: "blood testing in Colorado",
  meta: {
    title: `Blood Testing in Colorado for ${price} | Denver Metro | Healiam`,
    description: `Blood testing in Colorado for ${price} at Healiam fairs near Denver and in Centennial. One ${price} screening panel with every test included, no referral or insurance.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Booking", href: "#how-it-works" },
    { label: "Colorado fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Colorado" },
  ],

  hero: {
    titleLead: "Your complete blood test in Colorado for",
    titleAccent: price,
    sub: `Healiam tests at scheduled fairs in the Denver metro rather than a walk-in lab. Here's what the ${price} panel covers, and how to book a draw without a doctor's order or insurance.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See Colorado fairs", href: "#locations" },
    ticks: ["Denver and Centennial", "Results in 4 to 5 days", "No referral or insurance"],
  },

  // Hero phone mockup. Illustrative sample only (labelled "Sample"), not a real customer, and
  // deliberately different markers from the Texas mockup. pos = dot on a low | normal | high bar.
  heroVisual: {
    // The state in bold on the trend card, as on the city pages (owner, 6 Nov 2026).
    place: "Colorado",
    ariaLabel:
      "Sample Healiam results screen: iron flagged low, hemoglobin, TSH, HDL and Vitamin D in range, with a results-ready alert and a TSH trend falling into range over three tests.",
    screen: {
      title: "Results",
      sub: "Colorado · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Iron", "CBC", "Lipids"],
      rows: [
        { name: "Iron", value: "48", unit: "µg/dL", low: true, pos: 14 },
        { name: "Hemoglobin", value: "15.1", unit: "g/dL", low: false, pos: 56 },
        { name: "TSH", value: "1.8", unit: "mIU/L", low: false, pos: 44 },
        { name: "HDL", value: "58", unit: "mg/dL", low: false, pos: 52 },
        { name: "Vitamin D", value: "32", unit: "ng/mL", low: false, pos: 40 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    trend: {
      name: "TSH",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "4.8" },
        { label: "Test 2", value: "3.1" },
        { label: "Test 3", value: "1.8" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "CreditCard", label: "Card or HSA accepted" },
  ],

  // Texas uses this section for pain points; Colorado uses it for the before-you-go checklist.
  challenges: {
    eyebrow: "Before you go",
    title: "Before your Colorado blood test",
    sub: "Six things that make a Colorado blood test go smoothly, from the night before to the draw.",
    items: [
      "Stop eating 8 to 12 hours before your draw",
      "Water is fine; skip coffee, juice and gum",
      "No hard workouts in the 24 hours before",
      "Arrive in good time for your slot",
      "Bring the app and a card or HSA card",
      "Two vials, about seven minutes",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See Colorado fairs", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why choose Healiam in Colorado",
    sub: "Six ways a Healiam fair in Colorado differs from getting blood tests through a clinic.",
    usualLabel: "Clinic route",
    oursLabel: "Healiam",
    badge: "CLIA-certified",
    note: "The bars are a rough side by side guide, not measurements. Clinic-route prices are what a US doctor visit plus lab fees typically cost.",
    factors: [
      {
        id: "day",
        tab: "Day",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "A weekday visit", note: "Many draw sites keep weekday hours, which can mean missing work.", level: 82 },
        ours: { value: "Your choice of fair", note: "Denver or Centennial, whichever suits you.", level: 14 },
        cta: { label: "See Colorado fairs", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "A provider visit plus lab fees, before any treatment.", level: 100 },
        ours: { value: price, note: "One flat price, the same at both Colorado dates.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "ordering",
        tab: "Ordering",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "An order from a doctor", note: "An appointment first, so the labs can be requested.", level: 80 },
        ours: { value: "Book it yourself", note: "Online in minutes. No order or prescription.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "scope",
        tab: "Scope",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "Only what's ordered", note: "A short panel can leave questions open.", level: 26 },
        ours: { value: `${labMeasurementCount} measurements`, note: "CBC through Vitamin D, from two vials.", level: 100 },
        cta: { label: "See the full list", href: "#panel" },
      },
      {
        id: "records",
        tab: "Records",
        icon: "ChartLine",
        bar: "Effort to track changes",
        usual: { value: "Scattered reports", note: "Each clinic or lab keeps its own copy of your results.", level: 78 },
        ours: { value: "One app, with trends", note: "A graph for every marker each time you retest, plus a PDF.", level: 20 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "payment",
        tab: "Payment",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Claims and deductibles", note: "Coverage checks before, statements after.", level: 84 },
        ours: { value: "Card or HSA card", note: "No insurance claim to file.", level: 12 },
        cta: { label: "Book with card or HSA", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Booking",
    title: "Book a Colorado blood test in four steps",
    sub: "Blood testing appointments in Colorado take a few minutes, online or in the Healiam app.",
    steps: [
      { title: "Create an account", sub: "In the app or online" },
      { title: "Add who's tested", sub: "You or your family" },
      { title: "Choose a date", sub: "Denver or Centennial" },
      { title: "Pay by card or HSA", sub: `${price}, nothing added later` },
    ],
    tip: "Fast for 8 to 12 hours before your draw; water is fine. Booking ahead holds your time.",
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the walkthrough", href: site.links.demo },
    },
  },

  benefits: {
    eyebrow: "After your draw",
    title: "Your Colorado results, 4 to 5 business days later",
    sub: "What arrives after a draw in Colorado, including a note on reading results at altitude.",
    items: [
      { icon: "Smartphone", title: "Results in the app", line: "Each marker shown against its reference range." },
      { icon: "FileDown", title: "A PDF for your doctor", line: "Download the report and share it in one tap." },
      { icon: "ChartLine", title: "Trends when you retest", line: "Every marker builds its own graph over time." },
      { icon: "Lock", title: "Kept private", line: "Never shared with an employer or any third party." },
      { icon: "Gauge", title: "Flags at a glance", line: "Out-of-range markers are easy to spot." },
      { icon: "Users", title: "Family in one booking", line: "Add who's getting tested when you book." },
      { icon: "HeartPulse", title: "Biometrics alongside", line: "Log blood pressure and heart rate next to your labs." },
      { icon: "Mountain", title: "Read with altitude in mind", line: "Living high can raise hemoglobin; tell your doctor where you live." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: `One Colorado draw, ${labMeasurementCount} lab measurements`,
    sub: `The same panel runs at every Colorado date: ${labMeasurementCount} lab measurements across ${labCategoryCount} categories, plus biometrics you log yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Colorado dates",
      line: site.price.panelLine,
      compare: "Clinic route: $100 to $800+ for a visit plus labs",
      fine: "Pay by card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Current Colorado dates",
    title: "Colorado fair locations",
    sub: `Denver suits the north and west suburbs, Centennial the south metro, and the two are ${daysApart} days apart. These are the only Colorado dates on the schedule right now.`,
    fairs: coloradoFairs,
    hours: fairHours,
    noFair: {
      title: "Elsewhere in Colorado?",
      line: "Nothing yet in Colorado Springs, Boulder, Fort Collins, Pueblo or the Western Slope. Tell us your town.",
      cta: { label: "Ask for a date", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "All upcoming fairs", href: site.links.fairs },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Colorado results, straight to the app",
    sub: "Free on iPhone and Android. Get it ready before you drive to Denver or Centennial.",
    // No bullet points: the codes sit centred under the heading (client, 2 Nov 2026).
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Colorado, three about Healiam's own fairs in the state (client, 1 Nov 2026). Generic brand
  // questions (what is Healiam, labs, privacy) belong on the home page, not here (owner, 3 Nov 2026).
  faq: {
    eyebrow: "Colorado questions",
    title: "Blood testing in Colorado, answered",
    sub: "Coloradans ask about altitude, the two metro fairs and how booking works. Here are the answers.",
    items: [
      {
        q: "Can I get blood tests in Colorado outside the Denver metro?",
        a: `Not at the moment. Healiam's current Colorado dates are in Denver and Centennial. ${link("Send us your town", site.links.contact)} and we will let you know if a date is planned nearby.`,
      },
      {
        q: "What's the process for a blood testing appointment in Colorado?",
        a: `Pick ${link("Denver or Centennial", "#locations")}, reserve a time ${link("online", book)} or in the ${link("Healiam app", "#app")} with a free account, and pay ${price} by card or HSA card.`,
      },
      {
        q: "Does living at altitude in Colorado change my results?",
        a: "It can. People who live at higher elevations tend to have higher hemoglobin and hematocrit, because the body makes more red blood cells when there is less oxygen. Mention where you live when you review those two markers with your doctor.",
      },
      {
        q: "Which Colorado fair is closer to me?",
        a: `Denver tends to suit the north and west suburbs, Centennial the south metro. The ${link("Denver", "/locations/colorado/denver")} and ${link("Aurora", "/locations/colorado/aurora")} pages show distances.`,
      },
      {
        q: "What should I bring to a Colorado fair?",
        a: "Your phone with the Healiam app and a card or HSA card. Fast for 8 to 12 hours first; water is fine.",
      },
      {
        q: "Is Healiam's Centennial date any different from Denver?",
        a: `No. Same panel, same ${price} price and the same licensed phlebotomists. Only the place and the date differ, so choose whichever suits you.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Choose your Colorado fair",
    sub: `Pick Denver or Centennial, Colorado, fast overnight, and see all ${labMeasurementCount} lab results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  // Colorado city pages, listed just above the other-states section (owner, 6 Nov 2026). Every city
  // page in the state shows here automatically, from lib/fairs.ts and lib/city-pages.ts.
  cityLinks: {
    eyebrow: "Colorado cities",
    title: "Blood testing by Colorado city",
    sub: "Denver and nearby Aurora, each with its own page and the distance to the fairs.",
    region: "CO",
  },

  // Last section: fairs in every other state (client, 2 Nov 2026). Links come from lib/fairs.ts.
  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs outside Colorado",
    sub: "Booking for someone outside Colorado? Healiam runs the same panel in these states too.",
    linkLead: "Blood testing in",
    exclude: "Colorado",
  },

  sticky: {
    label: "Blood testing in Colorado",
    sub: `${price} · every test included`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
