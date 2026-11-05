import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

// Nearby towns grouped by county, each with its straight-line distance, closest first.
export function CityTownGroups({
  nearby,
}: {
  nearby: {
    readonly eyebrow: string;
    readonly title: string;
    readonly sub: string;
    readonly groups: readonly {
      readonly name: string;
      readonly towns: readonly { readonly name: string; readonly miles: number }[];
    }[];
    readonly stateLink: { readonly label: string; readonly href: string };
  };
}) {
  return (
    <section id="nearby" className="section bg-mist" aria-labelledby="nearby-title">
      <div className="shell">
        <SectionHeading id="nearby-title" eyebrow={nearby.eyebrow} title={nearby.title} sub={nearby.sub} />

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {nearby.groups.map((group) => (
            <div key={group.name} className="card p-5 sm:p-6">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{group.name}</h3>
              <ul className="mt-2 divide-y divide-ink/10">
                {group.towns.map((town) => (
                  <li key={town.name} className="flex items-baseline justify-between gap-3 py-2.5">
                    <span className="font-semibold text-ink">{town.name}</span>
                    <span className="shrink-0 text-[13.5px] tabular-nums text-ink-soft">{town.miles.toFixed(1)} mi</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
