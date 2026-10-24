/**
 * Longest chunk of a word shown in a single RSVP tick. Longer words are chopped
 * into balanced chunks so every letter can actually be read on screen.
 */
const MAX_CHUNK = 10

/** Split a single long word into consecutive readable chunks. */
function chunkLongWord(word: string): string[] {
	if (word.length <= MAX_CHUNK) return [word]

	const count = Math.ceil(word.length / MAX_CHUNK)
	const base = Math.floor(word.length / count)
	let extra = word.length % count

	const chunks: string[] = []
	let offset = 0
	for (let i = 0; i < count; i++) {
		const size = base + (extra > 0 ? 1 : 0)
		if (extra > 0) extra -= 1
		chunks.push(word.slice(offset, offset + size))
		offset += size
	}
	return chunks
}

/**
 * Split text into display tokens on whitespace, keeping punctuation attached
 * and chopping overlong words into readable chunks.
 */
export function tokenize(text: string): string[] {
	return text
		.trim()
		.split(/\s+/u)
		.filter((word) => word.length > 0)
		.flatMap(chunkLongWord)
}
