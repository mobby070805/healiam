import { ArrowRight, Check, Lock } from "lucide-react";
import { employer } from "@/lib/pages/employer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { LucideByName } from "@/components/LucideByName";
import { NoBreak } from "@/components/NoBreak";

export function EmployerHero() {
  const { hero, breadcrumb } = employer;
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

          <div className="mx-auto mt-5 flex max-w-[420px] items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:justify-center sm:gap-3">
            <a href={hero.primary.href} className="btn-primary flex-1 !px-4 sm:flex-none sm:!px-7">
              <span className="sm:hidden">{hero.primary.short}</span>
              <span className="hidden sm:inline">{hero.primary.label}</span>
            </a>
            <a href={hero.secondary.href} className="btn-on-ink flex-1 !px-4 sm:flex-none sm:!px-6">
              {hero.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmployerBenefits() {
  const { benefits } = employer;
  return (
    <section id="benefits" className="section bg-white" aria-labelledby="benefits-title">
      <div className="shell">
        <SectionHeading id="benefits-title" eyebrow={benefits.eyebrow} title={benefits.title} sub={benefits.sub} />

        <ol className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {benefits.items.map((item, i) => (
            <li key={item.title} className="card h-full p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="icon-tile">
                  <LucideByName name={item.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </span>
                <span className="font-display text-[15px] font-bold tabular-nums text-ink-faint sm:text-[17px]">
                  {i + 1}
                </span>
              </div>
              <h3 className="h3 mt-3 sm:mt-4">
                <NoBreak text={item.title} />
              </h3>
              <p className="body mt-1.5 !text-[12.5px] sm:!text-[14.5px]">
                <NoBreak text={item.line} />
              </p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-6 max-w-2xl text-center text-[14.5px] font-medium leading-relaxed text-ink-soft sm:mt-9 sm:text-[17px]">
          <NoBreak text={benefits.closing} />
        </p>
      </div>
    </section>
  );
}

export function EmployerHow() {
  const { how } = employer;
  return (
    <section id="how" className="section bg-mist" aria-labelledby="how-title">
      <div className="shell">
        <SectionHeading id="how-title" eyebrow={how.eyebrow} title={how.title} sub={how.sub} />

        <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {how.steps.map((step, i) => (
            <li key={step.title} className="card flex h-full items-start gap-3.5 p-4 sm:block sm:p-5">
              <span className="icon-tile">
                <LucideByName name={step.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </span>
              <div className="min-w-0">
                <h3 className="h3 sm:mt-4">
                  <span className="mr-2 text-ink-faint tabular-nums">{i + 1}</span>
                  <NoBreak text={step.title} />
                </h3>
                <p className="body mt-1 !text-[12.5px] sm:mt-1.5 sm:!text-[14.5px]">
                  <NoBreak text={step.line} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-5 flex max-w-2xl items-start gap-2.5 rounded-2xl border border-ink/[0.08] bg-white p-4 text-[13px] leading-relaxed text-ink-soft sm:mt-7 sm:items-center sm:p-5 sm:text-[14.5px]">
          <Lock className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ink sm:mt-0" strokeWidth={1.8} aria-hidden="true" />
          <NoBreak text={how.privacyNote} />
        </p>
      </div>
    </section>
  );
}

export function EmployerCost() {
  const { cost } = employer;
  return (
    <section id="cost" className="section bg-white" aria-labelledby="cost-title">
      <div className="shell">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-ink/[0.08] sm:rounded-3xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-ink p-5 text-white sm:p-8">
              <span className="eyebrow-text !mb-2 !text-brand">{cost.eyebrow}</span>
              <h2 id="cost-title" className="h2 !text-white">
                {cost.title}
              </h2>
              <p className="mt-2.5 text-[14px] leading-relaxed text-white/65 sm:text-[15.5px]">{cost.sub}</p>

              <p className="mt-6 flex items-baseline gap-2 sm:mt-8">
                <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.03em] sm:text-[56px]">
                  {cost.price}
                </span>
                <span className="text-[13px] text-white/60 sm:text-[14.5px]">{cost.priceLine}</span>
              </p>
            </div>

            <div className="bg-white p-5 sm:p-8">
              <ul className="space-y-3.5">
                {cost.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-snug text-ink-soft sm:text-[15.5px]">
                    <Check className="mt-[3px] h-[18px] w-[18px] shrink-0 text-green" strokeWidth={2.4} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-ink/[0.07] pt-4 text-[13px] leading-relaxed text-ink-muted sm:text-[14px]">
                {cost.note}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <a href={cost.cta.href} className="btn-primary">
                  {cost.cta.label}
                </a>
                <a href={cost.secondary.href} className="btn-link">
                  {cost.secondary.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
