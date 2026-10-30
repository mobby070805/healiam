// Keeps hyphenated words and ranges ("Doctor-ready", "8-12", "4 to 5") on one line
// so narrow phone cards never split them.
const KEEP = /(\S+-\S+|\d+ to \d+)/;

export function NoBreak({ text }: { text: string }) {
  return (
    <>
      {text.split(new RegExp(KEEP.source, "g")).map((part, i) =>
        KEEP.test(part) ? (
          <span key={i} className="whitespace-nowrap">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
