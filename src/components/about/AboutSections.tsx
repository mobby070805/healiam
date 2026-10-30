import { Check } from "lucide-react";
import { about } from "@/lib/pages/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { NoBreak } from "@/components/NoBreak";

export function AboutHero() {
  const { hero, breadcrumb } = about;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="shell relative pb-11 pt-4 sm:pb-16 sm:pt-5 lg:pb-20">
        <Breadcrumbs crumbs={breadcrumb} onDark />
        <div className="max-w-3xl pt-7 sm:pt-10">
          <span className="eyebrow-text !text-brand">{hero.eyebrow}</span>
          <h1 className="max-w-[18ch] text-[2.05rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3rem] sm:leading-[1.04]">
            {hero.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-brand" : undefined}>
                {part.text}
              </span>
            ))}
          </h1>
          <p className="mt-3.5 max-w-[36rem] text-[15px] leading-[1.6] text-white/70 sm:mt-5 sm:text-[17px] sm:leading-relaxed">
            {hero.sub}
          </p>
          <div className="mt-5 flex max-w-[420px] items-stretch gap-2.5 sm:mt-7 sm:max-w-none sm:gap-3">
            <a href={hero.primary.href} className="btn-primary flex-1 !px-4 sm:flex-none sm:!px-7">
              <span className="sm:hidden">{hero.primary.short}</span>
              <span className="hidden sm:inline">{hero.primary.label}</span>
            </a>
            <a href={hero.secondary.href} className="btn-on-ink flex-1 !px-4 sm:flex-none sm:!px-6">
              {hero.secondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutTeam() {
  const { team } = about;
  return (
    <section id="team" className="section bg-white" aria-labelledby="team-title">
      <div className="shell">
        <SectionHeading id="team-title" eyebrow={team.eyebrow} title={team.title} sub={team.sub} />

        <ul className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {team.members.map((member) => (
            <li key={member.name} className="card flex h-full flex-col p-5 sm:p-7">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.photo}
                  alt={member.name}
                  width={600}
                  height={600}
                  className="h-16 w-16 shrink-0 rounded-full object-cover object-top sm:h-20 sm:w-20"
                />
                <div className="min-w-0">
                  <h3 className="font-display text-[17px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[21px]">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] font-semibold text-brand-deep sm:text-[14.5px]">{member.role}</p>
                </div>
              </div>

              <p className="mt-4 text-[14px] font-medium leading-relaxed text-ink-soft sm:mt-5 sm:text-[16px]">
                <NoBreak text={member.lead} />
              </p>
              <p className="body mt-2.5 flex-1">
                <NoBreak text={member.body} />
              </p>

              {member.facts.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-ink/[0.07] pt-4">
                  {member.facts.map((fact) => (
                    <li key={fact} className="flex gap-2.5 text-[13px] text-ink-soft sm:text-[14.5px]">
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-green" strokeWidth={2.4} aria-hidden="true" />
                      {fact}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutMission() {
  const { mission } = about;
  return (
    <section id="mission" className="section bg-mist" aria-labelledby="mission-title">
      <div className="shell grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
        <div className="max-w-xl">
          <span className="eyebrow-text">{mission.eyebrow}</span>
          <h2 id="mission-title" className="h2">
            {mission.title}
          </h2>
          <p className="lead mt-3">
            <NoBreak text={mission.body} />
          </p>
        </div>

        <dl className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {mission.stats.map((stat) => (
            <div key={stat.label} className="card flex items-center gap-4 p-4 sm:flex-col sm:gap-1.5 sm:p-5 sm:text-center">
              <dd className="font-display text-[26px] font-extrabold leading-none tracking-[-0.03em] text-ink sm:text-[30px]">
                {stat.value}
              </dd>
              <dt className="text-[13px] leading-snug text-ink-muted sm:text-[13.5px]">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
