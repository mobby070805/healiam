import { ChevronDown } from "lucide-react";
import { tests } from "@/lib/pages/tests";
import { panelCategories } from "@/lib/panel";

// Same dark band as the homepage hero, so the two pages read as one site.
// The panel card doubles as the visual: no stock photo, just the six icons.
export function TestsHero() {
  const { hero } = tests;
  const tiles = hero.card.tiles
    .map((slug) => panelCategories.find((c) => c.slug === slug))
    .filter((c): c is (typeof panelCategories)[number] => Boolean(c));

  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[-12%] top-[-25%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-8 pb-11 pt-8 sm:gap-10 sm:pb-16 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20 lg:pt-20">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:px-3.5 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-4 max-w-[16ch] text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:mt-6 sm:text-[3rem] sm:leading-[1.04] lg:text-[3.4rem]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-brand" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mt-3.5 max-w-[34rem] text-[15px] leading-[1.6] text-white/70 sm:mt-5 sm:text-[17px] sm:leading-relaxed">
            {hero.sub}
          </p>

          <div className="mt-5 flex max-w-[420px] items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:gap-3">
            <a
              href={hero.primary.href}
              className="btn-primary flex-1 !px-4 uppercase tracking-[0.05em] sm:flex-none sm:!px-7 sm:tracking-[0.06em]"
            >
              <span className="sm:hidden">{hero.primary.short}</span>
              <span className="hidden sm:inline">{hero.primary.label}</span>
            </a>
            <a href={hero.secondary.href} className="btn-on-ink flex-1 !px-4 sm:flex-none sm:!px-6">
              <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
              {hero.secondary.label}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-6">
          <p className="text-[13px] font-semibold text-white sm:text-[15px]">{hero.card.title}</p>
          <ul className="mt-3.5 grid grid-cols-3 gap-2.5 sm:mt-5 sm:gap-3">
            {tiles.map((cat) => (
              <li
                key={cat.slug}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-1.5 py-3.5 text-center sm:gap-2.5 sm:rounded-2xl sm:py-5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt=""
                  width={512}
                  height={512}
                  className="icon-white h-7 w-7 sm:h-9 sm:w-9"
                />
                <span className="text-[11px] font-medium text-white/80 sm:text-[13px]">
                  {cat.tile ?? cat.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
