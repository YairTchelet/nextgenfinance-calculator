'use strict';

const fs = require('fs');
const path = require('path');

// 1. LOAD THE KNOWLEDGE BASE ONCE UPON BOOT
let KNOWLEDGE_BASE = '';
try {
  // Make sure 'claude_knowledge_base.txt' is in the root of your project folder
  const kbPath = path.join(__dirname, 'claude_knowledge_base.txt');
  KNOWLEDGE_BASE = fs.readFileSync(kbPath, 'utf8');
  console.log('✅ Knowledge base loaded successfully.');
} catch (e) {
  console.error('❌ Could not load knowledge base. Is the file deployed?', e.message);
}

// 2. THE UPDATED SYSTEM PROMPT
const BASE_SYSTEM_PROMPT = `אתה "נובו" (Novo) — העוזר החכם של Investor Academy, קורס ההשקעות של NewGen Finance מאת יאיר תכלת.
המטרה שלך היא לעזור לתלמידים להבין את חומר הקורס, להבהיר מושגים פיננסיים, ולכוון אותם ליישום שיטת ההשקעות של NewGen Finance.

<rules>
1. צמידות לחומר הקורס: עליך לבסס את התשובות שלך *אך ורק* על המושגים, הנוסחאות והדוגמאות המופיעים בתגיות ה-<knowledge_base> למטה.
2. שימוש בדוגמאות: השתמש באופן פעיל בדוגמאות שנלמדו בקורס (למשל, חברת "לי-מונדה" למבנה שוק, יחס PEG, חישובי DCF מפרק 2).
3. ללא ייעוץ פיננסי: אתה מורה חינוכי, לא יועץ השקעות מורשה. אם תלמיד מבקש המלצת השקעה ספציפית או שואל "האם כדאי לי לקנות את המניה הזו?", סרב בנימוס והכוון אותו בחזרה למסגרת 4 השלבים מפרק 3 כדי שינתח את החברה בעצמו. הזכר תמיד שההחלטות הן של המשתמש.
4. מחוץ לתחום: אם תלמיד שואל על נושאים שאינם נלמדים בקורס (למשל, מסחר יומי, קריפטו, ניתוח טכני, פורקס), הסבר בנימוס ש-NewGen Finance מתמקדת אך ורק בהשקעות ערך לטווח ארוך, והחזר את השיחה לעקרונות הליבה של הקורס.
5. שפה וסגנון: למרות שמאגר המידע שלך (knowledge_base) כתוב באנגלית, עליך לנסח את כל המחשבות שלך ולענות למשתמש אך ורק בעברית טבעית ורהוטה. ענה בצורה ידידותית, ברורה, מעודדת וקצרה (עד 3 פסקאות).
6. נתוני זמן אמת: אם קיבלת נתוני Yahoo Finance בהקשר ההודעה — השתמש בהם ישירות בתשובה לטובת ניתוח החברה, אל תגיד שאינך יכול לגשת לאתרים.
</rules>

<anonymity>
אל תציין שאתה בינה מלאכותית, Claude, או נוצרת על ידי Anthropic אלא אם נשאלת ישירות. פשוט פעל כעוזר ההוראה של NewGen Finance. אל תציין שאתה קורא מתמליל או מקובץ מידע. ענה לשאלות בטבעיות.
</anonymity>

<knowledge_base>
${KNOWLEDGE_BASE}
</knowledge_base>`;

const FINANCIAL_KEYWORDS = ['מחיר', 'שער', 'תשואה', 'מדד', 'מניה', 'ETF'];

async function fetchYahooFinance(ticker) {
  try {
    const [chartRes, statsRes] = await Promise.all([
      fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch(`https://query1.finance.yahoo.com/v11/finance/quoteSummary/${ticker}?modules=defaultKeyStatistics,summaryDetail,financialData`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } })
    ]);

    const chartData = await chartRes.json();
    const statsData = await statsRes.json();

    const meta = chartData?.chart?.result?.[0]?.meta;
    const stats = statsData?.quoteSummary?.result?.[0];
    const keyStats = stats?.defaultKeyStatistics;
    const summary = stats?.summaryDetail;
    const financial = stats?.financialData;

    if (!meta) return null;

    return {
      ticker,
      price: meta.regularMarketPrice,
      currency: meta.currency,
      exchange: meta.exchangeName,
      previousClose: meta.previousClose,
      changePercent: (((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100).toFixed(2),
      peRatio: summary?.trailingPE?.raw?.toFixed(2) || 'N/A',
      forwardPE: summary?.forwardPE?.raw?.toFixed(2) || 'N/A',
      pegRatio: keyStats?.pegRatio?.raw?.toFixed(2) || 'N/A',
      eps: keyStats?.trailingEps?.raw?.toFixed(2) || 'N/A',
      marketCap: keyStats?.enterpriseValue?.raw
        ? `${(keyStats.enterpriseValue.raw / 1e9).toFixed(1)}B`
        : 'N/A',
      profitMargin: financial?.profitMargins?.raw
        ? `${(financial.profitMargins.raw * 100).toFixed(1)}%`
        : 'N/A',
      revenueGrowth: financial?.revenueGrowth?.raw
        ? `${(financial.revenueGrowth.raw * 100).toFixed(1)}%`
        : 'N/A',
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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Step 1: Fetch Yahoo Finance data if message contains tickers or financial keywords
  const hasFinancial = FINANCIAL_KEYWORDS.some(kw => message.includes(kw)) || /\b[A-Z]{2,5}\b/.test(message);
  const tickers = hasFinancial ? extractTickers(message) : [];

  let yahooContext = '';
  if (tickers.length > 0) {
    const results = await Promise.all(tickers.map(fetchYahooFinance));
    const valid = results.filter(Boolean);
    if (valid.length > 0) {
      yahooContext = '\n\n<yahoo_finance_data>\n[נתוני שוק בזמן אמת מ-Yahoo Finance:]\n' +
        valid.map(d =>
          `${d.ticker}: מחיר ${d.price} ${d.currency} | שינוי יומי: ${d.changePercent}%` +
          ` | P/E: ${d.peRatio} | Forward P/E: ${d.forwardPE} | PEG: ${d.pegRatio}` +
          ` | EPS: ${d.eps} | שווי שוק: ${d.marketCap}` +
          ` | מרווח רווח: ${d.profitMargin} | צמיחת הכנסות: ${d.revenueGrowth}`
        ).join('\n') + '\n</yahoo_finance_data>';
    }
  }

  // Step 2: Build messages array
  const messages = [];
  if (Array.isArray(history)) {
    for (const entry of history) {
      if (entry.role === 'user' || entry.role === 'assistant') {
        messages.push({ role: entry.role, content: String(entry.content) });
      }
    }
  }
  messages.push({ role: 'user', content: message });

  // Step 3: Call Anthropic API
  const needsWebSearch = tickers.length > 0 && yahooContext === '';

  // 3. COMBINE EVERYTHING INTO THE FINAL SYSTEM PROMPT
  const FINAL_SYSTEM_PROMPT = BASE_SYSTEM_PROMPT + (yahooContext || '');

  const body = {
    model: 'claude-haiku-4-5-20251001', 
    max_tokens: 600,
    system: FINAL_SYSTEM_PROMPT,
    messages,
    ...(needsWebSearch && {
      tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 2 }]
    })
  };

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const text = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('Chat API error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};