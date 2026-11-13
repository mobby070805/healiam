// Static pieces of a blog post page, laid out after bolddesk.com's post pages (owner, 13 Nov 2026).

import { ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { formatPostDate, type AuthorProfile, type BlogPost } from "@/lib/pages/blog";
import { LinkedInLogo } from "@/components/blog/BrandIcons";
import { RichText } from "@/components/RichText";
import { panelCategories } from "@/lib/panel";
import { tests } from "@/lib/pages/tests";

/**
 * Author picture: the writer's photo in a circle; their initials on Healiam black if there is no photo;
 * Healiam's mark in a pink circle for posts signed "Healiam".
 */
export function AuthorAvatar({ profile, size = "sm" }: { profile?: AuthorProfile; size?: "sm" | "lg" }) {
  const box = size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-8 w-8";
  if (profile?.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={profile.photo} alt="" width={160} height={160} className={`shrink-0 rounded-full object-cover ${box}`} />
    );
  }
  if (profile) {
    const text = size === "lg" ? "text-[20px] sm:text-[24px]" : "text-[12px]";
    return (
      <span className={`grid shrink-0 place-items-center rounded-full bg-ink font-bold tracking-[-0.01em] text-white ${box} ${text}`} aria-hidden="true">
        {profile.initials}
      </span>
    );
  }
  const img = size === "lg" ? "h-7 sm:h-9" : "h-3.5";
  return (
    <span className={`grid shrink-0 place-items-center rounded-full bg-brand ${box}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={site.logoMark} alt="" width={24} height={25} className={`w-auto ${img}`} />
    </span>
  );
}

/**
 * Drawn cover for the title block while a post has no banner image: the post's key figure on
 * Healiam black. A banner set in lib/pages/blog.ts replaces it.
 */
export function PostCover({ topic, figure, label }: { topic: string; figure: string; label: string }) {
  return (
    <div className="relative isolate flex aspect-[16/9] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-9 lg:aspect-[16/10]">
      <div className="grid-backdrop-dark absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand/40 blur-3xl"
        aria-hidden="true"
      />
      <span className="self-start rounded-full border border-white/20 px-3 py-1 text-[12px] font-medium text-white/80 sm:text-[13px]">
        {topic}
      </span>
      <div>
        <p className="text-[2.5rem] font-extrabold leading-none tracking-[-0.035em] sm:text-[4rem]">{figure}</p>
        <p className="mt-3 max-w-[26ch] text-[14px] leading-snug text-white/70 sm:text-[17px]">{label}</p>
      </div>
      <span className="absolute bottom-6 right-6 flex items-center gap-1.5 sm:bottom-9 sm:right-9" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.logoMark} alt="" width={24} height={25} className="h-4 w-auto sm:h-5" />
        <span className="text-[14px] font-bold tracking-tight sm:text-[16px]">{site.name}</span>
      </span>
    </div>
  );
}

// The six areas shown on the booking cards: the same six as "What's inside the panel" on /tests.
export const cardTiles = tests.hero.card.tiles
  .map((slug) => panelCategories.find((c) => c.slug === slug))
  .filter((c): c is (typeof panelCategories)[number] => Boolean(c));

/**
 * Booking card in the sidebar, in the style of the "What's inside the panel" card on /tests: Healiam
 * black, no pink fill (owner, 13 Nov 2026). It leads with 50+ measurements in one panel and keeps the
 * price framed as one panel at one price, never "$95 for 50+ tests" (client, 6 Nov 2026).
 */
export function SidebarCta() {
  return (
    <div className="on-dark relative isolate overflow-hidden rounded-2xl bg-ink p-5 text-white">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 -top-28 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.16),transparent_62%)]"
        aria-hidden="true"
      />
      <span className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.logoMark} alt="" width={24} height={25} className="logo-tint h-5 w-auto" />
        <span className="text-[16px] font-bold tracking-tight">{site.name}</span>
      </span>
      <p className="mt-4 text-[24px] font-extrabold leading-[1.12] tracking-[-0.03em]">
        One panel, <span className="text-brand">50+ measurements</span>
      </p>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-white/65">
        Blood counts, thyroid, electrolytes, lipids, kidney, liver, diabetes and more, from a single draw.
      </p>
      <ul className="mt-4 grid grid-cols-3 gap-2">
        {cardTiles.map((cat) => (
          <li
            key={cat.slug}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-1 py-2.5 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cat.image} alt="" width={512} height={512} className="icon-white h-6 w-6" />
            <span className="text-[11.5px] font-medium text-white/80">{cat.tile ?? cat.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-white/10 pt-4">
        <span className="text-[13px] text-white/65">Price for the full panel</span>
        <span className="text-[28px] font-extrabold leading-none tracking-[-0.03em]">{site.price.display}</span>
      </div>
      <a href={site.bookingUrl} className="btn-primary mt-4 w-full">
        Book your spot
      </a>
      <p className="mt-2.5 text-center text-[12.5px] text-white/55">No referral · No insurance needed</p>
    </div>
  );
}

/**
 * "Summarize with": opens the post in an AI assistant with a summary prompt filled in. Each button is
 * the assistant's own app icon, downloaded from its website on 13 Nov 2026 (public/brands/), as on
 * bolddesk.com. The name shows on hover and to screen readers.
 */
export function SummarizeWith({ url }: { url: string }) {
  const q = encodeURIComponent(`Summarize this article from Healiam: ${url}`);
  const tools = [
    { name: "ChatGPT", icon: "/brands/chatgpt.png", href: `https://chatgpt.com/?q=${q}` },
    { name: "Claude", icon: "/brands/claude.png", href: `https://claude.ai/new?q=${q}` },
    { name: "Perplexity", icon: "/brands/perplexity.png", href: `https://www.perplexity.ai/search?q=${q}` },
    { name: "Grok", icon: "/brands/grok.png", href: `https://grok.com/?q=${q}` },
  ];
  return (
    <div>
      <p className="text-[17px] font-bold tracking-[-0.01em] text-ink">Summarize with:</p>
      <ul className="mt-3 flex flex-wrap gap-3">
        {tools.map((t) => (
          <li key={t.name}>
            <a
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Summarize with ${t.name}`}
              title={`Summarize with ${t.name}`}
              className="block overflow-hidden rounded-xl border border-ink/[0.12] transition-opacity duration-150 hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.icon} alt="" width={48} height={48} className="h-12 w-12" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "FAQs": questions with a line under each and a chevron that turns when open. */
export function ArticleFaq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-12 scroll-mt-28 sm:mt-14">
      <h2 id="faq-title" className="text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink sm:text-[2.4rem]">
        FAQs
      </h2>
      <div className="mt-3 sm:mt-4">
        {items.map((item) => (
          <details key={item.q} className="group border-b border-ink/[0.12]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-[16.5px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[19px]">{item.q}</h3>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </summary>
            <p className="-mt-1 pb-5 pr-9 text-[15.5px] leading-[1.75] text-ink-soft sm:text-[16.5px]">
              <RichText text={item.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

const authorLink =
  "inline-flex min-h-[36px] items-center gap-1.5 text-[14.5px] font-semibold text-brand-deep transition-colors duration-150 hover:text-brand-hover";

/** "About the author" box: the writer's profile, or Healiam for posts signed "Healiam". */
export function AboutAuthor({ profile }: { profile?: AuthorProfile }) {
  return (
    <section id="author" aria-labelledby="author-title" className="mt-12 scroll-mt-28 rounded-2xl bg-mist p-6 sm:mt-14 sm:p-8">
      <h2 id="author-title" className="text-[17px] font-bold uppercase tracking-[0.02em] text-ink sm:text-[20px]">
        About the author
      </h2>
      <div className="mt-5 flex flex-col gap-5 border-t border-ink/[0.1] pt-6 sm:flex-row sm:gap-6">
        <AuthorAvatar profile={profile} size="lg" />
        {profile ? (
          <div>
            <p className="text-[19px] font-bold tracking-[-0.015em] text-ink sm:text-[21px]">{profile.name}</p>
            <p className="mt-0.5 text-[14.5px] font-medium text-ink-muted sm:text-[15px]">{profile.role}</p>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-soft sm:text-[15px]">{profile.bio}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1">
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className={authorLink}>
                Read more articles by this author
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={authorLink}>
                <LinkedInLogo />
                LinkedIn
              </a>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[19px] font-bold tracking-[-0.015em] text-ink sm:text-[21px]">{site.name}</p>
            <p className="mt-2 text-[14.5px] leading-[1.7] text-ink-soft sm:text-[15px]">
              Healiam runs blood screening at community health fairs: one {site.price.display} panel with 56 lab
              measurements and 6 biometrics, with no referral and no insurance needed. Our articles explain what the
              numbers on a blood report mean and what lab work costs, checked against published prices and rates.
            </p>
            <a href={site.links.blog} className={`mt-4 ${authorLink}`}>
              Read more articles by Healiam
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/** "Explore more content" card: banner on top when the post has one, then title, author and date. */
export function ExploreCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/[0.12] bg-white transition-colors duration-150 hover:border-ink/30"
    >
      {post.banner && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.banner.src} alt={post.banner.alt} className="aspect-[16/9] w-full border-b border-ink/[0.08] object-cover" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <span className="self-start rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium text-ink-soft">{post.topic}</span>
        <h3 className="mt-3 text-[18px] font-bold leading-snug tracking-[-0.015em] text-ink group-hover:underline group-hover:decoration-ink/25 group-hover:underline-offset-4 sm:text-[19px]">
          {post.title}
        </h3>
        <p className="mt-auto pt-5 text-[14px] text-ink-muted">
          by <span className="font-semibold text-ink-soft">{post.author}</span>
          <br />
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
      </div>
    </a>
  );
}
