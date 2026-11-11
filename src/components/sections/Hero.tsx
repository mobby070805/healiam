import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { HeroVisual } from "@/components/sections/HeroVisual";

export function Hero({
  hero = page.hero,
  breadcrumb = page.breadcrumb,
  heroVisual = page.heroVisual,
}: {
  hero?: StateLandingPage["hero"];
  breadcrumb?: StateLandingPage["breadcrumb"];
  heroVisual?: StateLandingPage["heroVisual"];
}) {
  const cityTitle = splitCityTitle(hero.titleLead);
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative grid items-center gap-9 pb-10 pt-5 sm:pb-16 sm:pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:pb-24 lg:pt-16">
        <div>
          <nav aria-label="Breadcrumb" className="mb-4 text-[12px] text-ink-muted sm:mb-6 sm:text-[13px]">
            <ol className="flex items-center gap-1.5">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.name} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {"href" in crumb ? (
                    <a href={crumb.href} className="relative before:absolute before:-inset-x-1 before:-inset-y-3 hover:text-ink">
                      {crumb.name}
                    </a>
                  ) : (
                    <span aria-current="page" className="text-ink-soft">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {cityTitle ? (
            // City pages on phones: two even lines, "Blood testing in Plano, TX" / "for $95" (owner, 6 Nov 2026).
            // The phone size scales to the city name so line one fits; from sm up it is the usual H1.
            <h1
              style={{ "--h1-fit": cityTitle.fit } as CSSProperties}
              className="text-[length:var(--h1-fit)] font-extrabold leading-[1.08] tracking-[-0.03em] max-sm:[text-wrap:wrap] sm:max-w-[14ch] sm:text-5xl sm:leading-[1.06] lg:text-[3.6rem] xl:text-[4.1rem]"
            >
              <span className="max-sm:whitespace-nowrap">{cityTitle.main}</span>{" "}
              <span className="max-sm:whitespace-nowrap">
                for <span className="text-green">{hero.titleAccent}</span>
              </span>
            </h1>
          ) : (
            <h1 className="max-w-[14ch] text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]">
              {hero.titleLead} <span className="text-green">{hero.titleAccent}</span>
            </h1>
          )}

          <p className="lead mt-4 max-w-[34rem] sm:mt-6">{hero.sub}</p>

          <div className="mt-6 flex flex-nowrap gap-2.5 sm:mt-8 sm:gap-3">
            <a href={hero.primary.href} className="btn-primary">
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className="btn-ghost">
              {hero.secondary.label}
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] font-medium text-ink-soft sm:mt-6 sm:gap-x-6 sm:text-[14px]">
            {hero.ticks.map((tick) => (
              <li key={tick} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-green" strokeWidth={2.6} aria-hidden="true" />
                {tick}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual data={heroVisual} />
      </div>
    </section>
  );
}

/**
 * "Blood testing in Plano, TX for" -> main "Blood testing in Plano, TX", plus a phone font size that fits it on
 * one line (measured: about 0.43em per character in this heading, 0.44 leaves a margin; never above the
 * usual 2.1rem or below 1.3rem).
 * State pages ("Your complete blood test in Texas for") return null and keep their usual H1.
 */
function splitCityTitle(lead: string): { main: string; fit: string } | null {
  const m = lead.match(/^(Blood testing in .+?)\s+for$/);
  if (!m) return null;
  const main = m[1];
  return { main, fit: `clamp(1.3rem, calc((100vw - 2.5rem) / ${(main.length * 0.44).toFixed(2)}), 2.1rem)` };
}
