import { MapPin, Search } from "lucide-react";
import { site } from "@/lib/site";
import { fairHours, fairs } from "@/lib/fairs";
import { home } from "@/lib/pages/home";

type PhoneData = typeof home.heroPhones;

// Three code-drawn phones (no image files): crisp at every size, zero image weight.
// On phones the single device is deliberately taller than this box, so the dark band crops it
// at its bottom edge. A device floating in the middle of the band reads as an accident.
// Everything inside a phone is sized in `em`, so the frame's font-size scales the whole screen.
// Phones: the results screen alone, since three would be unreadable. Tablet and up: all three,
// with the graph screen raised in front and the other two tucked behind it.
export function HeroPhones({ data }: { data: PhoneData }) {
  return (
    <div
      role="img"
      aria-label={data.ariaLabel}
      className="relative mx-auto h-[clamp(331px,89.4vw,384px)] w-full max-w-none sm:h-[470px] sm:max-w-[620px] lg:h-[500px]"
    >
      {/* Faint ring behind the phones, as in the approved design. */}
      <div
        className="absolute left-1/2 top-1/2 hidden aspect-square w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07] sm:block lg:w-[500px]"
        aria-hidden="true"
      />

      {/* Left: results. Hidden on phones. */}
      <div className="absolute left-0 top-[9%] z-10 hidden sm:block">
        <PhoneFrame size="text-[6.8px] lg:text-[7.6px]">
          <ResultsScreen results={data.results} compact />
        </PhoneFrame>
      </div>

      {/* Right: booking. Hidden on phones. */}
      <div className="absolute right-0 top-[9%] z-10 hidden sm:block">
        <PhoneFrame size="text-[6.8px] lg:text-[7.6px]">
          <BookingScreen booking={data.booking} />
        </PhoneFrame>
      </div>

      {/* Centre: the graph screen on tablet and up, the results screen on phones. */}
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
        <PhoneFrame size="text-[clamp(10.2px,2.75vw,11.8px)] sm:text-[8px] lg:text-[8.8px]">
          <span className="sm:hidden">
            <ResultsScreen results={data.results} />
          </span>
          <span className="hidden sm:block">
            <GraphScreen graph={data.graph} />
          </span>
        </PhoneFrame>
      </div>
    </div>
  );
}

function PhoneFrame({ size, children }: { size: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative w-[23em] rounded-[3.2em] bg-[#17171f] p-[0.55em] shadow-[0_44px_80px_-34px_rgba(0,0,0,0.8)] ring-1 ring-white/10 ${size}`}
    >
      {/* Side buttons */}
      <span className="absolute -left-[0.26em] top-[9em] h-[2.6em] w-[0.28em] rounded-l bg-[#17171f]" aria-hidden="true" />
      <span className="absolute -left-[0.26em] top-[13em] h-[4.4em] w-[0.28em] rounded-l bg-[#17171f]" aria-hidden="true" />
      <span className="absolute -right-[0.26em] top-[11em] h-[6em] w-[0.28em] rounded-r bg-[#17171f]" aria-hidden="true" />

      <div className="relative h-[46em] overflow-hidden rounded-[2.7em] bg-white">
        <span className="absolute left-1/2 top-[0.7em] z-20 h-[2.1em] w-[7em] -translate-x-1/2 rounded-full bg-[#17171f]" aria-hidden="true" />
        {children}
        <span className="absolute bottom-[0.75em] left-1/2 z-20 h-[0.35em] w-[8.5em] -translate-x-1/2 rounded-full bg-ink/25" aria-hidden="true" />
      </div>
    </div>
  );
}

function ScreenHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-center justify-between gap-[1em] px-[1.7em] pt-[3.4em]">
      <div className="min-w-0">
        <p className="font-display text-[2.1em] font-extrabold leading-none tracking-tight text-ink">{title}</p>
        <p className="mt-[0.45em] truncate text-[1.1em] text-ink-muted">{sub}</p>
      </div>
      <span className="grid h-[3.2em] w-[3.2em] shrink-0 place-items-center rounded-full border border-ink/10 bg-mist">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={site.logoMark} alt="" width={20} height={21} className="logo-tint h-[1.6em] w-auto" />
      </span>
    </div>
  );
}

function ResultsScreen({ results, compact = false }: { results: PhoneData["results"]; compact?: boolean }) {
  const ring = 100;
  const fill = (results.summary.inRange / results.summary.total) * ring;
  return (
    <>
      <ScreenHead title={results.title} sub={results.sub} />

      <div className="px-[1.7em]">
        {/* In-range summary */}
        <div className="mt-[1.4em] flex items-center gap-[1em] rounded-[1.5em] border border-ink/[0.06] bg-mist p-[1em]">
          <svg viewBox="0 0 36 36" className="h-[4.2em] w-[4.2em] shrink-0 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeWidth="3.4" className="text-ink/10" />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeDasharray={`${fill} ${ring - fill}`}
              className="text-green"
            />
          </svg>
          <div className="min-w-0">
            <p className="whitespace-nowrap font-display text-[1.3em] font-bold leading-tight text-ink">{results.summary.label}</p>
            <p className="mt-[0.3em] flex items-center gap-[0.45em] whitespace-nowrap text-[1.1em] text-ink-muted">
              <span className="h-[0.55em] w-[0.55em] rounded-full bg-brand" />
              {results.summary.review}
            </p>
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-[1.3em] flex gap-[0.5em]">
          {results.filters.map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-[0.9em] py-[0.45em] text-[1.05em] font-semibold ${
                i === 0 ? "bg-ink text-white" : "border border-ink/10 text-ink-soft"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Marker rows */}
        <ul className="mt-[0.6em] pb-[1.5em]">
          {(compact ? results.rows.slice(0, 3) : results.rows).map((row) => (
            <li key={row.name} className="border-b border-ink/[0.06] py-[1em] last:border-0">
              <div className="flex items-baseline justify-between gap-[0.6em]">
                <p className="flex items-center gap-[0.5em] text-[1.3em] font-semibold text-ink">
                  {row.name}
                  {row.low && (
                    <span className="rounded-full bg-brand px-[0.6em] py-[0.1em] text-[0.72em] font-semibold text-white">Low</span>
                  )}
                </p>
                <p className="whitespace-nowrap text-[1.3em] font-bold tabular-nums text-ink">
                  {row.value}
                  <span className="ml-[0.25em] text-[0.75em] font-medium text-ink-muted">{row.unit}</span>
                </p>
              </div>
              <div className="relative mt-[0.7em] flex h-[0.5em] gap-[0.25em]">
                <span className="w-[28%] rounded-full bg-ink/[0.09]" />
                <span className="flex-1 rounded-full bg-green/30" />
                <span className="w-[28%] rounded-full bg-ink/[0.09]" />
                <span
                  className={`absolute top-1/2 h-[1.15em] w-[1.15em] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.22em] border-white ${
                    row.low ? "bg-brand" : "bg-green"
                  }`}
                  style={{ left: `${row.pos}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function GraphScreen({ graph }: { graph: PhoneData["graph"] }) {
  // Three draws, rising from deficient back into the normal range (the shaded band).
  const pts = [
    { x: 16, y: 74 },
    { x: 78, y: 46 },
    { x: 140, y: 17 },
  ];
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `16,96 ${line} 140,96`;
  return (
    <>
      <ScreenHead title={graph.title} sub={graph.sub} />

      <div className="px-[1.7em]">
        <div className="mt-[1.3em] flex items-center gap-[0.6em] rounded-full border border-ink/10 px-[1em] py-[0.7em] text-[1.1em] text-ink-faint">
          <Search className="h-[1.2em] w-[1.2em]" strokeWidth={2} aria-hidden="true" />
          Search markers
        </div>

        <div className="mt-[1.4em] flex items-center justify-between gap-[0.6em]">
          <p className="font-display text-[1.45em] font-bold text-ink">{graph.title}</p>
          <span className="rounded-full bg-green-tint px-[0.8em] py-[0.3em] text-[1em] font-semibold text-green">{graph.chip}</span>
        </div>

        <div className="mt-[0.9em] rounded-[1.4em] border border-ink/[0.07] bg-mist p-[1em]">
          <svg viewBox="0 0 156 104" className="block h-auto w-full" aria-hidden="true">
            {/* Normal range band */}
            <rect x="0" y="8" width="156" height="36" rx="5" className="fill-green/10" />
            <line x1="0" y1="44" x2="156" y2="44" strokeDasharray="3 3" strokeWidth="1" className="stroke-green/40" />
            <polygon points={area} className="fill-ink/[0.05]" />
            <polyline points={line} fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" />
            {pts.map((p, i) => {
              const last = i === pts.length - 1;
              return (
                <circle
                  key={p.x}
                  cx={p.x}
                  cy={p.y}
                  r={last ? 4.8 : 3.6}
                  strokeWidth="2"
                  className={last ? "fill-green stroke-white" : "fill-white stroke-ink"}
                />
              );
            })}
          </svg>
          <div className="mt-[0.6em] grid grid-cols-3 text-center">
            {graph.points.map((p, i) => {
              const last = i === graph.points.length - 1;
              return (
                <div key={p.label}>
                  <p className={`text-[1.2em] font-bold tabular-nums ${last ? "text-green" : "text-ink"}`}>{p.value}</p>
                  <p className="text-[0.98em] text-ink-muted">{p.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-[1.1em] text-[1.05em] leading-snug text-ink-muted">
          Every marker keeps its history, so you can see what is moving and in which direction.
        </p>
      </div>
    </>
  );
}

function BookingScreen({ booking }: { booking: PhoneData["booking"] }) {
  // "Sat, Nov 14, 2026" is too long for a phone row; the year is implied by "upcoming".
  const short = (label: string) => label.replace(/,\s*\d{4}$/, "");
  return (
    <>
      <ScreenHead title={booking.title} sub={booking.sub} />

      <ul className="mt-[1.4em] space-y-[0.7em] px-[1.7em]">
        {fairs.slice(0, 3).map((fair, i) => (
          <li
            key={fair.slug}
            className={`flex items-center gap-[0.8em] rounded-[1.3em] border p-[0.9em] ${
              i === 0 ? "border-ink/15 bg-mist" : "border-ink/[0.07]"
            }`}
          >
            <span className="grid h-[2.9em] w-[2.9em] shrink-0 place-items-center rounded-[0.9em] border border-ink/[0.08] bg-white text-ink">
              <MapPin className="h-[1.4em] w-[1.4em]" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[1.25em] font-semibold leading-tight text-ink">{fair.city}</span>
              <span className="mt-[0.25em] block truncate text-[1.05em] text-ink-muted">
                {short(fair.dateLabel)} · {fairHours.start.replace(/^0/, "")} AM
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-[1.2em] px-[1.7em]">
        <p className="rounded-[1.3em] border border-dashed border-ink/20 p-[0.9em] text-[1.05em] leading-snug text-ink-muted">
          {booking.note}
        </p>
      </div>
    </>
  );
}
