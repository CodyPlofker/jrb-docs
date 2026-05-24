# Mijo Ads Feedback Doc — Handover

Folder: jrb-docs
Resume command: /resume jrb-docs
Full path: /Users/codyplofker/Desktop/01-Projects/jrb-docs/HANDOVER.md

## Project Overview

Single-file HTML feedback doc for Cody's review notes on all Mijo-produced video ads. Hosted on GitHub Pages. Cody drops notes verbally; Claude logs them in real time and publishes after each batch.

- **File**: `growth/recaps/mijo-yt-ads-feedback/index.html`
- **Live URL**: https://codyplofker.github.io/jrb-docs/growth/recaps/mijo-yt-ads-feedback/
- **GitHub**: https://github.com/CodyPlofker/jrb-docs (branch: `main`)
- **Local preview**: `mijo-feedback` server in `~/Desktop/.claude/launch.json` → port 8906

## Tab Structure (6 tabs total)

| Tab | ID | Status |
|---|---|---|
| Round 1 — YouTube | `r1-yt` | ✅ Complete (9 ads, Concepts 1/2/3 × A/B/C) |
| Round 2 — YouTube | `r2-yt` | ✅ Complete (6 ads: 1B, 1C, 2B, 2C, 3A, 3C) |
| Round 2 — Teaser + Hero | `r2-teaser-hero` | ✅ Complete (Sincerely Bobbi Teaser v06) |
| TVC — Round 1 | `r1-tvc` | ✅ Complete (TVC 1–4, all 8 spots) |
| TVC — Round 2 | `r2-tvc` | 🟡 **Tab created, empty — review in progress** |
| Round 1 — Testimonials | `r1-testimonials` | ✅ Complete (My Skin, How It Looks, How It Feels) |

## What Was Done This Session

1. Restructured single-page doc into 4-tab layout (later expanded to 6 tabs)
2. **Round 1 YT** — existing 9 ads content preserved; CTV note updated: YT 3B locked in as 3rd TV spot
3. **Round 2 YT** — logged 6 ads (1B v08, 1C v18, 2B v09, 2C v10, 3A v06, 3C v12); added overall question re: identifying on-camera women + delivery ask for editable 16×9 files
4. **Round 2 Teaser+Hero** — Sincerely Bobbi Teaser v06: music, Coming Soon end card, launch date placeholder, "haters" angle deferred
5. **TVC Round 1** — all 8 spots (TVC 1–4, 30s+15s); global notes (music loud, add URL to end cards); per-spot notes including Dear Haters variation request for TVC 1, B-roll framing, emotion clip pull from YT footage
6. **Round 1 Testimonials** — 3 testimonials from Slack screenshot (Genevieve asked to add to doc); "okk" and "look/feel good" buried lines flagged
7. **TVC Round 2** — tab scaffolded, empty, ready for review

## Current State

- All committed and live on GitHub Pages (`main`, commit `90123a2`)
- `git status` is clean
- TVC Round 2 tab is empty — Cody is actively reviewing this batch

## Key Notes / Decisions Made

- **YT 3B → 3rd TV spot** (confirmed, locked in Round 1 notes)
- **"Dear Haters" TVC variation** requested for TVC 1 Hero 30s alongside existing v04
- **Sincerely Bobbi teaser launch date** is `[TBD — fill in]` — needs to be added to the doc and end card
- **"Haters" angle** in teaser — flagged as borderline, deferred
- **Music direction**: consistent note across ALL batches — too loud, too upbeat, no club music. Erin owns music direction.
- **Opening slate clarification** needed for TVC 2 and TVC 3 — is the opening intentional or pre-production artifact?
- **Identify on-camera women** as real customers / open casting — flagged as Round 2 YT overall question

## What's NOT Done

- Round 2 TVC notes (in progress — session paused here)
- Round 2 Teaser+Hero: launch date not yet filled in
- Round 1 Testimonials: filenames not logged (notes came from Slack, no file names given)

## Next Steps

1. Continue **TVC Round 2** — Cody is watching now, will drop notes
2. Fill in **Sincerely Bobbi launch date** once known
3. Publish after each batch with `/publish-doc`

## Quick Start

```bash
# View the live doc
open https://codyplofker.github.io/jrb-docs/growth/recaps/mijo-yt-ads-feedback/

# Start local preview
# In Claude Code, run: preview_start "mijo-feedback" (port 8906)

# Edit file
~/Desktop/01-Projects/jrb-docs/growth/recaps/mijo-yt-ads-feedback/index.html

# Publish after edits
cd ~/Desktop/01-Projects/jrb-docs
git add growth/recaps/mijo-yt-ads-feedback/index.html
git commit -m "Add [batch] feedback"
git push origin main
```

## Markup Pattern

Each ad follows this structure inside a tab panel:
```html
<div class="concept-group">
  <h3>Concept Name</h3>
  <h4>YT/TVC ID (vXX) — Xs · 16×9</h4>
  <ul>
    <li>Note. <span class="tag erin">Erin</span></li>
  </ul>
</div>
```

Tags: `.tag` (pink, general), `.tag.erin` (blue, Erin action item), `.tag.tv` (black, CTV/TV)

Overall callouts use `.overall` div with `border-left: 4px solid #000`.
