"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { wordDurationMs } from "@/lib/pacing"
import { tokenize } from "@/lib/tokenize"

type UseReaderOptions = {
  text: string
  wpm: number
}

export function useReader({ text, wpm }: UseReaderOptions) {
  const words = useMemo(() => tokenize(text), [text])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [finished, setFinished] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!playing || finished || words.length === 0) {
      clearTimer()
      return
    }

    const word = words[index]
    if (!word) {
      clearTimer()
      return
    }

    const isLast = index >= words.length - 1
    const ms = wordDurationMs(word, wpm)

    timerRef.current = setTimeout(() => {
      if (isLast) {
        setPlaying(false)
        setFinished(true)
        return
      }
      setIndex((i) => i + 1)
    }, ms)

    return clearTimer
  }, [playing, finished, index, wpm, words, clearTimer])

  const togglePause = useCallback(() => {
    if (finished || words.length === 0) return
    setPlaying((p) => !p)
  }, [finished, words.length])

  const word = words[index] ?? ""
  const progress =
    words.length === 0 ? 0 : finished ? 1 : (index + 1) / words.length

  return {
    words,
    word,
    index,
    progress,
    playing,
    finished,
    togglePause,
  }
}
