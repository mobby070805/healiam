import { ArrowRight, CalendarDays, CalendarPlus, Clock, MapPin } from "lucide-react";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { cityPages } from "@/lib/city-pages";

// Each date card links its city name to that city's fair page (the same-state interlink, since the
// separate cities section was removed, client 3 Nov 2026) and "Book this date" to booking. Fairs with a
// city page also get a link to it (owner, 5 Nov 2026).
export function Locations({ locations = page.locations }: { locations?: StateLandingPage["locations"] }) {
  const book = locations.cta.primary.href;
  // Works for any number of fairs: with an odd count the request card fills the last half row on phones.
  const odd = locations.fairs.length % 2 === 1;
  const lgCols = locations.fairs.length + 1 >= 3 ? "max-w-5xl lg:grid-cols-3" : "max-w-3xl";
  return (
    <section id="locations" className="section bg-mist" aria-labelledby="locations-title">
      <div className="shell">
        <SectionHeading id="locations-title" eyebrow={locations.eyebrow} title={locations.title} sub={locations.sub} />

        <ul className={`mx-auto grid grid-cols-2 gap-3 sm:gap-4 ${lgCols}`}>
          {locations.fairs.map((fair) => {
            const cityPage = cityPages[fair.slug];
            return (
            <li key={fair.city}>
              <div className="card card-hover flex h-full flex-col p-4 sm:p-6">
                <span className="icon-tile">
                  <MapPin className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3 className="h3 mt-3.5 sm:mt-5 sm:!text-[20px]">
                  <a href={fair.detailsUrl} className="underline-offset-4 hover:text-brand hover:underline">
                    {fair.city}
                  </a>
                </h3>
                {fair.venue && <p className="mt-1 text-[13px] font-semibold text-ink-soft sm:text-[15px]">{fair.venue}</p>}
                <p className="body mt-1 flex-1 !text-[12.5px] sm:!text-[14px]">
                  {fair.street}, {fair.locality}, {fair.region} {fair.postalCode}
                </p>
                <div className="mt-4 space-y-1.5 rounded-xl bg-mist px-3 py-2.5 text-[12px] font-semibold text-ink sm:mt-5 sm:px-4 sm:py-3 sm:text-[14px]">
                  <p className="flex items-center gap-2 whitespace-nowrap">
                    <CalendarDays className="hidden h-4 w-4 shrink-0 sm:block" strokeWidth={1.8} aria-hidden="true" />
                    {fair.dateLabel}
                  </p>
                  <p className="flex items-center gap-2 whitespace-nowrap font-medium text-ink-soft">
                    <Clock className="hidden h-4 w-4 shrink-0 sm:block" strokeWidth={1.8} aria-hidden="true" />
                    {locations.hours.label}
                  </p>
                </div>
                {cityPage && (
                  <a
                    href={cityPage.href}
                    className="mt-3.5 inline-flex min-h-[32px] items-center gap-1.5 self-start text-[13px] font-semibold text-ink underline-offset-4 hover:underline sm:mt-4 sm:min-h-0 sm:text-[14px]"
                  >
                    {cityPage.label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={book}
                  className="group mt-3.5 inline-flex min-h-[32px] items-center gap-1.5 self-start text-[13px] font-semibold text-brand sm:mt-4 sm:min-h-0 sm:text-[14px]"
                  aria-label={`Book the ${fair.city} date, ${fair.dateLabel}`}
                >
                  Book this date
                  <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </li>
            );
          })}

          <li className={odd ? "" : "col-span-2 lg:col-span-1"}>
            <a
              href={locations.noFair.cta.href}
              className={`card card-hover group flex h-full gap-4 border-dashed !border-ink/20 p-4 sm:p-6 ${odd ? "flex-col items-start" : "flex-row items-center lg:flex-col lg:items-start"}`}
            >
              <span className="icon-tile">
                <CalendarPlus className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="h3 lg:mt-1 lg:!text-[20px]">{locations.noFair.title}</h3>
                <p className="body mt-1 !text-[12.5px] sm:!text-[14px]">{locations.noFair.line}</p>
              </div>
              <span className="hidden items-center gap-1.5 text-[14px] font-semibold text-ink sm:inline-flex">
                {locations.noFair.cta.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>

        <SectionCta primary={locations.cta.primary} secondary={locations.cta.secondary} />
      </div>
    </section>
  );
}
