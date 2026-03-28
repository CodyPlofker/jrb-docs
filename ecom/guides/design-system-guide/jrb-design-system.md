---
name: jrb-design-system
description: Reference the Jones Road Beauty design system for brand guidelines, component patterns, colors, typography, spacing, and design tokens extracted from the live jonesroadbeauty.com CSS and Figma source files
allowed-tools: Read, WebFetch
---

When this skill is invoked, use the following JRB design system as the authoritative reference for all Jones Road Beauty front-end work. Apply these tokens, patterns, and guidelines when writing CSS, Liquid, or HTML for JRB.

If the user provides arguments (e.g. `/jrb-design-system buttons`), focus your response on that specific area of the design system.

---

# Jones Road Beauty Design System

This document outlines the complete design system for the Jones Road Beauty Shopify theme, extracted from the live jonesroadbeauty.com production CSS, Figma source files, and theme code.

## Design Philosophy

The JRB design system embraces a **clean, premium beauty brand aesthetic** with:
- High readability and generous whitespace
- Minimal decoration, content-first layouts
- Premium but accessible (not luxury-distant)
- Wide monospace (BaseMonoWideWeb) for headings, buttons, and utility text
- Condensed bold sans (GeogrotesqueCondBoldWeb) for small display labels, product names, accordion triggers, and nav — NOT for large page/section headlines
- Body text in RingsideWideWeb, a refined sans-serif
- Canela serif for section titles and editorial/lifestyle moments
- Sharp 2-3px corners on buttons and cards (never 0, never rounded)
- Warm neutral palette anchored by `#f6f2eb` backgrounds and `#000` text
- Brand accent: `--primary-color: #ff2e92` (hot pink/magenta)

## CSS Methodology

**Full reference:** See `references/css-standards.md` for the complete CSS standards document from the dev team.

### Section Structure Pattern

All sections follow this consistent structure:

```liquid
{% comment %}
  Section Name - Brief Description

  Key features and behaviors
  Based on: JRB live site pattern
{% endcomment %}

<section class="section-name" id="{{ section.id }}"
  style="--section-bg: {{ section.settings.background_color }};">
  {%- comment -%} Semantic HTML structure {%- endcomment -%}
  <!-- Section content with semantic class names -->
</section>

<style>
  /* All section-specific styles here */
  /* Mobile-first approach — base styles are mobile, scale up with min-width */

  /* Tablet and up */
  @media screen and (min-width: 768px) {
    /* Tablet overrides */
  }
  /* Desktop and up */
  @media screen and (min-width: 992px) {
    /* Desktop overrides */
  }
</style>

{% schema %}
{
  "name": "Section Name",
  "settings": [...]
}
{% endschema %}
```

### Specificity Rules

- **Never** use IDs as CSS selectors (IDs are for JS/anchors only)
- **Avoid** element selectors — use classes instead
- **Avoid** `!important` — if you must, comment why
- Target `0 1 0` specificity (single `.class`) wherever possible
- Maximum `0 4 0` for parent/child relationships
- Keep selectors simple and readable at a glance

### BEM Naming Convention

Use strict **BEM** naming:

```css
/* Block */
.product-card { }

/* Element — block + double underscore + element */
.product-card__title { }
.product-card__image { }
.product-card__price { }

/* Modifier — block/element + double hyphen + modifier */
.product-card--featured { }
.product-card__title--large { }
```

**Rules:**
- **Block**: Top-level component name (`.product-card`, `.button`, `.accordion`)
- **Element**: Single `__element` only — never chain (`__wrapper__button__label` is wrong)
- **Modifier**: Always used WITH the base class (`class="button button--secondary"`, never `class="button--secondary"` alone)
- **Word separation**: Use dashes within blocks, elements, or modifiers (`.my-component__button-label`)
- **New BEM scope**: When a child element could be standalone, start a new BEM scope rather than deeply nesting

```css
/* Heading hierarchy */
.heading--1 { } .heading--2 { } .heading--3 { } .heading--4 { } .heading--5 { }

/* State classes (non-BEM utility pattern) */
.state--cart-open { } .state--no-header { } .has-mouse { } .overflow-hidden { }
```

### CSS Variable Namespacing

Namespace scoped variables to their component:

```css
/* Do this */
.hero { --hero-padding: 56px; --hero-bg: var(--color-warm-bg); }

/* Don't do this */
.hero { --padding: 56px; --bg: var(--color-warm-bg); }
```

### Scoping Section Instances

Prefer inline `style` attributes with CSS variables for per-instance values (colors, spacing from settings). This avoids dynamic Liquid in `<style>` blocks:

```html
<section style="--section-bg: {{ section.settings.background_color }};">
```

```css
.my-section { background: var(--section-bg); }
```

### CSS Property Order

Maintain consistent order within declarations:

```css
.component {
  /* 1. Layout & Positioning */
  position: relative;
  display: flex;
  flex-direction: column;

  /* 2. Box Model */
  width: 100%;
  margin: 0;
  padding-block: var(--space-md);
  padding-inline: var(--space-lg);
  border: 1px solid var(--color-border);

  /* 3. Typography */
  font-family: var(--font-body);
  font-size: 16px;

  /* 4. Visual */
  background: var(--color-white);
  color: var(--color-black);

  /* 5. Animation & Transforms */
  transition: transform .4s var(--ease-primary);
}
```

### CSS Nesting

- **No `&` operator** except for state pseudo-classes (`&:hover`, `&:focus`, `&:active`)
- **Never nest beyond one level** (except media queries)
- Use nesting for media queries inside selectors
- Use nesting for parent-modifier → child patterns (if-like relationships)

```css
/* Good: media query nesting */
.header {
  width: 100%;
  @media screen and (min-width: 768px) { width: 200px; }
}

/* Good: parent modifier affecting children */
.parent--full-width {
  .child { grid-column: 1; }
}

/* Bad: deep nesting */
.parent {
  .child {
    .grandchild { } /* Never do this */
  }
}
```

### Logical Properties

Use logical properties for RTL-ready CSS:

```css
/* Do: */ padding-inline: 2rem; margin-block: 1rem; text-align: start; inset: 0;
/* Don't: */ padding-left: 2rem; padding-right: 2rem; margin-top: 1rem; text-align: left;
```

### Modern CSS Features

Use when appropriate for new sections:

- **Container queries** for component-level responsiveness
- **`clamp()`** for fluid spacing/typography
- **`min()`/`max()`** for intrinsic sizing
- **`contain: layout style paint`** on grids for render performance
- **`:focus-visible`** instead of `:focus` for keyboard-only focus rings

### Accessibility

Always include:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### CSS Documentation

Use section comment headers in larger CSS blocks:

```css
/* =============================================================================
   Component Name
   ============================================================================= */

/**
 * Brief description
 * @example <div class="component component--modifier">...</div>
 */
```

---

## Color Palette

### Primary Colors

```css
--primary-color: #ff2e92;           /* Brand pink/magenta - CTAs, accents, sale badges, error states */
color: #000;                        /* Black - primary text, borders, button backgrounds */
background: #fff;                   /* White - primary background */
```

### Neutral Colors

```css
#f6f2eb           /* Warm off-white - signature JRB background, section fills */
#f8f8f8           /* Cool light gray - alternate background */
#f7f7f7           /* Upsell card background */
#f5f5f5           /* Loading placeholder gray (--loading-grey) */
#ededed           /* Light dividers */
#ebebeb           /* Dividers */
#d7d7d7           /* Accordion separator borders */
#d4d4d4           /* Swatch unselected border */
#d0d0d0           /* Standard borders - form inputs, card borders, disabled button borders */
#757575           /* Secondary text, .button--gray background, inactive tab text */
#6f6f6f           /* Tertiary text, compare-at price */
#333333           /* Shade description text, body text alternate */
#2e2c33           /* Body text color (dark) */
#000              /* Primary text, button backgrounds, active borders */
```

### Semantic / Functional Colors

```css
--success-color: #059669;           /* Success states */
--error-color: #dc2626;             /* Error states */
--warning-color: #ffd600;           /* Warning states */
--text-primary: #1a1a1a;            /* Primary text (Tailwind layer) */
--text-secondary: #4b5563;          /* Secondary text (Tailwind layer) */
```

### Overlay & Surface Colors

```css
--banner-bg: rgba(255, 255, 255, .95);   /* Banner backgrounds */
--overlay-bg: rgba(0, 0, 0, .75);        /* Modal/drawer overlays */
```

### Junip Reviews Widget

```css
--junipPrimaryColor: #000000;
--junipButtonColor: #000000;
--junipButtonTextColor: #fff;
--junipStarColor: #121212;
--junipOutlineColor: #637381;
--junipBorderColor: rgba(0, 0, 0, 0.08);
--junipSurfaceColor: rgba(0, 0, 0, 0.03);
--junipRatingBarColor: #121212;
--junipRatingBarBackgroundColor: #c4cdd5;
```

---

## Typography

### Font Families

| Font | CSS Name | Usage | Weight(s) | File |
|------|----------|-------|-----------|------|
| **Geogrotesque Cond Bold** | `GeogrotesqueCondBoldWeb` | Small display labels (heading--2/4/5), product names, accordion triggers, nav logo. Always uppercase. NOT for large page/section headlines — those use Canela. | 700 | `Geogrotesque.ttf` |
| **RingsideWide Book** | `RingsideWideWeb` | Body text, descriptions, prices, shade names. Site-wide default. | 400 | `RingsideWide-Book_Web.ttf` |
| **Base Mono Wide** | `BaseMonoWideWeb` | Buttons, CTAs, utility labels, heading classes, tabs. Always uppercase. | 400, 550, 700 | `BaseMonoWideThin_6014.ttf`, `basemonowideot-thin-webfont.otf` |
| **Canela** | `Canela` | Section titles (sentence case, light weight), editorial/lifestyle moments, brand storytelling, pull quotes. Serif. | 300 (Light), 300i (Light Italic), 100 (Thin), 100i (Thin Italic) | `Canela-Light.otf`, `Canela-LightItalic.otf`, `Canela-Thin.otf`, `Canela-ThinItalic.otf` |
| **Antro Vectra Bolder** | `AntroVectraBolder` | Script/handwritten accent — signatures, special callouts, limited use. | 700 | `Antro_Vectra_Bolder.otf` |
| **September Spirit** | `SeptemberSpirit` | Script/handwritten accent — creative/lifestyle moments, limited use. | 400 | `SeptemberSpirit.ttf` |
| **ArticulatCF** | `ArticulatCF` | Body alternate (Adobe Typekit). | 400, 700, 900 | Typekit hosted |
| **Articulat Demibold** | `FontSpringArticulateDemibold` | Bold body text variant. | 600 | Typekit hosted |

```css
/* Body / base — site-wide default */
font-family: RingsideWideWeb, Helvetica, Arial, sans-serif;

/* Display labels & small headings — condensed bold uppercase (NOT for large headlines) */
font-family: GeogrotesqueCondBoldWeb, 'Arial Black', Impact, sans-serif;

/* Monospace utility — headings, buttons, micro-labels */
font-family: BaseMonoWideWeb, Courier, 'Courier New', sans-serif;

/* Editorial serif — section titles, lifestyle and brand moments */
font-family: Canela, serif;

/* Script accent — signatures, handwritten callouts (use sparingly) */
font-family: AntroVectraBolder, cursive;

/* Script accent — creative/lifestyle (use sparingly) */
font-family: SeptemberSpirit, cursive;

/* Body alternate — Adobe Typekit */
font-family: ArticulatCF, sans-serif;

/* Demibold variant — bold body text */
font-family: FontSpringArticulateDemibold, sans-serif;
```

### Local Font Files & @font-face

**IMPORTANT:** JRB font files are installed locally. ALWAYS use the real brand fonts — NEVER use Google Fonts substitutes.

#### Font File Locations

| Font | File | Primary Path |
|------|------|-------------|
| GeogrotesqueCondBoldWeb | `Geogrotesque.ttf` | `~/Library/Fonts/Geogrotesque.ttf` |
| BaseMonoWideWeb | `BaseMonoWideThin_6014.ttf` | `~/Library/Fonts/BaseMonoWideThin_6014.ttf` |
| BaseMonoWideWeb (alt) | `basemonowideot-thin-webfont.otf` | `~/Library/Fonts/basemonowideot-thin-webfont.otf` |
| RingsideWideWeb | `RingsideWide-Book_Web.ttf` | `~/Library/Fonts/RingsideWide-Book_Web.ttf` |
| Canela Light | `Canela-Light.otf` | `~/Library/Fonts/Canela-Light.otf` |
| Canela Light Italic | `Canela-LightItalic.otf` | `~/Library/Fonts/Canela-LightItalic.otf` |
| Canela Thin | `Canela-Thin.otf` | `~/Library/Fonts/Canela-Thin.otf` |
| Canela Thin Italic | `Canela-ThinItalic.otf` | `~/Library/Fonts/Canela-ThinItalic.otf` |

**Backup locations:** `~/Desktop/jrb-web-design/assets/fonts/`, `~/Desktop/fonts/`, `~/Desktop/archive/`

#### @font-face Template (for standalone HTML)

For standalone HTML files (not Shopify theme), copy the needed font files to a `fonts/` directory next to your HTML file, then include these `@font-face` declarations:

```css
@font-face {
  font-family: 'GeogrotesqueCondBoldWeb';
  src: url('fonts/Geogrotesque.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'BaseMonoWideWeb';
  src: url('fonts/BaseMonoWideThin_6014.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'RingsideWideWeb';
  src: url('fonts/RingsideWide-Book_Web.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Canela';
  src: url('fonts/Canela-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Canela';
  src: url('fonts/Canela-LightItalic.otf') format('opentype');
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}
```

#### CSS Custom Properties Template

```css
:root {
  --font-display: GeogrotesqueCondBoldWeb, 'Arial Black', Impact, sans-serif;
  --font-mono: BaseMonoWideWeb, Courier, 'Courier New', sans-serif;
  --font-body: RingsideWideWeb, Helvetica, Arial, sans-serif;
  --font-serif: Canela, serif;
}
```

> **Note:** For Shopify theme context, fonts are loaded via theme assets (CDN). For standalone HTML pages, landing pages, or prototypes, always use the @font-face approach above with local font files.

### Font Usage Rules
- **Geogrotesque** + **BaseMono**: ALWAYS `text-transform: uppercase`
- **Geogrotesque**: Use for small display labels (heading--2 at 31px, heading--4 at 18px, heading--5 at 15px), product names, accordion triggers, nav logo, and **section eyebrows on LPs** (18px, letter-spacing 1px). **NEVER use Geogrotesque for large page/section headlines** — that's Canela's job.
- **Section eyebrows on LPs** (e.g., "THE PROBLEM", "THE ANSWER", "HOW IT WORKS"): Use GeogrotesqueCondBoldWeb 18px 700 uppercase with letter-spacing 1px. Do NOT use BaseMonoWideWeb 12px for eyebrows — it looks too small and weak above large Canela headlines. Geogrotesque 18px condensed bold has more visual punch and better balance as a section label.
- **Canela**: Light weight only (300). The primary font for ALL large headlines — section titles, hero headlines, page-level headings. Always sentence case (capitalize first letter only), 38–42px desktop / 26px mobile, 0.5px letter-spacing. Also used for editorial/lifestyle moments (italic). Never for UI or buttons.
- **Antro Vectra / September Spirit**: Script fonts — use VERY sparingly for handwritten accents, signatures, or creative callouts only. Never for body text, headings, or buttons.
- **Max 3 font families per page** (excluding script accents)

### Font Hierarchy (quick reference)
| Role | Font | Example |
|------|------|---------|
| **Large headlines** (hero, section titles) | Canela Light 300, sentence case | "The 10-second complexion upgrade" |
| **Section eyebrows / LP labels** | Geogrotesque Bold 18px, uppercase, letter-spacing 1px | "THE PROBLEM" · "HOW IT WORKS" |
| **Small display labels** (heading--2/4/5) | Geogrotesque Bold, uppercase | "INSTANT POLISH" |
| **Buttons, tabs** | BaseMono Wide 11-13px, uppercase | "SHOP NOW" |
| **Trust/value text** (below CTA) | RingsideWide 14px, sentence case | "Free shipping on $50+ · Easy returns" |
| **Body text, descriptions, prices** | RingsideWide Book | "One swipe delivers a natural glow." |
| **Editorial moments, pull quotes** | Canela Light Italic | *"It's the only makeup I actually use."* |

### Font Sizes (Heading Utility Classes)

| Class | Font | Size | Letter-Spacing | Line-Height | Mobile Size |
|-------|------|------|----------------|-------------|-------------|
| `.section-title` | Canela | 38px | 0.5px | 54px | 26px / 0.5px / 37px |
| `.heading--1` | BaseMonoWideWeb | 42px | 1.61px | 54px | 24px / 0.92px / 37px |
| `.heading--2` | GeogrotesqueCondBoldWeb | 31px | 2.3px | 36px | — |
| `.heading--3` | BaseMonoWideWeb | 30px | 1.15px | 45px | — |
| `.heading--4` | GeogrotesqueCondBoldWeb | 18px | 1.18px | 22px | — |
| `.heading--5` | GeogrotesqueCondBoldWeb | 15px | 0.98px | 22px | — |

### Body Base Styles

```css
body {
  font-family: RingsideWideWeb, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 100%;
  color: #000;
  letter-spacing: .025em;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### Line Heights

```css
line-height: 100%;    /* Body base (effectively 1) */
line-height: 1.1;     /* Compact headings */
line-height: 1.2;     /* Card text, tight copy */
line-height: 1.3;     /* Descriptions */
line-height: 1.4;     /* Product descriptions */
line-height: 1.5;     /* Body text default */
line-height: 1.6;     /* Long-form body text */
line-height: 1.77;    /* Generous reading text */
```

### Font Weights

```css
font-weight: 300;     /* Canela (light serif) */
font-weight: 400;     /* RingsideWideWeb default, body text */
font-weight: 550;     /* .button text (BaseMonoWideWeb), swatch tabs */
font-weight: 700;     /* GeogrotesqueCondBoldWeb, .button--wide, ArticulatCF bold */
font-weight: 900;     /* articulat-heavy-cf */
```

### Letter Spacing

```css
/* Negative (tightening) */
letter-spacing: -0.8px;    /* Tight display headlines */
letter-spacing: -0.6px;    /* Headlines */
letter-spacing: -0.3px;    /* Headings */

/* Neutral */
letter-spacing: 0;          /* Default */
letter-spacing: .025em;     /* Body text base (set on body) */

/* Positive (tracking) */
letter-spacing: .3px;       /* Upsell product names */
letter-spacing: .355px;     /* Swatch category tabs */
letter-spacing: .4px;       /* Buttons (.button) */
letter-spacing: .5px;       /* Accordion titles */
letter-spacing: .92px;      /* .heading--1 mobile */
letter-spacing: .98px;      /* .heading--5 */
letter-spacing: 1.15px;     /* .heading--3 */
letter-spacing: 1.18px;     /* .heading--4 */
letter-spacing: 1.61px;     /* .heading--1 desktop */
letter-spacing: 2.3px;      /* .heading--2 */
letter-spacing: 3px;        /* Wide tracking (logos only) */
```

---

## Spacing System

Based on observed values from site.css (no formal spacing custom properties):

```css
/* Tight */
4px       /* Micro gaps */
8px       /* Small gaps, swatch row gap */
10px      /* Card internal spacing, swatch column gap */
12px      /* List gaps, small margins */

/* Standard */
14px      /* Card padding (compact) */
16px      /* Card padding (standard), accordion padding */
18px      /* Input padding, accordion body bottom */
20px      /* Mobile horizontal padding, section internal spacing */

/* Medium */
24px      /* Section internal spacing, grid gaps, upsell card padding */
28px      /* Button vertical extent, card padding (generous) */
32px      /* Section margins, desktop horizontal padding */
36px      /* Button horizontal padding */

/* Large */
40px      /* Component padding, page top padding */
44px      /* Button/input height (desktop) */
48px      /* Column gaps, section vertical padding */
56px      /* Generous section vertical padding */

/* Header */
70px      /* Header height (standard) */
80px      /* Header height (small phones), sticky bar height */
```

### Container Max Widths

```css
390px      /* Narrow: mobile-specific containers */
500px      /* Compact: popups */
537px      /* Medium: constrained content */
600px      /* Medium-wide */
650px      /* Content column */
675px      /* Content column (wide) */
1000px     /* Standard: main content area */
1200px     /* Full-width: wide sections */
```

---

## Borders

```css
border-radius: 2px;       /* Buttons, secondary elements, mini ATC */
border-radius: 3px;       /* Form inputs, selects, modals, checkboxes, primary ATC */
border-radius: 5px;       /* Product badges */
border-radius: 100%;      /* Circles: swatches, radio buttons, avatars */
```

### Border Colors

```css
border-color: #000;       /* Active/selected states, primary button borders, selected swatch */
border-color: #d4d4d4;    /* Unselected swatch borders */
border-color: #d7d7d7;    /* Accordion separators */
border-color: #d0d0d0;    /* Standard borders: form inputs, cards, disabled button hover */
border-color: #ebebeb;    /* Light dividers */
border-color: #ededed;    /* Subtle dividers */
```

### Border Widths

```css
border-width: 1px;        /* Standard: buttons, form inputs, cards, dividers, swatches */
border-width: 2px;        /* Selected swatch (bundle context) */
```

---

## Shadows

JRB uses subtle, diffused shadows. No hard/brutalist shadows. Cards use shadow for depth instead of borders.

```css
/* Shadow Scale (from live site CSS) */
box-shadow: 0 1px 2px rgba(16, 24, 40, .04);     /* XSM — Subtle resting shadow (cards, containers) */
box-shadow: 0 2px 4px rgba(0, 0, 0, .15);         /* SM — Standard card shadow */
box-shadow: 0 2px 8px rgba(0, 0, 0, .12);         /* Hover — Card hover elevation */
box-shadow: 0 2px 8px rgba(147, 147, 147, .25);   /* MD — Medium shadow (dropdowns, menus) */
box-shadow: 1px 1px 1px rgba(8, 3, 3, .5);        /* Tight accent shadow */
box-shadow: 0 0 8px rgba(0, 0, 0, 1);             /* Strong focus/glow */
box-shadow: 0 4px 19px rgba(0, 0, 0, .25);        /* LG — Sticky bar shadow */
box-shadow: 0 5px 40px rgba(0, 0, 0, .16);        /* XL — Modal/overlay shadow */
```

### Card Shadow Pattern

Cards on the live site use **no border** — depth comes from subtle shadow with hover elevation:

```css
/* Card resting state */
.card {
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, .04);
  transition: box-shadow .4s cubic-bezier(.39, .575, .565, 1);
}

/* Card hover state */
.has-mouse .card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
}
```

---

## Effects & Transforms

### Transitions

```css
/* Primary site easing curve */
transition: all .4s cubic-bezier(.39, .575, .565, 1);      /* Buttons, interactive elements */

/* Drawer/height easing */
transition: all .3s cubic-bezier(.165, .84, .44, 1);       /* Drawers, accordions */

/* Opacity fades */
transition: opacity .4s cubic-bezier(.39, .575, .565, 1);  /* Content reveals */
transition: opacity .6s cubic-bezier(.39, .575, .565, 1);  /* Slow reveals */
transition: opacity .25s ease;                               /* Accordion icon toggle */

/* Specific properties */
transition: border-color .4s;                               /* Form input focus */
transition: color .4s cubic-bezier(.39, .575, .565, 1);    /* Text color changes */
transition: background .2s;                                 /* Button background */
transition: transform .2s;                                  /* Accordion chevrons */
transition: max-height .2s ease-out;                        /* Accordion expand */
```

### Key Easing Curves

```css
cubic-bezier(.39, .575, .565, 1)     /* Primary site easing — smooth ease-out */
cubic-bezier(.165, .84, .44, 1)      /* Drawer/panel easing — snappy ease-out */
cubic-bezier(.4, 0, .2, 1)           /* Material-style ease-in-out */
```

### No Filters, No Blend Modes

JRB uses full-color product photography. No `filter: grayscale()`, no `mix-blend-mode`.

---

## Components

### Primary Button

```css
.button {
  background: #000;
  border: 1px solid #000;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: BaseMonoWideWeb, Courier, 'Courier New', sans-serif;
  font-size: 13px;
  font-weight: 550;
  height: 40px;
  letter-spacing: .4px;
  line-height: 40px;
  padding: 0 36px;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  transition: all .4s cubic-bezier(.39, .575, .565, 1);
}

.has-mouse .button:not(:disabled):hover {
  background: #fff;
  border-color: #d0d0d0;
  color: #000;
}

.button[disabled] { cursor: text; }
```

#### Button Variants

```css
.button--white { background: #fff; border-color: #fff; color: #000; }
.has-mouse .button--white:not(:disabled):hover { background: #000; border-color: #000; color: #fff; }

.button--outline { background: transparent; color: #000; opacity: .6; }
.button--gray { background: #757575; border-color: #757575; color: #fff; }
.button--pink { background: var(--primary-color); border: 1px solid var(--primary-color); color: #fff; }
.button--wide, .button--checkout { width: 100%; font-size: 13px; font-weight: 700; }
```

### Add to Cart Button (PDP)

```css
.product__form-button {
  background: #000;
  color: #fff;
  border: 1px solid #000;
  border-radius: 3px;
  height: 44px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: BaseMonoWideWeb, Courier, 'Courier New', sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);
}
/* Layout: "ADD TO CART | $38" with pipe separator */
/* Price uses RingsideWideWeb 16px */
```

### Mini Add to Cart (Upsell Cards)

```css
/* Compact ATC for cross-sell/upsell */
background: #000;
color: #f8f8f8;
border: 1px solid #000;
border-radius: 2px;
font-family: BaseMonoWideWeb;
font-size: 14px;
text-transform: uppercase;
height: 30px;
/* Layout: "ADD TO BAG | $price" */
```

### Value Props / Supporting Details (below ATC)

The value props strip sits directly below the ATC button on PDPs and enhanced PDPs. It shows 3 items: Shop Pay, shipping, and returns — each with a theme icon snippet.

**CRITICAL:** Always use the real theme icon snippets (`icon-shop-pay`, `icon-shipping`, `icon-free-returns`), never custom/generic SVGs. In Shopify Liquid, render them with `{%- render 'icon-shop-pay' -%}`. In standalone HTML, copy the SVG source from the snippet files in `snippets/`.

**Source of truth:** `snippets/product-description-main.liquid` (lines 96-114) and `snippets/product-form.liquid` (lines 330-333)

**CSS (matches `.product__description-message` in site.css):**
```css
/* Container */
.value-props {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 24px;
}

/* Each item */
.value-props__item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "RingsideWideWeb", "Helvetica", "Arial", sans-serif;
  font-size: 14px;
  font-weight: 325;
  color: #000;
  letter-spacing: 0;
}
.value-props__item + .value-props__item {
  margin-top: 16px;
}

/* Icons — 20px, fixed width */
.value-props__item svg {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
}

/* Shop Pay item has extra bottom margin to separate from shipping/returns */
.value-props__item--shoppay {
  margin-bottom: 18px;
}
.value-props__item--shoppay svg {
  width: 20px;
  height: auto;
  flex: 0 0 20px;
}

/* Desktop */
@media (min-width: 1024px) {
  .value-props__item { gap: 10px; }
  .value-props__item + .value-props__item { margin-top: 17px; }
}
```

**Standard 3 items (in order):**
1. **Shop Pay** — `icon-shop-pay.liquid` + "Pay over time for orders over $35.00"
2. **Shipping** — `icon-shipping.liquid` (truck) + "Free shipping on US orders over $75"
3. **Returns** — `icon-free-returns.liquid` (circular arrow) + "Free & Easy Returns"

**Common mistakes:**
- Using generic circle/card/cart SVGs instead of real theme icon snippets
- Using `font-weight: 400` instead of `325` (the PDP uses lighter weight)
- Using `font-size: 13px` instead of `14px`
- Using `gap: 8px` or `10px` instead of `5px` mobile / `10px` desktop
- Using BaseMonoWideWeb uppercase for trust/value text — ALWAYS use RingsideWideWeb sentence case to match the live PDP pattern

### Form Inputs

```css
.form input[type=text],
.form input[type=email],
.form input[type=password],
.form input[type=date] {
  background: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
  color: #000;
  font-family: RingsideWideWeb, Helvetica, Arial, sans-serif;
  font-size: 14px;
  height: 44px;
  padding: 0 18px;
  transition: border-color .4s;
  width: 100%;
}
```

### Shade / Swatch Selector

```css
/* Swatch list container */
.product__form-swatches {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 10px;          /* 28px in bundle context */
}

/* Outer ring (label) */
.product__form-swatch label {
  width: 28px;
  height: 28px;
  border-radius: 100%;
  border: 1px solid #d4d4d4;  /* Default unselected */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* Inner color dot */
.product__form-swatch i {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  display: block;
  background-color: var(--swatch-color);  /* Set per variant */
}

/* Selected state */
.product__form-swatch input[type="radio"]:checked + label {
  border-color: #000;
}

/* Shade description text */
.product__form-swatch-name {
  font-family: RingsideWideWeb;
  font-size: 14px;
  font-weight: 400;
  color: #333;
}
```

### Swatch Category Tabs

```css
.product__swatches-btn {
  font-family: BaseMonoWideWeb, Courier, 'Courier New', sans-serif;
  font-size: 14px;
  font-weight: 550;
  letter-spacing: 0.355px;
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #757575;             /* Inactive */
}

.product__swatches-btn.active {
  color: #000;                /* Active */
  /* Underline via border-bottom or padding-bottom 1.5px */
}
```

### Accordion / Expandable Sections

**Two distinct patterns exist — choose based on context:**

#### 1. PDP Buy-Box Accordions (`accordions.liquid`)
Use for product page accordions (How to Use, Key Ingredients). Uses Geogrotesque triggers and `utility__tab` class.

```css
.utility__tab--product {
  font-family: GeogrotesqueCondBoldWeb, 'Arial Black', Impact, sans-serif;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #000;
  background: transparent;
  border: none;
  border-top: 1px solid #d7d7d7;
  padding: 15px 20px 16px 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
  position: relative;
}

/* +/- icon via pseudo-elements */
.utility__tab--product::after {
  content: "";
  position: absolute;
  right: 0; top: 49%;
  height: 1px; width: 17px;
  background-color: #000;
}
.utility__tab--product::before {
  content: "";
  position: absolute;
  right: 8.5px; top: 50%;
  transform: translateY(-50%);
  height: 17px; width: 1px;
  background-color: #000;
  opacity: 1;
  transition: opacity .25s ease;
}
.utility__tab--product[aria-expanded="true"]::before {
  opacity: 0;
}
```

#### 2. LP/Page FAQ Sections — REUSE `casting-faq.liquid`

**CRITICAL: NEVER create a new FAQ section. Always reuse `casting-faq.liquid`.**

It is the canonical FAQ section for all landing pages and non-PDP pages. Key properties:
- **Mechanism**: Native `<details>/<summary>` with CSS-only animation (`interpolate-size`, `::details-content`)
- **Question font**: `ArticulatCF` (fallback: GeogrotesqueCondBoldWeb), weight 700, uppercase mobile / sentence case 1024px+
- **Answer field**: `richtext` — supports bold, links, lists
- **Icon**: SVG + with stroke lines, hides vertical bar on open
- **Schema settings**: heading, background, heading_color, question_color, answer_color, divider_color (6 configurable colors)
- **Responsive breakpoints**: 393px, 700px, 768px, 1024px (matches theme)
- **Blocks**: type `faq` with `question` (text) and `answer` (richtext)

Why this is the canonical choice:
- Native `<details>/<summary>` = accessible, no JS, keyboard navigable
- CSS-only open/close animation via `::details-content` transition
- ArticulatCF matches the JRB FAQ question typography standard
- richtext answers allow formatted content
- Fully configurable colors for different page backgrounds
- Follows the `product-faqs.liquid` interaction pattern used on the real PDP

**Do NOT create custom FAQ sections with JS toggles, custom `.is-open` classes, or `textarea` answer fields.**

### Press Logo Bar (Canonical: `jrb11-press-logo-bar.liquid`)

**IMPORTANT**: `jrb11-press-logo-bar.liquid` is the PREFERRED press section for all new pages. It has built-in SVG logos for: Vogue, Allure, Cosmopolitan, Harper's Bazaar, Elle, Glamour, Marie Claire, Women's Health, and InStyle — plus custom logo support (SVG or image upload). It renders as a quote carousel with logo navigation and a progress bar. Block type: `press_quote` with `quote` (textarea) and `logo` (select). NEVER create a new press section — always reuse this one.

```css
.press {
  padding: 48px 32px;
  background: #000;
  text-align: center;
}
.press__logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
  flex-wrap: wrap;
}
.press__logo svg {
  height: 22px;
  width: auto;
}
/* Mobile */
@media (max-width: 768px) {
  .press__logo svg { height: 16px; }
  .press__logos { gap: 24px; }
}
```

**Source**: Extract SVG logos from `/my-jrb-theme/sections/jrb11-press-logo-bar.liquid` (Liquid variables like `vogue_logo_svg`, `allure_logo_svg`, etc. starting around line 171). There is no New York Times SVG in the theme.

### Upsell / Cross-Sell Cards

```css
.product__upsell {
  background: #f7f7f7;
  border: none;
  border-radius: 0;
  padding: 0 24px;
  display: flex;
  align-items: center;
  height: 152px;
}

.product__upsell-name {
  font-family: GeogrotesqueCondBoldWeb;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}
```

### Product Card Flags (Tags)

Product card flags are the primary tag system used across the site. They are plain colored text positioned top-right — NOT pill badges.

```css
/* Flag container — positioned top-right of product card image */
.product__card-flag-container {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding-left: 10px;
}

@media screen and (min-width: 1024px) {
  .product__card-flag-container {
    top: 15px;
    right: 15px;
    gap: 8px;
  }
}

@media screen and (max-width: 699px) {
  .product__card-flag-container {
    flex-direction: column;
    align-items: flex-end;
  }
}

/* Default flag — plain text, NO background, NO border */
.product__card-flag {
  color: var(--tag-color);              /* Default: #f50a99 (pink) */
  text-transform: uppercase;
  font-family: "BaseMonoWideWeb", "Courier", "Courier New", sans-serif;
  font-weight: 500;
  font-size: 11px;
}

@media screen and (min-width: 1024px) {
  .product__card-flag {
    font-size: 14px;
  }
}

/* Holiday variant — filled background */
.product__card-flag--holiday {
  background-color: var(--holiday-tag-bg-color);
  border: 1px solid var(--holiday-tag-bg-color);
  color: var(--holiday-tag-text-color) !important;
  padding: 5px 8px 3px;
}

/* Outline variant — border only */
.product__card-flag--outline {
  color: var(--outline-tag-color) !important;
  border: 1px solid var(--outline-tag-color) !important;
  padding: 5px 8px 3px;
}
```

**Source**: Flags come from product tags prefixed with `flag_` (e.g., `flag_New`, `flag_Bestseller`).
**IMPORTANT**: NEVER create custom pill badges, centered badges, or white-background tag treatments. Always use this existing pattern.

### Before/After Badges & Award Badges

```css
.before_badge {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: #fff;
  color: #000;
  padding: 0 5px;
  border-radius: 5px;
  z-index: 99;
}

/* Award badge (positioned on product hero) */
.product__hero-award {
  position: absolute;
  top: 5%;
  left: 2%;
  width: 80px;
  height: 80px;
  z-index: 1;
}
```

### Sticky Add-to-Cart Bar

```css
.product__sticky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: #fff;
  height: 80px;
  box-shadow: 0 4px 19px rgba(0, 0, 0, 0.25);
}
/* Layout: Product name + stars | Shade selector + swatch | ATC button */
/* ATC button uses same styles as primary (black, 44px, 3px radius) */
```

### Price Display

```css
/* Regular price */
.product__form-price--regular {
  font-family: RingsideWideWeb;
  font-size: 16px;
  font-weight: 400;
}

/* Compare-at / sale price (strikethrough) */
.product__price-compare {
  text-decoration-line: line-through;
  color: #6f6f6f;
}

/* Sale price highlight */
/* Uses --primary-color (#ff2e92) for sale/discount pricing */
```

### Section Title (Canela)

```css
/* Section title — Canela serif, light weight, sentence case */
.section-title {
  font-family: Canela, serif;
  font-size: 38px;
  font-weight: 300;
  letter-spacing: .5px;
  line-height: 54px;
  text-transform: none; /* Sentence case — capitalize first letter only */
  color: #000;
}

@media screen and (max-width: 700px) {
  .section-title {
    font-size: 26px;
    letter-spacing: .5px;
    line-height: 37px;
  }
}

/* Section subtitle — Ringside body font */
.section-subtitle {
  font-family: RingsideWideWeb, Helvetica, Arial, sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  color: #000;
  letter-spacing: .4px;
}
```

### Star Rating (Junip)

**IMPORTANT:** Always use these exact Junip SVG star paths and the overflow-clip partial-fill technique. Match the live PDP unless explicitly told otherwise.

**Star color:** `#000` (black) — NOT gold/yellow. The Junip `--junipStarColor` on JRB is dark.

**Technique:** Two layers — outline stars underneath, filled stars overlaid with `overflow: hidden` and `width: {rating * 20}%`.

**Exact SVG paths (viewBox="0 0 18 17"):**

```html
<!-- Outline star (background layer) -->
<svg viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.38711 11.9007L12.0835 14.3853L11.8206 10.7253L15.4448 10.1683L12.4256 8.11108L14.2545 4.92967L10.7338 6.00159L9.38711 2.59757L8.04044 6.00159L4.5197 4.92967L6.34863 8.11108L3.32946 10.1683L6.9536 10.7253L6.69072 14.3853L9.38711 11.9007ZM5.56489 16.7222L5.93736 11.5359L0.787109 10.7443L5.07899 7.81986L2.48771 3.31213L7.476 4.83087L9.38711 0L11.2982 4.83087L16.2865 3.31213L13.6952 7.81986L17.9871 10.7443L12.8369 11.5359L13.2093 16.7222L9.38711 13.2L5.56489 16.7222Z" fill="#000"/>
</svg>

<!-- Filled star (overlay layer) -->
<svg viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.36372 16.7222L5.73622 11.5359L0.585938 10.7443L4.87784 7.81986L2.2865 3.31213L7.27483 4.83087L9.18594 0L11.097 4.83087L16.0853 3.31213L13.4941 7.81986L17.7859 10.7443L12.6357 11.5359L13.0082 16.7222L9.18594 13.2L5.36372 16.7222Z" fill="#000"/>
</svg>
```

**Complete Liquid pattern for star ratings:**

```liquid
{%- assign star_fill_width = rating_value | times: 20 -%}
<div class="stars" aria-label="{{ rating_value }} out of 5 stars">
  <div class="stars__outline">
    {%- for i in (1..5) -%}
      <svg viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M9.38711 11.9007L12.0835 14.3853L11.8206 10.7253L15.4448 10.1683L12.4256 8.11108L14.2545 4.92967L10.7338 6.00159L9.38711 2.59757L8.04044 6.00159L4.5197 4.92967L6.34863 8.11108L3.32946 10.1683L6.9536 10.7253L6.69072 14.3853L9.38711 11.9007ZM5.56489 16.7222L5.93736 11.5359L0.787109 10.7443L5.07899 7.81986L2.48771 3.31213L7.476 4.83087L9.38711 0L11.2982 4.83087L16.2865 3.31213L13.6952 7.81986L17.9871 10.7443L12.8369 11.5359L13.2093 16.7222L9.38711 13.2L5.56489 16.7222Z" fill="#000"/></svg>
    {%- endfor -%}
  </div>
  <div class="stars__filled" style="width: {{ star_fill_width }}%;">
    {%- for i in (1..5) -%}
      <svg viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg" role="img"><path d="M5.36372 16.7222L5.73622 11.5359L0.585938 10.7443L4.87784 7.81986L2.2865 3.31213L7.27483 4.83087L9.18594 0L11.097 4.83087L16.0853 3.31213L13.4941 7.81986L17.7859 10.7443L12.6357 11.5359L13.0082 16.7222L9.18594 13.2L5.36372 16.7222Z" fill="#000"/></svg>
    {%- endfor -%}
  </div>
</div>
```

**Required CSS:**

```css
.stars { display: flex; align-items: center; position: relative; height: 16px; }
.stars__outline { display: flex; align-items: center; }
.stars__outline svg, .stars__filled svg { width: 16px; height: 16px; padding: 1px; flex-shrink: 0; display: block; }
.stars__filled { display: flex; align-items: center; position: absolute; top: 0; left: 0; overflow: hidden; height: 100%; }
```

**Default rating:** Use 4.3 (Miracle Balm actual rating) unless specified. Always make the rating editable via schema settings.

**Schema pattern:**
```json
{ "type": "text", "id": "star_rating", "label": "Star Rating", "info": "Decimal rating (e.g. 4.3). Controls partial star fill.", "default": "4.3" }
```

### Image Containers

```css
.image, .circle {
  height: 0;
  overflow: hidden;
  padding-top: 100%;    /* 1:1 aspect ratio */
  position: relative;
}

.image img, .circle img {
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
```

### Product Cards

```css
/* Product cards on the live site are BORDERLESS — depth from shadow, not borders */
/* Uses Swiper.js for mobile carousel */
/* Hover image from product.images[1] or metafields.product_card.hover_image */
/* Flag system via product tags (flag_* naming) */
/* Responsive image srcsets: 360px, 540px, 720px, 1080px, 1440px */
/* content-visibility: auto for performance */

/* Card container */
.product-card {
  background: #fff;
  border: none;             /* NO border on product tiles */
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, .04);  /* Subtle resting shadow */
  transition: box-shadow .4s cubic-bezier(.39, .575, .565, 1);
}

.has-mouse .product-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, .12);  /* Elevated on hover */
}
```

### Drawers (Cart, Mobile Nav, Filters)

```css
/* Drawer overlay */
background: rgba(0, 0, 0, 0.75);  /* --overlay-bg */

/* Drawer panel */
background: #fff;
/* Slides in from right (cart) or left (nav) */
/* Uses Alpine.js for state management (x-data, @click, x-show) */
/* Transition: cubic-bezier(.165, .84, .44, 1) */
```

---

## Layout Patterns

### Content Container

```css
.content { display: block; padding-top: 70px; }

@media screen and (max-width: 393px) {
  .content { padding-top: 80px; }
}
```

### Container Max Widths

```css
/* Tier 1: Narrow */   max-width: 500px;    /* Popups, modals */
/* Tier 2: Medium */   max-width: 650px;    /* Text-heavy sections */
/* Tier 3: Standard */ max-width: 1000px;   /* Main page content */
/* Tier 4: Full */     max-width: 1200px;   /* Wide sections */
```

### Section Spacing

```css
padding: 48px 32px;     /* Standard section */

@media screen and (max-width: 700px) {
  padding-left: 20px;
  padding-right: 20px;
}
```

---

## Responsive Breakpoints

**Approach:** Mobile-first (`min-width` queries). Base styles target mobile, then scale up.

```css
/* Mobile-first breakpoints */
@media screen and (min-width: 576px)   { /* Small devices and up */ }
@media screen and (min-width: 768px)   { /* Medium devices (tablet) and up */ }
@media screen and (min-width: 992px)   { /* Large devices (desktop) and up */ }
@media screen and (min-width: 1200px)  { /* Extra large devices and up */ }
@media screen and (min-width: 1400px)  { /* 2XL devices and up */ }
```

**Legacy note:** Existing theme code uses desktop-first breakpoints (`max-width: 1023px`, `700px`, `393px`). New code should use mobile-first `min-width` queries. When editing existing sections, match the file's current approach for consistency.

**Key pattern:** JRB gates hover styles behind `.has-mouse` class on `<body>`, preventing hover effects on touch devices.

---

## Key Page Templates

### Product Detail Page (PDP)

1. Sticky add-to-cart bar (appears on scroll, 80px, white bg, shadow)
2. Product hero: Image gallery (left) + Product info (right)
3. Award badges (absolute positioned on hero images)
4. Shade selector with category tabs (ALL, HIGHLIGHT, BLUSH, TINT, COLORLESS)
5. Add to Cart button (full-width, black, shows price with pipe separator)
6. Upsell/cross-sell cards ("Pair With" section)
7. Accordion sections (How to Use, Key Ingredients, FAQ)
8. Reviews section (Junip widget - never below fold)
9. Related products carousel

### Homepage

1. Hero banner (full-width, lifestyle + product)
2. Featured products row
3. "What Shade Am I?" quiz CTA
4. Key Ingredients/UVPs section
5. Reviews/Social proof
6. "How We're Wearing It" UGC
7. Cross-sell products
8. Footer

### Collection Page

1. Category header
2. Filter/sort bar (Alpine.js drawer on mobile)
3. Product grid (3-4 columns desktop, 2 mobile)
4. Product cards with hover image swap
5. Pagination or infinite scroll

---

## Imagery Guidelines

### Product Photography
- Clean, white or neutral backgrounds
- Consistent lighting, show texture and true color
- Multiple angles (5-7 per product)
- Include swatches for shade products
- Square aspect ratio (1:1) for product images

### Lifestyle Photography
- Real people, diverse ages and skin tones
- Natural, effortless beauty aesthetic
- Warm, natural lighting
- Authentic, not overly retouched

### Image Aspect Ratio Reference (from live site)

These are the actual ratios used on jonesroadbeauty.com. **Always match these when building sections.**

| Context | Desktop Ratio | Mobile Ratio | CSS Technique |
|---------|--------------|--------------|---------------|
| Product gallery (PDP) | 1:1 (square) | 1:1 (square) | `padding-bottom: 100%` or `aspect-ratio: 1/1` |
| Product cards (PLP/collection) | 1:1 (square) | 1:1 (square) | `padding-bottom: 100%` |
| Product thumbnails | 1:1 (square) | 1:1 (square) | `aspect-ratio: 1/1` |
| Hero banner (section-hero) | 16:9 or custom property | 1:1 or custom property | CSS custom props from image intrinsic ratio |
| Hero banner (dynamic/legacy) | viewport-height based | 5:6 portrait (~120% padding-top) | `padding-top` trick |
| Hero carousel | ~12:5 (2.4:1 widescreen) | ~43:32 | `padding-top` trick |
| Editorial image+text (half-width) | 1:1 (square) | 3:4 portrait | `aspect-ratio` on container |
| Cards carousel | 5:7 portrait | 5:7 portrait | `aspect-ratio: 5/7` |
| UGC / lifestyle cards | 3:4 portrait | 3:4 portrait | `aspect-ratio: 3/4` |
| Founder/quote portrait | 1:1 (square) | 3:4 portrait | `aspect-ratio` on container |
| Landing page lifestyle | ~17:18 (near-square) | ~17:18 | `padding-top` trick |
| Swatch circles | 1:1 (circle) | 1:1 (circle) | `border-radius: 50%` |

### CRITICAL: Image Aspect Ratio CSS Pattern

**Always apply `aspect-ratio` to the CONTAINER element, never directly on the `<img>` tag.**

Shopify's `image_tag` (used by `component_image`) auto-generates `width` and `height` attributes from the source image's intrinsic dimensions. These native attributes override any `aspect-ratio` set directly on the `<img>`, breaking the intended crop.

**Correct pattern:**
```css
/* Apply ratio to the container */
.section__media {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 3px;
}
/* Make the img fill the container */
.section__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

**Wrong pattern (will break with component_image):**
```css
/* DO NOT put aspect-ratio on the img — Shopify's width/height attrs will override */
.section__media img {
  aspect-ratio: 1;
  object-fit: cover;
}
```

**Responsive ratio changes** — change the container's ratio at breakpoints:
```css
.section__media { aspect-ratio: 3/4; } /* mobile portrait */
@media (min-width: 769px) {
  .section__media { aspect-ratio: 1; } /* desktop square */
}
```

### Mobile Image Rules
- Hero/feature images on mobile: `aspect-ratio: 3/4` or taller (5:6, 2:3) — NEVER use `16:9` for portrait photos on mobile
- Product images stay 1:1 on all breakpoints
- UGC cards: 3:4 portrait on all breakpoints

### Image Specifications
| Type | Desktop | Mobile | Format |
|------|---------|--------|--------|
| Hero | 1440x600 | 375x500 | WebP/JPG |
| Product | 800x800 | 400x400 | WebP/PNG |
| Thumbnail | 300x300 | 150x150 | WebP/JPG |
| Lifestyle | 1200x800 | 375x250 | WebP/JPG |

### Responsive Srcsets
Product cards use: 360px, 540px, 720px, 1080px, 1440px widths

---

## Iconography

### Style
- Line icons (not filled)
- Consistent stroke width (1.5-2px)
- Minimal, clean aesthetic
- Match brand color palette (#000 primary)

### Icon Sizes
- Small: 16px
- Medium: 24px (default)
- Large: 32px

### Accordion Icon
- +/- toggle using pseudo-elements
- 17px line length, 1px stroke
- Animated with opacity transition (0.25s ease)

---

## Usage Guidelines

### Do's

- Use RingsideWideWeb as the base body font (16px, letter-spacing .025em)
- Use GeogrotesqueCondBoldWeb for small display labels (heading--2/4/5), product names, accordion triggers, and nav — NOT for large page/section headlines (those use Canela)
- Use BaseMonoWideWeb for buttons, utility text, and heading classes
- Use Canela serif for section titles (sentence case, light 300, 38px/3px tracking) and editorial/lifestyle moments
- Keep border-radius at 2px for secondary buttons, 3px for primary buttons/cards/form inputs, 5px for badges
- Use subtle box-shadow (not borders) for card depth — `0 1px 2px rgba(16, 24, 40, .04)` resting, `0 2px 8px rgba(0, 0, 0, .12)` hover
- Use warm off-white `#f6f2eb` for section backgrounds
- Use `#000` and `#fff` as the primary color pair
- Use `--primary-color: #ff2e92` sparingly for accents, errors, and sale pricing
- Gate hover effects behind `.has-mouse` class
- Use `cubic-bezier(.39, .575, .565, 1)` as the primary easing curve
- Use `#d0d0d0` for standard borders, `#d4d4d4` for swatches, `#d7d7d7` for accordions
- Keep shadows subtle (below `rgba(0,0,0,.25)`)
- Use the pipe separator pattern for ATC buttons showing price
- Use uppercase text-transform for buttons, tabs, headings, and labels

### Don'ts

- Don't use hard/brutalist shadows (no `4px 4px 0px`)
- Don't use 0px border-radius on interactive elements (minimum 2px)
- Don't use fully rounded corners (no `9999px` or large radius on rectangles)
- Don't apply grayscale filters to product images
- Don't use skew or rotate transforms for layout elements
- Don't use bright saturated colors beyond `--primary-color`
- Don't bypass `.has-mouse` gating for hover styles
- Don't use viewport-unit typography (no `vw` sizing)
- Don't use `transition: all` — specify properties explicitly
- Don't set font-weight above 700 for body fonts (900 reserved for articulat-heavy-cf)
- Don't use more than 3 font families on a single page
- Don't use `#C73A3A` or other reds as the accent — the brand accent is `#ff2e92`
- Don't use `#FAF8F5` for backgrounds — the correct warm background is `#f6f2eb`
- Don't use `#1A1A1A` as primary black — use `#000`
- Don't use Geogrotesque for large page/section headlines — those MUST use Canela (sentence case, light 300). Geogrotesque is only for small display labels (heading--2/4/5), product names, accordion triggers, and nav
- **Don't use emojis** — never use emoji characters (Unicode or HTML entities) anywhere in JRB pages. Use CSS-drawn icons (clip-path, pseudo-elements, borders), inline SVGs, or simple typographic marks (em dashes, bullets) instead. Emojis are off-brand for JRB's clean, premium aesthetic.
- **Don't use styled text for press/publication logos** — always reuse `jrb11-press-logo-bar.liquid` (the canonical press section). It has built-in SVG logos for: Vogue, Allure, Cosmopolitan, Harper's Bazaar, Elle, Glamour, Marie Claire, Women's Health, and InStyle — plus custom logo support. NEVER create a new press section or use hardcoded SVGs in a custom section.

---

## Standalone HTML Quick-Start

When building standalone HTML pages (landing pages, campaign pages, prototypes) outside the Shopify theme:

1. **Copy font files** from `~/Library/Fonts/` to a `fonts/` directory next to your HTML file:
   ```bash
   mkdir -p fonts && cp ~/Library/Fonts/{Geogrotesque.ttf,BaseMonoWideThin_6014.ttf,RingsideWide-Book_Web.ttf,Canela-Light.otf,Canela-LightItalic.otf} fonts/
   ```
2. **Include @font-face declarations** (see "Local Font Files & @font-face" section above)
3. **Set up CSS custom properties** for font families, colors, and easing curves
4. **NEVER use Google Fonts substitutes** (Barlow Condensed, Space Mono, Inter, Cormorant Garamond, etc.) — always use the real JRB font files
5. **Include the `.has-mouse` detection script** in your `<script>` block:
   ```js
   document.addEventListener('mousemove', function addMouse() {
     document.body.classList.add('has-mouse');
     document.removeEventListener('mousemove', addMouse);
   });
   ```
6. **Use the `/jrb-page-builder` skill** for a complete boilerplate template and component library

---

**Theme Version:** jones-road t/226
**Source:** Live jonesroadbeauty.com production CSS, Figma source files, Shopify theme code
**Design System Version:** 2.1
