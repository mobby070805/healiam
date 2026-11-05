import { Droplets } from "lucide-react";
import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { NoBreak } from "@/components/NoBreak";

// Phones: vertical stepper, dots down the left joined by a line, text beside each dot.
// Tablet and up: compact single-view stepper, black numbered dots on one line.
export function Process({ process = page.process }: { process?: StateLandingPage["process"] }) {
  const last = process.steps.length - 1;
  return (
    <section id="how-it-works" className="section bg-white" aria-labelledby="process-title">
      <div className="shell">
        <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} sub={process.sub} />
        <div className="card mx-auto max-w-4xl overflow-hidden !bg-mist">
          <div className="relative px-5 py-6 sm:px-10 sm:pb-10 sm:pt-11">
            <span
              className="absolute hidden h-px bg-ink/15 sm:left-[calc(12.5%+20px)] sm:right-[calc(12.5%+20px)] sm:top-[calc(2.75rem+21px)] sm:block"
              aria-hidden="true"
            />
            <ol className="relative grid grid-cols-1 gap-6 sm:grid-cols-4 sm:gap-4">
              {process.steps.map((step, i) => (
                <li key={step.title} className="relative flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center">
                  {i < last && (
                    <span className="absolute -bottom-6 left-[19px] top-10 w-px bg-ink/15 sm:hidden" aria-hidden="true" />
                  )}
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[15px] font-bold text-white ring-[6px] ring-mist sm:h-11 sm:w-11 sm:text-base">
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5 sm:pt-0">
                    <h3 className="font-display text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink sm:mt-4 sm:text-[18px]">
                      <NoBreak text={step.title} />
                    </h3>
                    <p className="mt-1 text-[14.5px] font-normal leading-snug text-ink-muted sm:mt-1.5 sm:text-[15px]">
                      <NoBreak text={step.sub} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <p className="flex items-start gap-2 border-t border-ink/[0.07] bg-white px-5 py-3.5 text-left text-[13.5px] sm:justify-center sm:text-center text-ink-soft sm:items-center sm:py-4 sm:text-[14px]">
            <Droplets className="mt-px h-4 w-4 shrink-0 text-ink sm:mt-0" strokeWidth={1.7} aria-hidden="true" />
            {process.tip}
          </p>
        </div>
        <SectionCta primary={process.cta.primary} secondary={process.cta.secondary} />
      </div>
    </section>
  );
}
