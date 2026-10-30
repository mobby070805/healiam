"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  ClipboardList,
  CreditCard,
  FlaskConical,
  LineChart,
  Syringe,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { demo } from "@/lib/pages/demo";

// Named imports, not LucideByName: this is a client component, and the dynamic lookup
// drags the whole icon set into the browser bundle (271 kB first load, versus 105 kB).
const icons: Record<string, LucideIcon> = {
  UserPlus,
  Users,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Syringe,
  FlaskConical,
  LineChart,
};

const { journey } = demo;
const stages = journey.stages;

// A stepper, not eight fabricated app screenshots: the phone shows a schematic of each
// stage, so nothing here claims to be a real screen we cannot show.
export function DemoJourney() {
  const [index, setIndex] = useState(0);
  const stage = stages[index];

  const go = useCallback((next: number) => {
    setIndex(Math.min(stages.length - 1, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  return (
    <section id="journey" className="section bg-white" aria-labelledby="journey-title">
      <div className="shell">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-9">
          <span className="eyebrow-text">{journey.eyebrow}</span>
          <h2 id="journey-title" className="h2">
            {journey.title}
          </h2>
          <p className="body mt-2.5">{journey.hint}</p>
        </div>

        {/* Stage picker. Scrolls on phones rather than wrapping into four ragged rows. */}
        <nav aria-label="Demo stages">
          <ol className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {stages.map((s, i) => {
              const done = i < index;
              const current = i === index;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-150 sm:text-[13.5px] ${
                      current
                        ? "border-ink bg-ink text-white"
                        : done
                          ? "border-green/20 bg-green-tint text-green-deep"
                          : "border-ink/10 bg-mist text-ink-soft hover:border-ink/30"
                    }`}
                  >
                    {done ? (
                      <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.6} aria-hidden="true" />
                    ) : (
                      <span className="tabular-nums opacity-60">{i + 1}</span>
                    )}
                    {s.nav}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-6 grid gap-6 sm:mt-9 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-14">
          <StagePhone index={index} />

          <div className="min-w-0">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-brand-deep">
              Stage {index + 1} of {stages.length}
            </p>
            <h3 className="mt-2 font-display text-[22px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[30px]">
              {stage.title}
            </h3>
            <p className="lead mt-2.5">{stage.line}</p>

            <ul className="mt-5 space-y-3 sm:mt-6">
              {stage.facts.map((fact) => (
                <li key={fact} className="flex gap-3 text-[14.5px] text-ink-soft sm:text-[15.5px]">
                  <Check className="mt-[3px] h-[18px] w-[18px] shrink-0 text-green" strokeWidth={2.4} aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2.5 sm:mt-8 sm:gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                disabled={index === 0}
                className="btn-ghost !px-5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {journey.prev}
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                disabled={index === stages.length - 1}
                className="btn-primary !px-5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {journey.next}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageIcon({ name }: { name: string }) {
  const Icon = icons[name];
  return Icon ? <Icon className="h-[2.4em] w-[2.4em]" strokeWidth={1.7} aria-hidden="true" /> : null;
}

function StagePhone({ index }: { index: number }) {
  const stage = stages[index];
  return (
    <div className="mx-auto w-full max-w-[260px] text-[9px] sm:max-w-[280px] sm:text-[9.7px]">
      <div className="relative w-[26em] max-w-full rounded-[3.2em] bg-ink p-[0.55em] ring-1 ring-ink/10">
        <div className="relative h-[46em] overflow-hidden rounded-[2.7em] bg-white">
          <span
            className="absolute left-1/2 top-[0.9em] z-20 h-[1.9em] w-[8em] -translate-x-1/2 rounded-full bg-ink"
            aria-hidden="true"
          />

          <div className="flex h-full flex-col px-[1.8em] pb-[2.4em] pt-[4.4em]">
            <p className="text-[1.15em] font-semibold uppercase tracking-[0.14em] text-brand">
              Step {index + 1} of {stages.length}
            </p>

            <span className="mt-[1.4em] grid h-[5em] w-[5em] place-items-center rounded-[1.4em] border border-ink/10 bg-mist text-ink">
              <StageIcon name={stage.icon} />
            </span>

            <p className="mt-[1.4em] font-display text-[2.2em] font-bold leading-tight tracking-[-0.02em] text-ink">
              {stage.title}
            </p>

            <ul className="mt-[1.6em] space-y-[0.9em]">
              {stage.facts.map((fact) => (
                <li key={fact} className="flex items-start gap-[0.7em] rounded-[1em] bg-mist px-[1em] py-[0.9em]">
                  <Check className="mt-[0.15em] h-[1.3em] w-[1.3em] shrink-0 text-green" strokeWidth={2.6} aria-hidden="true" />
                  <span className="text-[1.25em] leading-snug text-ink-soft">{fact}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex gap-[0.5em]" aria-hidden="true">
              {stages.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-[0.35em] flex-1 rounded-full ${i <= index ? "bg-brand" : "bg-ink/10"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
