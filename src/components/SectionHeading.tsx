import { NoBreak } from "@/components/NoBreak";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  id,
  onDark = false,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  id?: string;
  onDark?: boolean;
  /** Smaller title and lead on phones only, for short supporting bands. */
  compact?: boolean;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center sm:mb-12 ${compact ? "mb-5" : "mb-7"}`}>
      {eyebrow && <span className="eyebrow-text">{eyebrow}</span>}
      <h2 id={id} className={`h2 ${compact ? "max-sm:!text-[1.35rem]" : ""} ${onDark ? "!text-white" : ""}`}>
        {title}
      </h2>
      {sub && (
        <p className={`lead ${compact ? "mt-2 max-sm:!text-[14px]" : "mt-3"} ${onDark ? "!text-white/70" : ""}`}>
          <NoBreak text={sub} />
        </p>
      )}
    </div>
  );
}
