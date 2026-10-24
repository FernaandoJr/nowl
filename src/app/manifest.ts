import type { MetadataRoute } from "next"

import { SITE_NAME, SITE_URL, THEME_COLOR } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${SITE_NAME} · Next One Word Lens`,
		short_name: SITE_NAME,
		description: "RSVP reader. Paste text and read one word at a time.",
		start_url: "/read",
		scope: "/",
		display: "standalone",
		lang: "pt",
		dir: "ltr",
		background_color: "#fafafa",
		theme_color: THEME_COLOR,
		categories: ["education", "productivity", "utilities"],
		icons: [
			{
				src: "/nowl-ip-a1.svg",
				sizes: "any",
				type: "image/svg+xml",
				purpose: "any",
			},
			{
				src: "/apple-icon",
				sizes: "180x180",
				type: "image/png",
			},
		],
		id: SITE_URL,
	}
}
