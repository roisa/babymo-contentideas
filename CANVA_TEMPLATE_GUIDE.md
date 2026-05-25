# Canva Brand Template build guide

This guide tells the Baby Mo design team **exactly** what to build in Canva so the
studio's "Open in Canva" button works. We use **3 templates total** — one per
format — and handle all 8 themes via a swappable background image + Brand Kit
color palettes. **Not** 24 templates (3 × 8).

> **Why this matters**
> Canva's Autofill API matches text by the **field name** that the designer
> assigns to each text element in the template. If a field name doesn't
> match what the studio sends, the autofill silently drops the content.
> Use the names below **verbatim**.

---

## TL;DR — what you're building

| Asset | Count | Purpose |
| --- | --- | --- |
| Brand Template — Single Post (1080×1080) | 1 | Daily Dua, Hadith Motivation, Mama Reflection, etc. |
| Brand Template — Carousel Slide (1080×1080) | 1 | Multi-slide stories, Tahukah Kamu, Kisah Sahabat |
| Brand Template — Reels Slide (1080×1920) | 1 | POV, Soft Affirmations, 5-Second Sunnah |
| Brand Kit color palettes | 8 | One per Baby Mo theme — used to recolor any template in 1 click |
| **Total** | **3 templates + 8 palettes** | Add a theme later? Just add a 9th palette, no new template needed. |

Why this works: the studio pre-renders the **themed background** server-side
and uploads it to Canva as the `bg` image field. So the template stays
theme-agnostic; the background image carries the theme.

---

## Prerequisites

- A **Canva Teams or Enterprise** account (Brand Templates + Autofill API
  are paid features).
- A populated **Baby Mo Brand Kit** with logo + 8 color palettes.

---

## Step 1 — Build the Brand Kit (one-time, 30 min)

1. Open the Baby Mo Canva account → **Brand → Brand Kit**.
2. Upload the **logo PNG** (the same `babymo-logo.png` checked into the
   repo).
3. Create **8 color palettes**, one per theme. Each palette has 5 named
   colors — use these exact names so the templates can reference them:

   | Palette name | `title` | `stroke` | `card_bg` | `ink` | `accent` |
   | --- | --- | --- | --- | --- | --- |
   | **Coral Pink** | `#E2447E` | `#FFFFFF` | `#FFF6F9` | `#3A1B2A` | `#FFD93D` |
   | **Sky Blue** | `#2E7BC4` | `#FFFFFF` | `#F2F8FF` | `#13345A` | `#FFE066` |
   | **Mint Garden** | `#2E8B57` | `#FFFFFF` | `#F4FAEC` | `#1E3A1E` | `#FFD93D` |
   | **Sunny Yellow** | `#D9622E` | `#FFFFFF` | `#FFF9E4` | `#3A2310` | `#FF8FB0` |
   | **Peach Apricot** | `#C4592E` | `#FFFFFF` | `#FFF4EC` | `#3A1B0F` | `#7AC4D9` |
   | **Lavender Night** | `#FFD93D` | `#3E2E6E` | `#FFFCF0` | `#26203F` | `#FFD93D` |
   | **Cream Sand** | `#B8862C` | `#FFFFFF` | `#FFFAEC` | `#3A2E10` | `#F87BAB` |
   | **Cloud Day** | `#5BB3C4` | `#FFFFFF` | `#F4FAFF` | `#14384A` | `#F87BAB` |

   (Values match `lib/themes.ts` exactly — keep them in sync if you change
   either side.)

4. Save the Brand Kit. Each text style in the templates below will link to
   one of these named colors, so swapping palettes recolors the whole
   design in one click.

---

## Step 2 — Build Template 1: Single Post (1080×1080)

1. **Create a design → Custom size → 1080 × 1080**.
2. Build the layers **bottom to top**:

   | # | Layer | Field name / role |
   | --- | --- | --- |
   | 1 | Full-bleed rectangle, no fill | (we replace this with `bg` image) |
   | 2 | **Image placeholder, full-bleed** | Set as image element, name = `bg`. Studio uploads the themed gradient PNG here. |
   | 3 | Baby Mo logo (static) | Top center, 220px wide. Use the Brand Kit logo. |
   | 4 | **Title text** | Set as text element, name = `title`. Fredoka Bold 80pt. Color = Brand Kit `title`. Text shadow (stroke) = Brand Kit `stroke`. |
   | 5 | **Body card** (rounded white rect, static, 92% width) | Fill = Brand Kit `card_bg`. Border = 3px Brand Kit `stroke`. Radius 28px. Shadow `0 6px 0 rgba(0,0,0,.10)`. |
   | 6 | Text inside card — top label | Set as text element, name = `kicker`. Fredoka Bold 24pt. Color = Brand Kit `title`. |
   | 7 | Text inside card — italic transliteration | Set as text element, name = `translit`. Inter Italic 26pt. Color = Brand Kit `title`. |
   | 8 | Text inside card — Arabic | Set as text element, name = `arabic`. **Cairo Bold 60pt** (or Amiri). Color = Brand Kit `title`. RTL alignment. Canva handles Arabic shaping perfectly — no extra work needed. |
   | 9 | Text inside card — main body | Set as text element, name = `body`. Inter Bold 30pt. Color = Brand Kit `ink`. |
   | 10 | Text inside card — attribution | Set as text element, name = `attribution`. Inter Bold 20pt. Color = Brand Kit `title`. |
   | 11 | **Character image placeholder**, bottom right ~280×280 | Set as image element, name = `character`. Studio uploads the matching pose PNG here. |
   | 12 | Page indicator (bottom right) | Set as text element, name = `page_number`. Inter Regular 14pt. Color = Brand Kit `ink` @ 60%. |
   | 13 | Footer (bottom left) | Set as text element, name = `footer`. Inter Regular 14pt. Color = Brand Kit `ink` @ 60%. |

3. For each text element: select it → **⋯ menu → Set as a Text element →
   name it exactly** as in the table.
4. For each image placeholder: select → **⋯ menu → Set as an Image
   element → name it exactly**.
5. **Brand Kit color linking** — for each text element, click the color
   swatch → "Brand Kit" tab → pick the matching named color (`title`,
   `ink`, etc.) so that switching brand palette recolors automatically.
6. **Save as Brand Template**: top right → **Share → Brand Template**.
7. Copy the template ID from the URL (the alphanumeric string after
   `/design/`). Paste it later as env var `CANVA_TEMPLATE_SINGLE`.

---

## Step 3 — Template 2: Carousel Slide (1080×1080)

Visually almost identical to Template 1. **Same field names**. Differences:

- Make `page_number` more prominent (top-right corner, Fredoka Bold 22pt)
- Add a small "swipe →" arrow on slide 1 only — designer hides it after
  autofill for slides 2-N
- Slightly less chrome (no big CTA sticker, since most slides are body
  content)

Paste the saved template ID later as env var `CANVA_TEMPLATE_CAROUSEL`.

---

## Step 4 — Template 3: Reels Slide (1080×1920)

Vertical. **Same field names**. Differences:

- Title 110-120pt, much bigger
- Body card centered vertically in upper third (Instagram's UI overlays
  the bottom 20% with controls)
- `character` placeholder bottom center, ~50% of frame width
- Optional: add a `subtitle_safe_overlay` static layer at top + bottom
  showing the unsafe zones during design, hide it before saving

Paste the saved template ID later as env var `CANVA_TEMPLATE_REELS`.

---

## Step 5 — Wire the env vars

Once you have the three template IDs:

```bash
# On Vercel: Project → Settings → Environment Variables
CANVA_TEMPLATE_SINGLE=DAFxxxxxxxx
CANVA_TEMPLATE_CAROUSEL=DAFyyyyyyyy
CANVA_TEMPLATE_REELS=DAFzzzzzzzz
```

Plus the Canva OAuth env vars (see `/settings` in the studio for the
live checklist):

```
CANVA_CLIENT_ID, CANVA_CLIENT_SECRET, CANVA_REDIRECT_URI, CANVA_REFRESH_TOKEN
```

---

## Workflow per generated piece

1. **Studio side** (automatic): the `/api/canva/autofill` route receives a
   `GeneratedContent`, pre-renders the theme background PNG, pre-renders
   the Arabic image (already does this), uploads both as Canva assets,
   then POSTs the autofill payload with all text fields + the `bg` and
   `character` image refs.
2. **Canva returns an edit URL.** Studio opens it in a new tab.
3. **Designer opens the design**, has 90% of the work done. They:
   - Apply the matching Brand Kit color palette (1 click) — sets all
     theme colors at once.
   - Optionally swap the character pose if a different mood fits better.
   - Tweak emoji or final words.
   - Publish.

Per-piece designer time goes from **~10 min from scratch → ~1 min final
polish**.

---

## What the studio sends (autofill payload reference)

```json
{
  "brand_template_id": "DAFxxxxxxxx",
  "title": "Doa Sebelum Tidur · slide 1/1",
  "data": {
    "title":        { "type": "text",  "text": "Doa Sebelum Tidur" },
    "kicker":       { "type": "text",  "text": "Yuk, Hafalkan!" },
    "translit":     { "type": "text",  "text": "Bismika Allahumma amuutu wa ahyaa." },
    "arabic":       { "type": "text",  "text": "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا" },
    "body":         { "type": "text",  "text": "“Dengan nama-Mu ya Allah, aku mati dan aku hidup.”" },
    "attribution":  { "type": "text",  "text": "(HR. Bukhari 6312)" },
    "page_number":  { "type": "text",  "text": "1 / 1" },
    "footer":       { "type": "text",  "text": "babymo.studio · Daily Dua" },
    "bg":           { "type": "image", "asset_id": "<uploaded theme bg>" },
    "character":    { "type": "image", "asset_id": "<uploaded pose>" }
  }
}
```

---

## Designer FAQ

**Q: Do I need to build a different template for Lavender Night dark theme?**
No. The `bg` field carries the dark gradient. Apply the Lavender Night brand
palette afterwards and the title flips to yellow automatically.

**Q: What if a slide has no Arabic / no transliteration?**
The studio omits those fields. Canva leaves the placeholder text in. To
avoid weird empty rectangles, set the placeholder fill to **transparent**
and style "no text" gracefully — or wrap each in a backing shape that
hides itself when the text is empty (Canva animation rule).

**Q: Can I add new themes later?**
Yes. Add a new color palette to the Brand Kit + add the theme to
`lib/themes.ts`. No template changes.

**Q: What if a piece needs custom art (illustration, sticker)?**
Open the autofilled design and add your art on a new layer above the
template. The template's image fields only own the slots you marked as
such — your additions are untouched on re-autofill.

**Q: Multi-slide carousel — one Canva design with 5 pages, or 5 separate designs?**
v2 ships as 5 separate designs (1 per slide) because Canva's Autofill API
creates one design per call. A follow-up will consolidate them into a
multi-page design after creation.

**Q: Why not a single template per theme (8 templates per format = 24)?**
Maintenance cost. Every brand tweak (logo size, footer style, character
zone shape) would mean editing 24 templates. With this approach, you edit
3 templates and the colors flow from the Brand Kit.

---

## Bonus: pre-rendering the theme backgrounds

The studio already renders a themed gradient + decorative shapes (stars,
clouds, sun rays) in `lib/render.tsx` (`Decorations` + the bg gradient).
For Canva uploads we'll snapshot just that layer to a PNG and upload it as
the `bg` asset.

This is implemented in v2's `/api/canva/autofill` route (or will be — see
the open follow-up: "render bg-only PNG via separate Satori node").

Until that lands, designers can pick the background manually in Canva
(drag in a gradient or pick from the Baby Mo "Backgrounds" folder in the
Brand Kit).
