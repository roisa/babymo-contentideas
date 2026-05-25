# Canva Brand Template build guide

This guide tells the Baby Mo design team **exactly** what to build in Canva so the
studio's "Open in Canva" button works. Three templates needed, one per format.

> **Why this matters**
> Canva's Autofill API matches our text by the **field name** that the
> designer assigns to each text element in the template. If field names
> don't match what the studio sends, the autofill silently drops the
> content. Use the names below verbatim.

---

## Prerequisites

- A **Canva Teams or Enterprise** account (Brand Templates + Autofill API
  are paid features).
- The shared Baby Mo Canva account logged in.

---

## Template 1 — Single Post (1080×1080)

1. In Canva: **Create a design → Custom size → 1080 × 1080 px**.
2. Drop in your branded background (gradient, scene art, character placeholder).
3. Place the **Baby Mo logo PNG** at the top center.
4. Add the following text elements. For each, click the text → top bar → **⋯ → "Set as a Text element"** → name it exactly:

   | Field name        | Purpose                                       | Example                       | Suggested font        |
   | ----------------- | --------------------------------------------- | ----------------------------- | --------------------- |
   | `title`           | Big sticker title                             | "Doa Sebelum Tidur"           | Fredoka 80pt bold     |
   | `kicker`          | Small label inside body card                  | "Yuk, Hafalkan!"              | Fredoka 24pt bold     |
   | `translit`        | Italic Latin transliteration (optional)       | "Bismika Allahumma…"          | Inter italic 26pt     |
   | `arabic`          | Arabic text (Canva will shape it natively!)   | "بِاسْمِكَ اللَّهُمَّ…"             | Cairo 60pt bold       |
   | `body`            | Indonesian translation / main body            | "Dengan nama-Mu…"             | Inter 30pt bold       |
   | `attribution`     | Hadith / Quran source                         | "(HR. Bukhari 6312)"          | Inter 20pt bold       |
   | `page_number`     | "1 / 1"                                       | "1 / 1"                       | Inter 14pt regular    |
   | `footer`          | "babymo.studio · Daily Dua"                   | "babymo.studio · Daily Dua"   | Inter 14pt regular    |

5. Leave a **clear space** for the Baby Mo character pose (the design team
   drags in the right pose per slide after autofill).
6. **Save as Brand Template**: top right → **Share → Brand Template**.
7. Copy the template ID from the URL (the alphanumeric string after `/design/`).

---

## Template 2 — Carousel Slide (1080×1080)

Same field names as the single post. We send one autofill request per
slide, so this is essentially the same template visually. You can clone
Template 1 and adjust:

- Add a `page_number` like "1 / 5" prominently
- Add a "swipe →" arrow at the bottom
- Consider lighter chrome (no big CTA sticker) since most slides are body content

Field names — **identical** to Template 1.

---

## Template 3 — Reels Slide (1080×1920)

Vertical format. Subtitle-safe area: keep critical text in the middle 60%
of the canvas (top 20% and bottom 20% can be safely covered by Instagram
UI overlays).

| Field name        | Same as single post — autofill pipes the same data through |
| ----------------- | ---------------------------------------------------------- |
| `title`           | Hero text, much bigger (e.g. Fredoka 120pt)                |
| `kicker`, `body`, `translit`, `arabic`, `attribution`, `page_number`, `footer` | Same names, smaller variants |

---

## Wiring the IDs

Once you have the three template IDs, set them as Vercel env vars:

```
CANVA_TEMPLATE_SINGLE=DAFxxxxxxxx
CANVA_TEMPLATE_CAROUSEL=DAFyyyyyyyy
CANVA_TEMPLATE_REELS=DAFzzzzzzzz
```

Then any "Open in Canva" click in the studio will autofill the content
into the right template and return an editable Canva URL.

---

## Tips for the designer

- **Arabic font**: pick a proper Arabic font in Canva (Cairo, Amiri, or
  Reem Kufi). Canva uses harfbuzz internally so shaping/joining will be
  perfect — better than our PNG export's wide-spaced Arabic.
- **Empty fields are fine**: a Daily Dua might not have `translit`; the
  studio sends only the fields it has, and Canva leaves the others
  blank. Style the placeholder so an empty field looks intentional
  (e.g. transparent text colour) or hide it with a backing shape.
- **Branding lives in the template**: the more you bake into the
  template (background, logo, character zones, color palette), the less
  per-piece work the designer team has after autofill.
- **Character poses**: the autofill doesn't replace the character PNG —
  the design team manually swaps in the right pose per slide after
  opening in Canva. That's intentional; the studio is for *content*, the
  character match is a creative call.
