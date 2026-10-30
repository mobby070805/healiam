import { CirclePlay } from "lucide-react";
import { home } from "@/lib/pages/home";
import { HeroPhones } from "@/components/home/HeroPhones";
import { NoBreak } from "@/components/NoBreak";

// One glance: what Healiam does (preventive blood testing), who it is for (anyone who wants
// answers without a referral or insurance), why it matters (your blood drives the diagnosis)
// and the action (book). Dark band, per the approved design.
export function HomeHero() {
  const { hero } = home;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Soft warm wash behind the phones, so the dark band is not flat. */}
      <div
        className="pointer-events-none absolute bottom-[-14%] left-1/2 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.16),transparent_62%)] sm:bottom-auto sm:left-auto sm:right-[-10%] sm:top-[-20%] sm:h-[640px] sm:w-[640px] sm:translate-x-0 sm:bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-6 pb-0 pt-7 sm:gap-10 sm:pb-16 sm:pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:px-3.5 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-4 max-w-[14ch] text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:mt-6 sm:text-[3.3rem] sm:leading-[1.03] sm:tracking-[-0.035em] lg:text-[3.7rem] xl:text-[4.2rem]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-brand" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mt-3.5 max-w-[34rem] text-[15px] font-normal leading-[1.6] text-white/75 sm:mt-6 sm:text-[18px] sm:leading-relaxed">
            <NoBreak text={hero.sub} />
          </p>

          <a
            href={hero.watch.href}
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-white/85 transition-colors duration-150 hover:text-white sm:mt-8 sm:text-[15px]"
          >
            <CirclePlay className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
            {hero.watch.label}
          </a>

          {/* One row at every width. Phones get the short labels, or neither button fits. */}
          <div className="mt-4 flex max-w-[420px] items-stretch gap-2.5 sm:mt-6 sm:max-w-none sm:gap-3">
            <a
              href={hero.primary.href}
              className="btn-primary flex-1 !px-4 uppercase tracking-[0.05em] sm:flex-none sm:!px-7 sm:tracking-[0.06em]"
            >
              <span className="sm:hidden">{hero.primary.short}</span>
              <span className="hidden sm:inline">{hero.primary.label}</span>
            </a>
            <a href={hero.secondary.href} className="btn-on-ink flex-1 !gap-2.5 !px-4 sm:flex-none sm:!px-6">
              <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
                {hero.secondary.icons.map((icon) => (
                  <img
                    key={icon.src}
                    src={icon.src}
                    alt=""
                    width={96}
                    height={96}
                    className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]"
                  />
                ))}
              </span>
              <span className="sm:hidden">{hero.secondary.short}</span>
              <span className="hidden sm:inline">{hero.secondary.label}</span>
            </a>
          </div>
        </div>

        <HeroPhones data={home.heroPhones} />
      </div>
    </section>
  );
}
