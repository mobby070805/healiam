import { ArrowRight, CalendarClock, Route, Star } from "lucide-react";
import type { CityFairPage } from "@/lib/pages/plano-blood-testing";
import { SectionHeading } from "@/components/SectionHeading";

// Nearby towns with straight-line distances, the backup date, and evidence that Healiam returns to
// this city. Ends with a link up to the state page.
export function CityNearby({ page }: { page: CityFairPage }) {
  const { nearby } = page;
  return (
    <section id="nearby" className="section bg-mist" aria-labelledby="nearby-title">
      <div className="shell">
        <SectionHeading id="nearby-title" eyebrow={nearby.eyebrow} title={nearby.title} sub={nearby.sub} />

        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-3">
          <div className="card p-5 sm:p-6">
            <span className="icon-tile">
              <Route className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="h3 mt-4">{nearby.townsTitle}</h3>
            <ul className="mt-2 divide-y divide-ink/10">
              {nearby.towns.map((town) => (
                <li key={town.name} className="flex items-baseline justify-between gap-3 py-2.5">
                  <span className="font-semibold text-ink">{town.name}</span>
                  <span className="shrink-0 text-[13.5px] text-ink-soft">{town.distance}</span>
                </li>
              ))}
            </ul>
          </div>

          <a href={nearby.backup.cta.href} className="card card-hover group flex flex-col p-5 sm:p-6">
            <span className="icon-tile">
              <CalendarClock className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="h3 mt-4">{nearby.backup.title}</h3>
            <p className="body mt-1.5 flex-1 !text-[13.5px] sm:!text-[15px]">{nearby.backup.line}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
              {nearby.backup.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
            </span>
          </a>

          <div className="card p-5 sm:p-6">
            <span className="icon-tile">
              <Star className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="h3 mt-4">{nearby.history.title}</h3>
            <p className="body mt-1.5 !text-[13.5px] sm:!text-[15px]">{nearby.history.line}</p>
          </div>
        </div>

        <p className="mt-7 text-center sm:mt-9">
          <a href={nearby.stateLink.href} className="btn-link">
            {nearby.stateLink.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
