import { page, type StateLandingPage } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { Reveal } from "@/components/Reveal";
import { NoBreak } from "@/components/NoBreak";

// Fixed layout: number + dark title only. 2 per row on phones, 3 on desktop.
export function Challenges({ challenges = page.challenges }: { challenges?: StateLandingPage["challenges"] }) {
  return (
    <section className="section bg-white" aria-labelledby="challenges-title">
      <div className="shell">
        <SectionHeading id="challenges-title" eyebrow={challenges.eyebrow} title={challenges.title} sub={challenges.sub} />
        <Reveal>
          <ol className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {challenges.items.map((item, i) => (
              <li key={item} className="card card-hover flex h-full flex-col p-4 sm:p-6">
                <span className="font-display text-[12px] font-bold tracking-[0.08em] text-ink-faint sm:text-[13px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h3 mt-2.5 sm:mt-4">
                  <NoBreak text={item} />
                </h3>
              </li>
            ))}
          </ol>
        </Reveal>
        <SectionCta primary={challenges.cta.primary} secondary={challenges.cta.secondary} />
      </div>
    </section>
  );
}
