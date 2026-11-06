"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Bean,
  CalendarDays,
  Car,
  ChartLine,
  CircleDollarSign,
  CreditCard,
  Droplet,
  FolderOpen,
  Gauge,
  Hourglass,
  Layers,
  Magnet,
  MapPin,
  Repeat,
  Smartphone,
  Stethoscope,
  Sun,
  Timer,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/lib/site";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";

// Explicit imports keep the client bundle small (no full icon map). Every comparison tab has an icon:
// add a new name here when a page uses one, or development throws (below) instead of showing a bare tab.
const factorIcons: Record<string, LucideIcon> = {
  Activity,
  Bean,
  CalendarDays,
  Car,
  ChartLine,
  CircleDollarSign,
  CreditCard,
  Droplet,
  FolderOpen,
  Gauge,
  Hourglass,
  Layers,
  Magnet,
  MapPin,
  Repeat,
  Smartphone,
  Stethoscope,
  Sun,
  Timer,
  TrainFront,
};

const AUTO_MS = 3000;
const PAUSE_MS = 6000;

// Fixed layout: factor tabs on the left, two panels with animated bars,
// badge top-right of "ours", one centred CTA whose label changes per factor.
export function Comparison({ comparison = page.comparison }: { comparison?: StateLandingPage["comparison"] }) {
  const factors = comparison.factors;
  const [active, setActive] = useState(0);
  const factor = factors[active];

  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduced = useReducedMotion();

  // Every screen size (client, 3 Nov 2026): auto-advance every 3s while on screen. A click
  // pauses it for a while, and it holds still while the pointer is over the section so
  // desktop visitors can read a panel or reach the CTA.
  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      if (hovering.current || Date.now() < pausedUntil.current) return;
      setActive((i) => (i + 1) % factors.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [inView, reduced, factors.length]);

  // Keep the active tab visible inside the horizontal strip without moving the page.
  useEffect(() => {
    const strip = stripRef.current;
    const tab = tabRefs.current[active];
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: tab.offsetLeft - strip.clientWidth / 2 + tab.clientWidth / 2, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const select = (i: number) => {
    pausedUntil.current = Date.now() + PAUSE_MS;
    setActive(i);
  };

  return (
    <section ref={sectionRef} id="why-healiam" className="section bg-mist" aria-labelledby="why-title">
      <div className="shell">
        <SectionHeading id="why-title" eyebrow={comparison.eyebrow} title={comparison.title} sub={comparison.sub} />

        <div
          className="mx-auto grid max-w-5xl gap-4 sm:gap-6 md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]"
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") hovering.current = true;
          }}
          onPointerLeave={() => {
            hovering.current = false;
          }}
        >
          <div
            ref={stripRef}
            role="tablist"
            aria-label="Compare by"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-col md:overflow-visible md:px-0"
          >
            {factors.map((f, i) => {
              const Icon = factorIcons[f.icon];
              if (!Icon && process.env.NODE_ENV !== "production") {
                throw new Error(`Comparison: no icon "${f.icon}" in factorIcons (tab "${f.tab}")`);
              }
              const selected = i === active;
              return (
                <button
                  key={f.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${f.id}`}
                  aria-selected={selected}
                  aria-controls="compare-panel"
                  onClick={() => select(i)}
                  className={`flex min-h-[40px] shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-semibold transition md:rounded-2xl md:px-4 md:py-3 md:text-[15px] ${
                    selected
                      ? "border-ink bg-ink text-white"
                      : "border-ink/10 bg-white text-ink-soft hover:border-ink/25 hover:text-ink"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
                  {f.tab}
                </button>
              );
            })}
          </div>

          <div id="compare-panel" role="tabpanel" aria-labelledby={`tab-${factor.id}`} aria-live="polite">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <Panel
                label={comparison.usualLabel}
                bar={factor.bar}
                value={factor.usual.value}
                note={factor.usual.note}
                level={factor.usual.level}
                factorId={factor.id}
                tone="usual"
              />
              <Panel
                label={comparison.oursLabel}
                bar={factor.bar}
                value={factor.ours.value}
                note={factor.ours.note}
                level={factor.ours.level}
                factorId={factor.id}
                tone="ours"
                badge={comparison.badge}
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8">
              <a href={factor.cta.href} className="btn-primary min-w-[13rem]">
                {factor.cta.label}
              </a>
              <p className="max-w-md text-center text-[11px] leading-relaxed text-ink-muted sm:text-[12px]">{comparison.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  label,
  bar,
  value,
  note,
  level,
  factorId,
  tone,
  badge,
}: {
  label: string;
  bar: string;
  value: string;
  note: string;
  level: number;
  factorId: string;
  tone: "usual" | "ours";
  badge?: string;
}) {
  const ours = tone === "ours";
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-3.5 sm:rounded-3xl sm:p-6 ${
        ours ? "border-ink/15 bg-white shadow-[0_20px_44px_-28px_rgba(10,10,15,0.4)]" : "border-ink/10 bg-white/60"
      }`}
    >
      {/* Fixed-height label row so both panels' values line up. */}
      <div className="flex h-5 items-center justify-between gap-2 sm:h-6">
        {ours ? (
          <p className="flex items-center gap-1.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.logoMark} alt="" width={18} height={19} className="logo-tint h-4 w-auto sm:h-5" />
            <span className="font-display text-[15px] font-bold tracking-tight text-ink sm:text-[18px]">{label}</span>
          </p>
        ) : (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted sm:text-[12px]">{label}</p>
        )}
        {badge && (
          <span className="hidden items-center gap-1 rounded-full bg-green-tint px-2 py-0.5 text-[11px] font-semibold text-green sm:inline-flex">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            {badge}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={factorId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="flex flex-1 flex-col"
        >
          <p
            className={`mt-3 min-h-[2.6em] font-display text-[16px] font-bold leading-tight sm:mt-4 sm:min-h-0 sm:text-[26px] ${
              ours ? "text-ink" : "text-ink-soft"
            }`}
          >
            {value}
          </p>
          <p className="mt-1.5 flex-1 text-[12px] leading-snug text-ink-muted sm:mt-2 sm:text-[14px]">{note}</p>

          <div className="mt-4 sm:mt-6">
            <div className="mb-1.5 flex justify-between text-[11px] font-medium text-ink-muted sm:text-[12px]">
              <span>{bar}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink/[0.07] sm:h-2.5">
              <motion.div
                className={`h-full origin-left rounded-full ${ours ? "bg-green" : "bg-ink-faint"}`}
                style={{ width: `${level}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
