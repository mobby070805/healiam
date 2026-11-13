"use client";

// The moving parts of a blog post page (layout from bolddesk.com's post pages, owner, 13 Nov 2026):
// the "In this page" list that marks the section being read, the reading bar under the header,
// the back-to-top button with its progress ring, and the share buttons.

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, ChevronUp, Link2, List, Mail } from "lucide-react";
import { BrandIcon, LinkedInLogo } from "@/components/blog/BrandIcons";

/** Share of the article read, 0 to 1: 0 at its top edge, 1 once its end reaches the bottom of the screen. */
function useArticleProgress(articleId: string) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = document.getElementById(articleId);
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      const span = el.offsetHeight - window.innerHeight + 64;
      setProgress(Math.min(1, Math.max(0, (window.scrollY - top) / Math.max(span, 1))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [articleId]);
  return progress;
}

/** Thin bar fixed under the 64px header. */
export function ReadingProgress({ articleId }: { articleId: string }) {
  const progress = useArticleProgress(articleId);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[3px]" aria-hidden="true">
      <div className="h-full origin-left bg-brand" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/** Round button, bottom right, with a ring that fills as the article is read. */
export function BackToTop({ articleId }: { articleId: string }) {
  const progress = useArticleProgress(articleId);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const r = 25;
  const c = 2 * Math.PI * r;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      // Phones: sits above the sticky booking bar.
      className={`fixed bottom-[92px] right-4 z-30 grid h-12 w-12 place-items-center rounded-full bg-white text-brand-deep shadow-[0_2px_10px_rgba(10,10,15,0.12)] transition-opacity duration-200 md:bottom-8 md:right-6 md:h-14 md:w-14 ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="2" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#E83656"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <ArrowUp className="relative h-5 w-5" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

/** "In this page": folds open and shut; the section on screen is marked and kept in view in the list. */
export function ArticleToc({ sections }: { sections: readonly { id: string; text: string }[] }) {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const targets = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    // The current section is the last heading that has passed a line a third of the way down.
    const pick = () => {
      const line = window.innerHeight / 3;
      let current = targets[0]?.id ?? "";
      for (const el of targets) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          pick();
        });
    };
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  // Scroll the list (not the page) so the marked item stays visible.
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !item) return;
    const top = item.offsetTop; // the list is position: relative, so this is measured from the list
    if (top < list.scrollTop || top + item.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: top - list.clientHeight / 3, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav aria-label="In this page" className="rounded-2xl border border-ink/[0.12] bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="toc-list"
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5"
      >
        <List className="h-5 w-5 shrink-0 text-ink" strokeWidth={1.8} aria-hidden="true" />
        <span className="flex-1 text-[14.5px] font-semibold text-ink">In this page</span>
        <ChevronUp
          className={`h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 ${open ? "" : "rotate-180"}`}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
      <ul
        id="toc-list"
        ref={listRef}
        hidden={!open}
        className="no-scrollbar relative mx-4 mb-4 max-h-[232px] space-y-0.5 lg:max-h-[140px] overflow-y-auto sm:mx-6"
      >
        {sections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} data-id={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`block border-l-2 py-1.5 pl-3 text-[14px] leading-snug transition-colors duration-150 ${
                  on ? "border-brand font-medium text-brand-deep" : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                {s.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const round =
  "grid h-10 w-10 place-items-center rounded-full border border-ink/[0.12] bg-white text-ink transition-colors duration-150 hover:border-ink/35 hover:bg-mist";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: <BrandIcon brand="facebook" className="h-5 w-5 text-[#0866FF]" /> },
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, icon: <BrandIcon brand="x" className="h-4 w-4 text-black" /> },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <LinkedInLogo /> },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${t}%20${u}`,
      icon: <BrandIcon brand="whatsapp" className="h-5 w-5 text-[#25D366]" />,
    },
    {
      label: "Share by email",
      href: `mailto:?subject=${t}&body=${u}`,
      icon: <Mail className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />,
    },
  ];
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label} className={round}>
            {l.icon}
          </a>
        </li>
      ))}
      <li>
        <button
          type="button"
          aria-label={copied ? "Link copied" : "Copy link"}
          title={copied ? "Link copied" : "Copy link"}
          className={round}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              /* clipboard blocked: nothing to do */
            }
          }}
        >
          {copied ? (
            <Check className="h-[18px] w-[18px] text-green" strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Link2 className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
          )}
        </button>
      </li>
    </ul>
  );
}
