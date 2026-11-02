import { ArrowRight } from "lucide-react";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { VenuePhoto } from "@/components/VenuePhoto";

// Links to the fair city pages in this state only (owner, 1 Nov 2026), with the towns near each.
// A plain keyword link list rather than cards, and no dates, so it does not repeat the Locations
// section's date cards (client, 2 Nov 2026). Those cards book; these rows open the city page.
// Each row leads with the venue photo, as on healiam.com/fairs (client, 2 Nov 2026).
export function CityLinks({ cities = page.cities }: { cities?: StateLandingPage["cities"] }) {
  return (
    <section id="cities" className="section bg-white" aria-labelledby="cities-title">
      <div className="shell">
        <SectionHeading id="cities-title" eyebrow={cities.eyebrow} title={cities.title} sub={cities.sub} />

        <ul className="card mx-auto max-w-3xl divide-y divide-ink/10 overflow-hidden">
          {cities.items.map((city) => (
            <li key={city.href}>
              <a
                href={city.href}
                className="group flex items-center gap-4 px-4 py-4 transition-colors duration-150 hover:bg-mist/60 sm:gap-5 sm:px-6 sm:py-5"
              >
                <VenuePhoto
                  photo={city.photo}
                  className="h-[72px] w-[96px] shrink-0 self-start rounded-xl sm:h-[96px] sm:w-[144px]"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[19px]">
                    {cities.linkLead} {city.city}
                  </h3>
                  <p className="mt-1 text-[13px] text-ink-soft sm:text-[14px]">{city.place}</p>
                  {city.near.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="mr-0.5 text-[12.5px] font-semibold text-ink sm:text-[13px]">{cities.nearLabel}</span>
                      {city.near.map((town) => (
                        <span
                          key={town}
                          className="rounded-full border border-ink/10 bg-white px-2.5 py-1 text-[12px] font-medium text-ink-soft sm:text-[12.5px]"
                        >
                          {town}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="hidden h-9 w-9 shrink-0 place-items-center sm:grid rounded-full border border-ink/10 text-ink transition-colors duration-150 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
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
