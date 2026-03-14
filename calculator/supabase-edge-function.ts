// ═══════════════════════════════════════════
// Supabase Edge Function: calculator-ai
// Deploy: supabase functions deploy calculator-ai
// Set secret: supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
// ═══════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        // Verify user is authenticated
        const authHeader = req.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        const { action, payload } = await req.json();

        let systemPrompt = '';
        let userPrompt = '';
        let maxTokens = 2000;

        switch (action) {
            // ── Auto-fill: fetch financial data for a company ──
            case 'autofill': {
                const { companyName, metrics } = payload;
                systemPrompt = `You are a financial data assistant. You return ONLY valid JSON, no markdown, no explanation.
Your job: provide the most recent financial metrics for the requested company.
Use TTM (trailing twelve months) data. Be accurate. If you're truly uncertain about a value, use null.
All percentage values should be plain numbers (e.g. 15.3, not "15.3%").
Ratios should be plain numbers (e.g. 1.85, not "1.85x").`;

                userPrompt = `Return financial data for "${companyName}" in this exact JSON format:
{
  "company": "${companyName}",
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
  "sources": "brief note on data sources",
  "dataDate": "YYYY-MM or TTM"
}

Return ONLY the JSON object. No backticks, no explanation.`;
                maxTokens = 1000;
                break;
            }

            // ── AI Analysis: analyze current metrics ──
            case 'analyze': {
                const { companyName, mode, metrics, scores, totalScore } = payload;
                systemPrompt = `You are a Hebrew-speaking financial analyst specializing in value investing (Warren Buffett style).
Write in Hebrew. Be concise but insightful. Use financial terminology naturally.
Focus on actionable insights, red flags, and hidden strengths.`;

                userPrompt = `נתח את הבריאות הפיננסית של "${companyName}" (פרופיל: ${mode === 'growth' ? 'צמיחה' : mode === 'value' ? 'ערך' : 'מאוזן'}).

ציון כולל: ${totalScore}/100

מדדים ותוצאות:
${Object.entries(metrics).map(([k, v]) => `- ${k}: ${v.value}${v.unit || ''} (ציון: ${v.score}/100, ${v.pass ? 'עובר' : 'לא עובר'})`).join('\n')}

כתוב ניתוח קצר (3-4 פסקאות) שכולל:
1. **סיכום כללי** — מצב החברה במשפט אחד
2. **נקודות חוזק** — מה טוב ולמה
3. **סימני אזהרה** — מה מדאיג ולמה
4. **המלצה** — האם שווה להתעמק, ומה לבדוק

כתוב בצורה ישירה כמו משקיע ערך מנוסה שמדבר עם חבר. אל תהיה גנרי.`;
                maxTokens = 2000;
                break;
            }

            // ── Chat: general financial Q&A ──
            case 'chat': {
                const { message, context, history } = payload;
                systemPrompt = `You are a Hebrew-speaking financial education assistant for NewGen Finance.
You help users understand financial metrics, valuation, and investment analysis.
Be concise, educational, and use examples when helpful.
Write in Hebrew. You can use English for financial terms.
If the user provides company context, reference it in your answers.`;

                const contextStr = context
                    ? `\nהקשר נוכחי — חברה: ${context.company}, ציון: ${context.totalScore}, פרופיל: ${context.mode}`
                    : '';

                const messages = [];
                if (history && history.length > 0) {
                    history.forEach(msg => {
                        messages.push({ role: msg.role, content: msg.content });
                    });
                }
                messages.push({ role: 'user', content: message + contextStr });

                // For chat, we send full message history
                const response = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': ANTHROPIC_API_KEY,
                        'anthropic-version': '2023-06-01',
                    },
                    body: JSON.stringify({
                        model: 'claude-sonnet-4-20250514',
                        max_tokens: 1500,
                        system: systemPrompt,
                        messages: messages,
                    }),
                });

                const data = await response.json();
                const text = data.content?.map(b => b.type === 'text' ? b.text : '').join('') || '';

                return new Response(JSON.stringify({ result: text }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            default:
                return new Response(JSON.stringify({ error: 'Unknown action' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
        }

        // Default API call (for autofill and analyze)
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: maxTokens,
                system: systemPrompt,
                messages: [{ role: 'user', content: userPrompt }],
            }),
        });

        const data = await response.json();
        const text = data.content?.map(b => b.type === 'text' ? b.text : '').join('') || '';

        // For autofill, try to parse JSON
        let result = text;
        if (action === 'autofill') {
            try {
                result = JSON.parse(text.replace(/```json?|```/g, '').trim());
            } catch {
                result = { error: 'Failed to parse AI response', raw: text };
            }
        }

        return new Response(JSON.stringify({ result }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Edge function error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
