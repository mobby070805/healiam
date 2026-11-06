import { ArrowRight } from "lucide-react";
import { fairs } from "@/lib/fairs";
import { cityPageList, type CityPage } from "@/lib/city-pages";
import { SectionHeading } from "@/components/SectionHeading";

export type StateCityPagesData = {
  readonly eyebrow: string;
  readonly title: string;
  readonly sub: string;
  /** Two-letter state code; lists the city page of every fair in that state that has one. */
  readonly region: string;
};

// A state page's own city pages, just above the other-states list (owner, 6 Nov 2026). Built from
// lib/city-pages.ts, so a new city page in the state appears here without an edit. A fair city shows
// its next date; a nearby city shows its closest fair and the distance.
export function StateCityPages({ data }: { data: StateCityPagesData }) {
  const links = cityPageList.filter((c) => c.region === data.region);
  if (links.length === 0) return null;
  return (
    <section id="city-pages" className="section border-t border-ink/10 bg-white" aria-labelledby="city-pages-title">
      <div className="shell">
        <SectionHeading id="city-pages-title" eyebrow={data.eyebrow} title={data.title} sub={data.sub} />
        <ul className="mx-auto grid max-w-3xl gap-2.5 sm:grid-cols-2 sm:gap-4">
          {links.map(({ label, href, ...page }) => (
            <li key={href}>
              <a href={href} className="card card-hover flex h-full items-center gap-3 p-4 sm:p-5">
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-ink sm:text-[16px]">{label}</span>
                  <span className="mt-0.5 block text-[13px] text-ink-muted">{cityNote({ label, href, ...page })}</span>
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

/** "Healiam fair city" or "Closest fair: Grand Prairie, about 6 miles". */
function cityNote(page: CityPage): string {
  if (page.fair) {
    // No date here: fair dates change, and the fair cards above already show them (owner, 6 Nov 2026).
    return "Healiam fair city";
  }
  const [slug, miles] = Object.entries(page.miles ?? {}).sort((a, b) => a[1] - b[1])[0] ?? [];
  const fair = fairs.find((f) => f.slug === slug);
  return fair ? `Closest fair: ${fair.locality}, about ${miles} miles` : "Near a Healiam fair";
}
