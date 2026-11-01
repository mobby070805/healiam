import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { fairs } from "@/lib/fairs";
import { Logo } from "@/components/Logo";

const getTested = [
  { label: "Book an appointment", href: site.bookingUrl },
  { label: "Health fairs", href: site.links.fairs },
  { label: "What's tested", href: site.links.tests },
  { label: "See a sample report", href: site.links.sampleReport },
  { label: "Blood test in Texas", href: "/texas/blood-test" },
];

const company = [
  { label: "About", href: site.links.about },
  { label: "Interactive demo", href: site.links.demo },
  { label: "For employers", href: site.links.employer },
  // Our own FAQ, not healiam.com's: no reason to send people off the site for it.
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: site.links.blog },
  { label: "Contact", href: site.links.contact },
];

const storeBadges = [
  { name: "App Store", href: site.app.appStore, src: "/badges/app-store.svg", alt: "Download on the App Store" },
  { name: "Google Play", href: site.app.playStore, src: "/badges/google-play.svg", alt: "Get it on Google Play" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink/[0.07] bg-white pb-24 pt-10 sm:pt-14 md:pb-10">
      <div className="shell grid grid-cols-2 gap-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 text-[14px] text-ink-muted">{site.tagline}</p>
          <ul className="mt-3 text-[14px] text-ink-soft sm:mt-4 sm:space-y-2">
            <li>
              <a href={site.phoneHref} className="inline-flex min-h-[36px] items-center gap-2 hover:text-ink sm:min-h-0">
                <Phone className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-[36px] items-center gap-2 hover:text-ink sm:min-h-0">
                <Mail className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex gap-2.5" aria-label="Social profiles">
            {site.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${s.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white transition-colors duration-150 hover:border-ink/30"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.logo} alt="" width={20} height={20} loading="lazy" className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Get the Healiam app">
            {storeBadges.map((badge) => (
              <li key={badge.name}>
                <a href={badge.href} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={badge.src} alt={badge.alt} width={239} height={71} loading="lazy" className="h-10 w-auto" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Get tested" links={getTested} />
        <FooterColumn title="Healiam" links={company} />
      </div>

      <nav aria-label="Fairs by city" className="shell mt-9 border-t border-ink/[0.07] pt-6">
        <p className="font-display text-[14px] font-bold text-ink">Fairs by city</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 text-[14px] text-ink-soft sm:mt-3 sm:gap-y-2">
          {fairs.map((fair) => (
            <li key={fair.slug}>
              <a href={fair.detailsUrl} className="inline-flex min-h-[36px] items-center hover:text-ink sm:min-h-0">
                {fair.city}
              </a>
            </li>
          ))}
          <li>
            <a href={site.links.fairs} className="inline-flex min-h-[36px] items-center font-semibold text-ink hover:text-ink-soft sm:min-h-0">
              All fairs
            </a>
          </li>
        </ul>
      </nav>

      <div className="shell mt-8 flex flex-col gap-1 border-t border-ink/[0.07] pt-6 text-[13px] text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        {/* Phones: 36px tap height on every footer link; the text size and look are unchanged. */}
        <div className="flex gap-5">
          <a href={site.links.terms} className="inline-flex min-h-[36px] items-center hover:text-ink sm:min-h-0">
            Terms &amp; Conditions
          </a>
          <a href={site.links.privacy} className="inline-flex min-h-[36px] items-center hover:text-ink sm:min-h-0">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="font-display text-[14px] font-bold text-ink">{title}</p>
      <ul className="mt-2 text-[14px] text-ink-soft sm:mt-3 sm:space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="inline-flex min-h-[36px] items-center hover:text-ink sm:min-h-0">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
