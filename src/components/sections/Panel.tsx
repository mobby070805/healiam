import { Scale } from "lucide-react";
import { site } from "@/lib/site";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { LucideByName } from "@/components/LucideByName";
import { PanelCategory } from "@/components/sections/PanelCategory";

export function Panel({ panel = page.panel }: { panel?: StateLandingPage["panel"] }) {
  const { priceCard } = panel;
  return (
    <section id="panel" className="section bg-white" aria-labelledby="panel-title">
      <div className="shell">
        <SectionHeading id="panel-title" eyebrow={panel.eyebrow} title={panel.title} sub={panel.sub} />

        <div className="grid items-start gap-4 lg:grid-cols-[1fr_340px] lg:gap-8">
          <ul className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
            {panel.categories.map((cat, i) => (
              <PanelCategory
                key={cat.name}
                icon={<LucideByName name={cat.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />}
                name={cat.name}
                line={cat.line}
                markers={cat.markers}
                wide={i === 0}
              />
            ))}
          </ul>

          {/* Price first on phones so the offer is seen before the long list. */}
          <aside
            className="card order-first p-5 shadow-[0_28px_60px_-34px_rgba(10,10,15,0.45)] sm:p-7 lg:sticky lg:top-24 lg:order-none"
            aria-label="Panel price"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{priceCard.label}</p>
              <span className="rounded-full bg-green-tint px-2.5 py-1 text-[12px] font-semibold text-green">50+ markers</span>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <p className="font-display text-[3.25rem] font-extrabold leading-none tracking-[-0.03em] text-ink sm:text-[3.75rem]">
                {site.price.display}
              </p>
              <p className="mb-1.5 text-[13px] font-medium text-ink-muted">per panel</p>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft sm:text-[15px]">{priceCard.line}</p>
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-mist px-3 py-2.5 text-[12.5px] font-medium text-ink-muted">
              <Scale className="h-4 w-4 shrink-0 text-ink" strokeWidth={1.7} aria-hidden="true" />
              {priceCard.compare}
            </p>
            <a href={priceCard.cta.href} className="btn-primary mt-5 lg:w-full">
              {priceCard.cta.label}
            </a>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-muted">{priceCard.fine}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
