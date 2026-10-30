import { home } from "@/lib/pages/home";

// Dark band, six named groups with Healiam's own line-art icons, and one link out.
// The full 50+ marker list lives on /tests, so this section names rather than explains.
export function PanelOverview() {
  const { panel } = home;
  return (
    <section id="panel" className="on-dark section bg-ink" aria-labelledby="panel-title">
      <div className="shell">
        <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-11">
          <span className="eyebrow-text !text-brand">{panel.eyebrow}</span>
          <h2 id="panel-title" className="h2 !text-white">
            {panel.titleParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-brand" : undefined}>
                {part.text}
              </span>
            ))}
          </h2>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {panel.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-6 text-center sm:gap-4 sm:py-7"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.icon}
                alt=""
                width={512}
                height={512}
                loading="lazy"
                className="icon-white h-10 w-10 sm:h-12 sm:w-12"
              />
              <span className="text-[13.5px] font-medium text-white/85 sm:text-[15px]">{item.name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex justify-center sm:mt-10">
          <a href={panel.cta.href} className="btn-on-ink">
            {panel.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
