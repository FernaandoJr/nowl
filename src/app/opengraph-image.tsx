import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { Shiori } from "@/components/og/shiori"
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site"

export const alt = "NOW — next one word. RSVP reader."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/now-ip-a1.svg"))

  return new ImageResponse(
    <Shiori
      brand={SITE_NAME}
      title={SITE_TAGLINE}
      logo={`data:image/svg+xml;base64,${logo.toString("base64")}`}
      background="#faf6f1"
      brandColor="#16141f"
      titleColor="#5b4cdb"
    />,
    size
  )
}
