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
import { Kbd, KbdGroup } from "@/components/ui/kbd"

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
				}>
				<InfoIcon className="size-[18px]" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-md tracking-[-0.15px]">
				<DialogHeader>
					<div className="flex items-center gap-3">
						<OwlMark className="size-12 rounded-lg" />
						<div className="flex flex-col">
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
					<div className="flex flex-col gap-2 text-[13px] text-muted-foreground">
						<div className="flex items-center justify-between gap-3">
							<span>{t("pause")}</span>
							<Kbd>Space</Kbd>
						</div>
						<div className="flex items-center justify-between gap-3">
							<span>{t("speedKeys")}</span>
							<KbdGroup>
								<Kbd>↑</Kbd>
								<Kbd>↓</Kbd>
								<Kbd>←</Kbd>
								<Kbd>→</Kbd>
							</KbdGroup>
						</div>
						<div className="flex items-center justify-between gap-3">
							<span>{t("backPaste")}</span>
							<Kbd>Esc</Kbd>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
