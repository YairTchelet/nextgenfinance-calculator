'use strict';

const Anthropic = require('@anthropic-ai/sdk');

const SYSTEM_PROMPT = `אתה "נובו" — העוזר החכם של Investor Academy, קורס ההשקעות של NewGen Finance.
אתה עונה בעברית בלבד, בצורה ידידותית, ברורה וקצרה (עד 3 פסקאות).
אתה מומחה ב: השקעות ערך, ETF, ניתוח חברות, ניהול תיק השקעות, שוק ההון הישראלי והאמריקאי.
אתה מכיר את תוכן הקורס: יסודות השקעות ערך, אסטרטגיה, כלי ניתוח, וניהול תיק.
אם שואלים אותך משהו שלא קשור להשקעות ופיננסים — הפנה בנימוס לנושאי הקורס.
אל תיתן ייעוץ השקעות אישי — תמיד הזכר שההחלטות הן של המשתמש.`;

async function fetchYahooFinance(ticker) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta) return null;
    return {
      ticker,
      price: meta.regularMarketPrice,
      currency: meta.currency,
      exchange: meta.exchangeName,
      previousClose: meta.previousClose,
      changePercent: (((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100).toFixed(2)
    };
  } catch (e) {
    return null;
  }
}

function extractTickers(message) {
  const upper = message.match(/\b[A-Z]{2,5}\b/g) || [];
  const hebrewMap = {
    'סנופי': 'SPY', 'סנופ': 'SPY', 'נאסדק': 'QQQ',
    'תכלית': 'TKLTY', 'מגדל': 'MGDLY'
  };
  const fromHebrew = Object.entries(hebrewMap)
    .filter(([heb]) => message.includes(heb))
    .map(([, ticker]) => ticker);
  return [...new Set([...upper, ...fromHebrew])].slice(0, 3);
}

const FINANCIAL_KEYWORDS = ['מחיר', 'שער', 'תשואה', 'מדד', 'מניה', 'ETF'];

function hasFinancialKeywords(message) {
  return FINANCIAL_KEYWORDS.some(kw => message.includes(kw));
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message' });
  }

  // Step 1: Try Yahoo Finance if message references financial data or tickers
  const tickers = (hasFinancialKeywords(message) || message.match(/\b[A-Z]{2,5}\b/))
    ? extractTickers(message)
    : [];

  let yahooContext = '';
  if (tickers.length > 0) {
    const results = await Promise.all(tickers.map(fetchYahooFinance));
    const valid = results.filter(Boolean);
    if (valid.length > 0) {
      yahooContext = '\n\n[נתוני שוק בזמן אמת מ-Yahoo Finance:]\n' +
        valid.map(d =>
          `${d.ticker}: מחיר ${d.price} ${d.currency} | שינוי יומי: ${d.changePercent}% | בורסה: ${d.exchange}`
        ).join('\n');
    }
  }

  // Step 2: Use web_search only if tickers were mentioned but Yahoo returned nothing
  const needsWebSearch = tickers.length > 0 && yahooContext === '';

  // Build messages array
  const messages = [];
  if (Array.isArray(history)) {
    for (const entry of history) {
      if (entry.role === 'user' || entry.role === 'assistant') {
        messages.push({ role: entry.role, content: String(entry.content) });
      }
    }
  }
  messages.push({ role: 'user', content: message });

  const client = new Anthropic();

  try {
    const createParams = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: SYSTEM_PROMPT + (yahooContext || ''),
      messages,
    };

    if (needsWebSearch) {
      createParams.tools = [{ type: 'web_search_20260209', name: 'web_search', max_uses: 2 }];
    }

    const response = await client.messages.create(createParams);

    const text = response.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
