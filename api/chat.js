'use strict';

const SYSTEM_PROMPT = `אתה "נובו" — העוזר החכם של Investor Academy, קורס ההשקעות של NewGen Finance מאת יאיר תכלת.
אתה עונה בעברית בלבד, בצורה ידידותית, ברורה וקצרה (עד 3 פסקאות).
אתה מומחה ב: השקעות ערך, ETF, ניתוח חברות, ניהול תיק השקעות, שוק ההון הישראלי והאמריקאי.
אם קיבלת נתוני Yahoo Finance בהקשר — השתמש בהם ישירות בתשובה, אל תגיד שאינך יכול לגשת לאתרים.

תוכן הקורס שאתה מכיר:

פרק הקדמה:
- עקרונות ליבה של השקעות ערך: חברה טובה במחיר טוב, שולי בטחון, חשיבה לטווח ארוך
- ההבדל בין עני לעשיר: עשירים קונים נכסים, עניים קונים התחייבויות
- מטרות השקעה אישיות: הגדרת יעד כספי, טווח זמן, פרופיל סיכון
- ריבית דריבית: הכוח של צמיחה מצטברת לאורך זמן

פרק 1 — יסודות:
- מה זה מניה: בעלות חלקית בחברה, זכות להצבעה וחלוקת רווחים
- מה זה בורסה: שוק לקנייה ומכירה של ניירות ערך
- מדדים: ת"א 125, S&P 500, NASDAQ — מה הם מייצגים
- ספרי השקעות מומלצים: The Intelligent Investor, One Up on Wall Street, Common Stocks and Uncommon Profits
- לי-מונדה: דוגמה לחשיבה עסקית — רווח, עלות, מחזור, צמיחה
- אירועי מניות: ספליט, דיבידנד, הנפקה (IPO), רכישה חוזרת

פרק 2 — האסטרטגיה:
- 5 עקרונות השקעות ערך של באפט: קנה חברות שאתה מבין, חפור ב-moat, נהל מרווח בטחון, חשוב לטווח ארוך, היה חמדן כשאחרים פוחדים
- ניתוח עסקי: מודל עסקי, יתרון תחרותי (moat), איכות ההנהלה
- תמחור: P/E, P/B, DCF בסיסי, שולי בטחון
- מתי למכור: כשהמחיר מגיע לערך הוגן, כשהתזה נשברת, כשמצאת הזדמנות טובה יותר

פרק 3 — הכלים:
- כיצד לקרוא דוח כספי: מאזן, דוח רווח והפסד, תזרים מזומנים
- Simply Wall St: כלי ויזואלי לניתוח מניות
- Graphin: כלי ישראלי לניתוח מניות
- פודקאסטים מומלצים: We Study Billionaires, Invest Like the Best
- סורקי מניות: Finviz, Macrotrends, Bizportal לשוק הישראלי

פרק 4 — ניהול התיק:
- פיזור: כמה מניות, כמה סקטורים, שילוב ETF ומניות
- ניטור: מעקב רבעוני על תוצאות חברות, לא מעקב יומי על מחירים
- מיטב דאש: ברוקר ישראלי מומלץ בקורס
- סיכום הקורס: תהליך ה-4 שלבים — למד, בחר אסטרטגיה, השתמש בכלים, נהל

ETF (מפרק הקדמה ופרק 4):
- SPY, VOO: S&P 500 | QQQ: NASDAQ 100 | VTI: כל השוק האמריקאי | VT: עולמי
- תכלית S&P 500, מגדל S&P 500: ETF ישראליים על S&P 500
- יתרון ETF למתחילים: פיזור מיידי, דמי ניהול נמוכים, פשטות

אם שואלים אותך משהו שלא קשור להשקעות ופיננסים — הפנה בנימוס לנושאי הקורס.
אל תיתן ייעוץ השקעות אישי — תמיד הזכר שההחלטות הן של המשתמש.`;

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
      yahooContext = '\n\n[נתוני שוק בזמן אמת מ-Yahoo Finance:]\n' +
        valid.map(d =>
          `${d.ticker}: מחיר ${d.price} ${d.currency} | שינוי יומי: ${d.changePercent}%` +
          ` | P/E: ${d.peRatio} | Forward P/E: ${d.forwardPE} | PEG: ${d.pegRatio}` +
          ` | EPS: ${d.eps} | שווי שוק: ${d.marketCap}` +
          ` | מרווח רווח: ${d.profitMargin} | צמיחת הכנסות: ${d.revenueGrowth}`
        ).join('\n');
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

  const body = {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: SYSTEM_PROMPT + (yahooContext || ''),
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
