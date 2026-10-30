import { site } from "@/lib/site";
import { home } from "@/lib/pages/home";
import { LucideByName } from "@/components/LucideByName";
import { NoBreak } from "@/components/NoBreak";
import { VideoEmbed } from "@/components/VideoEmbed";

export function WhyHealiam() {
  const { why } = home;
  return (
    <section id="why-healiam" className="section bg-white" aria-labelledby="why-title">
      <div className="shell">
        <div className="grid items-center gap-7 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className="eyebrow-text">{why.eyebrow}</span>
            <h2 id="why-title" className="h2">
              {why.title}
            </h2>
            <p className="lead mt-3">{why.sub}</p>
          </div>

          <VideoEmbed id={why.video.id} poster={why.video.poster} label={why.video.label} />
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-11 sm:gap-4 lg:grid-cols-4">
          {why.reasons.map((r) => (
            <li key={r.title} className="card h-full p-4 sm:p-5">
              <span className="icon-tile">
                <LucideByName name={r.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </span>
              <h3 className="h3 mt-3 sm:mt-4">
                <NoBreak text={r.title} />
              </h3>
              <p className="body mt-1 !text-[12.5px] sm:!text-[14.5px]">
                <NoBreak text={r.line} />
              </p>
            </li>
          ))}
        </ul>

        <CostTable />
      </div>
    </section>
  );
}

// Three columns, one row per question, so both routes answer the same thing on the same line.
// The Healiam column is one unbroken dark strip: every cell in it carries the same background.
const cell = "px-2.5 py-3.5 sm:px-5 sm:py-4";
const oursCell = `${cell} bg-ink text-white`;
const oursRow = `${oursCell} border-b border-white/10`;
const stepCell = `${cell} bg-mist text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted sm:text-[12px]`;

function CostTable() {
  const { compare } = home.why;

  return (
    <div className="mt-12 sm:mt-16">
      <div className="max-w-2xl">
        <span className="eyebrow-text">{compare.eyebrow}</span>
        <h3 className="h2">{compare.title}</h3>
        <p className="lead mt-3">
          <NoBreak text={compare.sub} />
        </p>
      </div>

      <div className="card mt-6 overflow-hidden sm:mt-8">
        <div className="grid grid-cols-[78px_1fr_1fr] sm:grid-cols-[168px_1fr_1fr]">
          {/* Header */}
          <div className={`${stepCell} border-b border-ink/[0.07]`} />
          <div className={`${cell} border-b border-ink/[0.07]`}>
            <p className="text-[12.5px] font-bold leading-tight text-ink sm:text-[14px]">{compare.usual.label}</p>
            <p className="mt-1 hidden text-[12.5px] text-ink-muted sm:block">{compare.usual.note}</p>
          </div>
          <div className={oursRow}>
            <p className="flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.logoMark} alt="" width={16} height={17} className="logo-tint h-4 w-auto" />
              <span className="font-display text-[12.5px] font-bold tracking-tight sm:text-[14px]">
                {compare.ours.label}
              </span>
            </p>
            <p className="mt-1 hidden text-[12.5px] text-white/60 sm:block">{compare.ours.note}</p>
          </div>

          {/* One row per question */}
          {compare.rows.map((row) => (
            <Row key={row.step} row={row} />
          ))}

          {/* Total */}
          <div className={`${stepCell} !text-ink`}>{compare.totalLabel}</div>
          <div className={cell}>
            <p className="font-display text-[15px] font-bold leading-none tracking-[-0.02em] text-ink sm:text-[22px]">
              {compare.usualTotal}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-snug text-ink-muted sm:text-[12.5px]">{compare.totalNote}</p>
          </div>
          <div className={oursCell}>
            <p className="font-display text-[24px] font-extrabold leading-none tracking-[-0.03em] sm:text-[34px]">
              {compare.oursTotal}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ink/[0.07] bg-mist px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5">
          <p className="max-w-md text-[13.5px] font-medium leading-snug text-ink sm:text-[15px]">{compare.kicker}</p>
          <a href={compare.cta.href} className="btn-primary shrink-0 self-start sm:self-auto">
            {compare.cta.label}
          </a>
        </div>
      </div>

      <p className="mt-2.5 text-[12px] text-ink-muted">{compare.source}</p>
    </div>
  );
}

function Row({ row }: { row: (typeof home.why.compare.rows)[number] }) {
  return (
    <>
      <div className={`${stepCell} border-b border-ink/[0.07]`}>{row.step}</div>
      <div className={`${cell} border-b border-ink/[0.07]`}>
        <p className="text-[12.5px] leading-snug text-ink-muted sm:text-[14px]">{row.usual.line}</p>
        <p className="mt-1 text-[14px] font-bold tabular-nums text-ink sm:text-[16px]">{row.usual.value}</p>
      </div>
      <div className={oursRow}>
        <p className="text-[12.5px] leading-snug text-white/60 sm:text-[14px]">{row.ours.line}</p>
        <p className="mt-1 text-[14px] font-bold text-white sm:text-[16px]">{row.ours.value}</p>
      </div>
    </>
  );
}
