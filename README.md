<p align="center">
  <img src="public/now-ip-a1.svg" width="96" height="96" alt="NOW" />
</p>

<h1 align="center">NOW</h1>

<p align="center"><strong>next one word</strong> — RSVP reader. Paste a text, read one word at a time.</p>

<p align="center">
  <a href="https://github.com/FernaandoJr/now">github.com/FernaandoJr/now</a>
</p>

---

NOW flashes a long text as a single word on a fixed point so your eyes stop scanning the page. No account. Nothing leaves the browser.

## Features

- Paste → set pace → **Now**. Fullscreen RSVP with an ORP pivot letter (theme color, not Spritz red).
- Smart timing: longer words and punctuation get extra dwell.
- Speed 100–700 (default 250). The UI shows the number only, never “WPM”.
- Pause / resume (tap or Space). Esc returns to paste. End of text stays on the last word until you go back.
- Last text, speed, and up to 20 previous readings in `localStorage`.
- Light / dark theme. PT / EN via cookie (`NEXT_LOCALE`), no locale in the URL.
- Languages with spaces (Portuguese, English, Spanish, French…). CJK is out of scope.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui (Base UI) · next-intl · next-themes · pnpm

## Usage

| | |
| --- | --- |
| `/` | Landing |
| `/read` | Paste, speed, history, about, then RSVP |

| Key | Action |
| --- | --- |
| Space / tap | Pause or resume. At the end, back to paste |
| Esc | Back to paste |

## Privacy

No server-side user data. Keys in this browser only:

| Key | What |
| --- | --- |
| `now:v1` | Current text + speed |
| `now:history` | Last 20 started readings |
| `NEXT_LOCALE` | `pt` or `en` |

## Setup

Node 20+ and [pnpm](https://pnpm.io) 11.

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000)

```bash
pnpm build    # production build
pnpm start    # serve the build
pnpm lint
```

## Layout

```
src/
  app/            # / and /read
  components/     # landing, compose, RSVP, i18n, theme
  hooks/          # useReader
  i18n/           # next-intl, cookie locale
  lib/            # tokenize, ORP, pacing, storage
messages/         # pt.json, en.json
```

Engine is small and independent of the UI: `tokenize` → `orp` → `pacing` → `useReader`.

## i18n

`localePrefix: "never"`. Locale comes from `NEXT_LOCALE`, default `pt`. Copy lives in `messages/`. Flag toggle is the same pattern as [mosaiq](https://github.com/FernaandoJr/mosaiq).

## Deploy

Any Node host that runs `pnpm build && pnpm start`. [Vercel](https://vercel.com) works with zero extra config.

## License

[MIT](LICENSE)
