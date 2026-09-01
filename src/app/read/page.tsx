"use client"

import { useState, useSyncExternalStore } from "react"

import { ComposeView } from "@/components/compose-view"
import { ReadView } from "@/components/read-view"
import { DEFAULT_WPM, clampWpm } from "@/lib/pacing"
import {
  loadStored,
  rememberReading,
  saveStored,
  type HistoryEntry,
  type StoredState,
} from "@/lib/storage"

type Mode = "compose" | "read"

const SERVER_SNAPSHOT: StoredState = { text: "", wpm: DEFAULT_WPM }

let clientSnapshot: StoredState | null = null

function emptySubscribe() {
  return () => {}
}

function getServerSnapshot(): StoredState {
  return SERVER_SNAPSHOT
}

function getClientSnapshot(): StoredState {
  if (clientSnapshot === null) {
    clientSnapshot = loadStored()
  }
  return clientSnapshot
}

function persist(state: StoredState) {
  const next = { text: state.text, wpm: clampWpm(state.wpm) }
  clientSnapshot = next
  saveStored(next)
}

export default function ReadPage() {
  const stored = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  )
  const [draft, setDraft] = useState<StoredState | null>(null)
  const [mode, setMode] = useState<Mode>("compose")

  const text = draft?.text ?? stored.text
  const wpm = draft?.wpm ?? stored.wpm

  function handleTextChange(next: string) {
    const state = { text: next, wpm }
    setDraft(state)
    persist(state)
  }

  function handleWpmChange(next: number) {
    const state = { text, wpm: clampWpm(next) }
    setDraft(state)
    persist(state)
  }

  function handleStart() {
    if (!text.trim()) return
    rememberReading(text, wpm)
    setMode("read")
  }

  function handleBack() {
    setMode("compose")
  }

  function handleSelectHistory(entry: HistoryEntry) {
    const state = { text: entry.text, wpm: clampWpm(entry.wpm) }
    setDraft(state)
    persist(state)
    setMode("compose")
  }

  if (mode === "read") {
    return (
      <ReadView
        text={text}
        wpm={wpm}
        onWpmChange={handleWpmChange}
        onBack={handleBack}
        onSelectHistory={handleSelectHistory}
      />
    )
  }

  return (
    <ComposeView
      text={text}
      wpm={wpm}
      onTextChange={handleTextChange}
      onWpmChange={handleWpmChange}
      onStart={handleStart}
      onSelectHistory={handleSelectHistory}
    />
  )
}
