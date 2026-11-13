// Full text of the blog posts built on this site (posts we write). Each one also has a card entry in
// lib/pages/blog.ts with the same slug. Inline links use link() from lib/rich-text; **bold** marks a
// list item's lead-in.

import { link } from "@/lib/rich-text";
import { posts } from "@/lib/pages/blog";

/** A post's address: its page here once rebuilt, otherwise the live healiam.com page. */
const postHref = (slug: string) => posts.find((p) => p.slug === slug)?.href ?? `/blog/${slug}`;

export type ArticleBlock =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly id: string; readonly text: string }
  | { readonly type: "ul" | "ol"; readonly items: readonly { readonly lead?: string; readonly text: string }[] }
  | {
      readonly type: "table";
      readonly caption: string;
      readonly head: readonly string[];
      readonly rows: readonly (readonly string[])[];
    }
  | { readonly type: "callout"; readonly title: string; readonly text: string }
  /** Row of key figures, each one taken from the article text. */
  | { readonly type: "stats"; readonly items: readonly { readonly value: string; readonly label: string }[] }
  /** Dark booking box with the panel price, placed mid-article. */
  | { readonly type: "promo" };

export type Article = {
  readonly slug: string;
  readonly meta: { readonly title: string; readonly description: string };
  readonly h1: string;
  /** Section links for the header (desktop) and the phone menu. */
  readonly nav: readonly { readonly label: string; readonly href: string }[];
  readonly blocks: readonly ArticleBlock[];
  readonly faq: readonly { readonly q: string; readonly a: string }[];
  /** Slugs shown first under "Explore more content". */
  readonly related: readonly string[];
  /**
   * The figure on the drawn cover shown in the title block while the post has no banner image.
   * Once a banner is added in lib/pages/blog.ts, the banner replaces the cover.
   */
  readonly cover: { readonly figure: string; readonly label: string };
};

const hospitalPost = link("Same Blood Test, Very Different Hospital Bills", postHref("hospital-cash-prices-vs-one-panel"));
// Links from the first post to the client's posts and this site's pages (owner, 13 Nov 2026: interlink the content).
const kidneyPost = (label: string) => link(label, postHref("kidney-markers-creatinine-and-bun"));
const liverPost = (label: string) => link(label, postHref("liver-markers-alt-ast-albumin"));
const hba1cPost = (label: string) => link(label, postHref("what-hba1c-5-8-means"));
const insidePost = (label: string) => link(label, postHref("whats-inside-50-measurements"));
const tellPost = link("What Can a Blood Test Actually Tell You About Your Health?", postHref("what-a-blood-test-can-tell-you"));

export const articles: readonly Article[] = [
  {
    // Brief row 2 (owner, 13 Nov 2026). Prices checked on the labs' own pages on 13 Nov 2026.
    slug: "full-blood-panel-cost-without-insurance",
    meta: {
      title: "Full Blood Panel Cost Without Insurance (2026) | Healiam",
      description:
        "A full blood panel without insurance runs from $29 for one CBC to over $400 for a broad set of tests. See self-pay prices by test before you book.",
    },
    h1: "How Much Does a Full Blood Panel Cost Without Insurance?",
    nav: [
      { label: "Prices by test", href: "#prices" },
      { label: "Questions to ask", href: "#questions" },
      { label: "FAQ", href: "#faq" },
    ],
    blocks: [
      {
        // TL;DR box at the very top, as on bolddesk.com's posts (owner, 13 Nov 2026).
        type: "callout",
        title: "TL;DR",
        text: "Paying out of pocket at a national lab’s consumer website, a single test starts at $29. The five most common screening tests cost about $225 together, and a set close to a broad preventive panel passes $400. Before you pay, check which tests the panel includes and whether your insurance covers them as preventive care.",
      },
      {
        type: "p",
        text: "Ask three places for the price of a “full blood panel” and you can get three answers hundreds of dollars apart. Some of that gap is pricing. The rest comes from the name: “full blood panel” isn’t a standard lab order, so every lab, clinic and hospital decides for itself what goes into one.",
      },
      { type: "h2", id: "what-it-means", text: "What “full blood panel” usually means" },
      {
        type: "p",
        text: "Most often it means a complete blood count (CBC) and a comprehensive metabolic panel (CMP). For a yearly check, many clinicians add a lipid panel, HbA1c and a thyroid test. Some labs sell only the first two under the same name.",
      },
      {
        type: "ul",
        items: [
          { lead: "CBC", text: "red and white blood cells, hemoglobin and platelets." },
          {
            lead: "CMP",
            text: `14 measurements covering blood sugar, ${kidneyPost("kidney")} and ${liverPost("liver function")}, electrolytes and protein.`,
          },
          { lead: "Lipid panel", text: "total cholesterol, LDL, HDL and triglycerides." },
          { lead: "HbA1c", text: `${hba1cPost("your average blood sugar over roughly three months")}.` },
          { lead: "TSH", text: "the usual first thyroid check." },
        ],
      },
      {
        type: "p",
        text: "So compare test lists before you compare prices. A $49 “full panel” and a $249 one can be completely different orders.",
      },
      { type: "h2", id: "prices", text: "Self-pay prices, test by test" },
      {
        type: "p",
        text: "These are list prices from [Quest Health](https://www.questhealth.com/routine-lab-work.html) and Labcorp OnDemand, the consumer websites of the two largest U.S. lab companies, checked on November 13, 2026. Both let you order without seeing a doctor; a physician working with the site reviews the order.",
      },
      {
        type: "table",
        caption: "Self-pay list prices, checked November 13, 2026",
        head: ["Test", "Quest Health", "Labcorp OnDemand"],
        rows: [
          ["CBC", "$29", "$29"],
          ["CMP (14 tests)", "$49", "$49"],
          ["Lipid panel", "$59", "$59"],
          ["HbA1c", "$39", "$39"],
          ["TSH", "$49", "Not sold alone; TSH with free T4 is $89"],
        ],
      },
      {
        type: "p",
        text: "Quest also lists vitamin D at $75, an iron, TIBC and ferritin panel at $59, and magnesium at $39. It adds a physician service fee starting at $6 per order. Labcorp’s product page doesn’t list a separate fee.",
      },
      { type: "h2", id: "totals", text: "What the totals come to" },
      {
        type: "p",
        text: "**The five common screening tests** (CBC, CMP, lipid panel, HbA1c and TSH) cost $225 at Quest, or $231 with the $6 fee.",
      },
      {
        type: "p",
        text: "**A wider preventive set** adds vitamin D, the iron panel and magnesium, which brings the Quest order to $398 before the fee. Even then, it doesn’t include:",
      },
      {
        type: "ul",
        items: [
          { text: "free T4 and total T3" },
          { text: "uric acid and phosphorus" },
          { text: "creatine kinase" },
          { text: "amylase and lipase" },
          { text: "LDH" },
        ],
      },
      { type: "p", text: "**Bundles** bring the price per test down:" },
      {
        type: "ul",
        items: [
          { text: "Labcorp’s Standard Health Test packs a CBC, a CMP and a urinalysis into one order for $99." },
          { text: "Labcorp’s Comprehensive Health Test adds a lipid panel and HbA1c, and was listed at $189." },
          { text: "Quest’s health profiles range from $199 to $399." },
        ],
      },
      { type: "p", text: "As with single tests, read each bundle’s test list rather than going by its name." },
      // Booking box mid-article, right after the totals (owner, 13 Nov 2026).
      { type: "promo" },
      { type: "h2", id: "why", text: "Why the same test costs so much more at retail" },
      {
        type: "p",
        text: "The tests themselves are paid at far lower rates elsewhere. In 2025, Medicare’s [Clinical Laboratory Fee Schedule](https://www.cms.gov/files/document/mm13889-clinical-laboratory-fee-schedule-2025-annual-update.pdf) paid:",
      },
      {
        type: "table",
        caption: "Medicare payment per test, 2025, next to Quest’s self-pay price",
        head: ["Test", "Medicare, 2025", "Quest Health"],
        rows: [
          ["CBC", "$7.77", "$29"],
          ["CMP", "$10.56", "$49"],
          ["Lipid panel", "$13.39", "$59"],
          ["HbA1c", "$9.71", "$39"],
          ["TSH", "$16.80", "$49"],
          ["Total", "$58.23", "$225"],
        ],
      },
      {
        type: "p",
        text: "That’s $58.23 for the same five tests that cost $225 at retail. Insurers and Medicare pay set or negotiated rates. When you pay yourself, you start from the retail price, so it’s always worth asking for the self-pay rate before the draw.",
      },
      {
        type: "p",
        text: `Hospitals tend to sit at the top of the range. Our earlier post, ${hospitalPost}, shows how far hospital cash prices for the same test can differ. Since January 1, 2021, U.S. hospitals have had to publish their prices online, so you can look up a hospital’s list before you go.`,
      },
      { type: "h2", id: "insurance", text: "If you have insurance, check this first" },
      {
        type: "p",
        text: "The Affordable Care Act makes Marketplace plans, and many other health plans, pay in full for a list of preventive screenings, with nothing owed as a copay or coinsurance. Two of them are blood tests:",
      },
      {
        type: "ul",
        items: [
          { text: "a cholesterol check, when your age or risk factors call for one" },
          { text: "a type 2 diabetes check, if you’re 40 to 70 and above a healthy weight" },
        ],
      },
      {
        type: "p",
        text: "If you meet those terms, your plan may cover these screenings at no cost to you. Tests outside those rules, or tests ordered because of a symptom, can count toward your deductible instead.",
      },
      { type: "h2", id: "questions", text: "Five questions to ask before you pay" },
      {
        type: "ol",
        items: [
          { lead: "Which tests are included?", text: "Ask for the full list, not the panel’s name." },
          { lead: "Is anything charged on top?", text: "For example, a physician fee, a draw fee or an office visit." },
          {
            lead: "Do I need a doctor’s order?",
            text: "Consumer lab sites include one. Some states limit buying your own lab tests, and Quest shows a state-restriction notice on some products.",
          },
          {
            lead: "Can I use my HSA or FSA?",
            text: "IRS Publication 502 treats lab work done for medical care as a medical expense, which is what HSA and FSA money can pay for. Labcorp OnDemand lists HSA and FSA cards as accepted.",
          },
          {
            lead: "Where do results go, and when?",
            text: "They might go to a portal, an app or your doctor’s office, and might take anywhere from a day to a week.",
          },
        ],
      },
      { type: "h2", id: "healiam", text: "How Healiam prices it" },
      { type: "p", text: `Healiam has one panel at one price: $95. It covers ${link("56 lab measurements", "/tests")}:` },
      {
        type: "ul",
        items: [
          { text: "blood count" },
          { text: "liver and kidney function" },
          { text: "thyroid (TSH, free T4 and total T3)" },
          { text: "glucose and HbA1c" },
          { text: "lipids and iron" },
          { text: "electrolytes" },
          { text: "pancreas (amylase and lipase)" },
          { text: "vitamin D" },
        ],
      },
      {
        type: "p",
        text: `The panel also includes 6 biometrics you log yourself in the app. ${insidePost("What’s inside 50+ measurements")} walks through each group.`,
      },
      {
        type: "p",
        text: "The draw takes place at a [Healiam health fair](/fairs): two vials, with no referral needed. Healiam doesn’t bill insurance. You pay by card or HSA card, with no separate visit fee and no bill afterwards. Results arrive in the app in 4 to 5 business days.",
      },
      {
        type: "p",
        text: `The panel doesn’t replace tests your doctor orders for a symptom, and it isn’t a diagnosis. It’s a broad set of your numbers at a price you know up front, which you can take to your clinician. For what the numbers can and can’t show, read ${tellPost}`,
      },
      {
        type: "p",
        text: `Healiam runs fairs in ${link("Texas", "/texas/blood-testing")}, ${link("Colorado", "/colorado/blood-testing")}, ${link("Georgia", "/georgia/blood-testing")}, ${link("New Jersey", "/new-jersey/blood-testing")} and ${link("New York", "/new-york/blood-testing")}. ${link("See what’s tested", "/tests")} or ${link("find a health fair near you", "/fairs")}.`,
      },
    ],
    faq: [
      {
        q: "How much does a full blood panel cost without insurance?",
        a: "It depends on what the panel includes. On the Quest and Labcorp consumer sites, a CBC and CMP together cost $78. Adding a lipid panel, HbA1c and TSH brings the total to $225 at Quest, and broader sets pass $400. Healiam’s [panel of 56 lab measurements](/tests) is $95.",
      },
      {
        q: "How much does a CBC cost without insurance?",
        a: "$29 at both Quest Health and Labcorp OnDemand as of November 13, 2026. Quest adds a physician service fee starting at $6 per order.",
      },
      {
        q: "Why does the same blood test cost more at a hospital?",
        a: `Hospitals set their own cash prices, and those prices vary widely from one hospital to the next. Our post ${hospitalPost} compares them in detail.`,
      },
      {
        q: "What is the cheapest way to get blood work done?",
        a: "If you’re insured and the screening falls under the ACA preventive-care rules, your plan may cover it in full. If you’re paying yourself, a bundle almost always costs less than the same tests bought one at a time. Compare the price per test, not just the total.",
      },
      {
        q: "Can I get blood work done if I have no insurance?",
        a: "Yes. Consumer lab websites sell tests directly, with a physician reviewing the order. Healiam runs [health fairs](/fairs) where you can get the full panel with no referral and no insurance.",
      },
      {
        q: "How much does a Healiam blood test cost?",
        a: "$95 for the full panel, with every test included and no separate visit fee.",
      },
      {
        q: "Does Healiam accept insurance or HSA cards?",
        a: "Healiam doesn’t bill insurance. You can pay by credit card or HSA card.",
      },
    ],
    cover: { figure: "$29 to $400+", label: "What common blood tests cost without insurance" },
    related: ["hospital-cash-prices-vs-one-panel", "whats-inside-50-measurements", "what-a-blood-test-can-tell-you"],
  },
];

export const disclaimer =
  "This article is for educational purposes and does not provide medical advice, diagnosis, or treatment. Results should be interpreted in the context of your individual health and, when appropriate, discussed with a licensed healthcare professional. Healiam testing and result delivery do not replace professional medical advice, diagnosis, or treatment.";

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
