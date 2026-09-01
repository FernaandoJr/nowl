"use client"

import { HistoryIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  clearHistory,
  loadHistory,
  type HistoryEntry,
} from "@/lib/storage"

type HistoryDialogProps = {
  onSelect: (entry: HistoryEntry) => void
}

function preview(text: string) {
  const line = text.replace(/\s+/g, " ").trim()
  if (line.length <= 72) return line
  return `${line.slice(0, 72)}…`
}

function formatWhen(at: number, locale: string) {
  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(at))
}

export function HistoryDialog({ onSelect }: HistoryDialogProps) {
  const t = useTranslations("history")
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) setEntries(loadHistory())
  }

  function handleSelect(entry: HistoryEntry) {
    onSelect(entry)
    setOpen(false)
  }

  function handleClear() {
    clearHistory()
    setEntries([])
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-9 text-foreground"
            aria-label={t("aria")}
          />
        }
      >
        <HistoryIcon className="size-[18px]" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md tracking-[-0.15px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-medium tracking-[-0.15px]">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-[13px] font-normal tracking-[-0.15px] text-muted-foreground">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        {entries.length === 0 ? (
          <p className="text-[14px] text-muted-foreground">{t("empty")}</p>
        ) : (
          <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto">
            {entries.map((entry) => (
              <li key={entry.id}>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto w-full flex-col items-start gap-0.5 px-2 py-2 text-left whitespace-normal"
                  onClick={() => handleSelect(entry)}
                >
                  <span className="line-clamp-2 text-[14px] font-normal tracking-[-0.15px] text-foreground">
                    {preview(entry.text)}
                  </span>
                  <span className="text-[12px] font-normal tracking-[-0.15px] text-muted-foreground">
                    {formatWhen(entry.at, locale)}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={entries.length === 0}
            onClick={handleClear}
            className="text-[14px] font-medium tracking-[-0.15px]"
          >
            {t("clear")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
