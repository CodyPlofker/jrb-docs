# JRB Docs

Internal pages for Jones Road Beauty — briefs, analysis, presentations, and more.

**Live site:** https://codyplofker.github.io/jrb-docs/

## Structure

```
jrb-docs/
├── growth/      — paid media, CRO, acquisition
├── ecom/        — site, theme, UX, merchandising
├── product/     — product development, launches, GTM
├── brand/       — positioning, creative, brand strategy
├── social/      — organic social, influencer, UGC
├── retention/   — email, SMS, loyalty
├── finance/     — P&L, forecasting, budgets
└── ops/         — operations, logistics, processes
```

## Content Types

Each department can contain any of these subfolders:

| Folder | What goes here |
|--------|---------------|
| `briefs/` | Creative briefs, iteration briefs, UGC briefs |
| `analysis/` | Data analysis, research, audits |
| `presentations/` | Decks, slides |
| `reports/` | Recurring reports, dashboards |
| `plans/` | Roadmaps, strategies, calendars |
| `recaps/` | Meeting recaps, post-mortems, retros |
| `specs/` | Feature specs, requirements, PRDs |
| `guides/` | SOPs, how-tos, onboarding docs |
| `proposals/` | New initiatives, pitches, business cases |
| `templates/` | Reusable templates |

## URL Pattern

Each page is served at:
```
https://codyplofker.github.io/jrb-docs/{department}/{content-type}/{project-name}/
```

## Publishing

Use `/publish-doc` in Claude Code to publish a file here automatically.
