import { Check } from "lucide-react";
import { page } from "@/lib/pages/texas-blood-test";
import { HeroVisual } from "@/components/sections/HeroVisual";

export function Hero() {
  const { hero, breadcrumb } = page;
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
                    <a href={crumb.href} className="hover:text-ink">
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

          <h1 className="max-w-[14ch] text-[2.1rem] font-extrabold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]">
            {hero.titleLead} <span className="text-green">{hero.titleAccent}</span>
          </h1>

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

        <HeroVisual data={page.heroVisual} />
      </div>
    </section>
  );
}
