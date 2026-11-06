import { ArrowRight } from "lucide-react";
import { fairs } from "@/lib/fairs";
import { cityPages } from "@/lib/city-pages";
import { SectionHeading } from "@/components/SectionHeading";

export type StateCityPagesData = {
  readonly eyebrow: string;
  readonly title: string;
  readonly sub: string;
  /** Two-letter state code; lists the city page of every fair in that state that has one. */
  readonly region: string;
};

// A state page's own city pages, just above the other-states list (owner, 6 Nov 2026). Built from
// lib/fairs.ts and lib/city-pages.ts, so a new city page in the state appears here without an edit.
export function StateCityPages({ data }: { data: StateCityPagesData }) {
  const links = fairs
    .filter((f) => f.region === data.region && cityPages[f.slug])
    .map((f) => ({ ...cityPages[f.slug], fair: f }));
  if (links.length === 0) return null;
  return (
    <section id="city-pages" className="section border-t border-ink/10 bg-white" aria-labelledby="city-pages-title">
      <div className="shell">
        <SectionHeading id="city-pages-title" eyebrow={data.eyebrow} title={data.title} sub={data.sub} />
        <ul className="mx-auto grid max-w-3xl gap-2.5 sm:grid-cols-2 sm:gap-4">
          {links.map(({ label, href, fair }) => (
            <li key={href}>
              <a href={href} className="card card-hover flex h-full items-center gap-3 p-4 sm:p-5">
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-ink sm:text-[16px]">{label}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-muted">
                    {fair.venue ?? fair.street}, {fair.dateLabel.replace(/,\s*\d{4}$/, "")}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink" strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
