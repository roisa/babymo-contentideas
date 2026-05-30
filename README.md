# Baby Mo · Content Studio

Internal tool for the @babymo.official team to generate on-brand Islamic
Instagram content in minutes — single posts, carousels, reels, and a full
30-day calendar.

**Live app:** https://babymo-contentideas.vercel.app

## What it does

- **Generate** — AI-written content across 8 categories (Daily Dua, Quran Ayah,
  Hadith, Parenting, Ramadan, Eid, Jumuah, Bedtime)
- **Calendar** — auto-built 30-day plan, Hijri-aware (knows when Ramadan / Eid
  is coming and shifts the mix)
- **Animate as Reel** — pick any piece and turn it into a screen-recordable
  9:16 Reel with smooth pose transitions for Baby Mo
- **Library** — every generated piece is saved (shared across the team via
  Upstash Redis)
- **Export** — PNG, JPG, or a ZIP with captions and metadata

## How to use it

1. Open https://babymo-contentideas.vercel.app
2. Hit **Generate**, pick a category + theme, get 4 fresh pieces
3. Tap any piece → **Animate as Reel** → press **Record**, then start your
   iPhone screen recording
4. Export from the Library when you're happy

That's it. No setup, no install.

## Run it locally (only if you're editing the code)

```bash
npm install
npm run dev          # → http://localhost:3000
```

Optional env vars in `.env.local`:

```bash
ANTHROPIC_API_KEY=sk-ant-...           # live AI generation (falls back to seeds)
UPSTASH_REDIS_REST_URL=...             # shared library across devices
UPSTASH_REDIS_REST_TOKEN=...
```

Without these, the app uses curated seeds and localStorage — still works, just
single-device.

## Stack

Next.js 14 · React 18 · TypeScript · Tailwind · Anthropic SDK ·
Satori + Resvg · Framer Motion · Zustand · Upstash Redis
