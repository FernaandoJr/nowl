/** Split text into words on whitespace. Keeps punctuation attached to words. */
export function tokenize(text: string): string[] {
  return text
    .trim()
    .split(/\s+/u)
    .filter((word) => word.length > 0)
}
