import { Quote } from "lucide-react";
import { site } from "@/lib/site";
import { home } from "@/lib/pages/home";
import { LucideByName } from "@/components/LucideByName";

// Healiam's published client story (healiam.com). No ratings or invented reviews.
export function ClientStory() {
  const { story } = home;
  return (
    <section id="story" className="section bg-mist" aria-labelledby="story-title">
      <div className="shell grid items-center gap-7 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <span className="eyebrow-text">{story.eyebrow}</span>
          <h2 id="story-title" className="h2 max-w-lg">
            {story.title}
          </h2>

          <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            {story.beats.map((beat) => (
              <li key={beat.label} className="flex gap-3.5 sm:gap-4">
                <span className="icon-tile !bg-white">
                  <LucideByName name={beat.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[15px] font-bold leading-tight text-ink sm:text-[17px]">{beat.label}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted sm:text-[15px]">{beat.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="card relative p-6 sm:p-9">
          <Quote className="h-8 w-8 text-ink/15 sm:h-10 sm:w-10" strokeWidth={1.5} aria-hidden="true" />
          <blockquote className="mt-3 font-display text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:mt-4 sm:text-[24px]">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.logoMark} alt="" width={18} height={19} className="logo-tint h-[18px] w-auto" />
            </span>
            <span>
              <span className="block text-[14px] font-semibold text-ink">{story.author}</span>
              <span className="block text-[12.5px] text-ink-muted">{story.fine}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
