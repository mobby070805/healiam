// Content for /blog, the blog homepage (owner, 13 Nov 2026: redesign the blog in this site's design).
//
// The ten posts below are the client's own, published on healiam.com/blog between 8 and 24 Oct 2026.
// Titles, summaries, topics, dates and read times are copied word for word from that page; never
// remove or reword a client post. New posts go at the top of `posts` (newest first).
//
// `href`: the client posts still live on healiam.com's current blog, so their cards open there for
// now. When a post is rebuilt on this site at /blog/<slug> (same slug, so old links keep working),
// change its href to that path. Every client post must be rebuilt here before this site replaces
// healiam.com, or these links will break on launch.

import { site } from "@/lib/site";

const price = site.price.display;
const book = site.bookingUrl;
const live = (slug: string) => `https://healiam.com/blog/${slug}`;

// Topics as the client's blog names them. Order is the filter order.
export const blogTopics = ["Markers explained", "Preventive health", "Cost and access", "The panel"] as const;
export type BlogTopic = (typeof blogTopics)[number];

export type BlogPost = {
  readonly slug: string;
  readonly href: string;
  readonly title: string;
  readonly excerpt: string;
  readonly topic: BlogTopic;
  /** ISO date, as published. */
  readonly date: string;
  readonly readMinutes: number;
  /**
   * Banner image, for posts we write (owner, 13 Nov 2026). One per post, landscape, about 1600x900,
   * saved in /public/blog/. The client's posts have none and show as text-only cards.
   */
  readonly banner?: { readonly src: string; readonly alt: string };
  /** Who wrote it. The client posts are signed "Healiam"; a name in authorProfiles gets a profile. */
  readonly author: string;
};

export type AuthorProfile = {
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  /** Square photo, shown cropped to a circle (public/authors/). Initials show when there is none. */
  readonly photo?: string;
  readonly bio: string;
  readonly linkedin: string;
  readonly website: string;
};

/** Writers of the posts we write (owner, 13 Nov 2026). Posts signed "Healiam" have no profile. */
export const authorProfiles: Readonly<Record<string, AuthorProfile>> = {
  "Madhesh G": {
    name: "Madhesh G",
    role: "SEO Specialist",
    initials: "MG",
    photo: "/authors/madhesh.jpg",
    bio: "Madhesh G is an SEO Specialist at Rule The Top who covers lab testing for Healiam, from test prices and HSA rules to preparing for a blood draw. Every guide is built from official sources such as the IRS, CMS and MedlinePlus.",
    linkedin: "https://www.linkedin.com/in/mobby7805/",
    website: "https://rulethetop.com/author/madhesh",
  },
};

export const authorProfile = (post: BlogPost): AuthorProfile | undefined => authorProfiles[post.author];

export const posts: readonly BlogPost[] = [
  // Posts we write (newest first). Full text in lib/blog/articles.ts.
  {
    slug: "health-fair-blood-test-what-to-expect",
    href: "/blog/health-fair-blood-test-what-to-expect",
    title: "Health Fair Blood Screening: What to Expect and What’s Tested",
    excerpt:
      "First time at a health fair blood test? Booking, fasting, the seven-minute draw, the 56 lab results you get back, and how far to trust them.",
    topic: "The panel",
    date: "2026-11-14",
    readMinutes: 6,
    author: "Madhesh G",
    banner: {
      src: "/blog/health-fair-blood-test-what-to-expect.jpg",
      alt: "A Healiam health fair booking ticket for a morning slot, two blood collection tubes, a phone showing results arriving, and a tag reading “About 7 min”.",
    },
  },
  {
    slug: "hsa-fsa-blood-tests",
    href: "/blog/hsa-fsa-blood-tests",
    title: "Can You Use HSA or FSA for Blood Tests?",
    excerpt:
      "Blood work usually qualifies, symptoms or not. What the IRS rules say, which receipt to keep, and how to spend FSA money before your plan year ends.",
    topic: "Cost and access",
    date: "2026-11-14",
    readMinutes: 7,
    author: "Madhesh G",
    banner: {
      src: "/blog/hsa-fsa-blood-tests.jpg",
      alt: "An HSA card and an FSA card beside a “Keep for your claim” itemized receipt checklist (provider name, date of test, what was tested, amount paid; lab fees marked as a medical expense) and a December 31 calendar page asking whether the FSA plan year ends.",
    },
  },
  {
    slug: "what-not-to-do-before-blood-test",
    href: "/blog/what-not-to-do-before-blood-test",
    title: "What Not to Do Before a Blood Test: Fasting, Coffee, Water and Exercise",
    excerpt:
      "A black coffee, a stick of gum or yesterday’s workout can all nudge your results. Nine things to skip before a blood draw, and what’s still fine.",
    topic: "Preventive health",
    date: "2026-11-14",
    readMinutes: 7,
    author: "Madhesh G",
    banner: {
      src: "/blog/what-not-to-do-before-blood-test.jpg",
      alt: "A “Before your draw” checklist with plain water ticked and coffee, tea, juice, soda, gum, alcohol the day before and a hard workout crossed out, next to an alarm clock, a glass of water and a tag reading “No food for 8–12 hrs”.",
    },
  },
  {
    slug: "full-blood-panel-cost-without-insurance",
    href: "/blog/full-blood-panel-cost-without-insurance",
    title: "How Much Does a Full Blood Panel Cost Without Insurance?",
    excerpt:
      "From $29 for one CBC to over $400 for a broad set of tests. Self-pay prices by test, what changes them, and what to ask before you book.",
    topic: "Cost and access",
    date: "2026-11-13",
    readMinutes: 6,
    author: "Madhesh G",
    banner: {
      src: "/blog/full-blood-panel-cost-without-insurance.jpg",
      alt: "A self-pay lab order lists CBC $29, CMP $49, lipid panel $59, HbA1c $39 and TSH $49, totalling $225, with a $400+ tag for a broad preventive set.",
    },
  },
  // The client's posts, as published on healiam.com/blog.
  {
    slug: "what-hba1c-5-8-means",
    href: live("what-hba1c-5-8-means"),
    title: "Your HbA1c Says 5.8. What Does That Number Actually Mean?",
    excerpt: "An HbA1c of 5.8% sits in the CDC prediabetes range. It is a three-month average, not a diagnosis by itself.",
    topic: "Markers explained",
    date: "2026-10-24",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "what-a-blood-test-can-tell-you",
    href: live("what-a-blood-test-can-tell-you"),
    title: "What Can a Blood Test Actually Tell You About Your Health?",
    excerpt:
      "A comprehensive panel can describe glucose, lipids, kidneys, liver, thyroid, blood cells, iron, vitamin D, and more. It still is not a diagnosis.",
    topic: "Preventive health",
    date: "2026-10-22",
    readMinutes: 3,
    author: "Healiam",
  },
  {
    slug: "health-after-30",
    href: live("health-after-30"),
    title: "Things Nobody Tells You About Your Health After 30",
    excerpt:
      "Turning 30 is not a metabolic cliff. It is a reasonable checkpoint for blood pressure, cholesterol, glucose, sleep, and movement.",
    topic: "Preventive health",
    date: "2026-10-20",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "hypertension-know-your-number",
    href: live("hypertension-know-your-number"),
    title: "47.7% of U.S. Adults Have Hypertension. Should You Know Your Number?",
    excerpt:
      "High blood pressure can be quiet for years. It is measured with a cuff, not a routine blood test — and almost half of U.S. adults meet the definition.",
    topic: "Preventive health",
    date: "2026-10-18",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "kidney-markers-creatinine-and-bun",
    href: live("kidney-markers-creatinine-and-bun"),
    title: "Creatinine and BUN: The Kidney Test, in Plain Words",
    excerpt:
      "Creatinine and blood urea nitrogen are two waste checks often included in a metabolic panel. A higher number is a reason to look closer, not a diagnosis.",
    topic: "Markers explained",
    date: "2026-10-16",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "liver-markers-alt-ast-albumin",
    href: live("liver-markers-alt-ast-albumin"),
    title: "ALT, AST, and Albumin: The Liver Test, in Plain Words",
    excerpt:
      "ALT is mostly a liver alarm. AST also comes from heart and muscle. Albumin is a protein the liver makes. Read them together, and read your lab’s own range.",
    topic: "Markers explained",
    date: "2026-10-15",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "hospital-cash-prices-vs-one-panel",
    href: live("hospital-cash-prices-vs-one-panel"),
    title: "Same Blood Test, Very Different Hospital Bills",
    excerpt:
      "Published hospital cash prices for common labs swing by tens of times. A Healiam panel is one posted price for 50+ measurements — a different product, and a simpler bill.",
    topic: "Cost and access",
    date: "2026-10-12",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "see-the-full-picture",
    href: live("see-the-full-picture"),
    title: "See the Full Picture of Your Health",
    excerpt:
      "Feeling well is a good start. A panel adds context on blood sugar, cholesterol, thyroid, kidney, and blood cells — information to take to your clinician, not a reason to panic.",
    topic: "Preventive health",
    date: "2026-10-11",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "chronic-conditions-are-common",
    href: live("chronic-conditions-are-common"),
    title: "Chronic Conditions Are More Common Than We Think",
    excerpt:
      "About three in four U.S. adults had at least one of 12 tracked chronic conditions in 2023. The leading conditions change with age — and several have blood markers you can actually see.",
    topic: "Preventive health",
    date: "2026-10-10",
    readMinutes: 2,
    author: "Healiam",
  },
  {
    slug: "whats-inside-50-measurements",
    href: live("whats-inside-50-measurements"),
    title: "What’s Inside 50+ Measurements",
    excerpt:
      "One Healiam panel groups blood count, liver, kidney, thyroid, diabetes, iron, lipids, electrolytes, pancreas, vitamin D, and the biometrics you add yourself.",
    topic: "The panel",
    date: "2026-10-08",
    readMinutes: 2,
    author: "Healiam",
  },
];

export const blog = {
  path: "/blog",
  meta: {
    title: "Health Blog — Blood Tests, Markers & Prevention | Healiam",
    description:
      "Plain-language articles on blood test markers, preventive health and the cost of lab work, from Healiam: what the numbers on a blood report mean, and when they are worth a conversation with your clinician.",
  },
  nav: [
    { label: "Latest", href: "#latest" },
    { label: "All articles", href: "#articles" },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "Blog" }],

  hero: {
    eyebrow: "Healiam Journal",
    title: "Healiam Blogs",
    // The client's own intro line from healiam.com/blog.
    sub: "Useful context for the numbers on a blood report — and when those numbers are worth a conversation with your clinician.",
  },

  articles: {
    eyebrow: "All articles",
    title: "Read by topic",
  },

  // Shown under each card list; the posts are educational, as the client's own disclaimer says.
  note: "Articles are for education and do not provide medical advice, diagnosis, or treatment. Talk with a licensed healthcare professional about your results.",

  finalCta: {
    title: "Know your numbers",
    sub: `One ${price} panel with 50+ measurements, no referral or insurance, and results in the app in 4 to 5 business days.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: `${price} health screening panel`,
    sub: "All tests in one panel",
    cta: { label: "Book now", href: book },
  },
} as const;

/** "October 24, 2026", the way the client's blog prints dates. */
export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
