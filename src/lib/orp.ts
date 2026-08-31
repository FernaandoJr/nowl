/**
 * Optimal Recognition Point index for a word (0-based).
 * Classic Spritz-style heuristic by letter count.
 */
export function orpIndex(word: string): number {
  const len = [...word].length
  if (len <= 1) return 0
  if (len <= 5) return 1
  if (len <= 9) return 2
  if (len <= 13) return 3
  return 4
}

export function splitAtOrp(word: string): {
  before: string
  pivot: string
  after: string
} {
  const chars = [...word]
  if (chars.length === 0) {
    return { before: "", pivot: "", after: "" }
  }
  const i = Math.min(orpIndex(word), chars.length - 1)
  return {
    before: chars.slice(0, i).join(""),
    pivot: chars[i] ?? "",
    after: chars.slice(i + 1).join(""),
  }
}
