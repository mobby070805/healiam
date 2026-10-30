import { Clock, Download } from "lucide-react";
import { fairsPage } from "@/lib/pages/fairs";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Centred dark band, as on healiam.com/fairs, but on our own hero system.
export function FairsHero() {
  const { hero, breadcrumb } = fairsPage;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.15),transparent_62%)]"
        aria-hidden="true"
      />

      <div className="shell relative pb-11 pt-4 sm:pb-16 sm:pt-5 lg:pb-20">
        <Breadcrumbs crumbs={breadcrumb} onDark />

        <div className="mx-auto max-w-2xl pt-7 text-center sm:pt-10">
          <span className="eyebrow-text !text-brand">{hero.eyebrow}</span>
          <h1 className="text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] sm:leading-[1.04]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-brand" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-3.5 max-w-xl text-[15px] leading-[1.6] text-white/70 sm:mt-5 sm:text-[17px] sm:leading-relaxed">
            {hero.sub}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-medium text-white/80 sm:mt-5 sm:text-[13.5px]">
            <Clock className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
            {hero.hours}
          </p>

          <div className="mx-auto mt-5 flex max-w-[420px] items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:justify-center sm:gap-3">
            <a
              href={hero.primary.href}
              className="btn-primary flex-1 !px-4 sm:flex-none sm:!px-7"
            >
              <span className="sm:hidden">{hero.primary.short}</span>
              <span className="hidden sm:inline">{hero.primary.label}</span>
            </a>
            <a href={hero.secondary.href} className="btn-on-ink flex-1 !px-4 sm:flex-none sm:!px-6">
              <Download className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
              {hero.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
