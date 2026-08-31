"use client"

import { Slider } from "@/components/ui/slider"
import { MAX_WPM, MIN_WPM } from "@/lib/pacing"

type SpeedControlProps = {
  wpm: number
  onChange: (wpm: number) => void
}

export function SpeedControl({ wpm, onChange }: SpeedControlProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[24px] font-medium tracking-[-0.15px] text-foreground">
        {wpm}
      </span>
      <Slider
        className="w-full"
        min={MIN_WPM}
        max={MAX_WPM}
        step={10}
        value={[wpm]}
        onValueChange={(value) => {
          const next = Array.isArray(value) ? value[0] : value
          if (typeof next === "number") onChange(next)
        }}
        aria-label="Reading speed"
      />
    </div>
  )
}
