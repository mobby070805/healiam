import { ArrowRight, ArrowUpRight, CalendarDays, CalendarPlus, Clock } from "lucide-react";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { NoBreak } from "@/components/NoBreak";

// Upcoming fairs from lib/fairs.ts (whole card links to the fair's page), plus a way to ask for one.
export function Fairs() {
  const { fairs } = home;
  return (
    <section id="fairs" className="section bg-white" aria-labelledby="fairs-title">
      <div className="shell">
        <SectionHeading id="fairs-title" eyebrow={fairs.eyebrow} title={fairs.title} sub={fairs.sub} />

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {fairs.list.map((fair) => (
            <li key={fair.slug}>
              <a
                href={fair.detailsUrl}
                className="card card-hover group flex h-full flex-col p-4 sm:p-6"
                aria-label={`${fair.city} health fair, ${fair.dateLabel}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-green/15 bg-green-tint px-2.5 py-1 text-[11.5px] font-semibold tracking-wide text-green-deep sm:text-[12px]">
                    {fair.state}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-ink-muted sm:h-5 sm:w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="h3 mt-3.5 sm:mt-5 sm:!text-[20px]">{fair.city}</h3>
                {fair.venue && <p className="mt-1 text-[13px] font-semibold text-ink-soft sm:text-[14.5px]">{fair.venue}</p>}
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
                    {fairHours.label}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={fairs.noFair.cta.href}
          className="card card-hover group mt-3 flex flex-col gap-4 border-dashed !border-ink/20 p-4 sm:mt-4 sm:flex-row sm:items-center sm:p-6"
        >
          <span className="flex items-center gap-3.5 sm:flex-1 sm:gap-4">
            <span className="icon-tile">
              <CalendarPlus className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[15px] font-bold leading-tight text-ink sm:text-[18px]">{fairs.noFair.title}</span>
              <span className="mt-1 block text-[13px] leading-snug text-ink-muted sm:text-[15px]">
                <NoBreak text={fairs.noFair.line} />
              </span>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 self-start text-[14px] font-semibold text-ink sm:self-center sm:text-[15px]">
            {fairs.noFair.cta.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </span>
        </a>

        <SectionCta primary={fairs.cta.primary} secondary={fairs.cta.secondary} />
      </div>
    </section>
  );
}
