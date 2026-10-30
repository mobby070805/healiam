import { page } from "@/lib/pages/texas-blood-test";
import { SectionHeading } from "@/components/SectionHeading";
import { SectionCta } from "@/components/SectionCta";
import { LucideByName } from "@/components/LucideByName";
import { Reveal } from "@/components/Reveal";
import { NoBreak } from "@/components/NoBreak";

// Two rows of four on desktop, two per row on phones. Icon + title (+ one line on desktop).
export function Benefits() {
  const { benefits } = page;
  return (
    <section id="benefits" className="section bg-mist" aria-labelledby="benefits-title">
      <div className="shell">
        <SectionHeading id="benefits-title" eyebrow={benefits.eyebrow} title={benefits.title} />
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {benefits.items.map((item) => (
              <li key={item.title} className="card card-hover h-full p-4 sm:p-6">
                <span className="icon-tile">
                  <LucideByName name={item.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </span>
                <h3 className="h3 mt-3.5 sm:mt-5">
                  <NoBreak text={item.title} />
                </h3>
                <p className="body mt-1.5 hidden sm:block">{item.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <SectionCta primary={benefits.cta.primary} secondary={benefits.cta.secondary} />
      </div>
    </section>
  );
}
