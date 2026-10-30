"use client";

import { useEffect, useState } from "react";
import type { StickyData } from "@/lib/types";

// Phones only. Shows once the hero is off screen, hides while the final CTA is visible.
export function StickyCta({ sticky }: { sticky: StickyData }) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const final = document.getElementById("final-cta");
    if (!hero || !final) return;
    const heroObs = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0 });
    const finalObs = new IntersectionObserver(([e]) => setFinalVisible(e.isIntersecting), { threshold: 0 });
    heroObs.observe(hero);
    finalObs.observe(final);
    return () => {
      heroObs.disconnect();
      finalObs.disconnect();
    };
  }, []);

  const show = !heroVisible && !finalVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-bold text-ink">{sticky.label}</p>
          <p className="truncate text-[12px] text-ink-muted">{sticky.sub}</p>
        </div>
        <a href={sticky.cta.href} className="btn-primary !px-5 !py-2.5" tabIndex={show ? 0 : -1}>
          {sticky.cta.label}
        </a>
      </div>
    </div>
  );
}
