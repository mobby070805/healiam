import { tests } from "@/lib/pages/tests";
import { LucideByName } from "@/components/LucideByName";
import { SectionHeading } from "@/components/SectionHeading";
import { NoBreak } from "@/components/NoBreak";

export function PrepSteps() {
  const { prep } = tests;
  return (
    <section id="prep" className="section bg-mist" aria-labelledby="prep-title">
      <div className="shell">
        <SectionHeading id="prep-title" eyebrow={prep.eyebrow} title={prep.title} sub={prep.sub} />

        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {prep.steps.map((step, i) => (
            <li key={step.title} className="card flex h-full items-start gap-3.5 p-4 sm:gap-4 sm:p-6">
              <span className="icon-tile">
                <LucideByName name={step.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </span>
              <div className="min-w-0">
                <h3 className="h3">
                  <span className="mr-2 text-ink-faint tabular-nums">{i + 1}</span>
                  {step.title}
                </h3>
                <p className="body mt-1 !text-[13px] sm:!text-[14.5px]">
                  <NoBreak text={step.line} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
