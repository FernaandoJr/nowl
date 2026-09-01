"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { AboutDialog } from "@/components/about-dialog"
import { HistoryDialog } from "@/components/history-dialog"
import { LanguageSwitcher } from "@/components/language-switcher"
import { OwlMark } from "@/components/owl-mark"
import { SpeedControl } from "@/components/speed-control"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { HistoryEntry } from "@/lib/storage"

type ComposeViewProps = {
  text: string
  wpm: number
  onTextChange: (text: string) => void
  onWpmChange: (wpm: number) => void
  onStart: () => void
  onSelectHistory: (entry: HistoryEntry) => void
}

export function ComposeView({
  text,
  wpm,
  onTextChange,
  onWpmChange,
  onStart,
  onSelectHistory,
}: ComposeViewProps) {
  const t = useTranslations("compose")
  const canStart = text.trim().length > 0

  return (
    <div className="flex h-dvh flex-col bg-background">
      <nav className="flex items-center justify-between p-2">
        <Button
          nativeButton={false}
          render={<Link href="/" />}
          variant="ghost"
          className="h-8 gap-2 px-2 text-[13px] font-medium tracking-[-0.15px]"
        >
          <OwlMark className="size-6 rounded-md" />
          NOW
        </Button>
        <div className="flex items-center gap-1">
          <HistoryDialog onSelect={onSelectHistory} />
          <AboutDialog />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </nav>

      <main className="mx-auto flex w-full min-w-0 max-w-xl flex-1 flex-col justify-center gap-4 px-4 py-8">
        <Textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={t("paste")}
          className="h-[50dvh] min-h-32 min-w-0 shrink-0 resize-none [field-sizing:fixed] overflow-y-auto whitespace-pre-wrap break-words text-[14px] font-normal tracking-[-0.15px] md:text-[14px]"
          aria-label={t("textLabel")}
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
          {t("now")}
        </Button>
      </main>
    </div>
  )
}
