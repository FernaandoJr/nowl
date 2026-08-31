"use client"

import { InfoIcon } from "lucide-react"

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
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-[30px] text-foreground"
            aria-label="About NOW"
          />
        }
      >
        <InfoIcon className="size-[14px]" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md tracking-[-0.15px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-medium tracking-[-0.15px]">
            NOW
          </DialogTitle>
          <DialogDescription className="text-[13px] font-normal tracking-[-0.15px] text-muted-foreground">
            next one word
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 text-[14px] font-normal leading-relaxed text-foreground">
          <p>
            A simple reader that shows one word at a time so you can move
            through long text faster, with less eye travel across the page.
          </p>
          <p>
            Paste something you want to read, set a speed, press{" "}
            <span className="font-medium">Now</span>. Each word lands on a fixed
            point; longer words and punctuation get a little more time.
          </p>
          <div className="flex flex-col gap-1 text-[13px] text-muted-foreground">
            <p>Tap or Space — pause / resume</p>
            <p>Esc — back to paste</p>
            <p>At the end, tap to return with your text still there</p>
          </div>
          <p className="text-[13px] text-muted-foreground">
            No account. Text and speed stay in this browser only.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
