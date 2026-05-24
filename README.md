# Baby Mo · Content Studio

An internal AI-powered social media content engine for **Baby Mo** — a modern
Islamic childhood & parenting brand.

This is a **content production system**, not a Canva clone. The goal is to
generate ~20 decent, on-brand Instagram contents in minutes. The design team
can refine outputs later manually.

## What it makes

- **Single posts** (1080×1080)
- **Carousel slides** (1080×1080, multi-slide storytelling)
- **Reels slides** (1080×1920, subtitle-safe)
- **30-day content calendar** (Mon=dua · Tue=parenting · Wed=fact · Thu=story · Fri=Jumuah · Sat=nostalgia · Sun=bedtime)
- **JPG / PNG / ZIP** exports rendered server-side

## Stack

- Next.js 14 (App Router) · React 18 · TypeScript
- Tailwind CSS · shadcn-style UI components (hand-rolled, Radix-powered)
- Anthropic SDK for live AI generation (optional)
- Satori + @resvg/resvg-js for server-side image rendering
- JSZip for carousel ZIP exports
- Zustand (persisted) for local library

## Getting started

```bash
npm install
npm run dev      # → http://localhost:3000
```

### Optional: live AI generation

By default the app uses a **curated Baby Mo content library** that ships with
the repo (see `lib/samples.ts`). No API key needed.

To enable live AI generation via Claude, set:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev
```

The generator will fall back to the curated library per item if any AI call fails.

## Project structure

```
app/
  page.tsx                 dashboard
  generate/                content generator (the main workflow)
  library/                 generated content history (persisted in localStorage)
  calendar/                30-day content plan
  themes/                  visual theme gallery
  api/
    generate/              POST → batch of GeneratedContent
    render/                POST → PNG bytes for a single slide
    export-zip/            POST → ZIP of all slides + caption.txt + content.json
    calendar/              POST → 30 GeneratedContent items
components/
  ui/                      Button, Card, Tabs, Dialog, Select, ... (shadcn-style)
  sidebar.tsx              left nav
  slide-preview.tsx        CSS preview (mirrors the rendered PNG)
  content-card.tsx         card + detail dialog + export buttons
lib/
  themes.ts                8 hand-tuned palettes
  content-types.ts         7 categories · 30+ content types · 3 storytelling styles
  samples.ts               curated Baby Mo seeds per content type
  ai-engine.ts             offline + Anthropic generation, batching, calendar
  render.tsx               Satori + Resvg slide rendering
  store.ts                 Zustand library (localStorage)
.fonts/                    bundled Inter (Latin) + Cairo (Arabic)
```

## Brand & content philosophy

- **soft · emotional · calming · meaningful · aesthetic · cozy · modern · wholesome**
- avoid: harsh dakwah tone · overcrowded visuals · loud Islamic template style · preachy
- Focus on *Islam in small daily moments*: bedtime duas, tiny sunnah habits,
  helping parents, gratitude moments, gentle parenting, cozy Muslim home life

## Templates & art

Every slide reserves space for:

- a **mascot circle** (top right) — currently a dashed placeholder
- a **footer brand chip** (top left)
- an **illustration zone** (the middle area opposite the text)

The design team can drop Baby Mo characters, illustrations, stickers, or
hand-drawn details into the exported PNG / ZIP. The studio gives 80% of the
finished feeling; designers polish the last 20%.

## Caveats

- The Arabic font (Cairo) renders correctly with Satori but ligature shaping is
  approximate — full Arabic shaping is not supported by Satori. Diacritics
  render. For a final hero asset, designers can swap the Arabic in InDesign.
- Live AI generation requires `ANTHROPIC_API_KEY`. Without it, content is drawn
  from the curated seed library — variations look identical across batches of
  the same type.
- Library is stored in browser localStorage — clearing the browser clears it.

## Future work (not in v1)

- Mascot artwork & sticker overlays
- Hand-drawn illustration assets per category
- Pinterest-style export presets
- Scheduled publishing integration
