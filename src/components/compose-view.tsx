"use client"

import { SpeedControl } from "@/components/speed-control"
import { AboutDialog } from "@/components/about-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ComposeViewProps = {
  text: string
  wpm: number
  onTextChange: (text: string) => void
  onWpmChange: (wpm: number) => void
  onStart: () => void
}

export function ComposeView({
  text,
  wpm,
  onTextChange,
  onWpmChange,
  onStart,
}: ComposeViewProps) {
  const canStart = text.trim().length > 0

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <nav className="flex items-center justify-end gap-1 p-2">
        <AboutDialog />
        <ThemeToggle />
      </nav>

      <main className="mx-auto flex w-full min-w-0 max-w-xl flex-1 flex-col gap-4 px-4 pb-8">
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Paste text"
          className="min-h-0 min-w-0 flex-1 resize-none [field-sizing:fixed] overflow-y-auto whitespace-pre-wrap break-words text-[14px] font-normal tracking-[-0.15px] md:text-[14px]"
          aria-label="Text to read"
        />

        <div className="shrink-0">
          <SpeedControl wpm={wpm} onChange={onWpmChange} />
        </div>

        <Button
          type="button"
          disabled={!canStart}
          onClick={onStart}
          className="h-10 shrink-0 rounded-full px-6 text-[14px] font-medium tracking-[-0.15px] shadow"
        >
          Now
        </Button>
      </main>
    </div>
  )
}
