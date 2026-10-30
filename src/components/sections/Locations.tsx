import { ArrowRight, ArrowUpRight, CalendarDays, CalendarPlus, Clock, MapPin } from "lucide-react";
import { page } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";

export function Locations() {
  const { locations } = page;
  // Works for any number of fairs: with an odd count the request card fills the last half row on phones.
  const odd = locations.fairs.length % 2 === 1;
  const lgCols = locations.fairs.length + 1 >= 3 ? "max-w-5xl lg:grid-cols-3" : "max-w-3xl";
  return (
    <section id="locations" className="section bg-mist" aria-labelledby="locations-title">
      <div className="shell">
        <SectionHeading id="locations-title" eyebrow={locations.eyebrow} title={locations.title} sub={locations.sub} />

        <ul className={`mx-auto grid grid-cols-2 gap-3 sm:gap-4 ${lgCols}`}>
          {locations.fairs.map((fair) => (
            <li key={fair.city}>
              <a
                href={fair.detailsUrl}
                className="card card-hover group flex h-full flex-col p-4 sm:p-6"
                aria-label={`${fair.city} fair details, ${fair.dateLabel}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="icon-tile">
                    <MapPin className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-ink-muted sm:h-5 sm:w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="h3 mt-3.5 sm:mt-5 sm:!text-[20px]">{fair.city}</h3>
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
              </a>
            </li>
          ))}

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
