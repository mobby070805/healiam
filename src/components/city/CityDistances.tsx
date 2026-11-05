import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

// Nearby towns as a short bar chart of straight-line miles, closest first.
export function CityDistances({
  nearby,
}: {
  nearby: {
    readonly eyebrow: string;
    readonly title: string;
    readonly sub: string;
    readonly towns: readonly { readonly name: string; readonly miles: number }[];
    readonly stateLink: { readonly label: string; readonly href: string };
  };
}) {
  const max = Math.max(...nearby.towns.map((t) => t.miles));
  return (
    <section id="nearby" className="section bg-mist" aria-labelledby="nearby-title">
      <div className="shell">
        <SectionHeading id="nearby-title" eyebrow={nearby.eyebrow} title={nearby.title} sub={nearby.sub} />

        <ul className="card mx-auto max-w-2xl space-y-3.5 p-5 sm:p-7">
          {nearby.towns.map((town) => (
            <li key={town.name} className="grid grid-cols-[minmax(0,9.5rem)_1fr_auto] items-center gap-3 sm:grid-cols-[11rem_1fr_auto]">
              <span className="truncate text-[14px] font-semibold text-ink sm:text-[15px]">{town.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-mist" aria-hidden="true">
                <span className="block h-full rounded-full bg-ink" style={{ width: `${(town.miles / max) * 100}%` }} />
              </span>
              <span className="text-right text-[13px] tabular-nums text-ink-soft sm:text-[14px]">{town.miles.toFixed(1)} mi</span>
            </li>
          ))}
        </ul>

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
