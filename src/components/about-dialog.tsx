"use client"

import { InfoIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { OwlMark } from "@/components/owl-mark"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AboutDialog() {
  const t = useTranslations("about")

  return (
    <Dialog>
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
        <InfoIcon className="size-[18px]" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md tracking-[-0.15px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <OwlMark className="size-10 rounded-lg" />
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-[24px] font-medium tracking-[-0.15px]">
                {t("title")}
              </DialogTitle>
              <DialogDescription className="text-[13px] font-normal tracking-[-0.15px] text-muted-foreground">
                {t("tagline")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 text-[14px] font-normal leading-relaxed text-foreground">
          <p>{t("p1")}</p>
          <p>
            {t.rich("p2", {
              now: (chunks) => (
                <span className="font-medium">{chunks}</span>
              ),
            })}
          </p>
          <div className="flex flex-col gap-1 text-[13px] text-muted-foreground">
            <p>{t("shortcutPause")}</p>
            <p>{t("shortcutEsc")}</p>
            <p>{t("shortcutEnd")}</p>
          </div>
          <p className="text-[13px] text-muted-foreground">{t("privacy")}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
