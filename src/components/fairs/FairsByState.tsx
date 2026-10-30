import { ArrowUpRight, CalendarDays, CalendarPlus, Clock, MapPin } from "lucide-react";
import { fairsPage, fairsByState } from "@/lib/pages/fairs";
import { fairs, fairHours } from "@/lib/fairs";
import { SectionHeading } from "@/components/SectionHeading";

// Grouped by state, as on healiam.com/fairs. Each card is one tap target, and the
// state heading stays with its fairs on every width.
export function FairsByState() {
  const { upcoming } = fairsPage;
  const groups = fairsByState();

  return (
    <section id="upcoming" className="section bg-white" aria-labelledby="upcoming-title">
      <div className="shell">
        <SectionHeading
          id="upcoming-title"
          eyebrow={upcoming.eyebrow}
          title={upcoming.title}
          sub={upcoming.sub(fairs.length)}
        />

        {groups.length === 0 ? (
          <div className="card mx-auto max-w-xl p-6 text-center sm:p-8">
            <span className="icon-tile mx-auto">
              <CalendarPlus className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <p className="body mt-3">{upcoming.empty}</p>
            <a href={upcoming.emptyCta.href} className="btn-primary mt-4">
              {upcoming.emptyCta.label}
            </a>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {groups.map((group) => (
              <div key={group.state}>
                <div className="flex items-baseline gap-2.5 border-l-[3px] border-brand pl-3">
                  <h3 className="font-display text-[19px] font-bold tracking-[-0.02em] text-ink sm:text-[24px]">
                    {group.state}
                  </h3>
                  <span className="text-[12.5px] text-ink-muted sm:text-[14px]">
                    {group.list.length} {group.list.length === 1 ? "fair" : "fairs"}
                  </span>
                </div>
                <p className="mt-1.5 pl-3 text-[13px] text-ink-muted sm:text-[14.5px]">
                  {upcoming.stateLine(group.state)}
                </p>

                <ul className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  {group.list.map((fair) => (
                    <li key={fair.slug}>
                      <a
                        href={fair.detailsUrl}
                        className="card card-hover group flex h-full flex-col p-4 sm:p-5"
                        aria-label={`${fair.city} health fair, ${fair.dateLabel}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-green/15 bg-green-tint px-2.5 py-1 text-[11.5px] font-semibold tracking-wide text-green-deep sm:text-[12px]">
                            <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
                            {fair.region}
                          </span>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted sm:h-5 sm:w-5" strokeWidth={1.8} aria-hidden="true" />
                        </div>

                        <h4 className="h3 mt-3 sm:mt-4 sm:!text-[20px]">{fair.city}</h4>
                        {fair.venue && (
                          <p className="mt-1 text-[13px] font-semibold text-ink-soft sm:text-[14.5px]">{fair.venue}</p>
                        )}
                        <p className="body mt-1 flex-1 !text-[12.5px] sm:!text-[14px]">
                          {fair.street}, {fair.locality}, {fair.region} {fair.postalCode}
                        </p>

                        <div className="mt-4 space-y-1.5 rounded-xl bg-mist px-3 py-2.5 text-[12px] font-semibold text-ink sm:mt-5 sm:px-4 sm:py-3 sm:text-[14px]">
                          <p className="flex items-center gap-2 whitespace-nowrap">
                            <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                            {fair.dateLabel}
                          </p>
                          <p className="flex items-center gap-2 whitespace-nowrap font-medium text-ink-soft">
                            <Clock className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                            {fairHours.label}
                          </p>
                        </div>

                        <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink sm:text-[14px]">
                          {upcoming.detailsLabel}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
