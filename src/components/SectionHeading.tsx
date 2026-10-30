import { NoBreak } from "@/components/NoBreak";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  id,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  id?: string;
  onDark?: boolean;
}) {
  return (
    <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-12">
      {eyebrow && <span className="eyebrow-text">{eyebrow}</span>}
      <h2 id={id} className={`h2 ${onDark ? "!text-white" : ""}`}>
        {title}
      </h2>
      {sub && (
        <p className={`lead mt-3 ${onDark ? "!text-white/70" : ""}`}>
          <NoBreak text={sub} />
        </p>
      )}
    </div>
  );
}
