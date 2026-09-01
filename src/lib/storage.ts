import { DEFAULT_WPM, clampWpm } from "@/lib/pacing"

const KEY = "now:v1"
const HISTORY_KEY = "now:history"
const MAX_HISTORY = 20

export type StoredState = {
  text: string
  wpm: number
}

export function loadStored(): StoredState {
  if (typeof window === "undefined") {
    return { text: "", wpm: DEFAULT_WPM }
  }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { text: "", wpm: DEFAULT_WPM }
    const parsed = JSON.parse(raw) as Partial<StoredState>
    return {
      text: typeof parsed.text === "string" ? parsed.text : "",
      wpm: clampWpm(
        typeof parsed.wpm === "number" ? parsed.wpm : DEFAULT_WPM
      ),
    }
  } catch {
    return { text: "", wpm: DEFAULT_WPM }
  }
}

export function saveStored(state: StoredState): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({
        text: state.text,
        wpm: clampWpm(state.wpm),
      })
    )
  } catch {
    // ignore quota / private mode
  }
}

export type HistoryEntry = {
  id: string
  text: string
  wpm: number
  at: number
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== "object") return false
  const entry = value as HistoryEntry
  return (
    typeof entry.id === "string" &&
    typeof entry.text === "string" &&
    typeof entry.wpm === "number" &&
    typeof entry.at === "number"
  )
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isHistoryEntry)
  } catch {
    return []
  }
}

export function rememberReading(text: string, wpm: number): HistoryEntry[] {
  const trimmed = text.trim()
  if (!trimmed) return loadHistory()

  const rest = loadHistory().filter((entry) => entry.text.trim() !== trimmed)
  const next: HistoryEntry[] = [
    {
      id: crypto.randomUUID(),
      text,
      wpm: clampWpm(wpm),
      at: Date.now(),
    },
    ...rest,
  ].slice(0, MAX_HISTORY)

  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
  } catch {
    // ignore quota / private mode
  }
  return next
}

export function clearHistory(): void {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(HISTORY_KEY)
  } catch {
    // ignore quota / private mode
  }
}
