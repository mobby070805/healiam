import { fairsPage } from "@/lib/pages/fairs";
import { LucideByName } from "@/components/LucideByName";
import { NoBreak } from "@/components/NoBreak";

export function FairsCommunity() {
  const { community } = fairsPage;
  return (
    <section id="community" className="section bg-mist" aria-labelledby="community-title">
      <div className="shell grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
        <div className="max-w-xl">
          <span className="eyebrow-text">{community.eyebrow}</span>
          <h2 id="community-title" className="h2">
            {community.title}
          </h2>
          <p className="lead mt-3">
            <NoBreak text={community.body} />
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {community.points.map((point) => (
            <li key={point.title} className="card h-full p-4 sm:p-5">
              <span className="icon-tile">
                <LucideByName name={point.icon} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              </span>
              <h3 className="h3 mt-3 sm:mt-4">
                <NoBreak text={point.title} />
              </h3>
              <p className="body mt-1 !text-[12.5px] sm:!text-[14.5px]">
                <NoBreak text={point.line} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
