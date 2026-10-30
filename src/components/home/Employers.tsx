import { ArrowRight, Building2 } from "lucide-react";
import { home } from "@/lib/pages/home";

// Slim band for the B2B audience; the full pitch lives on the employer page.
export function Employers() {
  const { employers } = home;
  return (
    <section id="employers" className="bg-mist py-8 sm:py-12" aria-labelledby="employers-title">
      <div className="shell">
        <div className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
          <span className="icon-tile">
            <Building2 className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="eyebrow-text !mb-1">{employers.eyebrow}</span>
            <h2 id="employers-title" className="font-display text-[19px] font-bold leading-tight tracking-[-0.015em] text-ink sm:text-[22px]">
              {employers.title}
            </h2>
            <p className="body mt-1.5">{employers.line}</p>
          </div>
          <a href={employers.cta.href} className="btn-ghost self-start sm:self-center">
            {employers.cta.label}
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
