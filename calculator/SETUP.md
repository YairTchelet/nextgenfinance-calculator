# Calculator Refactor — Setup Guide

## What Changed

The monolithic 8,000-line `index.html` has been split into:

```
calculator/
├── index.html                  ← HTML + inline core JS (CSS extracted)
├── css/
│   └── calculator.css          ← All styles (3,222 lines)
├── js/
│   ├── calculator-db.js        ← Supabase persistence (replaces localStorage)
│   ├── calculator-bridge.js    ← Patches core functions to use Supabase
│   └── calculator-ai.js        ← AI: auto-fill, analysis, chat assistant
├── supabase-migration.sql      ← Run in Supabase SQL Editor
└── supabase-edge-function.ts   ← Deploy as Supabase Edge Function
```

## Setup Steps

### Step 1: Replace Files
Copy all files to `C:\Users\yairt\newgenfinance\calculator\`
The folder structure should match exactly.

### Step 2: Supabase Tables
1. Go to your Supabase project → **SQL Editor**
2. Paste the contents of `supabase-migration.sql`
3. Click **Run**
4. This creates 3 tables: `calculator_analyses`, `calculator_custom_metrics`, `calculator_preferences`

### Step 3: Deploy the AI Edge Function
Option A — Via Supabase CLI (if installed):
```bash
# From project root
supabase functions new calculator-ai
# Copy supabase-edge-function.ts content into supabase/functions/calculator-ai/index.ts
supabase secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here
supabase functions deploy calculator-ai
```

Option B — Via Supabase Dashboard:
1. Go to **Edge Functions** in your Supabase dashboard
2. Create a new function called `calculator-ai`
3. Paste the contents of `supabase-edge-function.ts`
4. Go to **Settings → Secrets** and add: `ANTHROPIC_API_KEY=sk-ant-your-key-here`
5. Deploy

### Step 4: Push to GitHub
```bash
cd C:\Users\yairt\newgenfinance
git add calculator/
git commit -m "refactor: split calculator into modules + add Supabase + AI"
git push
```

## What Each File Does

### `calculator-db.js` (CalcDB)
- Replaces all `localStorage` calls with Supabase queries
- Falls back to localStorage if Supabase is unavailable (offline support)
- Auto-migrates existing localStorage data to Supabase on first load
- Public API: `CalcDB.saveAnalysis()`, `.getAnalyses()`, `.deleteAnalysis()`, etc.

### `calculator-bridge.js`
- Monkey-patches the existing core functions (`saveAnalysis`, `loadAnalysis`, `populateHistory`, etc.)
- Wires them to call `CalcDB` instead of localStorage
- Saves user preferences (mode, advanced toggle, thresholds) to Supabase
- Loads preferences on init
- Runs the localStorage → Supabase migration on first load

### `calculator-ai.js` (CalcAI)
- **Auto-fill**: Button next to company name → AI fetches all 13 metrics for any company
- **AI Analysis**: Toolbar button → AI writes a Hebrew analysis of the current metrics
- **Chat Assistant**: Floating chat button (bottom-left) → ask questions about metrics, valuation, etc.
- All AI calls go through the Supabase Edge Function (keeps API key secure)
- Self-initializes: injects UI buttons, styles, and chat panel on load

### `supabase-edge-function.ts`
- Proxy between the browser and Claude API
- 3 actions: `autofill` (fetch metrics), `analyze` (write analysis), `chat` (Q&A)
- Uses `claude-sonnet-4-20250514` model
- Requires `ANTHROPIC_API_KEY` secret

## Important Notes

- **The core JS is still inline in index.html** — this is intentional. The scoring engine, metric definitions, templates, deep-dives, radar chart, etc. are all preserved exactly as-is. Only the persistence and AI layers are external.
- **supabase-config.js and auth-guard.js** are unchanged — the existing auth system works as before.
- **Backward compatible** — if Supabase is unavailable, everything falls back to localStorage.
- **First load after migration** will automatically copy existing localStorage data to Supabase.
