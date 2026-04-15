# Competitive Audit — Homepage Featured Products Sections
**Date**: 2026-04-14
**Brands Audited**: Merit Beauty, ILIA Beauty, Rare Beauty, Tower28
**Purpose**: Input to CRO A/B test brief for JRB homepage featured products section
**Method**: Chrome MCP live site visits + DOM inspection (desktop 1440×900)

---

## 1. Merit Beauty — meritbeauty.com

**Merchandising logic**: Editorial category showcase, not a flat bestsellers grid. Homepage flows: hero → "Beauty With Intention" manifesto → "Makeup" category (3 products featured) → "Skincare" category (3 products featured) → "Find Your Shade" quiz CTA → "Signature Bag" brand asset → "The Sets" (7 bundles). No tabs, no filters — purely a curated, editor-led narrative.

**# products shown**: **13 total products** on homepage — 3 in Makeup, 3 in Skincare, 7 in Sets. No carousels on primary feature sections; products appear as a stacked list with product name + price under each hero-size photo.

**Layout pattern**: Editorial hero-per-category. Each category gets a full-width photographic hero with a white text overlay card ("The Uniform / A sunscreen so perfect, it becomes a daily habit. Shop now"). Then the featured products appear as an **asymmetric stack** — 1 large image per product, each nearly full-viewport height on desktop, with product name + price floating to the side.

**Mobile treatment**: Single-column stack. Each product image becomes full-width, product name/price float below. Images are portrait-oriented and slow to load — Merit prioritizes photo quality over density.

**Product card anatomy**:
- Image: HUGE, nearly 600–800px tall on desktop, single product with styled prop photography
- Badges: **none** (no "bestseller", "new", "sale")
- Product name: Small serif/sans text (e.g., "Flush Balm")
- Price: Below name, same weight (e.g., "$30")
- Shade count / rating / reviews: **not shown inline**
- CTA: **No per-card button**. Entire image is the click target. Section-level "Shop All Makeup" / "Shop All Skincare" text link below the 3 products.

**Social proof**: **None inline**. No stars, no review counts, no press badges on the homepage featured products. Relies on editorial tone + product photography credibility.

**Merchandising copy**: "Makeup — Thoughtfully designed essentials to help you do more with less." / "Skincare — Clinically proven formulas designed to cleanse, treat, and moisturize — in three steps." / "The Sets — Your favorite essentials, thoughtfully curated — so you can get everything you need, for less." No urgency, no scarcity.

**CTA treatment**: Product name links to PDP. Section-level "Shop All [Category]" text link. Hero CTAs use "Shop now ▸" with a small triangle arrow (text, not a button). Zero inline add-to-cart.

---

## 2. ILIA Beauty — iliabeauty.com

**Merchandising logic**: **Tabbed discovery**. Single "Curated Favorites" section with 7 tabs: Bestsellers (default), Complexion, Sets, Eye, Lip + Cheek, Skincare, Tools + a "Shop All" pill on the right. Below that, a separate "Clean Makeup + Skincare Essentials" section that repeats the categories as image tiles (Bestsellers / Complexion / Lip+Cheek / Skincare / Eye / Sets — 6 tiles).

**# products shown**: **3 visible at once** in Curated Favorites (4th slot = "Choose Your Mini → Pick a mini gift w/ any $75+ order" promo tile). Tab-switching replaces the 3 visible products.

**Layout pattern**: 3-product row + 1 promo tile (4 columns total). Each product card is a large square image. Tabs sit directly above the grid, underline on active tab ("BESTSELLERS"). Category tiles below use rectangular portrait photography with category name overlay.

**Mobile treatment**: Tab scrolls horizontally, product cards become a horizontal snap-scroll carousel (one card per viewport width). Image sizing maintained.

**Product card anatomy**:
- Image: Large square product-only shot on cream/neutral background
- Badges: **Award badges** layered top-left of image ("1% For The Planet", "Best of Beauty Award Winner", "2020 Byrdie Eco Beauty Award"). "NEW" badge bottom-left on newer products.
- Rating: 5 filled stars inline (visual, not numeric on the card itself, though review count shows on hover / below)
- Product name: Sans-serif title case, 20–24px ("Super Serum Skin Tint SPF 40")
- Descriptor: One-line benefit below name ("Light Coverage. Dewy Finish." / "Lift. Lengthen. Separate." / "Refresh. Balance. Protect.")
- CTA: **Full-width outlined button** "SELECT SHADE $48" — combines price + action in one click target

**Social proof**: Star ratings + award badges on image. Reviews display elsewhere on PDPs (15,149 reviews on Skin Tint, 7,703 on Mascara, 298 on Sun Serum).

**Merchandising copy**: Section heading "Curated Favorites" (large serif, centered). New product label: "NEW! Sun Serum Mineral Sunscreen SPF 50". No scarcity language — promo urgency is in the separate yellow banner ("NEW SUN SERUM MINERAL SUNSCREEN SPF 50 | SHOP NOW") and the "Choose Your Mini" tile.

**CTA treatment**: Per-card outlined button with price baked in ("SELECT SHADE $XX"). No inline add-to-cart — button routes to PDP for shade selection. "SHOP ALL" pill button top-right of the tabbed grid.

---

## 3. Rare Beauty — rarebeauty.com

**Merchandising logic**: Two sequential product blocks: (1) "Try These Best Sellers" — a large **editorial hero carousel** treating each product like its own mini-hero (NEW | LIMITED EDITION tag, headline-scale product name, paragraph description, "SHOP NOW" button); then (2) "Bestsellers" — a conventional **4-up product carousel** with arrow navigation. No tabs.

**# products shown**: Hero carousel cycles 5 products (manual arrow nav). Bestsellers carousel shows **3 cards + peek of 4th** at 1440px, with up to 20 unique products in the full carousel (Brow Harmony, Soft Pinch Liquid Blush, Rare Eau de Parfum, Soft Pinch Cheek & Lip Trio, Warm Wishes Bronzer Stick, Find Comfort, Soft Pinch Tinted Lip Oil, Soft Pinch Blush Mini, Soft Pinch Liquid Contour, Selena's Faves Mini, etc.).

**Layout pattern**: (a) Editorial carousel hero — split layout, product photo left, text stack right (NEW label → serif headline name → descriptor → "SHOP NOW" outlined button). (b) Standard bestseller carousel — product image, name below, shade swatches under, circular arrow nav buttons. Left/right arrow chevrons sit at vertical center-edge of both carousels.

**Mobile treatment**: Hero carousel becomes swipeable single-view; bestsellers carousel becomes 1.5-card snap scroll.

**Product card anatomy** (Bestsellers):
- Image: Large near-square on cream background, product only
- Badges: Shade name overlay bottom-left on image in small text (e.g., "Bliss")
- Product name: Serif (Rare's signature typeface), 20–22px, 2 lines
- Price: **Not visible on card**
- Shade count: **5 shade swatches** shown directly under carousel (circular chips, ~20–24px diameter)
- Rating: **Not shown inline**
- CTA: **No button visible on card**. Clicking anywhere on card → PDP. (Hover may reveal "ADD TO BAG • $XX" — this text appears in DOM on multiple products.)

**Social proof**: **None inline on bestseller cards**. Review count + rating appear only on PDP. The homepage leans on celebrity halo (Selena Gomez) + Rare Impact mission + @RareBeauty UGC grid (further down page).

**Merchandising copy**: Headline "Try These Best Sellers" (hero), then "Bestsellers" (grid). Hero uses "NEW | LIMITED EDITION" labels and evocative copy ("A warm, decadent blend of creamy caramel, intoxicating vanilla, and earthy sandalwood"). Bestseller grid has zero merch copy — just names.

**CTA treatment**: Hero uses outlined rectangular "SHOP NOW" button. Grid uses name as click target (no visible button). "SHOP NOW" text-link sits above the Bestsellers grid as a section-level CTA.

---

## 4. Tower28 — tower28beauty.com

**Merchandising logic**: Four sequential product blocks — "Trending Now" (primary), "Skincare", plus a "Shop By Category" tile grid. Each product-focused section is its own carousel with SHOP ALL link and prev/next arrows. No tabbed interface; uses stacked named sections (Trending Now → Skincare → Shop By Category → [more below]). The "Shop By Category" block breaks out into 4 square lifestyle tiles: Complexion, Lip, Eye, Cheek.

**# products shown**: **4 cards visible + peek of 5th** per carousel at 1440px ("Trending Now" shows SOS Daily Rescue Spray Duo, Swipe Serum Concealer, SOS Rescue Spray, SOS FaceGuard SPF 30, Everyday Base-ics Set partial). ~22 total unique products surfaced across homepage carousels.

**Layout pattern**: Carousel with 4-up grid. Each section has a left-aligned serif header (e.g., "Trending Now") and a "SHOP ALL" link + circular arrow buttons on the right. Below product carousels, the "Shop By Category" section uses a flat 4-column grid of square lifestyle tiles with large "Complexion / Lip / Eye / Cheek" text overlay and pill button "Shop [Category]" at the bottom of each tile.

**Mobile treatment**: Carousels become 1.2-card horizontal snap scroll. Shop By Category tiles stack 2×2 on mobile. Button pill sizes remain large and thumb-friendly.

**Product card anatomy**:
- Image: Near-square product shot on pastel backgrounds (pink/lavender/peach) matched to SKU
- Badges: **Triple badge system**:
  - Top-left: Marketing badge as rounded pill — "Save $10", "TikTok Viral", "Save $6", "New"
  - Top-right: Stacked **certification badges** (National Eczema Association, National Rosacea Society Accepted, National Psoriasis Foundation Recognized) — 3 vertical badges
- Product name: Serif, 18–20px ("SOS Daily Rescue Spray Duo")
- Descriptor: One-liner category/benefit beneath name ("Limited Edition Set ($40 Value)" / "All-Over Hydrating Concealer" / "The Original Hypochlorous Acid Spray")
- Shade swatches: **Inline circular chips** directly under descriptor for shade products (Swipe Serum Concealer shows 8 swatches + a dropdown caret for more)
- Size/variant toggles: **Inline pill toggles** for size variants — "Standard / Duo / Jumbo" or "Standard / Travel"
- Rating: **Not shown inline** (likely on PDP)
- CTA: **Orange filled pill button**, full card width, "Add — $30.00" format — inline add-to-cart with price baked in

**Social proof**: Dermatological certification badges on every card (Eczema/Rosacea/Psoriasis recognition) + "TikTok Viral" badge on trending SKUs. No star/review count on card.

**Merchandising copy**: Section heads "Trending Now", "Skincare", "Shop By Category" — functional, not editorial. "Save $X" / "$XX Value" for sets. "TikTok Viral" as trend signal. "New" and "New + Improved" for launches.

**CTA treatment**: **Most aggressive of the 4** — filled orange "Add — $XX.XX" pill button on every card allows inline add-to-cart without leaving homepage. Sectional "SHOP ALL" text link + arrow nav per section. Category tiles use white pill "Shop [Category]" CTA.

---

## Summary Matrix — 4 Brands × 8 Attributes

| Attribute | Merit | ILIA | Rare Beauty | Tower28 |
|---|---|---|---|---|
| **Merchandising logic** | Editorial category showcase (3 per category, stacked) | Tabbed "Curated Favorites" + category image tiles | Editorial hero carousel + Bestsellers carousel | Multi-carousel (Trending Now + Skincare + more) + Category tiles |
| **# products shown** | 13 total (3 Makeup + 3 Skincare + 7 Sets) | 3 visible / 7 tabs deep; ~29 unique | 3 + peek of 4th; 20+ in carousel | 4 + peek of 5th per carousel; 22+ unique |
| **Layout** | Asymmetric editorial stack (giant images) | 3-up grid + promo tile (4 cols total) | Hero carousel + standard 3-up carousel | 4-up carousel + 4-tile category grid |
| **Mobile** | Single-column stack, full-width images | Horizontal snap-scroll carousel, scrollable tabs | Swipeable hero + 1.5-card carousel | 1.2-card snap scroll + 2×2 category tiles |
| **Card anatomy** | Giant image + name + price; no button | Image + award badges + stars + name + descriptor + "SELECT SHADE $XX" outlined CTA | Image + shade name overlay + name + swatches under; NO price/rating/button visible | Image + marketing pill + 3 certification badges + name + descriptor + shade swatches + size toggles + orange "Add — $XX" pill |
| **Social proof** | None inline | Award badges + star ratings | None (halo = Selena + UGC elsewhere) | Dermatological certifications + "TikTok Viral" badges |
| **Merch copy** | Editorial manifestos ("Thoughtfully designed essentials…") | Minimal ("Curated Favorites" + descriptor) | "Try These Best Sellers" + "Bestsellers" | Functional section heads + "Save $X" / "TikTok Viral" / "$XX Value" |
| **CTA** | Name/image link only; section "Shop All" text link | Outlined "SELECT SHADE $48" button (to PDP) | No card CTA; hover-reveal ADD TO BAG on some | **Inline "Add — $XX" orange pill** (add-to-cart without leaving homepage) |

---

## 3 Pattern Takeaways

### 1) DOMINANT pattern: Carousel of 3–4 best-selling products with image-first cards (3 of 4 brands)
ILIA, Rare Beauty, and Tower28 all use some form of **horizontal product carousel** featuring 3–4 products at once with arrows to reveal more. All three use large near-square product photography on neutral/pastel backgrounds, product name beneath, and all three feature bestsellers as the default merchandising lens. Tower28 and ILIA show price; Rare hides it. The dominant implementation is:

> Section heading → "SHOP ALL" link + arrow navigation on right → 3–4 card horizontal scroll with large square images → product name → click-through to PDP.

**Implication for JRB**: A carousel-of-bestsellers is table stakes. The differentiation game is played at the card level (badges, CTAs, social proof) and in the merchandising layer above it (tabs vs. editorial categories vs. bare "Bestsellers").

### 2) CONTRARIAN pattern: Tower28's inline add-to-cart (only brand of 4)
Tower28 is the **only brand** with a full-width filled "Add — $XX.XX" button on every card that adds to cart without navigating to the PDP. Everyone else — Merit, ILIA, Rare — requires a click into the PDP to buy. Tower28 also layers the **most visual signals per card**: marketing badge (top-left) + 3 certification badges (top-right) + inline shade swatches + size/variant toggles + add-to-cart button with inline price. The card does 90% of the PDP's job.

Merit is the opposite contrarian: **no CTA button at all per card**, no price on sets (well, there is — $119–$440), no review stars, no badges. Pure editorial minimalism. Merit wins on aesthetics and brand codes; Tower28 wins on conversion friction removal.

**Implication for JRB**: Where does JRB sit on the editorial ↔ conversion spectrum? JRB's current aesthetic is closer to Merit (clean, editorial, photo-forward). A test could pull JRB toward Tower28's inline-add-to-cart density — especially for bestsellers where shade/variant choice is well-understood — without sacrificing brand.

### 3) MISSING from all 4 — opportunities for JRB
What's absent from every competitor that JRB could win with:

- **Routine/kit builders inline on homepage.** Merit features 7 sets, but they're passive tiles. Nobody has an interactive "build your routine" or 2-product pairing ("pairs well with") on the homepage featured section. With JRB's Bobbi-led routine narrative ("The Face" workflow), this is natural territory.
- **Founder voice or expert-picked labels.** Bobbi Brown is JRB's biggest asset. None of these 4 brands surface a personality pick — "Bobbi's Picks" or "Bobbi Wears" could be a highly differentiated merch lens. Rare has Selena's halo but relegates it to "Selena's Faves Mini Set", not the featured products themselves.
- **Video on product cards.** All 4 brands use still photography only on homepage featured cards. Given JRB's strong reel/UGC pipeline and @jonesroadbeauty content volume, a **hover-to-play silent reel** on card (like on.com does for shoes) would be unique in the beauty category. No competitor does this.
- **Star ratings + review count on card at homepage level.** Only ILIA surfaces stars inline — and they show a visual 5-star bar without numeric review count. Merit, Rare, Tower28 hide ratings entirely from homepage cards. JRB already has strong Junip data (thousands of 4.5–4.8-star reviews on Miracle Balm, Just a Sec, etc.) — surfacing `★ 4.8 (12,341)` right on the homepage card would out-prove all 4 competitors.
- **Concrete shade counts as copy.** ILIA shows "20 sheer shades" in hero copy only. No competitor puts "22 shades" directly on product cards. Miracle Balm's breadth of shades is a JRB differentiator — call it out on the card.

---

## Screenshot References

Desktop screenshots captured via Chrome MCP (stored in Chrome session, IDs below; saved to disk):
- Merit hero: `ss_7063p8rsd`
- ILIA hero: `ss_89512yhnz`
- Rare Beauty hero: `ss_4652lx2ib`
- Tower28 hero: `ss_6378lhbnl`

Screenshot save directory: `/Users/codyplofker/Desktop/01-Projects/jrb-homepage-featured-products-test/research/screenshots/`

(Chrome MCP saves screenshots to its internal session folder; IDs above are the session references. Directory was created for future manual file copies if needed.)

---

## Source URLs
- https://www.meritbeauty.com
- https://iliabeauty.com
- https://www.rarebeauty.com
- https://www.tower28beauty.com
