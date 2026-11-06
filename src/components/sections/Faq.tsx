import { CalendarCheck, Mail, Phone, Plus } from "lucide-react";
import { site } from "@/lib/site";
import type { FaqData } from "@/lib/types";
import { SectionHeading } from "@/components/SectionHeading";
import { RichText } from "@/components/RichText";

// Fixed layout: heading centred on top, two columns of questions, booking card below.
// The card leads with booking; call and email are quiet links, so nobody is told to call before
// they book (client, 6 Nov 2026).
export function Faq({ faq }: { faq: FaqData }) {
  const { help } = faq;
  const half = Math.ceil(faq.items.length / 2);
  const columns = [faq.items.slice(0, half), faq.items.slice(half)];
  return (
    <section id="faq" className="section bg-white" aria-labelledby="faq-title">
      <div className="shell">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} sub={faq.sub} />
        <div className="mx-auto grid max-w-5xl gap-2.5 sm:gap-3 md:grid-cols-2 md:gap-4">
          {columns.map((col, c) => (
            <div key={c} className="space-y-2.5 sm:space-y-3">
              {col.map((item) => (
                <details
                  key={item.q}
                  className="card group !rounded-2xl px-4 py-3 transition-colors duration-150 open:border-ink/20 sm:px-5 sm:py-3.5"
                >
                  <summary className="flex min-h-[40px] cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans text-[14.5px] font-semibold leading-snug tracking-[-0.005em] text-ink sm:text-[15.5px]">{item.q}</h3>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/10 transition group-open:rotate-45 group-open:bg-ink group-open:text-white">
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="mt-1.5 pb-1 pr-8 text-[13.5px] font-normal leading-relaxed text-ink-soft sm:text-[14.5px]">
                    <RichText text={item.a} />
                  </p>
                </details>
              ))}
            </div>
          ))}
        </div>

        <div className="card mx-auto mt-6 flex max-w-5xl flex-col items-center gap-4 !bg-mist p-5 text-center sm:mt-8 sm:flex-row sm:gap-5 sm:p-6 sm:text-left">
          <span className="icon-tile !bg-white">
            <CalendarCheck className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h3 className="h3">{help.title}</h3>
            <p className="body mt-1">
              Book online in minutes. Questions?{" "}
              <a href={help.secondary.href} className="inline-flex items-center gap-1 font-medium text-ink underline decoration-ink/25 underline-offset-[3px] hover:decoration-ink">
                <Phone className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                {help.secondary.label}
              </a>{" "}
              or{" "}
              <a href={help.email.href} className="inline-flex items-center gap-1 font-medium text-ink underline decoration-ink/25 underline-offset-[3px] hover:decoration-ink">
                <Mail className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                {help.email.label.toLowerCase()}
              </a>
              .
            </p>
          </div>
          <a href={site.bookingUrl} className="btn-primary">
            Book now
          </a>
        </div>
      </div>
    </section>
  );
}
