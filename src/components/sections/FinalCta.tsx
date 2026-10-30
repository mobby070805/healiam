import { Smartphone } from "lucide-react";
import type { FinalCtaData } from "@/lib/types";

// Plain black rounded band (Healiam black), no glow.
export function FinalCta({ finalCta }: { finalCta: FinalCtaData }) {
  return (
    <section id="final-cta" className="bg-white pb-10 sm:pb-16 lg:pb-20" aria-labelledby="final-cta-title">
      <div className="shell">
        <div className="rounded-3xl bg-ink px-5 py-10 text-center sm:px-12 sm:py-16">
          <h2 id="final-cta-title" className="h2 mx-auto max-w-2xl !text-white">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-white/70 sm:mt-4 sm:text-[17px]">{finalCta.sub}</p>
          <div className="mt-6 flex flex-nowrap justify-center gap-2.5 sm:mt-8 sm:gap-3">
            <a href={finalCta.primary.href} className="btn-primary">
              {finalCta.primary.label}
            </a>
            <a href={finalCta.secondary.href} className="btn-on-ink">
              <Smartphone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              {finalCta.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
