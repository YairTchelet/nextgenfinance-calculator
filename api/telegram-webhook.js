'use strict';

// ══════════════════════════════════════════════════════════════════
// telegram-webhook.js — הבית הפיננסי, Phase 2
// Telegram intake for household finance. Receives text + voice messages,
// parses an expense with Claude (Haiku), writes to Supabase `transactions`,
// and replies with a confirmation + inline buttons to fix the category.
//
// SECURITY: this function writes with the Supabase SERVICE-ROLE key, which
// BYPASSES RLS. Its entire boundary is the two checks TOGETHER:
//   (1) the secret_token header set on the Telegram webhook, AND
//   (2) the sender's Telegram user-ID allowlist (Yair + Bayla).
// Never remove either, and never echo the service key in a reply or log.
// ══════════════════════════════════════════════════════════════════

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const PARSE_MODEL = 'claude-haiku-4-5-20251001'; // parsing/extraction — cheap + fast
const QA_MODEL = 'claude-sonnet-4-6';            // conversational Q&A over the ledger
// lib path (not the index) avoids pdf-parse's debug block that reads a test file.
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

// ── Anthropic Messages API (raw fetch, no SDK) ──
async function anthropic(apiKey, model, maxTokens, system, tools, messages) {
  const body = { model, max_tokens: maxTokens, system, messages };
  if (tools) { body.tools = tools; }
  const r = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status + ': ' + (await r.text()));
  return r.json();
}

// Allow voice transcription up to ~60s (Vercel Pro). Text is fast.
module.exports.config = { maxDuration: 60 };

// ── Telegram Bot API ──
async function tg(token, method, payload) {
  const r = await fetch('https://api.telegram.org/bot' + token + '/' + method, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (!data.ok) console.error('Telegram ' + method + ' error:', JSON.stringify(data).slice(0, 300));
  return data;
}

// ── Supabase REST (service role) ──
function sbHeaders(key, extra) {
  return Object.assign({
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Content-Type': 'application/json',
  }, extra || {});
}
async function sbGet(url, key, path) {
  const r = await fetch(url + '/rest/v1/' + path, { headers: sbHeaders(key) });
  const text = await r.text();
  if (!r.ok) throw new Error('Supabase GET ' + r.status + ': ' + text);
  return text ? JSON.parse(text) : [];
}
async function sbInsert(url, key, table, row) {
  const r = await fetch(url + '/rest/v1/' + table, {
    method: 'POST',
    headers: sbHeaders(key, { 'Prefer': 'return=representation' }),
    body: JSON.stringify(row),
  });
  const text = await r.text();
  if (!r.ok) throw new Error('Supabase INSERT ' + r.status + ': ' + text);
  const arr = text ? JSON.parse(text) : [];
  return arr[0];
}
async function sbPatch(url, key, path, body) {
  const r = await fetch(url + '/rest/v1/' + path, {
    method: 'PATCH',
    headers: sbHeaders(key, { 'Prefer': 'return=minimal' }),
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('Supabase PATCH ' + r.status + ': ' + (await r.text()));
}
async function sbDelete(url, key, path) {
  const r = await fetch(url + '/rest/v1/' + path, { method: 'DELETE', headers: sbHeaders(key) });
  if (!r.ok) throw new Error('Supabase DELETE ' + r.status + ': ' + (await r.text()));
}

// ── Claude Haiku: route a Hebrew message → record an expense OR flag a question ──
// Returns { name: 'record_expense'|'ask_question', input }.
async function parseExpense(apiKey, text, categories) {
  const expenseNames = categories.filter(c => c.kind === 'expense').map(c => c.name);
  const incomeNames = categories.filter(c => c.kind === 'income').map(c => c.name);

  const system =
    'אתה מנוע ניתוב פיננסי. סווג את ההודעה בעברית לאחת משתי פעולות.\n' +
    'אם ההודעה מדווחת על הוצאה/הכנסה (סכום קיים) — קרא ל-record_expense.\n' +
    'אם ההודעה היא שאלה על המצב הכספי (כמה הוצאנו, מה השווי, כמה נשאר) — קרא ל-ask_question.\n' +
    'ל-record_expense: בחר category אך ורק מתוך הרשימות: הוצאות = [' + expenseNames.join(', ') + '] ; ' +
    'הכנסות = [' + incomeNames.join(', ') + ']. אם אין התאמה ברורה, השאר category ריק.\n' +
    'direction = out בתשלום/קנייה/הוצאה, ו-in במשכורת/קבלת כסף/החזר.\n' +
    'currency = ILS כברירת מחדל; CAD רק אם צוין דולר קנדי/קנדה/CAD.\n' +
    'recurrence = recurring רק אם צוין שזה חוזר (מנוי, כל חודש), אחרת one_off.';

  const recordTool = {
    name: 'record_expense',
    description: 'רישום עסקה כספית אחת שחולצה מההודעה',
    input_schema: {
      type: 'object',
      properties: {
        direction: { type: 'string', enum: ['in', 'out'] },
        amount: { type: 'number', description: 'הסכום החיובי' },
        currency: { type: 'string', enum: ['ILS', 'CAD'] },
        category: { type: 'string', description: 'שם קטגוריה מהרשימה, או מחרוזת ריקה' },
        merchant: { type: 'string', description: 'בית עסק / מקור, אם צוין' },
        note: { type: 'string', description: 'הערה קצרה, אם רלוונטי' },
        recurrence: { type: 'string', enum: ['one_off', 'recurring'] },
      },
      required: ['direction', 'amount', 'currency', 'recurrence'],
    },
  };
  const askTool = {
    name: 'ask_question',
    description: 'המשתמש שואל שאלה על הכספים ולא מדווח על הוצאה',
    input_schema: {
      type: 'object',
      properties: { question: { type: 'string', description: 'השאלה כפי שנשאלה' } },
      required: ['question'],
    },
  };

  const data = await anthropic(apiKey, PARSE_MODEL, 400, system, [recordTool, askTool], [{ role: 'user', content: text }]);
  const block = (data.content || []).find(b => b.type === 'tool_use');
  return block ? { name: block.name, input: block.input } : null;
}

// ── Claude Sonnet: answer a Hebrew question over the ledger (agentic read loop) ──
function monthRange(month) {
  const [y, m] = String(month).split('-').map(Number);
  const p = n => String(n).padStart(2, '0');
  const ny = m === 12 ? y + 1 : y, nm = m === 12 ? 1 : m + 1;
  return { start: y + '-' + p(m) + '-01', end: ny + '-' + p(nm) + '-01' };
}
function normMonth(m) { return /^\d{4}-\d{2}$/.test(String(m || '')) ? m : new Date().toISOString().slice(0, 7); }

async function qaMonthSummary(url, key, month, catMap) {
  const { start, end } = monthRange(month);
  const rows = await sbGet(url, key,
    'transactions?ts=gte.' + start + '&ts=lt.' + end + '&select=direction,amount_ils,category_id,support_source');
  let income = 0, expense = 0, support = 0; const byCat = {};
  for (const r of rows) {
    const v = Number(r.amount_ils) || 0;
    if (r.direction === 'in') { income += v; if (r.support_source) support += v; }
    else { expense += v; if (r.category_id) byCat[r.category_id] = (byCat[r.category_id] || 0) + v; }
  }
  const by_category = Object.entries(byCat)
    .map(([cid, total]) => ({ category: catMap[cid] || 'ללא', total: Math.round(total) }))
    .sort((a, b) => b.total - a.total);
  return { month, income: Math.round(income), expense: Math.round(expense), net: Math.round(income - expense), support_received: Math.round(support), by_category };
}

async function qaNetWorth(url, key) {
  const [accounts, settings] = await Promise.all([
    sbGet(url, key, 'accounts?select=name,type,holder,currency,balance,is_active'),
    sbGet(url, key, 'settings?key=eq.cad_to_ils&select=value'),
  ]);
  const cad = settings[0] != null ? Number(settings[0].value) : 1;
  let net = 0; const list = [];
  for (const a of accounts) {
    if (a.is_active === false) continue;
    const ils = Number(a.balance) * (a.currency === 'CAD' ? cad : 1);
    net += (a.type === 'credit' || a.type === 'loan') ? -ils : ils;
    list.push({ name: a.name, type: a.type, holder: a.holder, currency: a.currency, balance: Number(a.balance), balance_ils: Math.round(ils) });
  }
  return { net_worth_ils: Math.round(net), cad_to_ils: cad, accounts: list };
}

async function qaListTransactions(url, key, args, catMap, nameToId) {
  let q = 'transactions?select=ts,direction,amount,currency,amount_ils,category_id,merchant,note&order=ts.desc&limit=' + Math.min(Number(args.limit) || 20, 50);
  if (args.month) { const { start, end } = monthRange(normMonth(args.month)); q += '&ts=gte.' + start + '&ts=lt.' + end; }
  if (args.direction === 'in' || args.direction === 'out') q += '&direction=eq.' + args.direction;
  if (args.category && nameToId[args.category]) q += '&category_id=eq.' + nameToId[args.category];
  const rows = await sbGet(url, key, q);
  return rows.map(r => ({
    date: (r.ts || '').slice(0, 10), direction: r.direction,
    amount: Number(r.amount), currency: r.currency, amount_ils: Math.round(Number(r.amount_ils) || 0),
    category: catMap[r.category_id] || 'ללא', merchant: r.merchant, note: r.note,
  }));
}

async function answerQuestion(apiKey, url, key, question) {
  const cats = await sbGet(url, key, 'categories?select=id,name,kind');
  const catMap = {}, nameToId = {};
  cats.forEach(c => { catMap[c.id] = c.name; nameToId[c.name] = c.id; });
  const today = new Date().toISOString().slice(0, 10);

  const tools = [
    { name: 'get_month_summary', description: 'סיכום חודשי: הכנסות, הוצאות, נטו, תמיכה שהתקבלה, ופירוט לפי קטגוריה', input_schema: { type: 'object', properties: { month: { type: 'string', description: 'YYYY-MM' } }, required: ['month'] } },
    { name: 'get_net_worth', description: 'שווי נטו נוכחי לפי יתרות החשבונות (₪, בשער נוכחי)', input_schema: { type: 'object', properties: {} } },
    { name: 'list_transactions', description: 'רשימת תנועות מסוננת לפי חודש/קטגוריה/כיוון', input_schema: { type: 'object', properties: { month: { type: 'string' }, category: { type: 'string' }, direction: { type: 'string', enum: ['in', 'out'] }, limit: { type: 'number' } } } },
  ];
  const system =
    'אתה עוזר פיננסי אישי למשק בית (יאיר וביילה), קופה משותפת. ענה בעברית, קצר וברור, בשקלים ₪.\n' +
    'התאריך היום ' + today + '. אם חסר חודש בשאלה, הנח את החודש הנוכחי.\n' +
    'השתמש בכלים כדי לקבל נתונים אמיתיים לפני שאתה עונה — אל תמציא מספרים.';

  const messages = [{ role: 'user', content: question }];
  for (let i = 0; i < 5; i++) {
    const data = await anthropic(apiKey, QA_MODEL, 800, system, tools, messages);
    messages.push({ role: 'assistant', content: data.content });
    const toolUses = (data.content || []).filter(b => b.type === 'tool_use');
    if (!toolUses.length) {
      const t = (data.content || []).find(b => b.type === 'text');
      return t ? t.text.trim() : 'לא הצלחתי לענות על השאלה.';
    }
    const results = [];
    for (const tu of toolUses) {
      let out;
      try {
        if (tu.name === 'get_month_summary') out = await qaMonthSummary(url, key, normMonth(tu.input.month), catMap);
        else if (tu.name === 'get_net_worth') out = await qaNetWorth(url, key);
        else if (tu.name === 'list_transactions') out = await qaListTransactions(url, key, tu.input || {}, catMap, nameToId);
        else out = { error: 'unknown tool' };
      } catch (e) { out = { error: e.message }; }
      results.push({ type: 'tool_result', tool_use_id: tu.id, content: JSON.stringify(out) });
    }
    messages.push({ role: 'user', content: results });
  }
  return 'השאלה מורכבת מדי כרגע — נסו לנסח מחדש או לפצל לשתי שאלות.';
}

// ── AssemblyAI: transcribe a Telegram voice note (Hebrew) ──
async function transcribeVoice(botToken, assemblyKey, fileId) {
  const f = await tg(botToken, 'getFile', { file_id: fileId });
  const filePath = f.result && f.result.file_path;
  if (!filePath) throw new Error('Telegram getFile failed');
  const audio = await fetch('https://api.telegram.org/file/bot' + botToken + '/' + filePath);
  const bytes = Buffer.from(await audio.arrayBuffer());

  const up = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: { 'authorization': assemblyKey },
    body: bytes,
  });
  if (!up.ok) throw new Error('AssemblyAI upload ' + up.status);
  const { upload_url } = await up.json();

  const create = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: { 'authorization': assemblyKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ audio_url: upload_url, language_code: 'he' }),
  });
  if (!create.ok) throw new Error('AssemblyAI create ' + create.status);
  const { id } = await create.json();

  for (let i = 0; i < 20; i++) {
    await new Promise(res => setTimeout(res, 1500));
    const poll = await fetch('https://api.assemblyai.com/v2/transcript/' + id, {
      headers: { 'authorization': assemblyKey },
    });
    const t = await poll.json();
    if (t.status === 'completed') return t.text || '';
    if (t.status === 'error') throw new Error('AssemblyAI: ' + t.error);
  }
  throw new Error('AssemblyAI timed out');
}

// ── Download a Telegram PDF and pull its text (digital PDFs only; no OCR) ──
async function extractPdfText(botToken, fileId) {
  const f = await tg(botToken, 'getFile', { file_id: fileId });
  const filePath = f.result && f.result.file_path;
  if (!filePath) throw new Error('Telegram getFile failed');
  const file = await fetch('https://api.telegram.org/file/bot' + botToken + '/' + filePath);
  const bytes = Buffer.from(await file.arrayBuffer());
  const data = await pdfParse(bytes);
  return (data.text || '').trim();
}

// ── Claude Haiku: classify a PDF (bill vs receipt) and extract it ──
// Two tools + tool_choice:any → one call both decides the type and returns fields.
async function parseDocument(apiKey, text, categories) {
  const expenseNames = categories.filter(c => c.kind === 'expense').map(c => c.name);

  const system =
    'אתה מנוע חילוץ מסמכים פיננסיים. קיבלת טקסט שחולץ מ-PDF.\n' +
    'אם זהו חשבון שירות (חשמל / מים / גז / ארנונה) — קרא ל-extract_bill.\n' +
    'אם זו קבלה או חשבונית קנייה מחנות/בית עסק — קרא ל-extract_receipt ופצל לפריטים.\n' +
    'בחר category לכל פריט אך ורק מתוך הרשימה: [' + expenseNames.join(', ') + ']. אם אין התאמה ברורה, השאר ריק.\n' +
    'currency = ILS כברירת מחדל; CAD רק אם צוין דולר קנדי/קנדה/CAD.\n' +
    'תאריכים בפורמט YYYY-MM-DD. סכומים חיוביים.';

  const billTool = {
    name: 'extract_bill',
    description: 'חשבון שירות (חשמל/מים/גז/ארנונה) — סכום, תקופת חיוב, צריכה ומונה',
    input_schema: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['electric', 'water', 'gas', 'arnona', 'other'] },
        provider: { type: 'string', description: 'שם הספק, אם מצוין' },
        period_start: { type: 'string', description: 'YYYY-MM-DD — תחילת תקופת החיוב' },
        period_end: { type: 'string', description: 'YYYY-MM-DD — סוף תקופת החיוב' },
        amount: { type: 'number', description: 'הסכום לתשלום' },
        currency: { type: 'string', enum: ['ILS', 'CAD'] },
        consumption: { type: 'number', description: 'צריכה (kWh / מ״ק), אם מצוין' },
        unit: { type: 'string', enum: ['kWh', 'm3'] },
        meter_reading: { type: 'number', description: 'קריאת מונה, אם מצוינת' },
      },
      required: ['type', 'amount', 'currency'],
    },
  };

  const receiptTool = {
    name: 'extract_receipt',
    description: 'קבלה/חשבונית קנייה — פיצול לפריטים עם קטגוריה',
    input_schema: {
      type: 'object',
      properties: {
        merchant: { type: 'string', description: 'שם בית העסק' },
        currency: { type: 'string', enum: ['ILS', 'CAD'] },
        total: { type: 'number', description: 'סך הקבלה' },
        items: {
          type: 'array',
          description: 'פריטי הקנייה',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              amount: { type: 'number' },
              category: { type: 'string', description: 'שם קטגוריה מהרשימה, או ריק' },
              recurrence: { type: 'string', enum: ['one_off', 'recurring'] },
            },
            required: ['description', 'amount'],
          },
        },
      },
      required: ['merchant', 'total', 'items'],
    },
  };

  const r = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: PARSE_MODEL,
      max_tokens: 2000,
      system,
      tools: [billTool, receiptTool],
      tool_choice: { type: 'any' },
      messages: [{ role: 'user', content: text.slice(0, 12000) }],
    }),
  });
  if (!r.ok) throw new Error('Anthropic ' + r.status + ': ' + (await r.text()));
  const data = await r.json();
  const block = (data.content || []).find(b => b.type === 'tool_use');
  return block ? { name: block.name, input: block.input } : null;
}

// ── Confirmation card + inline keyboard ──
const DIR_EMOJI = { in: '🟢', out: '🔴' };
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}
function memberHe(m) { return m === 'yair' ? 'יאיר' : m === 'bayla' ? 'ביילה' : 'משותף'; }

function confirmationText(tx, categoryName, member) {
  const sign = tx.direction === 'in' ? '+' : '−';
  const cur = tx.currency === 'CAD' ? 'C$' : '₪';
  const lines = [
    '<b>נרשמה תנועה</b> ' + DIR_EMOJI[tx.direction],
    'סכום: <b>' + sign + cur + Number(tx.amount).toLocaleString('he-IL') + '</b>' +
      (tx.currency === 'CAD' && tx.amount_ils != null ? ' (≈ ₪' + Math.round(tx.amount_ils).toLocaleString('he-IL') + ')' : ''),
    'קטגוריה: <b>' + esc(categoryName || 'ללא') + '</b>',
  ];
  if (tx.merchant) lines.push('בית עסק: ' + esc(tx.merchant));
  lines.push('על שם: ' + memberHe(member) + (tx.recurrence === 'recurring' ? ' · 🔁 קבוע' : ''));
  lines.push('\nלתיקון הקטגוריה הקישו למטה:');
  return lines.join('\n');
}

// callback_data must stay <= 64 bytes → encode category by INDEX, not UUID.
function fixKeyboard(txId, categories, kindWanted) {
  const buttons = [];
  categories.forEach((c, idx) => {
    if (c.kind !== kindWanted) return;
    buttons.push({ text: (c.icon ? c.icon + ' ' : '') + c.name, callback_data: 'c|' + txId + '|' + idx });
  });
  const rows = [];
  for (let i = 0; i < buttons.length; i += 3) rows.push(buttons.slice(i, i + 3));
  rows.push([{ text: '🗑 מחק', callback_data: 'd|' + txId }]);
  return { inline_keyboard: rows };
}

// ── Bill (utility PDF) confirmation card + fix/delete keyboard ──
const BILL_HE = { electric: 'חשמל', water: 'מים', gas: 'גז', arnona: 'ארנונה', other: 'אחר' };
function billText(bill) {
  const cur = bill.currency === 'CAD' ? 'C$' : '₪';
  const lines = [
    '<b>נשמר חשבון</b> 🧾',
    'סוג: <b>' + esc(BILL_HE[bill.type] || bill.type) + '</b>',
    'סכום: <b>' + cur + Number(bill.amount).toLocaleString('he-IL') + '</b>',
  ];
  if (bill.provider) lines.push('ספק: ' + esc(bill.provider));
  if (bill.period_start || bill.period_end) lines.push('תקופה: ' + (bill.period_start || '?') + ' – ' + (bill.period_end || '?'));
  if (bill.consumption != null) lines.push('צריכה: ' + Number(bill.consumption).toLocaleString('he-IL') + (bill.unit ? ' ' + bill.unit : ''));
  if (bill.meter_reading != null) lines.push('מונה: ' + Number(bill.meter_reading).toLocaleString('he-IL'));
  lines.push('\nלתיקון הסוג או מחיקה:');
  return lines.join('\n');
}
function billKeyboard(billId) {
  const row = [['electric', 'חשמל'], ['water', 'מים'], ['gas', 'גז'], ['arnona', 'ארנונה']]
    .map(([t, he]) => ({ text: he, callback_data: 'bt|' + billId + '|' + t }));
  return { inline_keyboard: [row, [{ text: '🗑 מחק', callback_data: 'bd|' + billId }]] };
}

// ── Receipt confirmation card + approve/discard keyboard ──
function receiptText(merchant, total, currency, items) {
  const cur = currency === 'CAD' ? 'C$' : '₪';
  const lines = [
    '<b>קבלה זוהתה</b> 🧾 — דרוש אישור',
    'בית עסק: <b>' + esc(merchant || '?') + '</b>',
    'סה״כ: <b>' + cur + Number(total || 0).toLocaleString('he-IL') + '</b>',
    '',
    '<b>פריטים (' + items.length + '):</b>',
  ];
  items.slice(0, 20).forEach(it => {
    lines.push('• ' + esc(it.description) + ' — ' + cur + Number(it.amount).toLocaleString('he-IL') +
      (it.category ? ' [' + esc(it.category) + ']' : ''));
  });
  if (items.length > 20) lines.push('… ועוד ' + (items.length - 20));
  lines.push('\nלאישור הקישו ✅, או לביטול 🗑');
  return lines.join('\n');
}
function receiptKeyboard(receiptId) {
  return { inline_keyboard: [[
    { text: '✅ אשר', callback_data: 'ra|' + receiptId },
    { text: '🗑 בטל', callback_data: 'rx|' + receiptId },
  ]] };
}

// ══════════════════════════════════════════════════════════════════
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── (1) secret_token header ──
  const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!SECRET || req.headers['x-telegram-bot-api-secret-token'] !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
  if (!BOT_TOKEN || !SUPABASE_URL || !SERVICE_KEY || !ANTHROPIC_API_KEY) {
    console.error('telegram-webhook: missing required env vars');
    return res.status(200).json({ ok: true }); // ack so Telegram stops retrying
  }

  // ── (2) Telegram user-ID allowlist ──
  const YAIR_ID = process.env.TELEGRAM_YAIR_ID;
  const BAYLA_ID = process.env.TELEGRAM_BAYLA_ID;
  const memberFor = id => (String(id) === String(YAIR_ID) ? 'yair'
    : String(id) === String(BAYLA_ID) ? 'bayla' : null);

  try {
    const update = req.body || {};

    // ───────── callback_query: fix category / delete ─────────
    if (update.callback_query) {
      const cq = update.callback_query;
      const member = memberFor(cq.from && cq.from.id);
      if (!member) { await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id }); return res.status(200).json({ ok: true }); }

      const data = cq.data || '';
      const chatId = cq.message.chat.id;
      const messageId = cq.message.message_id;
      const categories = await sbGet(SUPABASE_URL, SERVICE_KEY, 'categories?select=id,name,kind,icon&order=id');

      // ── bill: delete ──
      if (data.startsWith('bd|')) {
        const billId = data.slice(3);
        await sbDelete(SUPABASE_URL, SERVICE_KEY, 'bills?id=eq.' + billId);
        await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'נמחק' });
        await tg(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: messageId, text: '🗑 החשבון נמחק.' });
        return res.status(200).json({ ok: true });
      }

      // ── bill: fix type ──
      if (data.startsWith('bt|')) {
        const parts = data.split('|');
        const billId = parts[1];
        const newType = parts[2];
        await sbPatch(SUPABASE_URL, SERVICE_KEY, 'bills?id=eq.' + billId, { type: newType });
        const rows = await sbGet(SUPABASE_URL, SERVICE_KEY,
          'bills?id=eq.' + billId + '&select=type,provider,period_start,period_end,amount,currency,consumption,unit,meter_reading');
        const bill = rows[0] || {};
        await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'עודכן ל' + (BILL_HE[newType] || newType) });
        await tg(BOT_TOKEN, 'editMessageText', {
          chat_id: chatId, message_id: messageId, parse_mode: 'HTML',
          text: billText(bill), reply_markup: billKeyboard(billId),
        });
        return res.status(200).json({ ok: true });
      }

      // ── receipt: discard ──
      if (data.startsWith('rx|')) {
        const receiptId = data.slice(3);
        await sbDelete(SUPABASE_URL, SERVICE_KEY, 'receipts?id=eq.' + receiptId);
        await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'בוטל' });
        await tg(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: messageId, text: '🗑 הקבלה בוטלה.' });
        return res.status(200).json({ ok: true });
      }

      // ── receipt: approve → write line items as transactions ──
      if (data.startsWith('ra|')) {
        const receiptId = data.slice(3);
        const rows = await sbGet(SUPABASE_URL, SERVICE_KEY,
          'receipts?id=eq.' + receiptId + '&select=id,merchant,currency,account_id,status,pending_items');
        const receipt = rows[0];
        if (!receipt || receipt.status === 'confirmed') {
          await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'כבר אושר' });
          return res.status(200).json({ ok: true });
        }
        const items = Array.isArray(receipt.pending_items) ? receipt.pending_items : [];
        const txRows = items.map(it => {
          const matched = categories.find(c => c.kind === 'expense' && c.name === (it.category || '').trim());
          return {
            account_id: receipt.account_id,
            direction: 'out',
            amount: Number(it.amount),
            currency: receipt.currency || 'ILS',
            category_id: matched ? matched.id : null,
            member: member,
            merchant: receipt.merchant || null,
            note: it.description || null,
            recurrence: it.recurrence === 'recurring' ? 'recurring' : 'one_off',
            source: 'receipt_pdf',
            receipt_id: receipt.id,
            // fx_rate omitted → set_fx_rate() trigger fills it
          };
        });
        if (txRows.length) await sbInsert(SUPABASE_URL, SERVICE_KEY, 'transactions', txRows);
        await sbPatch(SUPABASE_URL, SERVICE_KEY, 'receipts?id=eq.' + receiptId, { status: 'confirmed', pending_items: null });
        await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'נשמר' });
        await tg(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: messageId, text: '✅ נשמרו ' + txRows.length + ' פריטים מהקבלה.' });
        return res.status(200).json({ ok: true });
      }

      if (data.startsWith('d|')) {
        const txId = data.slice(2);
        await sbDelete(SUPABASE_URL, SERVICE_KEY, 'transactions?id=eq.' + txId);
        await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'נמחק' });
        await tg(BOT_TOKEN, 'editMessageText', { chat_id: chatId, message_id: messageId, text: '🗑 התנועה נמחקה.' });
        return res.status(200).json({ ok: true });
      }

      if (data.startsWith('c|')) {
        const parts = data.split('|');
        const txId = parts[1];
        const cat = categories[Number(parts[2])];
        if (cat) {
          await sbPatch(SUPABASE_URL, SERVICE_KEY, 'transactions?id=eq.' + txId, { category_id: cat.id });
          const rows = await sbGet(SUPABASE_URL, SERVICE_KEY,
            'transactions?id=eq.' + txId + '&select=direction,amount,currency,amount_ils,merchant,recurrence,member');
          const tx = rows[0] || {};
          await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id, text: 'עודכן ל' + cat.name });
          await tg(BOT_TOKEN, 'editMessageText', {
            chat_id: chatId, message_id: messageId, parse_mode: 'HTML',
            text: confirmationText(tx, cat.name, tx.member || member),
            reply_markup: fixKeyboard(txId, categories, tx.direction === 'in' ? 'income' : 'expense'),
          });
        } else {
          await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id });
        }
        return res.status(200).json({ ok: true });
      }

      await tg(BOT_TOKEN, 'answerCallbackQuery', { callback_query_id: cq.id });
      return res.status(200).json({ ok: true });
    }

    // ───────── message: text or voice ─────────
    const msg = update.message;
    if (!msg) return res.status(200).json({ ok: true });

    const member = memberFor(msg.from && msg.from.id);
    if (!member) return res.status(200).json({ ok: true }); // unknown sender → silent ignore
    const chatId = msg.chat.id;

    // ───────── document: PDF bill or receipt ─────────
    if (msg.document) {
      const doc = msg.document;
      const isPdf = doc.mime_type === 'application/pdf' || /\.pdf$/i.test(doc.file_name || '');
      if (!isPdf) {
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'אני תומך כרגע ב-PDF בלבד (קבלה או חשבון).' });
        return res.status(200).json({ ok: true });
      }

      let pdfText;
      try {
        pdfText = await extractPdfText(BOT_TOKEN, doc.file_id);
      } catch (e) {
        console.error('pdf extract error:', e.message);
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא הצלחתי לקרוא את ה-PDF, נסו שוב.' });
        return res.status(200).json({ ok: true });
      }
      if (!pdfText) {
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'ה-PDF נראה סרוק/תמונה ללא טקסט. שלחו PDF טקסטואלי או הזינו ידנית.' });
        return res.status(200).json({ ok: true });
      }

      const [categories, accounts] = await Promise.all([
        sbGet(SUPABASE_URL, SERVICE_KEY, 'categories?select=id,name,kind,icon&order=id'),
        sbGet(SUPABASE_URL, SERVICE_KEY, 'accounts?select=id,holder,type&order=created_at'),
      ]);
      const defaultAccount = accounts.find(a => a.holder === 'joint' && a.type === 'checking') || accounts[0];

      let parsedDoc;
      try {
        parsedDoc = await parseDocument(ANTHROPIC_API_KEY, pdfText, categories);
      } catch (e) {
        console.error('document parse error:', e.message);
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא הצלחתי לנתח את המסמך, נסו שוב.' });
        return res.status(200).json({ ok: true });
      }
      if (!parsedDoc) {
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא זיהיתי קבלה או חשבון במסמך.' });
        return res.status(200).json({ ok: true });
      }

      // ── bill → write directly to `bills` ──
      if (parsedDoc.name === 'extract_bill') {
        const b = parsedDoc.input || {};
        if (!b.amount || Number(b.amount) <= 0) {
          await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא זיהיתי סכום בחשבון.' });
          return res.status(200).json({ ok: true });
        }
        const bill = await sbInsert(SUPABASE_URL, SERVICE_KEY, 'bills', {
          type: b.type || 'other',
          provider: b.provider || null,
          period_start: b.period_start || null,
          period_end: b.period_end || null,
          amount: Number(b.amount),
          currency: b.currency || 'ILS',
          consumption: b.consumption != null ? Number(b.consumption) : null,
          unit: b.unit || null,
          meter_reading: b.meter_reading != null ? Number(b.meter_reading) : null,
        });
        await tg(BOT_TOKEN, 'sendMessage', {
          chat_id: chatId, parse_mode: 'HTML',
          text: billText(bill), reply_markup: billKeyboard(bill.id),
        });
        return res.status(200).json({ ok: true });
      }

      // ── receipt → hold as pending, confirm in chat ──
      const rc = parsedDoc.input || {};
      const items = (Array.isArray(rc.items) ? rc.items : [])
        .filter(it => it && Number(it.amount) > 0)
        .map(it => ({
          description: it.description || '',
          amount: Number(it.amount),
          category: (it.category || '').trim(),
          recurrence: it.recurrence === 'recurring' ? 'recurring' : 'one_off',
        }));
      if (!items.length) {
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא זוהו פריטים בקבלה.' });
        return res.status(200).json({ ok: true });
      }
      const currency = rc.currency || 'ILS';
      const receipt = await sbInsert(SUPABASE_URL, SERVICE_KEY, 'receipts', {
        account_id: defaultAccount ? defaultAccount.id : null,
        merchant: rc.merchant || null,
        total: rc.total != null ? Number(rc.total) : null,
        currency: currency,
        status: 'pending',
        raw_text: pdfText.slice(0, 8000),
        pending_items: items,
      });
      await tg(BOT_TOKEN, 'sendMessage', {
        chat_id: chatId, parse_mode: 'HTML',
        text: receiptText(rc.merchant, rc.total, currency, items),
        reply_markup: receiptKeyboard(receipt.id),
      });
      return res.status(200).json({ ok: true });
    }

    let text = '';
    let source = 'bot_text';
    if (msg.voice) {
      source = 'bot_voice';
      if (!ASSEMBLYAI_API_KEY) {
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'תמלול קולי עדיין לא מוגדר. שלחו טקסט, למשל: "קפה 15".' });
        return res.status(200).json({ ok: true });
      }
      try {
        text = await transcribeVoice(BOT_TOKEN, ASSEMBLYAI_API_KEY, msg.voice.file_id);
      } catch (e) {
        console.error('transcribe error:', e.message);
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא הצלחתי לתמלל את ההקלטה, נסו שוב או שלחו טקסט.' });
        return res.status(200).json({ ok: true });
      }
    } else if (typeof msg.text === 'string') {
      text = msg.text;
    } else {
      return res.status(200).json({ ok: true });
    }

    if (!text.trim()) {
      await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא קלטתי טקסט. נסו: "שילמתי 340 בסופר".' });
      return res.status(200).json({ ok: true });
    }

    // Load categories + a default account, then parse
    const [categories, accounts] = await Promise.all([
      sbGet(SUPABASE_URL, SERVICE_KEY, 'categories?select=id,name,kind,icon&order=id'),
      sbGet(SUPABASE_URL, SERVICE_KEY, 'accounts?select=id,holder,type&order=created_at'),
    ]);
    const defaultAccount =
      accounts.find(a => a.holder === 'joint' && a.type === 'checking') || accounts[0];

    let parsed;
    try {
      parsed = await parseExpense(ANTHROPIC_API_KEY, text, categories);
    } catch (e) {
      console.error('parse error:', e.message);
      await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא הצלחתי לנתח את ההודעה, נסו שוב.' });
      return res.status(200).json({ ok: true });
    }
    if (!parsed) {
      await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא הבנתי — נסו לרשום הוצאה ("קפה 15") או לשאול שאלה ("כמה הוצאנו החודש?").' });
      return res.status(200).json({ ok: true });
    }

    // ── question → Sonnet Q&A over the ledger ──
    if (parsed.name === 'ask_question') {
      const question = (parsed.input && parsed.input.question) || text;
      let answer;
      try {
        answer = await answerQuestion(ANTHROPIC_API_KEY, SUPABASE_URL, SERVICE_KEY, question);
      } catch (e) {
        console.error('qa error:', e.message);
        answer = 'לא הצלחתי לענות על השאלה כרגע, נסו שוב.';
      }
      await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: answer });
      return res.status(200).json({ ok: true });
    }

    // ── expense → record a transaction ──
    const ex = parsed.input || {};
    const amount = Number(ex.amount);
    if (!amount || amount <= 0) {
      await tg(BOT_TOKEN, 'sendMessage', { chat_id: chatId, text: 'לא זיהיתי סכום. נסו למשל: "קפה 15" או "משכורת 9800".' });
      return res.status(200).json({ ok: true });
    }

    const wantedKind = ex.direction === 'in' ? 'income' : 'expense';
    const matched = categories.find(c => c.kind === wantedKind && c.name === (ex.category || '').trim());

    const tx = await sbInsert(SUPABASE_URL, SERVICE_KEY, 'transactions', {
      account_id: defaultAccount ? defaultAccount.id : null,
      direction: ex.direction,
      amount: amount,
      currency: ex.currency || 'ILS',
      category_id: matched ? matched.id : null,
      member: member,
      merchant: ex.merchant || null,
      note: ex.note || null,
      recurrence: ex.recurrence || 'one_off',
      source: source,
      raw_text: text,
      // fx_rate intentionally omitted → set_fx_rate() trigger fills it
    });

    await tg(BOT_TOKEN, 'sendMessage', {
      chat_id: chatId,
      parse_mode: 'HTML',
      text: confirmationText(tx, matched ? matched.name : null, member),
      reply_markup: fixKeyboard(tx.id, categories, wantedKind),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('telegram-webhook error:', err.message);
    return res.status(200).json({ ok: true }); // ack to avoid Telegram retry storms
  }
};
