import { ChevronRight } from "lucide-react";
import { home } from "@/lib/pages/home";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { LucideByName } from "@/components/LucideByName";
import { NoBreak } from "@/components/NoBreak";

// Three short steps. Phones: a vertical timeline. Tablet and up: three cards with arrows.
export function HowItWorks() {
  const { howItWorks } = home;
  const last = howItWorks.steps.length - 1;
  return (
    <section id="how-it-works" className="section bg-white" aria-labelledby="how-title">
      <div className="shell">
        <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />

        <ol className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3 sm:gap-5 lg:gap-8">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4 sm:block">
              {/* Phone timeline line */}
              {i < last && <span className="absolute -bottom-5 left-[19px] top-11 w-px bg-ink/15 sm:hidden" aria-hidden="true" />}
              {/* Desktop arrow to the next card */}
              {i < last && (
                <span
                  className="absolute -right-[18px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-ink/10 bg-white text-ink-muted shadow-sm sm:grid lg:-right-[26px]"
                  aria-hidden="true"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </span>
              )}

              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[15px] font-bold text-white sm:hidden">
                {i + 1}
              </span>

              <div className="min-w-0 pt-1 sm:card sm:h-full sm:p-7 sm:pt-6">
                <div className="hidden items-center justify-between sm:flex">
                  <span className="icon-tile">
                    <LucideByName name={step.icon} className="h-[22px] w-[22px]" />
                  </span>
                  <span className="font-display text-[13px] font-bold tracking-[0.08em] text-ink-faint">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink sm:mt-5 sm:text-[19px]">
                  {step.title}
                </h3>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-muted sm:mt-2 sm:text-[15px]">
                  <NoBreak text={step.line} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <SectionCta
          primary={howItWorks.cta.primary}
          secondary={howItWorks.cta.secondary}
        />
      </div>
    </section>
  );
}
