// ═══════════════════════════════════════════
// Supabase Edge Function: calculator-ai
// Secrets needed:
//   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
// Deploy:
//   supabase functions deploy calculator-ai --no-verify-jwt
// ═══════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function jsonResponse(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { action, payload } = await req.json();

        switch (action) {

            // ══════════════════════════════════════
            // AUTO-FILL: Web search + per-metric sources
            // ══════════════════════════════════════
            case 'autofill': {
                const { companyName } = payload;

                const systemPrompt = `You are a financial data researcher. Your job is to look up REAL, CURRENT financial metrics for a company using web search, and return them as structured JSON.

CRITICAL INSTRUCTIONS:

1. SEARCH FOR REAL DATA — Use web search to find each metric from authoritative financial websites. Do NOT guess or estimate from memory. Actually search.

2. PREFERRED SOURCES (in order of preference):
   - stockanalysis.com (excellent for all metrics, very current)
   - macrotrends.net (excellent for historical data and CAGR)
   - wisesheets.io/kpi (good quick summary)
   - gurufocus.com (good for value metrics, Altman Z)
   - yahoo finance (good for P/E, market data)
   - simplywall.st (good for visual data)
   
3. PER-METRIC SOURCE — For EVERY metric, record which website you got it from. This is mandatory.

4. CAGR CALCULATION — For fcf-growth and eps-growth, you need 5-YEAR CAGR (compound annual growth rate).
   Formula: ((value_now / value_5_years_ago) ^ (1/5) - 1) × 100
   This is NOT total growth. If EPS went from $2 to $6 in 5 years, CAGR = ((6/2)^(1/5) - 1) × 100 = 24.6%
   Search for "company EPS history 5 year" or similar to find historical values.
   If you find a site that already shows the CAGR, use that directly.

5. FORMAT RULES:
   - All percentages as plain numbers: 15.3 not "15.3%" not 0.153
   - All ratios as plain numbers: 1.85 not "1.85x"
   - Negative values are valid — return them
   - If truly cannot find a metric from any source, use null
   - For P/E: if earnings are negative, return null
   - For PEG: if growth is negative, return null

6. HEBREW COMPANY NAMES — If the input is Hebrew (e.g. "אפל", "טבע", "מיקרוסופט"), identify the correct company and search for it.

7. RETURN FORMAT — Return ONLY the JSON below. No backticks, no explanation, no text before or after.`;

                const userPrompt = `Search for current financial data for "${companyName}" and return this exact JSON:

{
  "company": "Official company name",
  "ticker": "TICKER",
  "roi": <number|null>,
  "roe": <number|null>,
  "gross-margin": <number|null>,
  "gross-margin-growth": <number|null>,
  "pm": <number|null>,
  "fcf-yield": <number|null>,
  "fcf-growth": <number|null>,
  "eps-growth": <number|null>,
  "buyback": <number|null>,
  "pe": <number|null>,
  "peg": <number|null>,
  "cr": <number|null>,
  "de": <number|null>,
  "altman-z": <number|null>,
  "metricSources": {
    "roi": "site name where you found this",
    "roe": "site name",
    "gross-margin": "site name",
    "gross-margin-growth": "site name or 'calculated from [site] data'",
    "pm": "site name",
    "fcf-yield": "site name",
    "fcf-growth": "site name or 'CAGR calculated from [site] historical data'",
    "eps-growth": "site name or 'CAGR calculated from [site] historical data'",
    "buyback": "site name",
    "pe": "site name",
    "peg": "site name",
    "cr": "site name",
    "de": "site name",
    "altman-z": "site name"
  },
  "dataDate": "most recent date of the data",
  "confidence": "high|medium|low",
  "warnings": ["any important notes about the data"]
}

IMPORTANT: Search the web for each metric. Do not rely on memory. Cite the actual source for each.`;

                // Call Claude with web search enabled
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': ANTHROPIC_API_KEY!,
                        'anthropic-version': '2023-06-01',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 3000,
                        system: systemPrompt,
                        messages: [{ role: 'user', content: userPrompt }],
                        tools: [
                            {
                                type: 'web_search_20250305',
                                name: 'web_search',
                            }
                        ],
                    }),
                });

                const data = await response.json();

                // Extract text from all content blocks
                const text = data.content
                    ?.map((b: any) => b.type === 'text' ? b.text : '')
                    .filter(Boolean)
                    .join('') || '';

                // Parse JSON from response
                let result;
                try {
                    const jsonStr = text
                        .replace(/```json?\s*/g, '')
                        .replace(/```\s*/g, '')
                        .replace(/^[^{]*({)/s, '$1')
                        .replace(/(})[^}]*$/s, '$1')
                        .trim();
                    result = JSON.parse(jsonStr);
                } catch {
                    result = { error: 'Failed to parse AI response', raw: text.substring(0, 800) };
                }

                return jsonResponse({ result });
            }

            // ══════════════════════════════════════
            // AI ANALYSIS
            // ══════════════════════════════════════
            case 'analyze': {
                const { companyName, mode, metrics, totalScore } = payload;
                const modeHeb = mode === 'growth' ? 'צמיחה' : mode === 'value' ? 'ערך' : 'מאוזן';

                const systemPrompt = `אתה אנליסט פיננסי בכיר בסגנון וורן באפט ומאנגר. אתה כותב בעברית ברמה גבוהה — ישיר, חד, עם תובנות שרק משקיע מנוסה יכול לתת.

עקרונות הכתיבה שלך:
- כתוב כאילו אתה מדבר עם חבר חכם שמבין עסקים אבל רוצה לשמוע את הדעה שלך. לא אקדמי, לא גנרי.
- השתמש במונחים פיננסיים באנגלית כשזה טבעי (ROE, FCF, P/E, moat) — הקהל שלך מכיר אותם.
- תמיד חבר בין מדדים — אל תנתח כל מדד בנפרד. מה הסיפור שהמספרים מספרים ביחד?
- אם משהו מריח רע, אמור את זה ישירות.
- אם משהו באמת מרשים, תגיד למה זה קשה להשגה.

קשרים חשובים בין מדדים שאתה חייב לבדוק:
1. ROE גבוה + D/E גבוה = ROE ממונף, לא איכותי. ROE גבוה + D/E נמוך = מכונת רווחים אמיתית.
2. מרווח גולמי גבוה + שולי רווח נמוכים = בעיית הוצאות תפעוליות. לאן הולך הכסף?
3. P/E גבוה + צמיחת EPS גבוהה = אולי מוצדק. P/E גבוה + צמיחה נמוכה = יקר מדי.
4. FCF Yield נמוך + Buyback גבוה = החברה לווה כדי לקנות מניות? מסוכן.
5. Current Ratio נמוך + D/E גבוה + Altman Z נמוך = סיכון נזילות — דגל אדום.
6. צמיחת FCF > צמיחת EPS = איכות רווחים גבוהה.
7. צמיחת EPS > צמיחת FCF = יתכן מניפולציה חשבונאית.`;

                const userPrompt = `חברה: "${companyName}"
פרופיל: ${modeHeb}
ציון כולל: ${totalScore}/100

נתוני המדדים:
${Object.entries(metrics).map(([name, v]: [string, any]) => {
    const passIcon = v.pass ? '✅' : '❌';
    return `${passIcon} ${name}: ${v.value}${v.unit || ''} (ציון: ${v.score}/100)`;
}).join('\n')}

כתוב ניתוח מובנה:

**הערכה בשורה אחת**
משפט אחד חד וישיר שמסכם את מצב החברה. ספציפי, לא גנרי.

**מה עובד (ולמה זה קשה להשגה)**
2-3 נקודות חוזק. חבר בין מדדים. הסבר מה זה אומר על ה-moat.

**מה מדאיג (ומה זה יכול לגרום)**
2-3 סימני אזהרה עם הסבר לתרחיש הגרוע.

**שורת הסיכום למשקיע ${modeHeb}**
2-3 משפטים: שווה להמשיך לחקור? מה לבדוק? מה יכול לשנות את התמונה?

אל תחזור על המספרים — הקורא רואה אותם. תגיד מה הם *אומרים*.`;

                const text = await callClaude(systemPrompt, userPrompt, 2500);
                return jsonResponse({ result: text });
            }

            // ══════════════════════════════════════
            // CHAT
            // ══════════════════════════════════════
            case 'chat': {
                const { message, context, history } = payload;

                const systemPrompt = `אתה העוזר הפיננסי של NewGen Finance — פלטפורמת חינוך פיננסי ישראלית להשקעות פסיביות והשקעות ערך.

הזהות שלך:
- מורה מעולה שמסביר מושגים פיננסיים בצורה ברורה, עם דוגמאות מהעולם האמיתי.
- חסיד של גישת וורן באפט ומאנגר — השקעות ערך, חשיבה ארוכת טווח, הבנת העסק.
- כותב בעברית טבעית. משתמש במונחים באנגלית כשזה סטנדרטי (P/E, ROE, FCF, moat).
- קצר ולעניין — 3-6 משפטים. אם צריך יותר, כותרות קצרות.

כללים:
- מדד ספציפי → (1) מה מודד, (2) למה חשוב, (3) טווח טוב/רע, (4) דוגמה מחברה אמיתית.
- הקשר חברה → התייחס לנתונים הנוכחיים.
- "תלוי" → תגיד במה ותן 2-3 תרחישים.
- המלצת קנייה → אתה כלי חינוכי, לא יועץ. תן מסגרת החלטה.

המדדים: ROI >10% | ROE >15% | מרווח גולמי >30% | שולי רווח >10% | FCF yield >5% | FCF growth >10% | EPS growth >8% | Buyback >1% | P/E <15-25 | PEG <1 | CR >1.5 | D/E <0.5 | Altman Z >2.99`;

                const contextStr = context
                    ? `\n\n[הקשר: "${context.company}" | ציון: ${context.totalScore}/100 | פרופיל: ${context.mode === 'growth' ? 'צמיחה' : context.mode === 'value' ? 'ערך' : 'מאוזן'}${context.metricsSummary ? ' | ' + context.metricsSummary : ''}]`
                    : '';

                const messages: any[] = [];
                if (history?.length) {
                    history.forEach((msg: any) => messages.push({ role: msg.role, content: msg.content }));
                }
                messages.push({ role: 'user', content: message + contextStr });

                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': ANTHROPIC_API_KEY!,
                        'anthropic-version': '2023-06-01',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1500,
                        system: systemPrompt,
                        messages,
                    }),
                });

                const data = await response.json();
                const text = data.content?.map((b: any) => b.type === 'text' ? b.text : '').join('') || '';
                return jsonResponse({ result: text });
            }

            // ══════════════════════════════════════
            // PARSE: Extract metrics from pasted text
            // ══════════════════════════════════════
            case 'parse': {
                const { text } = payload;

                const systemPrompt = `You are a financial data extraction engine. You receive raw text that a user copied from an AI assistant (like Gemini, ChatGPT, etc.) and you must extract financial metrics from it.

RULES:
- The text may be: a CSV, a table, JSON, bullet points, a paragraph with numbers, or any mix of these.
- Extract ONLY these metrics. Return null for any you cannot find:
  roi, roe, gross-margin, gross-margin-growth, pm, fcf-yield, fcf-growth, eps-growth, buyback, pe, peg, cr, de, altman-z
- All percentages as plain numbers (15.3 not "15.3%").
- All ratios as plain numbers (1.85 not "1.85x").
- For growth metrics: if the text says "total growth" or "5-year growth" without saying "CAGR" or "annual", it might be total growth. If the value seems too high for annual (>50%), divide by 5 as a rough CAGR estimate and add a warning.
- Also extract the company name if visible.
- Return ONLY JSON. No backticks, no explanation.`;

                const userPrompt = `Extract financial metrics from this text:

---
${text}
---

Return ONLY this JSON:
{"company":"name or null","roi":<n>,"roe":<n>,"gross-margin":<n>,"gross-margin-growth":<n>,"pm":<n>,"fcf-yield":<n>,"fcf-growth":<n>,"eps-growth":<n>,"buyback":<n>,"pe":<n>,"peg":<n>,"cr":<n>,"de":<n>,"altman-z":<n>,"warnings":["any notes"]}`;

                const resultText = await callClaude(systemPrompt, userPrompt, 800);
                let result;
                try {
                    const jsonStr = resultText
                        .replace(/```json?\s*/g, '').replace(/```\s*/g, '')
                        .replace(/^[^{]*({)/s, '$1').replace(/(})[^}]*$/s, '$1').trim();
                    result = JSON.parse(jsonStr);
                } catch {
                    result = { error: 'לא הצלחתי לחלץ נתונים מהטקסט' };
                }
                return jsonResponse({ result });
            }

            default:
                return jsonResponse({ error: 'Unknown action' }, 400);
        }

    } catch (error) {
        console.error('Edge function error:', error);
        return jsonResponse({ error: (error as Error).message }, 500);
    }
});


// ═══════════════════════════════════════════
// CLAUDE API HELPER
// ═══════════════════════════════════════════
async function callClaude(system: string, user: string, maxTokens: number): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY!,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: maxTokens,
            system,
            messages: [{ role: 'user', content: user }],
        }),
    });
    const data = await response.json();
    return data.content?.map((b: any) => b.type === 'text' ? b.text : '').filter(Boolean).join('') || '';
}
