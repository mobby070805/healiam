// Inline links inside copy strings, written "[label](href)". Build them with `link()` so a typo in
// the syntax can't slip into a data file. Components render them with <RichText>; anything that
// needs plain text (JSON-LD, llms.txt) runs the string through `plainText()`.

export const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** "[label](href)", for use inside a copy string. */
export function link(label: string, href: string): string {
  return `[${label}](${href})`;
}

/** The same string with every link reduced to its label. */
export function plainText(text: string): string {
  return text.replace(LINK, "$1");
}
