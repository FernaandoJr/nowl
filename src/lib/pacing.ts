const MIN_WPM = 100
const MAX_WPM = 700
const DEFAULT_WPM = 250

export { DEFAULT_WPM, MAX_WPM, MIN_WPM }

export function clampWpm(wpm: number): number {
	return Math.min(MAX_WPM, Math.max(MIN_WPM, Math.round(wpm)))
}

/**
 * Duration in ms for one word at a given WPM.
 * Longer words and trailing punctuation get extra time.
 */
export function wordDurationMs(word: string, wpm: number): number {
	const rate = clampWpm(wpm)
	const base = 60_000 / rate
	const letters = [...word].filter((c) => /\p{L}|\p{N}/u.test(c)).length
	const lengthBonus = Math.max(0, letters - 6) * (base * 0.08)

	let punctBonus = 0
	if (/[.!?…]$/u.test(word)) punctBonus = base * 0.7
	else if (/[,;:]$/u.test(word)) punctBonus = base * 0.35
	else if (/[\u2014\u2013-]$/u.test(word)) punctBonus = base * 0.25

	return Math.max(40, base + lengthBonus + punctBonus)
}
