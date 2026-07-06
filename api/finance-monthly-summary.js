'use strict';

// ══════════════════════════════════════════════════════════════════
// finance-monthly-summary.js — הבית הפיננסי, Phase 4
// Runs on the 1st of each month (Vercel Cron). Computes LAST month's
// in / out / saved / top expense category / benefits received, then
// pushes a Telegram message to the household and emails a summary via
// Resend. Read-only against Supabase (service role).
//
// SECURITY: only Vercel's scheduler should trigger this. Vercel strips
// client-sent x-vercel-* headers, so the presence of `x-vercel-cron`
// proves the caller is the cron system; a CRON_SECRET bearer is also
// accepted for manual/authorized runs.
// ══════════════════════════════════════════════════════════════════

const RECIPIENT = 'yairtchelet@gmail.com';
const BRAND = { navy: '#0c3d52', teal: '#2a9d8f', light: '#f7f9fa', text: '#22333b', muted: '#4a6472' };

function sbHeaders(key) {
  return { 'apikey': key, 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' };
}
async function sbGet(url, key, path) {
  const r = await fetch(url + '/rest/v1/' + path, { headers: sbHeaders(key) });
  const text = await r.text();
  if (!r.ok) throw new Error('Supabase GET ' + r.status + ': ' + text);
  return text ? JSON.parse(text) : [];
}
async function tg(token, method, payload) {
  const r = await fetch('https://api.telegram.org/bot' + token + '/' + method, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  });
  const data = await r.json();
  if (!data.ok) console.error('Telegram ' + method + ' error:', JSON.stringify(data).slice(0, 300));
  return data;
}
function ils(n) { return '₪' + Math.round(Number(n) || 0).toLocaleString('he-IL'); }

function monthRange(y, mIdx) { // mIdx 0-based
  const p = n => String(n).padStart(2, '0');
  const ny = mIdx === 11 ? y + 1 : y, nm = mIdx === 11 ? 1 : mIdx + 2;
  return { start: y + '-' + p(mIdx + 1) + '-01', end: ny + '-' + p(nm) + '-01' };
}
const HE_MONTHS = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

module.exports = async function handler(req, res) {
  // ── guard ──
  const CRON_SECRET = process.env.CRON_SECRET;
  const isVercelCron = !!req.headers['x-vercel-cron'];
  const bearerOk = CRON_SECRET && req.headers['authorization'] === 'Bearer ' + CRON_SECRET;
  if (!isVercelCron && !bearerOk) return res.status(401).json({ error: 'Unauthorized' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('finance-monthly-summary: missing Supabase env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // ── last month window ──
    const now = new Date();
    let y = now.getUTCFullYear(), mIdx = now.getUTCMonth() - 1;
    if (mIdx < 0) { mIdx = 11; y -= 1; }
    const { start, end } = monthRange(y, mIdx);
    const label = HE_MONTHS[mIdx] + ' ' + y;

    // ── data ──
    const [rows, categories] = await Promise.all([
      sbGet(SUPABASE_URL, SERVICE_KEY,
        'transactions?ts=gte.' + start + '&ts=lt.' + end + '&select=direction,amount_ils,category_id,support_source'),
      sbGet(SUPABASE_URL, SERVICE_KEY, 'categories?select=id,name,kind'),
    ]);
    const catName = {}; categories.forEach(c => { catName[c.id] = c.name; });

    let income = 0, expense = 0, benefits = 0; const byCat = {};
    for (const r of rows) {
      const v = Number(r.amount_ils) || 0;
      if (r.direction === 'in') { income += v; if (r.support_source) benefits += v; }
      else { expense += v; if (r.category_id) byCat[r.category_id] = (byCat[r.category_id] || 0) + v; }
    }
    const saved = income - expense;
    const top = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0];
    const topCat = top ? { name: catName[top[0]] || 'ללא', total: top[1] } : null;

    // ── Telegram push ──
    const tgLines = [
      '📊 <b>סיכום חודשי — ' + label + '</b>',
      '',
      '🟢 הכנסות: <b>' + ils(income) + '</b>',
      '🔴 הוצאות: <b>' + ils(expense) + '</b>',
      (saved >= 0 ? '💰 נחסך: <b>' : '⚠️ גירעון: <b>') + ils(Math.abs(saved)) + '</b>',
    ];
    if (topCat) tgLines.push('🏷 קטגוריה מובילה: <b>' + topCat.name + '</b> (' + ils(topCat.total) + ')');
    if (benefits > 0) tgLines.push('🎖 הטבות שהתקבלו: <b>' + ils(benefits) + '</b>');

    const chatIds = [process.env.TELEGRAM_YAIR_ID, process.env.TELEGRAM_BAYLA_ID].filter(Boolean);
    if (BOT_TOKEN) {
      for (const id of chatIds) {
        await tg(BOT_TOKEN, 'sendMessage', { chat_id: id, parse_mode: 'HTML', text: tgLines.join('\n') });
      }
    }

    // ── Resend email ──
    let emailSent = false;
    if (RESEND_API_KEY) {
      const row = (lbl, val, color) =>
        '<tr><td style="padding:10px 0;border-bottom:1px solid #e6edf0;font-family:Assistant,Arial;color:' + BRAND.muted + ';">' + lbl +
        '</td><td style="padding:10px 0;border-bottom:1px solid #e6edf0;font-family:Rubik,Arial;font-weight:800;text-align:left;color:' + (color || BRAND.text) + ';">' + val + '</td></tr>';
      const html =
        '<div dir="rtl" style="background:' + BRAND.light + ';padding:24px;">' +
          '<div style="max-width:520px;margin:0 auto;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">' +
            '<div style="background:' + BRAND.navy + ';padding:22px 28px;">' +
              '<div style="font-family:Rubik,Arial;font-size:1.25rem;font-weight:800;color:#fff;">הבית הפיננסי</div>' +
              '<div style="font-family:Assistant,Arial;color:#b3e0dc;margin-top:2px;">סיכום חודשי — ' + label + '</div>' +
            '</div>' +
            '<div style="padding:22px 28px;">' +
              '<table style="width:100%;border-collapse:collapse;">' +
                row('הכנסות', ils(income), BRAND.teal) +
                row('הוצאות', ils(expense), '#c44e44') +
                row(saved >= 0 ? 'נחסך' : 'גירעון', ils(Math.abs(saved)), saved >= 0 ? BRAND.teal : '#c44e44') +
                (topCat ? row('קטגוריה מובילה', topCat.name + ' · ' + ils(topCat.total)) : '') +
                (benefits > 0 ? row('הטבות שהתקבלו', ils(benefits)) : '') +
              '</table>' +
              '<a href="https://www.newgenfinance.co.il/finances/" style="display:inline-block;margin-top:20px;background:' + BRAND.teal + ';color:#fff;text-decoration:none;font-family:Rubik,Arial;font-weight:800;padding:12px 24px;border-radius:10px;">פתחו את הלוח</a>' +
            '</div>' +
          '</div>' +
        '</div>';

      const er = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + RESEND_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'NewGen Finance <noreply@newgenfinance.co.il>',
          to: [RECIPIENT],
          subject: 'סיכום חודשי — ' + label,
          html,
        }),
      });
      if (er.ok) { emailSent = true; }
      else { console.error('Resend summary error:', er.status, (await er.text()).slice(0, 300)); }
    }

    return res.status(200).json({ ok: true, month: label, income: Math.round(income), expense: Math.round(expense), saved: Math.round(saved), pushed: chatIds.length, emailSent });
  } catch (err) {
    console.error('finance-monthly-summary error:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
