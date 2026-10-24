"use client"

import { ArrowLeftIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

import { AboutDialog } from "@/components/about-dialog"
import { HistoryDialog } from "@/components/history-dialog"
import { LanguageSwitcher } from "@/components/language-switcher"
import { OrpWord } from "@/components/orp-word"
import { SpeedControl } from "@/components/speed-control"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { useReader } from "@/hooks/use-reader"
import type { HistoryEntry } from "@/lib/storage"

type ReadViewProps = {
	text: string
	wpm: number
	onWpmChange: (wpm: number) => void
	onBack: () => void
	onSelectHistory: (entry: HistoryEntry) => void
}

export function ReadView({
	text,
	wpm,
	onWpmChange,
	onBack,
	onSelectHistory,
}: ReadViewProps) {
	const t = useTranslations("read")
	const { word, progress, playing, finished, togglePause } = useReader({
		text,
		wpm,
	})

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				event.preventDefault()
				onBack()
				return
			}
			if (event.key === " " || event.code === "Space") {
				event.preventDefault()
				if (finished) {
					onBack()
					return
				}
				togglePause()
			}
		}
		window.addEventListener("keydown", onKeyDown)
		return () => window.removeEventListener("keydown", onKeyDown)
	}, [finished, onBack, togglePause])

	function handleWordArea() {
		if (finished) {
			onBack()
			return
		}
		togglePause()
	}

	return (
		<div className="flex min-h-dvh flex-col bg-background">
			<div
				className="h-0.5 w-full bg-muted"
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={Math.round(progress * 100)}
				aria-label={t("progress")}>
				<div
					className="h-full bg-primary transition-[width] duration-200 ease-out"
					style={{ width: `${progress * 100}%` }}
				/>
			</div>

			<nav className="flex items-center justify-between p-2">
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					className="size-9 text-foreground"
					aria-label={t("back")}
					onClick={onBack}>
					<ArrowLeftIcon className="size-[18px]" />
				</Button>
				<div className="flex items-center gap-1">
					<HistoryDialog onSelect={onSelectHistory} />
					<AboutDialog />
					<LanguageSwitcher />
					<ThemeToggle />
				</div>
			</nav>

			<main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 pb-8">
				<button
					type="button"
					className="flex flex-1 cursor-pointer flex-col items-center justify-center outline-none"
					onClick={handleWordArea}
					aria-label={
						finished
							? t("finished")
							: playing
								? t("pause")
								: t("resume")
					}>
					<OrpWord word={word} className="min-h-12 px-2" />
				</button>

				<div className="mt-auto">
					<SpeedControl wpm={wpm} onChange={onWpmChange} />
				</div>
			</main>
		</div>
	)
}
