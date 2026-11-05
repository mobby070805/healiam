import { ArrowUpRight, Navigation } from "lucide-react";
import { fairMapsUrl, fairPhoto, type Fair } from "@/lib/fairs";
import { SectionHeading } from "@/components/SectionHeading";
import { LucideByName } from "@/components/LucideByName";
import { VenuePhoto } from "@/components/VenuePhoto";

// The next fair as one wide card: venue photo on one side, date, hours, address, parking, map link
// and booking on the other.
export function CityEventCard({
  event,
  fair,
  tone = "white",
}: {
  event: {
    readonly eyebrow: string;
    readonly title: string;
    readonly sub: string;
    readonly rows: readonly { readonly icon: string; readonly label: string; readonly value: string }[];
    readonly mapsLabel: string;
    readonly cta: { readonly label: string; readonly href: string };
  };
  fair: Fair;
  tone?: "white" | "mist";
}) {
  return (
    <section id="next-fair" className={`section ${tone === "white" ? "bg-white" : "bg-mist"}`} aria-labelledby="next-fair-title">
      <div className="shell">
        <SectionHeading id="next-fair-title" eyebrow={event.eyebrow} title={event.title} sub={event.sub} />

        <article className="card mx-auto grid max-w-4xl overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
          <VenuePhoto photo={fairPhoto(fair)} className="aspect-[16/9] w-full md:aspect-auto md:h-full" />
          <div className="p-5 sm:p-7">
            <dl className="divide-y divide-ink/10">
              {event.rows.map((row) => (
                <div key={row.label} className="flex items-start gap-3.5 py-3 first:pt-0">
                  <span className="icon-tile !h-10 !w-10 shrink-0">
                    <LucideByName name={row.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">{row.label}</dt>
                    <dd className="mt-0.5 text-[14.5px] font-semibold leading-snug text-ink sm:text-[15.5px]">{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <a href={fairMapsUrl(fair)} target="_blank" rel="noreferrer" className="btn-link mt-2">
              <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {event.mapsLabel}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
            <a href={event.cta.href} className="btn-primary mt-5 w-full">
              {event.cta.label}
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
