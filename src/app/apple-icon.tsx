import { readFile } from "node:fs/promises"

import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"
export const runtime = "nodejs"

export default async function AppleIcon() {
  const logo = await readFile(new URL("./icon.svg", import.meta.url))

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          alt=""
          src={`data:image/svg+xml;base64,${logo.toString("base64")}`}
          width={180}
          height={180}
        />
      </div>
    ),
    size
  )
}
