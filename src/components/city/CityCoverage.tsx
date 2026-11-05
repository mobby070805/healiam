import { ArrowRight, CalendarPlus, Route } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

// For a city with one fair and few nearby towns: the towns and their distances beside a card asking
// people further away to request a fair.
export function CityCoverage({
  coverage,
}: {
  coverage: {
    readonly eyebrow: string;
    readonly title: string;
    readonly sub: string;
    readonly listTitle: string;
    readonly towns: readonly { readonly name: string; readonly miles: number }[];
    readonly request: { readonly title: string; readonly line: string; readonly cta: { readonly label: string; readonly href: string } };
    readonly stateLink: { readonly label: string; readonly href: string };
  };
}) {
  return (
    <section id="nearby" className="section bg-mist" aria-labelledby="nearby-title">
      <div className="shell">
        <SectionHeading id="nearby-title" eyebrow={coverage.eyebrow} title={coverage.title} sub={coverage.sub} />

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="card p-5 sm:p-6">
            <span className="icon-tile">
              <Route className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="h3 mt-4">{coverage.listTitle}</h3>
            <ul className="mt-2 divide-y divide-ink/10">
              {coverage.towns.map((town) => (
                <li key={town.name} className="flex items-baseline justify-between gap-3 py-2.5">
                  <span className="font-semibold text-ink">{town.name}</span>
                  <span className="shrink-0 text-[13.5px] tabular-nums text-ink-soft">{town.miles.toFixed(1)} mi</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={coverage.request.cta.href}
            className="card card-hover group flex flex-col border-dashed !border-ink/20 p-5 sm:p-6"
          >
            <span className="icon-tile">
              <CalendarPlus className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="h3 mt-4">{coverage.request.title}</h3>
            <p className="body mt-1.5 flex-1 !text-[13.5px] sm:!text-[15px]">{coverage.request.line}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink">
              {coverage.request.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
            </span>
          </a>
        </div>

        <p className="mt-7 text-center sm:mt-9">
          <a href={coverage.stateLink.href} className="btn-link">
            {coverage.stateLink.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
