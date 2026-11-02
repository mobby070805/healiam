import { Check, Star } from "lucide-react";
import { site } from "@/lib/site";
import { home } from "@/lib/pages/home";
import type { Widen } from "@/lib/types";

export type AppDownloadData = Widen<typeof home.app>;
import { SectionHeading } from "@/components/SectionHeading";

// Dark band, like the hero, so the black store badges sit on white cards instead of
// fighting a white page. QR codes are for desktop visitors, who cannot scan their own
// screen on a phone, so phones get the badges alone. State pages pass their own copy.
export function AppDownload({ app = home.app }: { app?: AppDownloadData }) {
  const { rating } = site.app;

  return (
    <section id="app" className="on-dark section max-sm:!py-8 bg-ink" aria-labelledby="app-title">
      <div className="shell">
        <SectionHeading id="app-title" eyebrow={app.eyebrow} title={app.title} sub={app.sub} onDark compact />

        <div className="mx-auto grid max-w-4xl gap-6 sm:gap-11 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <ul className="space-y-2.5 sm:space-y-6">
            {app.points.map((point) => (
              <li key={point} className="flex gap-2.5 sm:gap-3">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand sm:h-[18px] sm:w-[18px]" strokeWidth={2.4} aria-hidden="true" />
                <span className="text-[14px] leading-[1.5] text-white/80 sm:text-[15.5px] sm:leading-[1.55]">{point}</span>
              </li>
            ))}
          </ul>

          {/* Capped, or the pair stretches into two near-empty cards on a tablet. */}
          <div className="mx-auto w-full max-w-[400px]">
            {/* Phones get the bare badge: it is already a button, and a white card around it was
                just empty space. The ring replaces the card, since the Play badge is pure black
                and would otherwise vanish into the band. */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {app.stores.map((store) => (
                <a
                  key={store.name}
                  href={store.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center sm:flex-col sm:gap-3.5 sm:rounded-2xl sm:bg-white sm:p-5 sm:transition-colors sm:duration-150 sm:hover:bg-white/90"
                >
                  <img
                    src={store.qr}
                    alt=""
                    width={132}
                    height={132}
                    className="hidden h-[132px] w-[132px] sm:block"
                    aria-hidden="true"
                  />
                  <img
                    src={store.badge.src}
                    alt={store.badge.alt}
                    width={store.badge.width}
                    height={store.badge.height}
                    className="h-10 w-auto"
                  />
                  <span className="hidden text-[13px] font-medium text-ink-muted sm:block">{store.caption}</span>
                </a>
              ))}
            </div>

            <p className="mt-3.5 hidden text-center text-[13.5px] text-white/50 sm:block">{app.scanNote}</p>
            <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-[12.5px] text-white/65 sm:mt-3 sm:gap-2 sm:text-[13.5px]">
              <Star className="h-3.5 w-3.5 shrink-0 fill-current text-brand sm:h-4 sm:w-4" strokeWidth={0} aria-hidden="true" />
              Rated {rating.score} on the {rating.source}, from {rating.count} ratings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
