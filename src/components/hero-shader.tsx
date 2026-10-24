"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Fundo fullscreen: `fixed inset-0` cobre a viewport inteira.
 * Não usar `position: absolute` aqui: anula o fixed e o dither
 * fica preso ao `<main>`, não à tela.
 *
 * Cores vão em hex: `@paper-design/shaders` não parseia oklch.
 */
export type HeroShaderProps = {
	className?: string
}

function rgbToHex(color: string): string | null {
	const match = color.match(
		/rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/,
	)
	if (!match) return null
	const hex = (n: string) =>
		Math.round(Number(n)).toString(16).padStart(2, "0")
	return `#${hex(match[1]!)}${hex(match[2]!)}${hex(match[3]!)}`
}

function cssVarToHex(variable: string, fallback: string): string {
	const probe = document.createElement("div")
	probe.style.position = "absolute"
	probe.style.pointerEvents = "none"
	probe.style.backgroundColor = `var(${variable})`
	document.body.appendChild(probe)
	const resolved = getComputedStyle(probe).backgroundColor
	probe.remove()
	return rgbToHex(resolved) ?? fallback
}

export function HeroShader({ className }: HeroShaderProps) {
	const { resolvedTheme } = useTheme()
	const [colors, setColors] = useState({
		colorBack: "#fafafa",
		colorFront: "#5b4cdb",
	})

	useEffect(() => {
		setColors({
			colorBack: cssVarToHex("--background", "#fafafa"),
			colorFront: cssVarToHex("--primary", "#5b4cdb"),
		})
	}, [resolvedTheme])

	return (
		<Dithering
			className={cn(
				"pointer-events-none fixed inset-0 z-0 h-dvh w-screen",
				className,
			)}
			colorBack={colors.colorBack}
			colorFront={colors.colorFront}
			// @ts-ignore
			shape="cat"
			type="8x8"
			size={2}
			speed={0.3}
		/>
	)
}
