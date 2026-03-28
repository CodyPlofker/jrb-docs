---
name: my-design-system
description: Reference the [Brand Name] design system for brand guidelines, component patterns, colors, typography, spacing, and design tokens
allowed-tools: Read, WebFetch
---

When this skill is invoked, use the following design system as the authoritative reference for all [Brand Name] front-end work. Apply these tokens, patterns, and guidelines when writing CSS, HTML, or templates.

---

# [Brand Name] Design System

## Design Philosophy

The [Brand Name] design system embraces a **[describe your aesthetic]** with:
- [Visual principle 1 — e.g., "High readability and generous whitespace"]
- [Visual principle 2 — e.g., "Minimal decoration, content-first layouts"]
- [Visual principle 3 — e.g., "Premium but accessible"]
- [Font usage summary — e.g., "Wide monospace for buttons, serif for headlines"]
- [Color summary — e.g., "Warm neutral palette anchored by #f6f2eb backgrounds"]
- [Shape language — e.g., "Sharp 2-3px corners on buttons and cards"]

## CSS Methodology

### Naming Convention
- [BEM / utility-first / CSS Modules / plain CSS]
- [Example: `.block`, `.block__element`, `.block--modifier`]

### Specificity Rules
- Maximum specificity: `0 1 0` (single class)
- Maximum nested specificity: `0 4 0` (parent + child)
- Never use IDs for styling
- Avoid `!important`

### Section Scoping
```css
#shopify-section-{{ section.id }} .my-section__element {
  /* scoped styles */
}
```

## Color Palette

### Primary Colors

```css
--primary-color: #[hex];      /* [Usage — e.g., Brand accent, CTAs, sale badges] */
color: #[hex];                 /* [Usage — e.g., Primary text, borders, buttons] */
background: #[hex];            /* [Usage — e.g., Page/section background] */
```

### Neutral Colors

```css
#[hex]    /* [Usage — e.g., Light dividers] */
#[hex]    /* [Usage — e.g., Standard borders] */
#[hex]    /* [Usage — e.g., Secondary text] */
#[hex]    /* [Usage — e.g., Primary text] */
```

### Don't Use These Colors

- Don't use `#[wrong]` — the correct value is `#[correct]`
- Don't use `#[wrong]` — use `#[correct]` instead
- Don't use `#[wrong]` as the accent — the brand accent is `#[correct]`

## Typography

### Font Families

```css
:root {
  --font-headline: [FontFamily], [fallback], serif;
  --font-display: [FontFamily], [fallback], sans-serif;
  --font-mono: [FontFamily], [fallback], monospace;
  --font-body: [FontFamily], [fallback], sans-serif;
}
```

### @font-face Declarations

```css
/* Include if using custom fonts */
@font-face {
  font-family: '[FontName]';
  src: url('[path-to-font]') format('[format]');
  font-weight: [weight];
  font-style: normal;
  font-display: swap;
}
```

### Font Usage Rules

- **[Headline Font]**: Use for large headlines, section titles. [Case rule — e.g., "Sentence case"]. [Size — e.g., "38px desktop / 26px mobile"]. **NEVER use for body text or buttons.**
- **[Display Font]**: Use for small display labels, product names. ALWAYS `text-transform: uppercase`. **NEVER use for large page headlines** — those use [Headline Font].
- **[Button Font]**: Use for buttons, CTAs, tabs. ALWAYS `text-transform: uppercase`. [Size — e.g., "11-13px"].
- **[Body Font]**: Use for body text, descriptions, prices. The default workhorse. [Size — e.g., "16px"].
- **Max 3 font families per page** (excluding script/accent fonts)

### Font Hierarchy (quick reference)

| Role | Font | Size | Example |
|------|------|------|---------|
| **Large headlines** | [Font] [weight] | [size]px | "[Sample headline text]" |
| **Section labels** | [Font] [weight], uppercase | [size]px | "[SAMPLE LABEL]" |
| **Buttons, tabs** | [Font] [weight], uppercase | [size]px | "[BUTTON TEXT]" |
| **Body text** | [Font] [weight] | [size]px | "[Sample body text.]" |
| **Editorial moments** | [Font] italic | [size]px | *"[Sample quote.]"* |

### Body Base Styles

```css
body {
  font-family: [body-font], [fallbacks];
  font-size: [size]px;
  line-height: [line-height];
  color: #[color];
  letter-spacing: [spacing];
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

## Spacing System

```css
/* Tight */
[4]px       /* Micro gaps */
[8]px       /* Small gaps */
[12]px      /* List gaps, small margins */

/* Standard */
[16]px      /* Card padding, accordion padding */
[20]px      /* Mobile horizontal padding */

/* Medium */
[24]px      /* Section internal spacing, grid gaps */
[32]px      /* Section margins, desktop padding */

/* Large */
[40]px      /* Component padding */
[48]px      /* Column gaps, section vertical padding */
[56]px      /* Generous section vertical padding */
```

### Container Max Widths

```css
[500]px     /* Compact: popups, modals */
[780]px     /* Content: blog, long-form text */
[1200]px    /* Standard: main content area */
[1440]px    /* Wide: full-width sections */
```

## Buttons

### Primary Button

```css
.button {
  background: #[color];
  border: 1px solid #[color];
  border-radius: [radius]px;
  color: #[contrast-color];
  cursor: pointer;
  display: inline-block;
  font-family: [button-font], [fallbacks];
  font-size: [size]px;
  font-weight: [weight];
  height: [height]px;
  letter-spacing: [spacing];
  line-height: [height]px;
  padding: 0 [h-padding]px;
  text-align: center;
  text-transform: [uppercase/none];
  white-space: nowrap;
  transition: [property] [duration] [easing];
}

/* Hover state */
.button:hover {
  background: [hover-bg];
  border-color: [hover-border];
  color: [hover-text];
}

.button[disabled] { cursor: text; opacity: 0.5; }
```

#### Button Variants

```css
.button--secondary { background: [color]; border-color: [color]; color: [color]; }
.button--outline { background: transparent; color: [color]; }
.button--accent { background: var(--primary-color); color: #fff; }
.button--wide { width: 100%; }
```

#### Common Mistakes
- [Mistake 1 — e.g., "Using pink buttons when they should be black"]
- [Mistake 2 — e.g., "Custom button CSS instead of the global .button class"]
- [Mistake 3 — e.g., "Overriding font-size or height on buttons"]

## Breakpoints

```css
/* Mobile-first approach */
@media (min-width: [576]px) { /* Small tablets */ }
@media (min-width: [768]px) { /* Tablets */ }
@media (min-width: [992]px) { /* Small desktop */ }
@media (min-width: [1200]px) { /* Desktop */ }
@media (min-width: [1400]px) { /* Large desktop */ }
```

## Image Guidelines

- Hero images: [ratio] desktop, [ratio] mobile
- Product images: [ratio]
- Portrait photos: ALWAYS use portrait containers on mobile ([ratio] or taller)
- [Never/Always rule — e.g., "Never use 16:9 for people photos — it cuts off heads"]
- [Filter rule — e.g., "Don't apply grayscale filters to product images"]

## Do's and Don'ts

### Do's

- Use [body font] as the base body font ([size]px)
- Use [headline font] for section titles ([case], [weight], [size]px)
- Use [bg color] for section backgrounds
- Keep border-radius at [value]px for buttons, [value]px for cards
- Use `#[color]` and `#[color]` as the primary color pair
- Use `var(--primary-color)` sparingly for accents
- [Easing rule — e.g., "Use cubic-bezier(.39, .575, .565, 1) as primary easing"]
- [Shadow rule — e.g., "Use subtle box-shadow for card depth"]

### Don'ts

- Don't use `#[wrong]` for [element] — use `#[correct]`
- Don't use `#[wrong]` for backgrounds — the correct value is `#[correct]`
- Don't use [font] for large headlines — those MUST use [correct font]
- Don't use more than 3 font families on a single page
- Don't use viewport-unit typography (no `vw` sizing)
- Don't use fully rounded corners (no `9999px`)
- Don't use `0px` border-radius on interactive elements
- [Brand-specific rule — e.g., "Don't use emojis anywhere"]

---

## How to Use This File

1. Replace all `[bracketed values]` with your brand's actual values
2. Save as `~/.claude/skills/your-brand-design-system/SKILL.md`
3. Invoke with `/your-brand-design-system` before building any page
4. Use the feedback loop: Build → Rate 1-100 → Fix → Update this file → Repeat

---

**Design System Version:** 1.0
**Source:** [Where your tokens came from — e.g., "Live site CSS, Figma source files"]
