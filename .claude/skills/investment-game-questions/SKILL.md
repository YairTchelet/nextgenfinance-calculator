---
name: investment-game-questions
description: "Use this skill when writing, reviewing, or auditing questions for the משחק ההשקעות (Warren Buffett-style investment game) at newgenfinance.co.il. Triggers: creating company profiles (buy/pass), versus rounds (pick better company), sell/hold scenarios, special events, or any game content for the Hebrew value investing education game. Also triggers when reviewing existing game questions, checking question quality, expanding the question bank, or writing batch content for game-data.js. Use this even for partial tasks like 'write 3 new hard questions' or 'add counter-signals to existing questions'. The game is Hebrew RTL, vanilla JS, data lives in game-data.js."
---

# Investment Game Question Generation

## What This Skill Does

Generates high-quality Hebrew-language questions for a value investing education game. The game teaches Israeli investors to analyze companies using Buffett-style principles. Questions must teach genuine analytical thinking — not pattern-matching.

## Critical Rules

### 1. Relative Years (MANDATORY)
Never use absolute years. Use relative offsets from current year:
```javascript
historicalData: [
    { year: "year-4", revenue: 720, fcf: 55 },
    { year: "year-3", revenue: 710, fcf: 40 },
    { year: "year-2", revenue: 705, fcf: 35 },
    { year: "year-1", revenue: 690, fcf: 42 },
    { year: "year-0", revenue: 665, fcf: 48 }   // most recent full year
]
projectedData: [
    { year: "year+1", revenue: 645, fcf: 52 },
    { year: "year+2", revenue: 620, fcf: 50 }
]
```
The game engine resolves these at runtime (e.g., "year-2" → 2024 if current year is 2026).

### 2. Vary Chart Data Types
Not every company shows a 5-year revenue/FCF line chart. Use the `chartType` field:
```javascript
chartType: "annual",           // Default: 5-year revenue + FCF lines
chartType: "quarterly",        // Last 4-8 quarters (shows seasonality, recent trends)
chartType: "segments",         // Revenue by product/segment (stacked bar or pie)
chartType: "waterfall",        // Revenue bridge or profit bridge (shows what changed)
chartType: "none",             // No chart — forces reading metrics and text
```
Mix these across the question bank. `quarterly` is great for spotting recent deterioration or improvement. `segments` reveals product concentration risk. `none` forces pure analytical thinking.

When using `quarterly`, supply `quarterlyData` instead of `historicalData`:
```javascript
quarterlyData: [
    { quarter: "Q1 year-1", revenue: 165, fcf: 10 },
    { quarter: "Q2 year-1", revenue: 172, fcf: 14 },
    { quarter: "Q3 year-1", revenue: 180, fcf: 18 },
    { quarter: "Q4 year-1", revenue: 148, fcf: -5 },  // seasonal dip or warning sign?
    { quarter: "Q1 year-0", revenue: 160, fcf: 8 },
    { quarter: "Q2 year-0", revenue: 155, fcf: 5 }
]
```
When using `segments`, supply `segmentData`:
```javascript
segmentData: [
    { name: "מוצר ליבה", revenue: 400, margin: "35%", growth: "+3%" },
    { name: "שירותי SaaS", revenue: 120, margin: "72%", growth: "+25%" },
    { name: "חומרה", revenue: 80, margin: "12%", growth: "-8%" }
]
```

### 3. P/E Is Sector-Dependent
Stop writing Israeli companies with P/E of 7-12 as if that's the only normal range. Calibrate:

| Sector | Normal P/E Range | "Cheap" | "Expensive" |
|--------|-----------------|---------|-------------|
| בנקאות / ביטוח | 7-12 | <7 | >14 |
| קמעונאות מזון | 12-18 | <10 | >22 |
| נדל"ן מניב | 10-16 | <8 | >20 |
| טכנולוגיה (רווחית) | 20-40 | <18 | >50 |
| טכנולוגיה (צמיחה) | 40-80+ or N/A | Use PEG | N/A without PEG |
| SaaS / פינטק | 30-60 or P/S | Use P/S + NRR | P/S > 15 |
| פארמה / ביוטק | 15-30 | <12 | >35 |
| ביטחוני | 15-25 | <12 | >30 |
| תשתיות / שירותים | 12-20 | <10 | >25 |
| תעשייה מחזורית | Depends on cycle position! | High P/E = bottom (buy) | Low P/E = peak (sell) |

**PEG matters.** P/E of 35 with 30% growth (PEG 1.17) is cheaper than P/E of 15 with 3% growth (PEG 5.0). Always include PEG or growth rate when P/E > 20 so the player can calculate.

**Sector-specific metrics.** Don't just slap P/E on everything:
- SaaS: NRR, ARR, churn, Rule of 40
- Banks: NIM, CET1 ratio, efficiency ratio, ROA
- Insurance: combined ratio, investment income
- REIT: FFO, P/FFO, occupancy, cap rate
- Retail: same-store sales, revenue per sqm

### 4. Quality Checklist (Every Question)
Before finalizing any question, verify:

1. ☐ Counter-signal explanation exists (what the other side would argue)
2. ☐ Worked example exists (expert's step-by-step thinking)
3. ☐ FCF heuristic doesn't trivially solve it
4. ☐ Historical data has at least one non-monotonic year
5. ☐ Both "buy" and "pass" arguments are credible from the data
6. ☐ Description is 2-6 sentences (not one-liners, not walls)
7. ☐ Metrics are mathematically consistent with historicalData
8. ☐ Hebrew is natural course vocabulary (see references/hebrew-guide.md)
9. ☐ P/E is calibrated to sector (see table above)
10. ☐ Years are relative ("year-0", not "2024")

For Hard (tier 3): also verify reasoning options (6 options, 1+ traps with biasTag)
For Expert (tier 4): also verify sell triggers, due diligence, market context

### 5. Difficulty Calibration

| Level | Player Confidence | Signal Balance | Detail Level |
|-------|-------------------|---------------|-------------|
| Easy | "I'm 80% sure" | 1 clear signal + 1 weaker counter-signal | 2-4 sentence descriptions |
| Medium | "I'm 60% sure" | 2 signals + 1-2 credible counter-signals | 3-5 sentence descriptions |
| Hard | "I could argue either way" | 2-3 signals + 2-3 strong counter-signals | 4-6 sentences + reasoning |
| Expert | "I need a framework to decide" | 3+ signals + 3+ counter-signals, some contradictory | Full narrative |

**Not every question has to be hard.** Mix in a few "confidence builders" at every tier — questions where the attentive player feels rewarded. The game should feel like flow, not frustration.

## Reference Files

For detailed content, read the appropriate reference file:

| Need | File | When to Read |
|------|------|-------------|
| Data structure templates (all question types) | `references/data-structures.md` | Before writing any question |
| Principle guide (what makes a good question per principle) | `references/principle-guide.md` | When choosing which principle to tag |
| Bias training templates | `references/bias-guide.md` | When embedding cognitive biases (hard/expert) |
| Hebrew style and vocabulary | `references/hebrew-guide.md` | When writing Hebrew text |
| FCF heuristic breakers | `references/fcf-breakers.md` | When designing questions where FCF misleads |
| Existing question bank audit | `references/audit-findings.md` | When checking coverage gaps |

## Quick Start — Writing a Question

1. **Pick principle + tier + decision direction.** Check `references/audit-findings.md` for coverage gaps.
2. **Read `references/data-structures.md`** for the correct JSON template.
3. **Choose a sector** that's realistic for Israel. Pick a `chartType` (vary across batch).
4. **Write the company profile.** Start with what makes it look GOOD, then add complexity.
5. **Build metrics.** Use sector-appropriate metrics and P/E ranges (table above). Use relative years.
6. **Write counter-signal explanation FIRST** — if you can't argue the opposite, the question is too easy.
7. **Write the worked example** — 5-7 steps showing expert thinking process.
8. **Run the checklist** (section 4 above).
9. **Sanity test:** "Could a smart player argue the wrong answer?" If no → add ambiguity.
