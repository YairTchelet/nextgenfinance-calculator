'use strict';

var NOTIFY_EMAIL = 'YairTchelet@newgenfinance.co.il';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sendAdminEmail(apiKey, name, email, phone, message) {
  var html = '<!DOCTYPE html>\n' +
'<html dir="rtl" lang="he"><head><meta charset="UTF-8"><style>\n' +
'body{font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:24px;direction:rtl;}\n' +
'.container{max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.1);}\n' +
'.header{background:linear-gradient(135deg,#0b4a64,#1680a0);color:#fff;padding:28px 32px;}\n' +
'.header h1{margin:0;font-size:1.3rem;font-weight:700;}\n' +
'.header p{margin:6px 0 0;font-size:.9rem;opacity:.85;}\n' +
'.body{padding:28px 32px;}\n' +
'.field{margin-bottom:20px;}\n' +
'.field-label{display:block;font-size:.8rem;font-weight:700;color:#5e817d;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;}\n' +
'.field-value{display:block;font-size:1rem;color:#394140;line-height:1.5;}\n' +
'.divider{border:none;border-top:1.5px solid #e5e2df;margin:20px 0;}\n' +
'.note{background:#f0faf8;border:1.5px solid #a8ddd6;border-radius:8px;padding:14px 18px;font-size:.9rem;color:#1a6b5e;font-weight:600;}\n' +
'.footer{background:#f4f4f4;padding:16px 32px;font-size:.8rem;color:#9b9794;text-align:center;}\n' +
'</style></head><body>\n' +
'<div class="container">\n' +
'  <div class="header"><h1>בקשת גישה חדשה לקורס</h1><p>התקבלה בקשה חדשה דרך פרופיל המשתמש</p></div>\n' +
'  <div class="body">\n' +
'    <div class="field"><span class="field-label">שם מלא</span><span class="field-value">' + escapeHtml(name) + '</span></div>\n' +
'    <div class="field"><span class="field-label">אימייל</span><span class="field-value">' + escapeHtml(email) + '</span></div>\n' +
'    <div class="field"><span class="field-label">טלפון</span><span class="field-value">' + (phone ? escapeHtml(phone) : '—') + '</span></div>\n' +
'    <div class="field"><span class="field-label">הודעה</span><span class="field-value">' + (message ? escapeHtml(message).replace(/\n/g, '<br>') : '—') + '</span></div>\n' +
'    <hr class="divider">\n' +
'    <div class="note">✅ כנס לדשבורד הניהול ואשר גישה למשתמש.</div>\n' +
'  </div>\n' +
'  <div class="footer">NewGen Finance — מערכת ניהול גישה</div>\n' +
'</div></body></html>';

  var response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'NewGen Finance <noreply@newgenfinance.co.il>',
      to: [NOTIFY_EMAIL],
      subject: 'בקשת גישה חדשה לקורס — ' + name,
      html: html,
    }),
  });

  if (!response.ok) {
    var errText = await response.text();
    console.error('Resend admin email error:', response.status, errText);
    throw new Error('Failed to send admin email');
  }

  var data = await response.json();
  console.log('Admin email sent:', data.id);
}

async function saveToSupabase(supabaseUrl, serviceKey, userId, name, email, phone, message) {
  var response = await fetch(supabaseUrl + '/rest/v1/access_requests', {
    method: 'POST',
    headers: {
      'apikey': serviceKey,
      'Authorization': 'Bearer ' + serviceKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({
      user_id: userId,
      name: name,
      email: email,
      phone: phone || null,
      message: message || null,
      status: 'pending',
    }),
  });

  if (!response.ok) {
    var errText = await response.text();
    console.error('Supabase insert error:', response.status, errText);
    // Non-fatal — don't block the user if DB insert fails
  } else {
    console.log('Access request saved to Supabase');
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var _b = req.body || {};
  var userId  = _b.userId  || null;
  var name    = _b.name    || '';
  var email   = _b.email   || '';
  var phone   = _b.phone   || '';
  var message = _b.message || '';

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  var RESEND_API_KEY    = process.env.RESEND_API_KEY;
  var SUPABASE_URL      = process.env.SUPABASE_URL;
  var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Send admin notification email
    await sendAdminEmail(RESEND_API_KEY, name, email, phone, message);

    // Save to Supabase (best-effort)
    if (userId && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      await saveToSupabase(SUPABASE_URL, SUPABASE_SERVICE_KEY, userId, name, email, phone, message);
    } else {
      console.warn('Skipping Supabase insert — missing userId or env vars');
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('request-access failed:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
