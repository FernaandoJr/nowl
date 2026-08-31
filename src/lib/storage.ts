import { DEFAULT_WPM, clampWpm } from "@/lib/pacing"

const KEY = "now:v1"

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
