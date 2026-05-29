# T&E Policy Review Shared Comments — Persistence Notes

**Goal:** Let Liz / James leave comments directly on the published GitHub Pages review page, instead of comments only living in one browser's localStorage.

**Final implementation:** The page stays static on GitHub Pages and writes review state through the existing JRB Field Notes Supabase project using the browser-safe anon/public key.

## Architecture

- Static page remains at: `finance/analysis/te-policy-review-2026/index.html`
- Shared review state is stored in the existing Supabase `feedback` table.
- Rows are doc-scoped with:
  - `category = 'te_policy_review_2026'`
  - `submitter_name = <row id>`
  - `content = JSON.stringify({ row_id, status, notes, reviewer, saved_at })`
- Browser loads existing shared decisions/comments on page load.
- Browser writes a new row whenever someone changes a select or edits a note.
- On load, the page reads rows in chronological order and uses the latest saved value for each `row_id`.
- `localStorage` remains as a fallback/cache.
- Export button still works as an emergency copy/paste fallback.

## Why this route was chosen

The preferred clean schema was a dedicated `doc_review_comments` table, but wiring that would have required a Supabase dashboard/API key action while Cody was on mobile. To avoid blocking him, we reused an existing Supabase project/table that already had a browser-safe anon key and permissive internal-tool RLS policy available locally.

This is good enough for this internal review link and can be migrated later to a dedicated table without changing the GitHub Pages hosting model.

## Security note

The embedded Supabase key is an anon/public browser key, not a service-role key. Anyone with the page source can see it. The security boundary is Supabase RLS plus the fact that this is an internal, lightly shared review page.

Do not embed service-role keys, direct database URLs, or private tokens in static HTML.

## Future cleanup option

When dashboard access is convenient, create a dedicated table:

```sql
create table if not exists public.doc_review_comments (
  id uuid primary key default gen_random_uuid(),
  doc_id text not null,
  row_id text not null,
  reviewer text not null default 'Anonymous',
  status text check (status in ('accept', 'modify', 'discuss', 'reject', '')),
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (doc_id, row_id, reviewer)
);

alter table public.doc_review_comments enable row level security;
create policy "public read doc comments" on public.doc_review_comments for select using (true);
create policy "public insert doc comments" on public.doc_review_comments for insert with check (true);
create policy "public update doc comments" on public.doc_review_comments for update using (true) with check (true);
```

Then swap the frontend from `feedback` insert/read to `doc_review_comments` upsert/read.
