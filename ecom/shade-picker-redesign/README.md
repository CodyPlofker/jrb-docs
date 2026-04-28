# JRB Shade Picker Redesign — Interaction Prototype

Interactive mockup for the "30 Shades. One stick." section on the (upcoming) Complexion Stick PDP. Replaces the static grid + inert swatches with a category-as-filter pattern + hover/tap to preview each shade.

## Run it

```sh
# from this folder
npx http-server . -p 8902 -c-1 --silent
```

Open http://localhost:8902.

## How it works

**Three controls, one detail panel.**

1. **Category buttons** — click to filter the swatch row to that category's shades (Pale, Fair, Light, Light-Medium, Medium-Dark, Dark, Deep).
2. **Swatches** — hover (desktop) or tap (mobile) to preview that shade in the detail panel. Click to lock the selection.
3. **Community grid** — all 30 shades stay visible. Cards in the active category stay in full color; the rest dim to 35%. The currently active shade scales up and gets a soft shadow.

Detail panel updates instantly — name in `GeogrotesqueCondBoldWeb`, description in `RingsideWideWeb`, plus a tinted preview block.

## What's mocked

- **Imagery** — every grid card and the detail preview use a CSS gradient generated from the shade's hex value. No real model photos. Once an Air board with the per-shade matchups (or per-category casting photos) is wired, swap the gradient `<button>` for an `<img>`.
- **Hex colors** — best-effort approximations. Swap the `hex` field in `shades.json` once the design team locks the values.
- **30 shade names + categories** — pulled from the JRB "Find Your Shade" comparison chart on Air (asset `0cf57802-0623-4e3e-be65-9d5d0ff8a0ec`). Confirmed 30 unique shades for Your Skin Foundation Stick / Complexion Stick, distributed across the 7 visible categories from the screenshot.

## Files

| File | Purpose |
|---|---|
| `index.html` | Single-file mockup — markup, CSS, JS inline |
| `shades.json` | 30 shades + 7 categories. Edit here to update the prototype |
| `assets/fonts/` | JRB woff2 fonts (Canela, GeogrotesqueCondBold, RingsideWide, ArticulatCFBold, BaseMonoWideThin) |

## Design system compliance

- **Fonts**: Canela Light (headline), GeogrotesqueCondBold (eyebrow / category buttons / shade name), RingsideWide (body), ArticulatCF Bold (filter labels), BaseMonoWide (mono captions). Loaded via @font-face from local woff2.
- **Colors**: `#000` text, `#fff` / `#f8f8f8` only. No `#666`, no `#1A1A1A`, no `#f6f2eb`.
- **Buttons**: black-fill `.button` pattern. No custom button CSS.
- **Swatches**: 40px outer with 1px `#d0d0d0` border, 34px inner `<i>` (scaled-up version of the buybox 28/24 pattern, per the meeting note that swatches should be slightly bigger to feel interactive).
- **No emojis, no orphan words, no auto-advance carousels.**

## Source

- Granola meeting "Shade filter design ideas" — confirms category-as-filter direction, hover preview, no undertones, larger-than-normal swatches, static community grid.
- Whitney's Figma comment on node `201:140` — focus on shade categories first, click reveals shades, show the community visually.
- Existing JRB `cclp-shade-grid.liquid` — swatch/CTA CSS source-of-truth.

## Next

- Phase B: port to a Shopify Liquid section (`sections/cclp-shade-picker.liquid`) for the JRB theme repo. Section will sit in the theme ready to drop on the Complexion Stick PDP once that product is created in Shopify.
- Designer review: confirm exact hex values + per-shade descriptions before Liquid push.
- Imagery: swap CSS gradient placeholders for Air-hosted model photos.
