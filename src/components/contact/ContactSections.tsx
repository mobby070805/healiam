import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { contact } from "@/lib/pages/contact";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { LucideByName } from "@/components/LucideByName";

export function ContactHero() {
  const { hero, breadcrumb } = contact;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="shell relative pb-10 pt-4 sm:pb-14 sm:pt-5">
        <Breadcrumbs crumbs={breadcrumb} onDark />
        <div className="max-w-2xl pt-7 sm:pt-10">
          <span className="eyebrow-text !text-brand">{hero.eyebrow}</span>
          <h1 className="text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] sm:leading-[1.04]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-brand" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>
          <p className="mt-3.5 max-w-[34rem] text-[15px] leading-[1.6] text-white/70 sm:mt-5 sm:text-[17px] sm:leading-relaxed">
            {hero.sub}
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactMethods() {
  const { reach } = contact;
  return (
    <section id="reach" className="section bg-white" aria-labelledby="reach-title">
      <div className="shell">
        <SectionHeading id="reach-title" eyebrow={reach.eyebrow} title={reach.title} sub={reach.sub} />

        <ul className="grid gap-3 sm:gap-4 lg:grid-cols-3">
          {reach.methods.map((method) => (
            <li key={method.label}>
              <a href={method.href} className="card card-hover flex h-full flex-col p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <span className="icon-tile">
                    <LucideByName name={method.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-muted sm:h-5 sm:w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <p className="mt-3.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted sm:mt-5">
                  {method.label}
                </p>
                <p className="mt-1 font-display text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[20px]">
                  {method.value}
                </p>
                <p className="body mt-2 flex-1 !text-[12.5px] sm:!text-[14px]">{method.line}</p>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:mt-8">
          <p className="text-[13px] text-ink-muted sm:text-[14px]">{reach.socialsLabel}</p>
          <ul className="flex items-center gap-2.5">
            {site.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white transition-colors duration-150 hover:border-ink/30"
                  aria-label={social.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={social.logo} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactForm() {
  const { form } = contact;
  const endpoint = site.contactFormEndpoint;

  return (
    <section id="message" className="section bg-mist" aria-labelledby="message-title">
      <div className="shell">
        <div className="mx-auto max-w-2xl">
          <SectionHeading id="message-title" eyebrow={form.eyebrow} title={form.title} sub={form.sub} />

          {endpoint ? (
            <form action={endpoint} method="POST" className="card p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <Field id="name" name="name" {...form.fields.name} required />
                <Field id="email" name="email" type="email" {...form.fields.email} required />
              </div>
              <div className="mt-4 sm:mt-5">
                <Field id="phone" name="phone" type="tel" {...form.fields.phone} />
              </div>
              <div className="mt-4 sm:mt-5">
                <label htmlFor="message" className="block text-[13.5px] font-semibold text-ink sm:text-[14px]">
                  {form.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder={form.fields.message.placeholder}
                  className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-ink/40 focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-primary mt-5 w-full sm:mt-6 sm:w-auto">
                {form.submit}
              </button>
              <p className="mt-3 text-[12.5px] leading-snug text-ink-muted sm:text-[13px]">{form.privacy}</p>
            </form>
          ) : (
            <div className="card p-5 text-center sm:p-8">
              <span className="icon-tile mx-auto">
                <Mail className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="h3 mt-3 sm:!text-[20px]">{form.noEndpoint.title}</h3>
              <p className="body mx-auto mt-2 max-w-md">{form.noEndpoint.line}</p>
              <a href={form.noEndpoint.cta.href} className="btn-primary mt-5">
                {form.noEndpoint.cta.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  placeholder,
  autoComplete,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  placeholder: string;
  autoComplete?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13.5px] font-semibold text-ink sm:text-[14px]">
        {label}
        {hint && <span className="ml-1.5 font-normal text-ink-muted">({hint})</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-ink/40 focus:outline-none"
      />
    </div>
  );
}
