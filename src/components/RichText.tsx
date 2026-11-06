import { LINK } from "@/lib/rich-text";
import { NoBreak } from "@/components/NoBreak";

// Renders a copy string with "[label](href)" links (see lib/rich-text.ts). Text between links keeps
// NoBreak's no-split rules for ranges and hyphenated words.
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const at = m.index ?? 0;
    if (at > last) parts.push(<NoBreak key={`t${last}`} text={text.slice(last, at)} />);
    parts.push(
      <a
        key={`l${at}`}
        href={m[2]}
        className="font-medium text-ink underline decoration-ink/25 underline-offset-[3px] transition-colors duration-150 hover:decoration-ink"
      >
        {m[1]}
      </a>,
    );
    last = at + m[0].length;
  }
  if (last < text.length) parts.push(<NoBreak key={`t${last}`} text={text.slice(last)} />);
  return <>{parts}</>;
}
