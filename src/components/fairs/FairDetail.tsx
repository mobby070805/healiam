import { ArrowRight, ArrowUpRight, Building2, CalendarDays, Car, Check, Clock, FlaskConical, ListChecks, MapPin, Navigation } from "lucide-react";
import { fairs, fairHours, fairMapsUrl, type Fair } from "@/lib/fairs";
import { fairDetail } from "@/lib/pages/fair-detail";
import { fairPageCopy } from "@/lib/pages/fair-pages";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function FairDetailHero({ fair }: { fair: Fair }) {
  const { hero } = fairDetail;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="shell relative pb-10 pt-4 sm:pb-14 sm:pt-5">
        <Breadcrumbs crumbs={fairDetail.breadcrumb(fair)} onDark />

        <div className="grid gap-7 pt-7 sm:pt-9 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 sm:px-3.5 sm:py-1.5 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
              {hero.eyebrow}
            </span>

            <h1 className="mt-4 text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:mt-5 sm:text-[2.9rem] sm:leading-[1.04]">
              {hero.titleLead} <span className="text-brand">{fair.city}</span>
            </h1>
            <p className="mt-2.5 flex items-start gap-1.5 text-[14px] font-semibold text-white/80 sm:text-[16px]">
              <MapPin className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden="true" />
              {fair.venue ? `${fair.venue}, ${fair.locality}` : `${fair.street}, ${fair.locality}`}
            </p>

            <p className="mt-3.5 max-w-[34rem] text-[15px] leading-[1.6] text-white/70 sm:mt-4 sm:text-[16.5px] sm:leading-relaxed">
              {fair.intro}
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

          {/* When and where, side by side with the headline rather than buried below it. */}
          <dl className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:rounded-3xl sm:p-6">
            <div className="flex items-start gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white sm:h-11 sm:w-11">
                <CalendarDays className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                  {fairDetail.when.dateLabel}
                </dt>
                <dd className="mt-0.5 font-display text-[17px] font-bold tracking-[-0.01em] text-white sm:text-[19px]">
                  {fair.dateLabel}
                </dd>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3.5 border-t border-white/10 pt-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white sm:h-11 sm:w-11">
                <Clock className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                  {fairDetail.when.hoursLabel}
                </dt>
                <dd className="mt-0.5 font-display text-[17px] font-bold tracking-[-0.01em] text-white sm:text-[19px]">
                  {fairHours.label}
                </dd>
              </div>
            </div>

            <p className="mt-4 border-t border-white/10 pt-4 text-[13px] leading-snug text-white/60 sm:text-[14px]">
              {fairPageCopy(fair.slug).whenNote}
            </p>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function FairDirections({ fair }: { fair: Fair }) {
  const { directions } = fairDetail;
  return (
    <section id="directions" className="section bg-white" aria-labelledby="directions-title">
      <div className="shell">
        <div className="max-w-xl">
          <span className="eyebrow-text">{directions.eyebrow}</span>
          <h2 id="directions-title" className="h2">
            {fairPageCopy(fair.slug).directionsTitle}
          </h2>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2">
          <div className="card p-4 sm:p-6">
            <div className="flex items-start gap-3.5">
              <span className="icon-tile">
                <MapPin className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="h3">{directions.locationLabel}</h3>
                <address className="mt-1.5 not-italic">
                  {fair.venue && (
                    <span className="block text-[14px] font-semibold text-ink sm:text-[15.5px]">{fair.venue}</span>
                  )}
                  <span className="body block !text-[13.5px] sm:!text-[15px]">{fair.street}</span>
                  <span className="body block !text-[13.5px] sm:!text-[15px]">
                    {fair.locality}, {fair.region} {fair.postalCode}
                  </span>
                </address>
                {/* Directions live here, next to the address, where they make sense. */}
                <a
                  href={fairMapsUrl(fair)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-link mt-3"
                >
                  <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  {directions.mapsLabel}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-start gap-3.5">
              <span className="icon-tile">
                <Car className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="h3">{directions.parkingLabel}</h3>
                <p className="body mt-1.5 !text-[13.5px] sm:!text-[15px]">{fair.parking}</p>
                {fair.nearbyTowns && fair.nearbyTowns.length > 0 && (
                  <div className="mt-3.5 border-t border-ink/[0.07] pt-3">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {fairPageCopy(fair.slug).nearbyLabel}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Nearby towns">
                      {fair.nearbyTowns.map((town) => (
                        <li key={town} className="chip">
                          {town}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FairExpect({ fair }: { fair: Fair }) {
  const { expect } = fairDetail;
  const copy = fairPageCopy(fair.slug);
  return (
    <section id="expect" className="section bg-mist" aria-labelledby="expect-title">
      <div className="shell">
        <div className="max-w-xl">
          <span className="eyebrow-text">{expect.eyebrow}</span>
          <h2 id="expect-title" className="h2">
            {copy.expectTitle}
          </h2>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-4 sm:p-6">
            <div className="flex items-start gap-3.5">
              <span className="icon-tile">
                <Building2 className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="h3">{expect.venueLabel}</h3>
                <p className="body mt-1.5 sm:!text-[15.5px]">{fair.venueNote}</p>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3.5 border-t border-ink/[0.07] pt-4">
              <span className="icon-tile">
                <FlaskConical className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="h3">{expect.panelLabel}</h3>
                <p className="body mt-1.5 !text-[13.5px] sm:!text-[15px]">{copy.panelLine}</p>
                <a href={expect.panelCta.href} className="btn-link mt-2.5">
                  {expect.panelCta.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center gap-3.5">
              <span className="icon-tile">
                <ListChecks className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="h3">{expect.bringLabel}</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {copy.bring.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13.5px] leading-snug text-ink-soft sm:text-[15px]">
                  <Check className="mt-[3px] h-[18px] w-[18px] shrink-0 text-green" strokeWidth={2.4} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OtherFairs({ current }: { current: Fair }) {
  // Same-state fairs first, then the soonest, so the most useful alternatives come up (owner, 6 Nov 2026).
  const others = fairs
    .filter((f) => f.slug !== current.slug)
    .toSorted((a, b) => Number(b.region === current.region) - Number(a.region === current.region) || a.date.localeCompare(b.date))
    .slice(0, 3);
  if (others.length === 0) return null;

  return (
    <section className="section bg-white" aria-labelledby="other-fairs-title">
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="other-fairs-title" className="h2">
            {fairDetail.otherFairs.title}
          </h2>
          <a href={fairDetail.otherFairs.cta.href} className="btn-link">
            {fairDetail.otherFairs.cta.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-5 grid gap-3 sm:mt-7 sm:grid-cols-3 sm:gap-4">
          {others.map((fair) => (
            <li key={fair.slug}>
              <a href={fair.detailsUrl} className="card card-hover flex h-full flex-col p-4 sm:p-5">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-green/15 bg-green-tint px-2.5 py-1 text-[11.5px] font-semibold text-green-deep">
                  <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                  {fair.state}
                </span>
                <h3 className="h3 mt-3">{fair.city}</h3>
                <p className="body mt-1 flex-1 !text-[12.5px] sm:!text-[14px]">{fair.dateLabel}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink">
                  View details
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
