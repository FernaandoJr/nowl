"use client"

import { useTranslations } from "next-intl"
import { useEffect } from "react"

import { Slider } from "@/components/ui/slider"
import { SlidingNumber } from "@/components/ui/sliding-number"
import { clampWpm, MAX_WPM, MIN_WPM } from "@/lib/pacing"

const STEP = 10

type SpeedControlProps = {
  wpm: number
  onChange: (wpm: number) => void
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(
    target.closest("textarea, input, select, [contenteditable=true]")
  )
}

function isSliderTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(target.closest("[data-slot=slider]"))
}

export function SpeedControl({ wpm, onChange }: SpeedControlProps) {
  const t = useTranslations("compose")

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target) || isSliderTarget(event.target)) return

      let delta = 0
      if (event.key === "ArrowUp" || event.key === "ArrowRight") delta = STEP
      else if (event.key === "ArrowDown" || event.key === "ArrowLeft")
        delta = -STEP
      else return

      event.preventDefault()
      onChange(clampWpm(wpm + delta))
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onChange, wpm])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="select-none text-[24px] font-medium tracking-[-0.15px] text-foreground">
        <SlidingNumber value={wpm} />
      </div>
      <Slider
        className="w-full"
        min={MIN_WPM}
        max={MAX_WPM}
        step={STEP}
        value={[wpm]}
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value[0] : value
          if (typeof next === "number") onChange(next)
        }}
        aria-label={t("speed")}
      />
    </div>
  )
}
