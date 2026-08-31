"use client"

import { splitAtOrp } from "@/lib/orp"
import { cn } from "@/lib/utils"

type OrpWordProps = {
  word: string
  className?: string
}

export function OrpWord({ word, className }: OrpWordProps) {
  const { before, pivot, after } = splitAtOrp(word)

  return (
    <div
      className={cn("relative w-full select-none", className)}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex w-full items-baseline text-[24px] font-medium tracking-[-0.15px]">
        <span className="flex-1 truncate whitespace-pre text-right text-foreground">
          {before}
        </span>
        <span className="shrink-0 text-primary">{pivot || "\u00A0"}</span>
        <span className="flex-1 truncate whitespace-pre text-left text-foreground">
          {after}
        </span>
      </div>
    </div>
  )
}
