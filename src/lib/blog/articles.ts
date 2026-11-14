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

const costPost = (label: string) => link(label, postHref("full-blood-panel-cost-without-insurance"));
const states = `${link("Texas", "/locations/texas")}, ${link("Colorado", "/locations/colorado")}, ${link("Georgia", "/locations/georgia")}, ${link("New Jersey", "/locations/new-jersey")} and ${link("New York", "/locations/new-york")}`;

export const articles: readonly Article[] = [
  {
    // Brief row 8 (owner, 14 Nov 2026). Healiam facts from healiam.com/faq and the demo walkthrough
    // (lib/pages/demo.ts): booking steps, card or HSA at checkout, licensed phlebotomist, two vials in
    // under seven minutes, CLIA-certified partner labs on FDA-approved equipment, results in 4 to 5
    // business days with ranges and graphs, PDF to share. Panel list from lib/panel.ts (56 lab measurements).
    // Outside facts checked 14 Nov 2026: CMS CLIA page, MedlinePlus "How to Understand Your Lab Results".
    // NOT CONFIRMED by the client: walk-ins. The FAQ says to book ahead and call first; update once confirmed.
    slug: "health-fair-blood-test-what-to-expect",
    meta: {
      title: "Health Fair Blood Test: What to Expect | Healiam",
      description:
        "Never been to a health fair blood screening? Here’s how booking, fasting, the blood draw and results work, and which tests are usually included.",
    },
    h1: "Health Fair Blood Screening: What to Expect and What’s Tested",
    nav: [
      { label: "On the day", href: "#on-the-day" },
      { label: "What’s tested", href: "#tested" },
      { label: "FAQ", href: "#faq" },
    ],
    blocks: [
      {
        type: "callout",
        title: "TL;DR",
        text: "A health fair blood screening is a short, booked blood draw at a local venue that checks a wide set of routine markers for one set price. At a Healiam fair you reserve a morning slot online, arrive fasted, give two vials to a licensed phlebotomist in under seven minutes, and read 56 lab results in the app 4 to 5 business days later.",
      },
      {
        type: "p",
        text: "If you’ve never been to one, a health fair blood test can sound vague. Is it a clinic? A pop-up? Do you need a doctor? This guide covers what to expect at a health fair blood test, step by step, using a Healiam fair as the example, along with what’s tested and how much to trust the numbers.",
      },
      { type: "h2", id: "what", text: "What is a health fair blood screening?" },
      {
        type: "p",
        text: "It’s routine blood work offered at a scheduled event outside a doctor’s office: a pharmacy, an office, a city building. You book yourself in, a trained professional takes the sample, and a lab runs the tests. No referral, no consultation first.",
      },
      {
        type: "p",
        text: "The point is screening. You’re checking how things look while you feel well, so you can catch a drifting number early and take it to your own clinician. It isn’t a substitute for tests a doctor asks for because of a symptom, and the results aren’t a diagnosis on their own.",
      },
      { type: "h2", id: "before", text: "Before the fair: booking and fasting" },
      {
        type: "ol",
        items: [
          { lead: "Create a free account", text: "in the Healiam app or online. It takes about a minute." },
          {
            lead: "Add who’s being tested.",
            text: "You can book for yourself and the people you look after, with one checkout for everyone.",
          },
          { lead: "Pick a fair and a time slot.", text: `Fairs run from 8:00 to 10:00 AM. ${link("See the current list", "/fairs")}.` },
          {
            lead: "Pay at checkout.",
            text: "Credit card or HSA card. You see the full $95 before confirming, and nothing is added later.",
          },
          {
            lead: "Fast the night before.",
            text: `Only water for 8 to 12 hours beforehand, and skip hard training the day before. Our guide to ${link("what not to do before a blood test", postHref("what-not-to-do-before-blood-test"))} explains why.`,
          },
        ],
      },
      { type: "h2", id: "on-the-day", text: "On the day: what happens at the fair" },
      {
        type: "p",
        text: "Come a few minutes before your slot with your phone, the Healiam app installed, and your card. Wear a top with sleeves that roll up easily, and keep sipping water on the way: it makes the vein easier to find.",
      },
      {
        type: "p",
        text: "A licensed phlebotomist takes the sample somewhere private: two vials, and most people are done in less than seven minutes, bandage included. Then you can eat. Many people bring breakfast to have in the car or at their desk afterwards.",
      },
      {
        type: "p",
        text: "If you’re anxious about needles, tell the phlebotomist before they start. Lying back, looking away and breathing slowly all help, and saying so means they can go at your pace.",
      },
      { type: "h2", id: "tested", text: "What’s tested in a Healiam health fair panel" },
      {
        type: "p",
        text: "What’s offered differs from one organizer to the next. Some fairs price each test separately, so the total depends on how many you add. Healiam runs one panel with nothing to choose or add on:",
      },
      {
        type: "table",
        caption: "The Healiam panel: 56 lab measurements from one draw, plus 6 biometrics you log in the app.",
        head: ["Area", "Measurements", "What it covers"],
        rows: [
          ["Blood count (CBC)", "23", "Red cells, white cells, platelets"],
          ["Liver", "7", "ALT, AST, albumin, bilirubin, alkaline phosphatase, total protein"],
          ["Electrolytes", "5", "Sodium, potassium, chloride, magnesium, phosphorus"],
          ["Kidney", "5", "Creatinine, urea nitrogen, uric acid, calcium, creatine kinase"],
          ["Lipids", "4", "Total cholesterol, LDL, HDL, triglycerides"],
          ["Thyroid", "3", "TSH, free T4, total T3"],
          ["Vitamin D and more", "3", "Vitamin D, LDH, carbon dioxide"],
          ["Diabetes", "2", "Glucose, HbA1c"],
          ["Iron", "2", "Iron, UIBC"],
          ["Pancreas", "2", "Amylase, lipase"],
        ],
      },
      {
        type: "p",
        text: `For what each group tells you, ${insidePost("What’s inside 50+ measurements")} walks through them one at a time.`,
      },
      { type: "promo" },
      { type: "h2", id: "accurate", text: "Are health fair blood tests accurate?" },
      {
        type: "p",
        text: "Accuracy comes from the lab, not the venue. Every U.S. lab that tests human samples for health purposes has to meet the federal quality standards in the [Clinical Laboratory Improvement Amendments](https://www.cms.gov/medicare/quality/clinical-laboratory-improvement-amendments), known as CLIA, which CMS oversees. The same rules apply whether the blood was drawn at a hospital or a health fair.",
      },
      {
        type: "p",
        text: "Healiam’s samples go to CLIA-certified partner labs that use FDA-approved equipment, which is why your doctor can use the results. The bigger risk to accuracy is usually preparation. A breakfast you forgot about will push glucose and triglycerides up, whatever the lab.",
      },
      { type: "h2", id: "results", text: "Getting and reading your results" },
      {
        type: "p",
        text: "Results reach the Healiam app in 4 to 5 business days. Each marker sits next to the range it’s measured against, with a graph, and your earlier results build up beside it from one fair to the next. You can download the full report as a PDF for your doctor.",
      },
      {
        type: "p",
        text: `A number outside the range isn’t automatically a problem. As MedlinePlus explains in its guide to [understanding lab results](https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/), healthy people land outside a reference range now and then, and a result inside it doesn’t guarantee all is well either. Look at the pattern, and talk to a clinician about anything flagged. Our post on ${hba1cPost("what an HbA1c of 5.8% means")} is a good example of reading one number in context.`,
      },
      { type: "h2", id: "cost", text: "What a health fair blood test costs" },
      {
        type: "p",
        text: `There’s no going rate: it depends on who runs the fair and what’s in the panel. A Healiam draw costs $95 and covers everything listed above, with no visit fee and no lab bill afterwards. For how that compares with paying a lab directly, see ${costPost("what a full blood panel costs without insurance")}. If you have an HSA, our guide to ${link("using HSA or FSA money for blood tests", postHref("hsa-fsa-blood-tests"))} covers what to keep for your records.`,
      },
      { type: "h2", id: "near-you", text: "Finding a Healiam health fair near you" },
      {
        type: "p",
        text: `In Colorado, fairs are held in ${link("Denver", "/locations/colorado/denver")} and ${link("Centennial", "/fairs/centennial-co")}, and people come in from across the metro. Healiam also runs fairs in ${states}. ${link("See every upcoming health fair", "/fairs")} and pick the date that suits you.`,
      },
    ],
    faq: [
      {
        q: "What is a health fair blood screening?",
        a: "A scheduled event where routine blood work is drawn at a local venue, without a doctor’s visit first. You get a wide set of screening results at a set price to review with your own clinician.",
      },
      {
        q: "What blood tests are offered at a health fair?",
        a: "It depends on the organizer. A blood count, a metabolic panel, cholesterol and HbA1c are common. Healiam’s single panel covers 56 lab measurements, including thyroid, iron, pancreas and vitamin D, from one draw.",
      },
      {
        q: "Do you need to fast for a health fair blood test?",
        a: "For reliable glucose and triglyceride results, yes: 8 to 12 hours with only water. Healiam asks everyone to fast, and its fairs run from 8:00 to 10:00 AM, so most of the fast happens while you sleep.",
      },
      {
        q: "Are health fair blood tests accurate?",
        a: "They’re as accurate as the lab that runs them. Healiam’s samples go to CLIA-certified partner labs using FDA-approved equipment, the same federal standard every U.S. clinical lab must meet, so your doctor can use the results.",
      },
      {
        q: "How much does a blood test cost at a health fair?",
        a: "Each organizer sets its own prices, and some charge per test. Healiam charges $95 for the whole panel, and there’s no visit fee or bill later.",
      },
      {
        q: "What should I bring to a Healiam health fair?",
        a: "The Healiam app on your phone, and a credit or HSA card. Leave the insurance card at home: it isn’t needed, and neither is a doctor’s order.",
      },
      {
        q: "Can I walk in to a Healiam health fair without an appointment?",
        a: "Please book ahead. Draws run in timed morning slots, and booking holds yours. If you’d like to come without a booking, call 720-761-7869 first to check whether there’s room.",
      },
    ],
    cover: { figure: "7 min", label: "A typical health fair blood draw" },
    related: ["whats-inside-50-measurements", "what-not-to-do-before-blood-test", "what-a-blood-test-can-tell-you"],
  },
  {
    // Brief row 6 (owner, 14 Nov 2026). Facts checked 14 Nov 2026: IRS Publication 502 (lab fees, physical
    // examination, what medical expenses are), IRS Publication 969 (HSA records and 20% tax, FSA
    // substantiation, grace period and carryover, 2026 HSA limits), Rev. Proc. 2025-32 (2026 FSA $3,400,
    // carryover $680). Healiam facts from healiam.com/faq: credit cards and HSA cards, no doctor's order.
    // NOT CONFIRMED by the client yet (brief note): FSA card acceptance and itemized receipts. The copy
    // doesn't claim either; update the "healiam" section and the last two FAQs once the client confirms.
    slug: "hsa-fsa-blood-tests",
    meta: {
      title: "Can You Use HSA or FSA for Blood Tests? | Healiam",
      description:
        "Lab fees are generally HSA and FSA eligible. Learn which blood tests qualify, what receipts to keep and how to use funds before the year-end deadline.",
    },
    h1: "Can You Use HSA or FSA for Blood Tests?",
    nav: [
      { label: "HSA vs FSA", href: "#hsa-vs-fsa" },
      { label: "Receipts", href: "#receipts" },
      { label: "FAQ", href: "#faq" },
    ],
    blocks: [
      {
        type: "callout",
        title: "TL;DR",
        text: "Yes, in most cases. The IRS lists lab fees for medical care among eligible medical expenses, and that’s the test HSA and FSA money has to pass. You don’t need symptoms: routine screening qualifies. Keep an itemized receipt, and if you have FSA money left, check your plan’s deadline before the year runs out.",
      },
      {
        type: "p",
        text: "November is when a lot of people open their benefits account, see a balance and wonder what it can pay for. Blood work is a good answer. This guide explains when you can use an HSA or FSA for blood tests, what your plan may ask for, and how to spend FSA money before you lose it.",
      },
      {
        type: "p",
        text: "One note before we start: your plan administrator has the last word on any claim, and this isn’t tax advice. What follows is how the IRS rules read and what tends to come up in practice.",
      },
      { type: "h2", id: "why", text: "Why blood tests count as a medical expense" },
      {
        type: "p",
        text: "HSAs and FSAs can only pay for qualified medical expenses, and both use the definition in [IRS Publication 502](https://www.irs.gov/publications/p502). It describes medical care as paying to diagnose, treat, ease or prevent disease, or to affect how the body works. Two of its entries settle the question for most blood work:",
      },
      {
        type: "ul",
        items: [
          { lead: "Laboratory fees", text: "are included when they’re part of medical care." },
          {
            lead: "Physical examinations",
            text: "and the diagnostic tests that go with them are included too, and the publication says outright that you needn’t be sick at the time.",
          },
        ],
      },
      {
        type: "p",
        text: "So a cholesterol check, an HbA1c or a full metabolic panel all fit. What doesn’t fit is anything bought mainly for general wellness with no link to a health condition, which is why a few plans ask more questions about gray-area tests than about standard blood work.",
      },
      { type: "h2", id: "hsa-vs-fsa", text: "HSA vs FSA: the rules that matter for lab work" },
      {
        type: "p",
        text: "Both accounts pay for the same kinds of expenses, but they behave differently once the money is in. The details are in [IRS Publication 969](https://www.irs.gov/publications/p969).",
      },
      {
        type: "table",
        caption: "Sources: IRS Publication 969 and Revenue Procedure 2025-32 (2026 FSA figures), checked November 14, 2026.",
        head: ["", "HSA", "FSA"],
        rows: [
          [
            "Who can have one",
            "People covered by a high-deductible health plan (2026 minimum deductible: $1,700 self-only, $3,400 family)",
            "Employees whose employer offers one",
          ],
          ["2026 contribution limit", "$4,400 self-only, $8,750 family", "$3,400 per employee; your employer can set less"],
          [
            "Money you don’t spend",
            "Stays in the account from year to year",
            "Lost at the end of the plan year, unless the plan offers a grace period (up to 2½ months) or a carryover (up to $680)",
          ],
          ["How you pay", "HSA debit card, or pay another way and reimburse yourself later", "FSA card, or pay and file a claim"],
          [
            "Paperwork",
            "You keep the records; the IRS can ask for them",
            "The plan needs a third-party statement of what the expense was and what it cost",
          ],
          [
            "If the expense doesn’t qualify",
            "Taxed as income, plus a 20% additional tax if you’re under 65",
            "The plan won’t pay it",
          ],
        ],
      },
      {
        type: "p",
        text: "The HSA’s big advantage is time. As long as the test happened after you opened the account, you can pay out of pocket today and pay yourself back from the HSA months or years later, provided you still have the receipt.",
      },
      { type: "h2", id: "doctors-order", text: "Do you need a doctor’s order?" },
      {
        type: "p",
        text: "Not under the IRS entry for lab fees, which doesn’t mention one. The test has to be medical care, and a panel that checks your blood sugar, cholesterol, kidneys and liver clearly is.",
      },
      {
        type: "p",
        text: "In practice, some plan administrators want more paperwork for tests that could be read as wellness rather than medical care, and a few ask for a letter of medical necessity. A standard blood panel rarely runs into this, but if your card is declined or a claim comes back with questions, that letter is the usual fix. Your plan’s list of eligible expenses will tell you what it expects.",
      },
      { type: "h2", id: "preventive", text: "Preventive blood work with no symptoms" },
      {
        type: "p",
        text: `You can use HSA or FSA money for screening when you feel fine. Prevention sits inside how the IRS defines medical care, and the physical examination entry makes clear that being ill isn’t a requirement. Checking your numbers once a year, before anything shows up, is exactly what these accounts allow. If you’re still comparing what that costs, ${costPost("our guide to blood panel prices without insurance")} lists self-pay prices test by test.`,
      },
      { type: "promo" },
      { type: "h2", id: "receipts", text: "What receipt to keep" },
      {
        type: "p",
        text: "A card statement on its own usually isn’t enough, because it shows where you paid and how much but not what for. An itemized receipt should show:",
      },
      {
        type: "ul",
        items: [
          { lead: "The provider’s name", text: "and, ideally, its address." },
          { lead: "The date of the test", text: "which is the date your plan cares about, not the date you paid." },
          { lead: "Who was tested", text: "if you’re claiming for a spouse or dependent." },
          { lead: "What it was for", text: "for example “blood panel” or the list of tests." },
          { lead: "The amount you paid", text: "after any discounts." },
        ],
      },
      {
        type: "p",
        text: "For an HSA, file the receipt with your tax records rather than sending it anywhere. The IRS expects you to be able to show three things if asked: the money paid for a qualified medical expense, nobody else had already paid it, and you didn’t also deduct it on your tax return.",
      },
      { type: "h2", id: "deadline", text: "Using FSA money before the deadline" },
      { type: "p", text: "If your FSA has money left near the end of the year, a blood test is a sensible use for it. Before you book:" },
      {
        type: "ol",
        items: [
          { lead: "Check when your plan year ends.", text: "Many end on December 31, but not all of them, so look at your plan documents or account portal." },
          {
            lead: "Find out if your plan has a carryover, a grace period or neither.",
            text: "A plan can offer one or the other, or neither. A carryover keeps up to $680 for next year; a grace period gives you up to 2½ more months to spend.",
          },
          {
            lead: "Book a test date inside the plan year.",
            text: "FSAs pay for expenses incurred during the coverage period, so the date of service is what counts.",
          },
          { lead: "Get the itemized receipt on the day.", text: "It’s much easier than chasing one in January." },
          {
            lead: "Submit the claim before your plan’s cut-off.",
            text: "Many plans allow some weeks after the year ends to send in claims for expenses from that year. Check how long yours gives you.",
          },
        ],
      },
      { type: "h2", id: "healiam", text: "Paying for a Healiam blood test" },
      {
        type: "p",
        text: `Healiam accepts HSA cards and regular credit cards. The full panel is $95 and covers ${link("56 lab measurements", "/tests")}, including blood counts, cholesterol, glucose and HbA1c, kidney and liver markers, and thyroid. You book it yourself with no referral or prescription, and there’s no insurance card to bring.`,
      },
      {
        type: "p",
        text: `If your account is an FSA, ${link("ask us", "/contact")} before you book how best to pay and what paperwork your plan will need. Draws take place at morning ${link("health fairs", "/fairs")}, and your results reach the app within 4 to 5 business days.`,
      },
      {
        type: "p",
        text: `Healiam fairs run in ${states}. ${link("See the full list of tests", "/tests")} or ${link("choose a fair date before your plan year ends", "/fairs")}.`,
      },
    ],
    faq: [
      {
        q: "Can I use my HSA to pay for blood tests?",
        a: "Yes, in most cases. Under IRS Publication 502, lab fees paid for medical care are qualified medical expenses, so you can pay with your HSA card, or pay another way and reimburse yourself later. Keep the itemized receipt.",
      },
      {
        q: "Are blood tests FSA eligible?",
        a: "Generally, yes. FSAs use the same IRS definition of medical care as HSAs. Your plan will need proof of the expense, usually an itemized receipt, and the money has to be spent within the plan year unless your plan has a grace period or carryover.",
      },
      {
        q: "Do I need a doctor’s order to use HSA funds on lab work?",
        a: "The IRS entry for lab fees doesn’t require one. What matters is that the test is medical care, such as screening for or monitoring a health condition. Some plan administrators ask for extra paperwork in unclear cases, so check your plan’s rules if you’re unsure.",
      },
      {
        q: "Can I use an HSA for preventive blood work if I have no symptoms?",
        a: "Yes. The way the IRS defines medical care covers preventing disease as well as treating it, and Publication 502 says you needn’t be ill for an examination and its diagnostic tests to count.",
      },
      {
        q: "What receipt do I need for HSA or FSA reimbursement on lab tests?",
        a: "An itemized receipt with the provider’s name, the date of the test, who was tested, what was tested and the amount paid. A card statement alone usually isn’t enough, because it doesn’t show what you paid for.",
      },
      {
        q: "Can I pay for a Healiam blood test with an HSA card?",
        a: "Yes. Healiam accepts HSA cards as well as regular credit cards. The full panel is $95, with no insurance card or doctor’s order needed.",
      },
      {
        q: "Does Healiam provide a receipt I can submit for reimbursement?",
        a: "Get in touch through our [contact page](/contact) before you book, and we’ll tell you what paperwork is available for your plan.",
      },
    ],
    cover: { figure: "HSA + FSA", label: "Using pre-tax money for blood work" },
    related: ["full-blood-panel-cost-without-insurance", "hospital-cash-prices-vs-one-panel", "health-after-30"],
  },
  {
    // Brief row 3 (owner, 14 Nov 2026). Rules match Healiam's own prep (lib/pages/tests.ts `prep`):
    // 8 to 12 hour fast, water fine, no coffee, tea, juice or gum, no hard exercise for 24 hours.
    // Facts checked 14 Nov 2026 on MedlinePlus (fasting, lab prep, CK, cholesterol), Cleveland Clinic
    // and the FDA's biotin safety communication.
    slug: "what-not-to-do-before-blood-test",
    meta: {
      title: "What Not to Do Before a Blood Test: 9 Rules | Healiam",
      description:
        "Fasting for blood work? Learn what not to do before a blood test: coffee, gum, alcohol, hard workouts and more, plus what you can safely have.",
    },
    h1: "What Not to Do Before a Blood Test: Fasting, Coffee, Water and Exercise",
    nav: [
      { label: "The 9 rules", href: "#rules" },
      { label: "If you slipped up", href: "#slipped" },
      { label: "FAQ", href: "#faq" },
    ],
    blocks: [
      {
        type: "callout",
        title: "TL;DR",
        text: "For a fasting blood test, go 8 to 12 hours without food and drink only plain water. Leave out coffee (black included), tea, juice and gum, keep alcohol and hard workouts out of the day before, and carry on with prescribed medicines unless your doctor says otherwise. If you slip up, say so before the needle goes in.",
      },
      {
        type: "p",
        text: "Most people know they’re meant to fast before blood work. Fewer know that a black coffee on the drive over, a stick of gum in the waiting area or yesterday’s leg day can also move the numbers. This guide covers what not to do before a blood test, why each rule is there, and what you’re still allowed.",
      },
      {
        type: "p",
        text: "The rules below are the same ones Healiam asks for before its own panel. If your doctor has given you different instructions for a particular test, go with theirs.",
      },
      { type: "h2", id: "why", text: "Why the hours before a draw matter" },
      {
        type: "p",
        text: "A blood test is a snapshot of one morning. Food you ate a few hours ago is still being absorbed, so glucose and triglycerides read above your usual level. A hard workout pushes enzymes out of tired muscle. Too little water leaves the sample more concentrated. None of this means something is wrong with you, but it can make a result look off and send you back for a repeat test.",
      },
      {
        type: "p",
        text: "That’s why the National Library of Medicine’s guide to [fasting for a blood test](https://medlineplus.gov/lab-tests/fasting-for-a-blood-test/) allows plain water and nothing else during the fast, and also rules out gum, smoking and exercise.",
      },
      { type: "h2", id: "rules", text: "What not to do before a blood test: 9 rules" },
      {
        type: "ol",
        items: [
          {
            lead: "Don’t eat for 8 to 12 hours.",
            text: "Count back from your appointment time. A handful of nuts, a mint or a splash of milk all count. Glucose and triglycerides are the results a recent meal changes most.",
          },
          {
            lead: "Don’t drink coffee, even black.",
            text: "Black coffee has no sugar, but it does have caffeine, which makes you pass more water. Cleveland Clinic’s advice on [fasting for blood work](https://my.clevelandclinic.org/health/articles/fasting-for-blood-work) is to skip coffee of any kind until after the draw.",
          },
          {
            lead: "Don’t drink tea, juice, soda or flavored water.",
            text: "Herbal tea, diet soda and water with lemon aren’t plain water. Sugar, sweeteners and plant compounds from them can reach your bloodstream.",
          },
          {
            lead: "Don’t chew gum or suck on mints.",
            text: "Sugar-free gum still gets your digestion going. Save it for the walk out.",
          },
          {
            lead: "Don’t drink alcohol the day before.",
            text: "Alcohol can raise triglycerides and total cholesterol, and processing it keeps your liver busy. Give it at least 24 hours.",
          },
          {
            lead: "Don’t do a hard workout in the 24 hours before.",
            text: "Heavy lifting, long runs and intense classes release muscle enzymes such as creatine kinase into the blood. An easy walk is fine.",
          },
          {
            lead: "Don’t smoke while you fast.",
            text: "Smoking sits on the same list as food and gum during a fast. Wait until the draw is done.",
          },
          {
            lead: "Don’t cut back on water.",
            text: "Plain water is allowed the whole time, and it helps. Well-filled veins are easier to find, and a dehydrated sample can read more concentrated than you really are.",
          },
          {
            lead: "Don’t stop your medicines on your own.",
            text: "Keep taking what you’re prescribed unless the doctor who prescribed it tells you otherwise, and mention every supplement you take. There’s more on this below.",
          },
        ],
      },
      {
        type: "table",
        caption: "What each habit can change. Based on MedlinePlus, Cleveland Clinic and the FDA, checked November 14, 2026.",
        head: ["Habit", "What it can do", "Healiam panel results it can affect"],
        rows: [
          ["A recent meal or snack", "Raises sugar and fats in the blood while food is absorbed", "Glucose, triglycerides"],
          ["A hard workout", "Releases enzymes from working muscle", "Creatine kinase, AST, LDH"],
          ["Alcohol the day before", "Can raise blood fats and load the liver", "Triglycerides, total cholesterol, ALT, AST"],
          ["Too little water", "Makes veins harder to find and concentrates the sample", "The draw itself, urea nitrogen"],
          ["High-dose biotin", "Can push some lab methods to false highs or lows", "Some thyroid hormone results"],
        ],
      },
      {
        type: "p",
        text: `For what those markers mean, our plain-words guides to ${liverPost("ALT and AST")} and ${kidneyPost("creatinine and BUN")} (BUN is urea nitrogen) go through them one by one.`,
      },
      { type: "promo" },
      { type: "h2", id: "allowed", text: "What you can still do" },
      {
        type: "ul",
        items: [
          { lead: "Drink plain water", text: "as much as you like, from the evening before right up to your draw." },
          {
            lead: "Take prescribed medicines",
            text: "with water, unless your doctor has said to wait. If a pill has to be taken with food, ask your doctor how to handle the morning of the test.",
          },
          { lead: "Sleep through most of it", text: "by booking an early slot, so the 8 to 12 hours pass overnight." },
          { lead: "Pack a snack", text: "for afterwards. Food is fine the moment you’re done, and a bite helps if you feel light-headed." },
        ],
      },
      { type: "h2", id: "timing", text: "How to time your fast" },
      { type: "p", text: "Work backwards from the draw. For an 8:30 AM appointment:" },
      {
        type: "ul",
        items: [
          { lead: "12 hours", text: "means your last bite is at 8:30 PM the night before." },
          { lead: "8 hours", text: "means your last bite is by 12:30 AM. For most people that’s just dinner, then nothing until the test." },
        ],
      },
      {
        type: "p",
        text: "Keep dinner ordinary. A huge or greasy meal is still working through your system the next morning, so the night before isn’t the time for a feast. And there’s no prize for going past 12 hours: a longer fast doesn’t make results better, and it makes feeling faint after the draw more likely.",
      },
      { type: "h2", id: "slipped", text: "If you ate, had coffee or trained by mistake" },
      {
        type: "p",
        text: "Say so before the draw. A glucose or triglyceride result taken after breakfast can look like a problem that isn’t there, and chasing it costs you another morning and maybe another bill. You may be asked to come back on a different day.",
      },
      {
        type: "p",
        text: "How much it matters depends on what’s being tested. A complete blood count isn’t changed by a recent meal, so a CBC on its own can often go ahead. A broad panel that includes glucose and lipids, like Healiam’s, is better rebooked than guessed at. At a Healiam fair, tell the team when you check in.",
      },
      { type: "h2", id: "medicines", text: "Medicines and supplements" },
      {
        type: "p",
        text: "Don’t stop a prescribed medicine just because you have blood work coming up. Many results are only useful if they show you on your usual treatment, and stopping some drugs suddenly is risky. If your doctor wants you to hold a dose, they’ll tell you.",
      },
      {
        type: "p",
        text: "Supplements are worth a mention of their own, biotin above all. Since 2017 the FDA has warned that high doses of this B vitamin, sold in many hair, skin and nail products, can make certain lab tests read falsely high or falsely low, hormone tests among them. Some of those products contain up to 650 times the recommended daily amount. If you take one, tell the lab, and ask your doctor whether to pause it before your test.",
      },
      { type: "h2", id: "healiam", text: "Getting ready for a Healiam blood test" },
      {
        type: "p",
        text: "Healiam’s health fairs run from 8:00 to 10:00 AM, so most of your fast happens while you sleep. The prep is the same at every fair:",
      },
      {
        type: "ul",
        items: [
          { text: "Nothing to eat for 8 to 12 hours, and keep sipping water throughout." },
          { text: "Coffee, tea, juice and gum wait until you’ve given blood." },
          { text: "No hard exercise for 24 hours beforehand." },
          { text: "Keep taking your medicines as your doctor advises." },
        ],
      },
      {
        type: "p",
        text: `Have the Healiam app on your phone and a credit card or HSA card with you; you don’t need an insurance card or a referral. The draw is two vials and takes about seven minutes, and then you can eat. The full panel costs $95 and covers ${link("56 lab measurements", "/tests")}, with results in the app in 4 to 5 business days. To see how that price compares with ordering tests from a lab yourself, read ${costPost("what a full blood panel costs without insurance")}.`,
      },
      {
        type: "p",
        text: `Fairs are running in ${states}. ${link("Check what the panel measures", "/tests")}, then ${link("pick a fair date that suits you", "/fairs")}.`,
      },
    ],
    faq: [
      {
        q: "What should you not do before a blood test?",
        a: "For a fasting test, don’t eat for 8 to 12 hours, and don’t drink anything but plain water: no coffee, tea, juice or soda. Skip gum, smoking, alcohol the day before and hard exercise in the 24 hours before. Don’t stop prescribed medicines unless your doctor tells you to.",
      },
      {
        q: "How long should you fast before a blood test?",
        a: "Usually 8 to 12 hours. Your doctor or lab may set a different time for a particular test, so follow the instructions you were given. An early-morning appointment means most of the fast happens overnight.",
      },
      {
        q: "Can you drink water before a fasting blood test?",
        a: "Yes. Plain water is allowed and helps, because veins are easier to draw from when you’re well hydrated. Avoid flavored or sweetened water, and water with lemon.",
      },
      {
        q: "Can you drink black coffee before a fasting blood test?",
        a: "No. Black coffee has no sugar, but it still contains caffeine, which makes you lose water. Stick to plain water until the draw is done.",
      },
      {
        q: "What happens if you accidentally eat before a fasting blood test?",
        a: "Tell the person drawing your blood before they start. Your glucose and triglycerides may read higher than usual, so you may be asked to come back another day. Tests that food doesn’t affect, such as a CBC, can often go ahead.",
      },
      {
        q: "Can you take your medication before a blood test?",
        a: "In most cases, yes, with water. Don’t stop a prescribed medicine unless your doctor tells you to, and ask them about any pill that has to be taken with food. Tell the lab about supplements too, biotin especially.",
      },
      {
        q: "Do I need to fast before a Healiam blood test?",
        a: "Yes: 8 to 12 hours without food before your draw, with water allowed. Skip coffee, tea, juice and gum, and avoid hard exercise for 24 hours. Fairs run from 8:00 to 10:00 AM, so you can eat soon after you wake up.",
      },
    ],
    cover: { figure: "8–12 hrs", label: "The usual fasting window before a blood test" },
    related: ["what-a-blood-test-can-tell-you", "whats-inside-50-measurements", "full-blood-panel-cost-without-insurance"],
  },
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
        text: `Healiam runs fairs in ${link("Texas", "/locations/texas")}, ${link("Colorado", "/locations/colorado")}, ${link("Georgia", "/locations/georgia")}, ${link("New Jersey", "/locations/new-jersey")} and ${link("New York", "/locations/new-york")}. ${link("See what’s tested", "/tests")} or ${link("find a health fair near you", "/fairs")}.`,
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
