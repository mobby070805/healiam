import { fairHours, type Fair } from "@/lib/fairs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LucideByName } from "@/components/LucideByName";
import { FairDateStatus } from "@/components/city/FairDateStatus";

type Link = { readonly label: string; readonly href: string };

export type CityHeroPage = {
  readonly breadcrumb: readonly { readonly name: string; readonly href?: string }[];
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly sub: string;
    readonly primary: Link & { readonly short: string };
    readonly secondary: Link;
    readonly glance: {
      readonly title: string;
      readonly rows: readonly { readonly icon: string; readonly label: string; readonly value: string; readonly note: string }[];
      readonly nextLabel: string;
      /** Shown under the next fair date: hours, time zone and venue. */
      readonly nextNote: string;
      /** The line under the card: walk-ins where confirmed, otherwise how to book. */
      readonly walkIn: string;
      readonly upcoming: string;
      readonly ended: string;
      readonly endedCta: Link;
    };
  };
};

// City page hero: city-led headline and copy on the left; on the right, what blood testing in this
// city means at a glance, with the next fair as one row (owner, 5 Nov 2026: city page first, fair
// second). The fair's own details sit further down the page.
export function CityHero({ page, fair }: { page: CityHeroPage; fair: Fair }) {
  const { hero } = page;
  const { glance } = hero;

  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="shell relative pb-10 pt-4 sm:pb-14 sm:pt-5">
        <Breadcrumbs crumbs={page.breadcrumb} onDark />

        <div className="grid gap-7 pt-7 sm:pt-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {hero.eyebrow}
            </span>

            <h1 className="mt-4 text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:mt-5 sm:text-[2.9rem] sm:leading-[1.04]">
              {hero.title}
            </h1>

            <p className="mt-3.5 max-w-[34rem] text-[15px] leading-[1.6] text-white/70 sm:mt-4 sm:text-[16.5px] sm:leading-relaxed">
              {hero.sub}
            </p>

            <div className="mt-5 flex max-w-[420px] items-stretch gap-2.5 sm:mt-6 sm:max-w-none sm:gap-3">
              <a href={hero.primary.href} className="btn-primary flex-1 !px-4 sm:flex-none sm:!px-7">
                <span className="sm:hidden">{hero.primary.short}</span>
                <span className="hidden sm:inline">{hero.primary.label}</span>
              </a>
              <a href={hero.secondary.href} className="btn-on-ink flex-1 !px-4 sm:flex-none sm:!px-6">
                {hero.secondary.label}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{glance.title}</p>
            <dl className="mt-3">
              {glance.rows.map((row, i) => (
                <div key={row.label} className={`flex items-start gap-3.5 ${i > 0 ? "mt-3.5 border-t border-white/10 pt-3.5" : ""}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white">
                    <LucideByName name={row.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{row.label}</dt>
                    <dd className="mt-0.5 font-display text-[16.5px] font-bold tracking-[-0.01em] text-white sm:text-[18px]">
                      {row.value}
                    </dd>
                    <dd className="text-[13px] text-white/60">{row.note}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">{glance.nextLabel}</p>
                <FairDateStatus
                  date={fair.date}
                  end={fairHours.end}
                  utcOffset={fair.utcOffset}
                  upcoming={glance.upcoming}
                  ended={glance.ended}
                  endedCta={glance.endedCta}
                />
              </div>
              <p className="mt-1 font-display text-[15.5px] font-bold text-white sm:text-[16.5px]">{fair.dateLabel}</p>
              <p className="text-[13px] text-white/60">{glance.nextNote}</p>
            </div>

            <p className="mt-3.5 text-[13px] leading-snug text-white/60 sm:text-[13.5px]">{glance.walkIn}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
