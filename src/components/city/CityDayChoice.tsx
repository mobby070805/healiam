import { ArrowUpRight, CalendarDays, Car, MapPin, Navigation } from "lucide-react";
import { fairMapsUrl, fairPhoto, type Fair } from "@/lib/fairs";
import { SectionHeading } from "@/components/SectionHeading";
import { VenuePhoto } from "@/components/VenuePhoto";

type Option = {
  readonly tag: string;
  readonly name: string;
  readonly dateLabel: string;
  readonly place: string;
  readonly line: string;
  readonly cta: { readonly label: string; readonly href: string };
  readonly fair: Fair;
  readonly primary: boolean;
};

// Two fairs in the same metro side by side, so a visitor can pick the day and side of town.
// The page's own fair comes first and carries the booking button.
export function CityDayChoice({
  day,
  tone = "mist",
}: {
  day: { readonly eyebrow: string; readonly title: string; readonly sub: string; readonly options: readonly Option[] };
  tone?: "white" | "mist";
}) {
  return (
    <section id="day" className={`section ${tone === "white" ? "bg-white" : "bg-mist"}`} aria-labelledby="day-title">
      <div className="shell">
        <SectionHeading id="day-title" eyebrow={day.eyebrow} title={day.title} sub={day.sub} />

        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {day.options.map((option) => (
            <article
              key={option.name}
              className={`card flex flex-col overflow-hidden ${option.primary ? "ring-2 ring-ink" : ""}`}
            >
              <VenuePhoto photo={fairPhoto(option.fair)} className="aspect-[5/2] w-full" />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${option.primary ? "bg-ink text-white" : "bg-mist text-ink-soft"}`}
                >
                  {option.tag}
                </span>
                <h3 className="h3 mt-3 sm:!text-[22px]">{option.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-[14px] font-semibold text-ink sm:text-[15px]">
                  <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  {option.dateLabel}
                </p>
                <p className="mt-1 flex items-start gap-2 text-[13.5px] text-ink-soft sm:text-[14.5px]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  {option.place}
                </p>
                <p className="mt-1 flex items-start gap-2 text-[13.5px] text-ink-soft sm:text-[14.5px]">
                  <Car className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  {option.line}
                </p>
                <a href={fairMapsUrl(option.fair)} target="_blank" rel="noreferrer" className="btn-link mt-3">
                  <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Open in Google Maps
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </a>
                <div className="mt-auto pt-5">
                  <a href={option.cta.href} className={option.primary ? "btn-primary w-full" : "btn-ghost w-full"}>
                    {option.cta.label}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
