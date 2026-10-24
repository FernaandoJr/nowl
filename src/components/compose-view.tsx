"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

import { AboutDialog } from "@/components/about-dialog"
import { HistoryDialog } from "@/components/history-dialog"
import { LanguageSwitcher } from "@/components/language-switcher"
import { OwlMark } from "@/components/owl-mark"
import { SpeedControl } from "@/components/speed-control"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GITHUB_REPO } from "@/lib/site"
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
					className="h-8 gap-2 px-2 text-[13px] font-medium tracking-[-0.15px]">
					<OwlMark className="size-6 rounded-md" />
					Nowl
				</Button>
				<div className="flex items-center gap-1">
					<HistoryDialog onSelect={onSelectHistory} />
					<AboutDialog />
					<LanguageSwitcher />
					<ThemeToggle />
					<a
						href={GITHUB_REPO}
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className="grid size-9 place-items-center rounded-lg border border-transparent text-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
						<svg
							aria-hidden="true"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="size-[18px]">
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
						</svg>
					</a>
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
					className="h-10 shrink-0 rounded-full px-6 text-[14px] font-medium tracking-[-0.15px] shadow">
					{t("now")}
				</Button>
			</main>
		</div>
	)
}
