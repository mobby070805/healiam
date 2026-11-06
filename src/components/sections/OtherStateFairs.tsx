import { ArrowRight } from "lucide-react";
import { locationGroups } from "@/lib/locations";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { VenuePhoto } from "@/components/VenuePhoto";

// Last section on a state page: Healiam fairs in every other state (client, 2 Nov 2026). Grouped
// columns of plain links, so it reads differently from the date cards and the same-state city list.
// Built from lib/fairs.ts through locationGroups(), so a new fair or state page shows up here too.
export function OtherStateFairs({ otherFairs = page.otherFairs }: { otherFairs?: StateLandingPage["otherFairs"] }) {
  const groups = locationGroups().filter((g) => g.state !== otherFairs.exclude);
  if (groups.length === 0) return null;
  return (
    <section id="other-fairs" className="section border-t border-ink/10 bg-mist" aria-labelledby="other-fairs-title">
      <div className="shell">
        <SectionHeading id="other-fairs-title" eyebrow={otherFairs.eyebrow} title={otherFairs.title} sub={otherFairs.sub} />

        <div className="mx-auto grid max-w-5xl gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.state}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{group.state}</h3>
              <ul className="mt-3 space-y-1">
                {group.statePage && (
                  <li>
                    <a
                      href={group.statePage.href}
                      className="group inline-flex min-h-[36px] items-center gap-1.5 text-[15px] font-semibold text-ink hover:text-brand sm:min-h-0 sm:py-1"
                    >
                      {group.statePage.label}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )}
                {group.cities.map((city) => (
                  <li key={city.href}>
                    <a
                      href={city.href}
                      className="flex items-center gap-3 border-b border-ink/10 py-2 text-[14.5px] text-ink-soft hover:text-ink"
                    >
                      {/* No venue photo or date here: both change from fair to fair (owner, 6 Nov 2026). */}
                      <VenuePhoto photo={null} className="h-10 w-14 shrink-0 rounded-lg" />
                      <span className="min-w-0 flex-1">
                        {otherFairs.linkLead} {city.label.replace(/,\s*[A-Z]{2}$/, "")}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
