import { Check, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import type { HeroVisualData } from "@/lib/types";
import { LucideByName } from "@/components/LucideByName";

// Code-drawn phone mockup (no image files): crisp on every screen, zero image weight.
// Everything inside the phone and the floating cards is sized in `em`, so one font-size
// per breakpoint scales the whole piece. Phones: phone on the right, cards stacked left.
// Tablet and up: phone centred, the alert sits over the status bar (top-left) and the
// trend card over the faded bottom rows (bottom-right), so neither hides key content.
export function HeroVisual({ data }: { data: HeroVisualData }) {
  const heroVisual = data;
  // The booking card is shorter than the trend card, so it sits lower to stay over the faded rows.
  const secondCardOffset = data.trend ? "sm:-bottom-8 lg:-bottom-2" : "sm:-bottom-14";
  return (
    <div
      role="img"
      aria-label={heroVisual.ariaLabel}
      className="relative mx-auto h-[400px] w-full max-w-[420px] sm:h-[520px] sm:max-w-[600px] lg:mr-0 lg:max-w-none xl:h-[570px]"
    >
      {/* Phone column */}
      <div className="absolute inset-y-0 right-[1%] w-[207px] sm:right-auto sm:left-1/2 sm:w-[276px] sm:-translate-x-1/2 lg:w-[253px] xl:w-[288px]">
        <div className="absolute left-1/2 top-[44%] aspect-square w-[175%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.06]" />
        <div className="absolute left-1/2 top-[44%] aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.07] bg-mist" />
        <div className="fade-bottom relative h-full pt-1.5">
          <Phone screen={data.screen} />
        </div>
      </div>

      <div className="absolute left-0 top-[9%] z-10 w-[14em] text-[9.5px] sm:-top-2.5 sm:left-[calc(50%-270px)] sm:w-[15em] sm:text-[11.5px] lg:left-[calc(50%-244px)] lg:text-[10.5px] xl:left-[calc(50%-269px)] xl:text-[11px]">
        <Notification notification={data.notification} />
      </div>
      <div className={`absolute left-0 top-[50%] z-10 w-[14em] text-[9.5px] sm:w-[15em] ${secondCardOffset} sm:left-auto sm:right-[calc(50%-270px)] sm:top-auto sm:text-[11.5px] lg:right-[calc(50%-244px)] lg:text-[10.5px] xl:right-[calc(50%-269px)] xl:text-[11px]`}>
        {data.trend ? <Trend trend={data.trend} place={data.place} /> : data.booking ? <Booking booking={data.booking} place={data.place} /> : null}
      </div>
    </div>
  );
}

function Phone({ screen }: { screen: HeroVisualData["screen"] }) {
  const ringLength = 100;
  const ringFill = (screen.summary.inRange / screen.summary.total) * ringLength;
  return (
    <div className="relative mx-auto w-[23em] rounded-[3.3em] bg-ink p-[0.6em] text-[9px] shadow-[0_50px_90px_-40px_rgba(10,10,15,0.55),0_0_0_1px_rgba(10,10,15,0.9)] sm:text-[12px] lg:text-[11px] xl:text-[12.5px]">
      {/* Side buttons */}
      <span className="absolute -left-[0.28em] top-[9em] h-[2.6em] w-[0.3em] rounded-l bg-ink" />
      <span className="absolute -left-[0.28em] top-[13em] h-[4.4em] w-[0.3em] rounded-l bg-ink" />
      <span className="absolute -right-[0.28em] top-[11em] h-[6em] w-[0.3em] rounded-r bg-ink" />

      <div className="relative h-[47em] overflow-hidden rounded-[2.75em] bg-white">
        {/* Dynamic island */}
        <span className="absolute left-1/2 top-[0.75em] h-[2.2em] w-[7.4em] -translate-x-1/2 rounded-full bg-ink" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-[2.3em] pt-[1.15em] text-[1.2em] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-[0.35em]">
            <svg viewBox="0 0 18 12" className="h-[0.8em] w-auto" fill="currentColor" aria-hidden="true">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
              <rect x="10" y="3" width="3" height="9" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg viewBox="0 0 26 12" className="h-[0.8em] w-auto" aria-hidden="true">
              <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.4" />
              <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" />
              <rect x="24" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" fillOpacity="0.4" />
            </svg>
          </span>
        </div>

        <div className="px-[1.6em]">
          {/* Header */}
          <div className="mt-[2.1em] flex items-center justify-between gap-[1em]">
            <div>
              <p className="font-display text-[2.2em] font-extrabold leading-none tracking-tight text-ink">{screen.title}</p>
              <p className="mt-[0.45em] text-[1.1em] text-ink-muted">{screen.sub}</p>
            </div>
            <span className="grid h-[3.4em] w-[3.4em] shrink-0 place-items-center rounded-full border border-ink/10 bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.logoMark} alt="" width={20} height={21} className="logo-tint h-[1.7em] w-auto" />
            </span>
          </div>

          {/* Summary */}
          <div className="mt-[1.4em] flex items-center gap-[1em] rounded-[1.5em] border border-ink/[0.06] bg-mist p-[1em]">
            <svg viewBox="0 0 36 36" className="h-[4.3em] w-[4.3em] shrink-0 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="currentColor" strokeWidth="3.4" className="text-ink/10" />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeDasharray={`${ringFill} ${ringLength - ringFill}`}
                className="text-green"
              />
            </svg>
            <div className="min-w-0">
              <p className="whitespace-nowrap font-display text-[1.3em] font-bold leading-tight text-ink">{screen.summary.label}</p>
              <p className="mt-[0.3em] flex items-center gap-[0.45em] text-[1.1em] text-ink-muted">
                <span className="h-[0.55em] w-[0.55em] rounded-full bg-ink" />
                {screen.summary.review}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-[1.3em] flex gap-[0.5em]">
            {screen.filters.map((f, i) => (
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
          <ul className="mt-[0.6em]">
            {screen.rows.map((row) => (
              <li key={row.name} className="border-b border-ink/[0.06] py-[1.05em] last:border-0">
                <div className="flex items-baseline justify-between gap-[0.6em]">
                  <p className="flex items-center gap-[0.5em] text-[1.3em] font-semibold text-ink">
                    {row.name}
                    {row.low && (
                      <span className="rounded-full bg-ink px-[0.6em] py-[0.1em] text-[0.72em] font-semibold text-white">Low</span>
                    )}
                  </p>
                  <p className="text-[1.3em] font-bold tabular-nums text-ink">
                    {row.value}
                    <span className="ml-[0.25em] text-[0.75em] font-medium text-ink-muted">{row.unit}</span>
                  </p>
                </div>
                <div className="relative mt-[0.7em] flex h-[0.5em] gap-[0.25em]">
                  <span className="w-[28%] rounded-full bg-ink/[0.09]" />
                  <span className="flex-1 rounded-full bg-green/30" />
                  <span className="w-[28%] rounded-full bg-ink/[0.09]" />
                  <span
                    className={`absolute top-1/2 h-[1.15em] w-[1.15em] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.22em] border-white shadow-[0_1px_4px_rgba(10,10,15,0.3)] ${
                      row.low ? "bg-ink" : "bg-green"
                    }`}
                    style={{ left: `${row.pos}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Notification({ notification }: { notification: HeroVisualData["notification"] }) {
  return (
    <div className="rounded-[1.4em] border border-ink/10 bg-white/95 p-[1em] shadow-[0_24px_44px_-22px_rgba(10,10,15,0.4)] backdrop-blur-md">
      <div className="flex items-start gap-[0.85em]">
        <span className="grid h-[3.3em] w-[3.3em] shrink-0 place-items-center rounded-[0.95em] border border-ink/10 bg-white shadow-[0_2px_6px_-2px_rgba(10,10,15,0.15)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={site.logoMark} alt="" width={18} height={19} className="logo-tint h-[1.65em] w-auto" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-[0.5em] text-[1.05em] text-ink-muted">
            <span className="font-semibold text-ink-soft">{notification.app}</span>
            <span>{notification.time}</span>
          </div>
          <p className="mt-[0.2em] text-[1.25em] font-semibold leading-tight text-ink">{notification.title}</p>
          <p className="mt-[0.2em] flex items-center gap-[0.3em] whitespace-nowrap text-[1.05em] text-ink-muted">
            <Check className="h-[1.1em] w-[1.1em] text-green" strokeWidth={3} aria-hidden="true" />
            {notification.line}
          </p>
        </div>
      </div>
    </div>
  );
}

// The page's city or state, bold so it stands apart from the rest of the card (owner, 6 Nov 2026).
function Place({ place }: { place: string }) {
  return (
    <p className="flex items-center gap-[0.4em] whitespace-nowrap text-[1.45em] font-extrabold leading-tight tracking-[-0.01em] text-ink">
      <MapPin className="h-[0.85em] w-[0.85em] shrink-0 text-brand" strokeWidth={2.4} aria-hidden="true" />
      {place}
    </p>
  );
}

function Trend({ trend, place }: { trend: NonNullable<HeroVisualData["trend"]>; place?: string }) {
  // Lower HbA1c is better; the shaded band marks the normal range under 5.7%.
  const pts = [
    { x: 14, y: 14 },
    { x: 80, y: 30 },
    { x: 146, y: 47 },
  ];
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <div className="rounded-[1.4em] border border-ink/10 bg-white/95 p-[1.1em] shadow-[0_24px_44px_-22px_rgba(10,10,15,0.4)] backdrop-blur-md">
      {place && (
        <div className="mb-[0.7em] border-b border-ink/[0.07] pb-[0.6em]">
          <Place place={place} />
        </div>
      )}
      <div className="flex items-start justify-between gap-[0.5em]">
        <div>
          <p className="text-[1.3em] font-semibold leading-tight text-ink">{trend.name}</p>
          <p className="text-[1.05em] text-ink-muted">{trend.sub}</p>
        </div>
        <span className="rounded-full bg-green-tint px-[0.7em] py-[0.2em] text-[1em] font-semibold text-green">{trend.chip}</span>
      </div>
      <svg viewBox="0 0 160 62" className="mt-[0.8em] block h-auto w-full" aria-hidden="true">
        <rect x="0" y="36" width="160" height="26" rx="5" className="fill-green-tint" />
        <line x1="0" y1="36" x2="160" y2="36" strokeDasharray="3 3" strokeWidth="1" className="stroke-green/50" />
        <polyline points={line} fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="stroke-ink" />
        {pts.map((p, i) => (
          <circle
            key={p.x}
            cx={p.x}
            cy={p.y}
            r={i === pts.length - 1 ? 4.6 : 3.6}
            strokeWidth="2"
            className={i === pts.length - 1 ? "fill-green stroke-white" : "fill-white stroke-ink"}
          />
        ))}
      </svg>
      <div className="mt-[0.5em] grid grid-cols-3 text-center">
        {trend.points.map((p, i) => (
          <div key={p.label}>
            <p className={`text-[1.15em] font-bold tabular-nums ${i === trend.points.length - 1 ? "text-green" : "text-ink"}`}>{p.value}</p>
            <p className="text-[0.95em] text-ink-muted">{p.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Booking({ booking, place }: { booking: NonNullable<HeroVisualData["booking"]>; place?: string }) {
  return (
    <div className="rounded-[1.4em] border border-ink/10 bg-white/95 p-[1.1em] shadow-[0_24px_44px_-22px_rgba(10,10,15,0.4)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-[0.5em]">
        {place ? (
          <div className="min-w-0">
            <Place place={place} />
            <p className="mt-[0.2em] text-[1.05em] text-ink-muted">{booking.title}</p>
          </div>
        ) : (
          <p className="whitespace-nowrap text-[1.3em] font-semibold leading-tight text-ink">{booking.title}</p>
        )}
        <span className="grid h-[1.9em] w-[1.9em] shrink-0 place-items-center rounded-full bg-green-tint text-green" title={booking.chip}>
          <Check className="h-[1.1em] w-[1.1em]" strokeWidth={3} aria-hidden="true" />
          <span className="sr-only">{booking.chip}</span>
        </span>
      </div>
      <ul className="mt-[0.9em] space-y-[0.55em]">
        {booking.lines.map((line) => (
          <li key={line.label} className="flex items-center gap-[0.6em] whitespace-nowrap text-[1.05em] text-ink-soft">
            <span className="grid h-[2em] w-[2em] shrink-0 place-items-center rounded-[0.6em] border border-ink/[0.08] bg-mist text-ink">
              <LucideByName name={line.icon} className="h-[1.05em] w-[1.05em]" />
            </span>
            {line.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
