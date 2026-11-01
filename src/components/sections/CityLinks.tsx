import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";

// Links to the fair city pages in this state only (owner, 1 Nov 2026), each with the towns
// near it, so a visitor from a nearby town finds the right city.
export function CityLinks({ cities = page.cities }: { cities?: StateLandingPage["cities"] }) {
  const single = cities.items.length === 1;
  return (
    <section id="cities" className="section bg-white" aria-labelledby="cities-title">
      <div className="shell">
        <SectionHeading id="cities-title" eyebrow={cities.eyebrow} title={cities.title} sub={cities.sub} />

        <ul className={`mx-auto grid gap-3 sm:gap-4 ${single ? "max-w-xl" : "max-w-4xl sm:grid-cols-2"}`}>
          {cities.items.map((city) => (
            <li key={city.href}>
              <a href={city.href} className="card card-hover group flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="h3 sm:!text-[20px]">
                    {cities.linkLead} {city.city}
                  </h3>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="mt-2 flex items-center gap-2 text-[13.5px] font-semibold text-ink-soft sm:text-[14.5px]">
                  <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  {city.dateLabel}
                </p>
                <p className="mt-1 flex items-center gap-2 text-[13.5px] text-ink-soft sm:text-[14.5px]">
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  {city.place}
                </p>
                {city.near.length > 0 && (
                  <p className="body mt-4 border-t border-ink/10 pt-4 !text-[13.5px] sm:!text-[14.5px]">
                    <span className="font-semibold text-ink">{cities.nearLabel}</span> {city.near.join(", ")}
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
