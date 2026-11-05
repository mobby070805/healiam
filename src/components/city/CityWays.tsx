import { ArrowUpRight, Navigation } from "lucide-react";
import { fairMapsUrl, fairPhoto, type Fair } from "@/lib/fairs";
import { SectionHeading } from "@/components/SectionHeading";
import { LucideByName } from "@/components/LucideByName";
import { VenuePhoto } from "@/components/VenuePhoto";

// Ways to reach the venue (train, car, step-free...) as icon cards, with a venue card beside them.
export function CityWays({
  ways,
  fair,
  tone = "mist",
}: {
  ways: {
    readonly eyebrow: string;
    readonly title: string;
    readonly sub: string;
    readonly items: readonly { readonly icon: string; readonly title: string; readonly line: string }[];
    readonly mapsLabel: string;
  };
  fair: Fair;
  tone?: "white" | "mist";
}) {
  return (
    <section id="getting-there" className={`section ${tone === "white" ? "bg-white" : "bg-mist"}`} aria-labelledby="getting-there-title">
      <div className="shell">
        <SectionHeading id="getting-there-title" eyebrow={ways.eyebrow} title={ways.title} sub={ways.sub} />

        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[1fr_0.85fr]">
          <ul className="grid gap-3 sm:gap-4">
            {ways.items.map((item) => (
              <li key={item.title} className="card flex gap-4 p-4 sm:p-5">
                <span className="icon-tile shrink-0">
                  <LucideByName name={item.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="h3">{item.title}</h3>
                  <p className="body mt-1 !text-[13.5px] sm:!text-[15px]">{item.line}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="card flex flex-col overflow-hidden">
            <VenuePhoto photo={fairPhoto(fair)} className="aspect-[16/10] w-full lg:aspect-auto lg:flex-1" />
            <div className="p-4 sm:p-5">
              <address className="not-italic">
                {fair.venue && <span className="block text-[15px] font-semibold text-ink sm:text-[16px]">{fair.venue}</span>}
                <span className="body block !text-[13.5px] sm:!text-[15px]">
                  {fair.street}, {fair.locality}, {fair.region} {fair.postalCode}
                </span>
              </address>
              <a href={fairMapsUrl(fair)} target="_blank" rel="noreferrer" className="btn-link mt-3">
                <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {ways.mapsLabel}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
