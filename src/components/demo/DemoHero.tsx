import { demo } from "@/lib/pages/demo";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function DemoHero() {
  const { hero, breadcrumb } = demo;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="shell relative pb-10 pt-4 sm:pb-14 sm:pt-5">
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
          <p className="mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-white/50 sm:text-[15px]">{hero.note}</p>
        </div>
      </div>
    </section>
  );
}
