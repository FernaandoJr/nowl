<!-- prettier-ignore -->
<div align="center">
  <img src="public/nowl-ip-a1.svg" width="96" height="96" alt="Nowl logo">

  # Nowl
  *Read long text one word at a time*

  [![Live demo](https://img.shields.io/badge/demo-nowl.fernaandojr.dev-5968d9?style=flat-square)](https://nowl.fernaandojr.dev)
  [![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
  ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

  :star: If you like this project, star it on GitHub!

  [Features](#features) • [Getting started](#getting-started) • [Usage](#usage) • [Storage](#storage) • [Deploy](#deploy)

</div>

Nowl is a free in-browser RSVP reader. It flashes a long text as a single word on a fixed point, so your eyes stop scanning the page and your reading gets faster.

> [!TIP]
> Try it right now at [nowl.fernaandojr.dev](https://nowl.fernaandojr.dev). No account, no install, nothing leaves your browser.

## Features

- 🎯 **Fixed ORP pivot** - every word lands with its optimal recognition point in theme color
- ⏱️ **Smart pacing** - long words and punctuation get extra dwell time
- 🔢 **Speed control** - a number from 100 to 700, default 250, changed with arrow keys or slider
- 📚 **History** - last text plus up to 20 previous readings, kept locally
- 🌗 **Light and dark theme**, with system default
- 🌎 **PT and EN**, switched by a cookie, no locale in the URL

## Getting started

You need [Node.js](https://nodejs.org) 20+ and [pnpm](https://pnpm.io) 11.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and paste something.

Other scripts:

```bash
pnpm build    # production build (OpenNext for Cloudflare Workers)
pnpm start    # serve the production build
pnpm lint     # eslint
```

## Usage

| Route   | What you do there                       |
| ------- | --------------------------------------- |
| `/`     | Landing                                 |
| `/read` | Paste, speed, history, about, then RSVP |

| Key         | Action                                     |
| ----------- | ------------------------------------------ |
| Space / tap | Pause or resume. At the end, back to paste |
| ↑ ↓ ← →     | Speed ±10                                  |
| Esc         | Back to paste                              |

> [!NOTE]
> The UI shows the speed as a plain number, never "WPM".

## Storage

Everything lives in `localStorage`, in your browser only:

| Key           | What                     |
| ------------- | ------------------------ |
| `now:v1`      | Current text + speed     |
| `now:history` | Last 20 started readings |
| `NEXT_LOCALE` | `pt` or `en`             |

Languages without spaces (CJK) are out of scope: RSVP relies on word boundaries.

## Deploy

The production site runs on Cloudflare Workers through [OpenNext](https://opennext.js.org). The repo is ready for it:

```bash
pnpm run cf:build   # next build + adapt to Workers
pnpm run deploy     # build and deploy to your account
```

Any Node host that runs `pnpm build && pnpm start` also works.

## How it works

The engine is small and independent of the UI:

```text
tokenize → orp → pacing → useReader
```

- `tokenize` splits text into readable chunks, chopping overlong words
- `orp` finds the pivot letter of each chunk
- `pacing` computes the dwell time per chunk
- `useReader` is the state machine behind the view

Project layout:

```text
src/
  app/            # / and /read
  components/     # landing, compose, RSVP, i18n, theme
  hooks/          # useReader
  i18n/           # next-intl, cookie locale
  lib/            # tokenize, orp, pacing, storage
messages/         # pt.json, en.json
```
