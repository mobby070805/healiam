import { ArrowUpRight, Navigation } from "lucide-react";
import { fairMapsUrl, fairPhoto, type Fair } from "@/lib/fairs";
import type { CityFairPage } from "@/lib/pages/plano-blood-testing";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { VenuePhoto } from "@/components/VenuePhoto";

// "Finding us": numbered arrival steps beside a venue card with the photo, address and map link.
export function CityArrival({
  page,
  fair,
  tone = "mist",
}: {
  page: CityFairPage;
  fair: Fair;
  tone?: "white" | "mist";
}) {
  const { arrival } = page;
  return (
    <section id="arrival" className={`section ${tone === "white" ? "bg-white" : "bg-mist"}`} aria-labelledby="arrival-title">
      <div className="shell">
        <SectionHeading id="arrival-title" eyebrow={arrival.eyebrow} title={arrival.title} sub={arrival.sub} />

        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <ol className="card divide-y divide-ink/10 overflow-hidden">
            {arrival.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4 p-4 sm:p-5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-display text-[14px] font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[16px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[17.5px]">
                    {step.title}
                  </h3>
                  <p className="body mt-1 !text-[13.5px] sm:!text-[15px]">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="card overflow-hidden">
            <VenuePhoto photo={fairPhoto(fair)} className="aspect-[16/10] w-full" />
            <div className="p-4 sm:p-5">
              <address className="not-italic">
                {fair.venue && <span className="block text-[15px] font-semibold text-ink sm:text-[16px]">{fair.venue}</span>}
                <span className="body block !text-[13.5px] sm:!text-[15px]">{fair.street}</span>
                <span className="body block !text-[13.5px] sm:!text-[15px]">
                  {fair.locality}, {fair.region} {fair.postalCode}
                </span>
              </address>
              <a href={fairMapsUrl(fair)} target="_blank" rel="noreferrer" className="btn-link mt-3">
                <Navigation className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {arrival.mapsLabel}
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <SectionCta primary={arrival.cta} />
      </div>
    </section>
  );
}
