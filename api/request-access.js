function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL   = 'YairTchelet@newgenfinance.co.il';

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 24px; direction: rtl; }
  .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #0b4a64, #1680a0); color: #ffffff; padding: 28px 32px; }
  .header h1 { margin: 0; font-size: 1.3rem; font-weight: 700; }
  .header p  { margin: 6px 0 0; font-size: 0.9rem; opacity: 0.85; }
  .body { padding: 28px 32px; }
  .field { margin-bottom: 20px; }
  .field-label { display: block; font-size: 0.8rem; font-weight: 700; color: #5e817d; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px; }
  .field-value { display: block; font-size: 1rem; color: #394140; line-height: 1.5; }
  .divider { border: none; border-top: 1.5px solid #e5e2df; margin: 20px 0; }
  .note { background: #f0faf8; border: 1.5px solid #a8ddd6; border-radius: 8px; padding: 14px 18px; font-size: 0.9rem; color: #1a6b5e; font-weight: 600; }
  .footer { background: #f4f4f4; padding: 16px 32px; font-size: 0.8rem; color: #9b9794; text-align: center; }
</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>בקשת גישה חדשה לקורס</h1>
      <p>התקבלה בקשה חדשה דרך פרופיל המשתמש</p>
    </div>
    <div class="body">
      <div class="field">
        <span class="field-label">שם מלא</span>
        <span class="field-value">${escapeHtml(name)}</span>
      </div>
      <div class="field">
        <span class="field-label">אימייל</span>
        <span class="field-value">${escapeHtml(email)}</span>
      </div>
      <div class="field">
        <span class="field-label">טלפון</span>
        <span class="field-value">${phone ? escapeHtml(phone) : '—'}</span>
      </div>
      <div class="field">
        <span class="field-label">הודעה</span>
        <span class="field-value">${message ? escapeHtml(message).replace(/\n/g, '<br>') : '—'}</span>
      </div>
      <hr class="divider">
      <div class="note">
        ✅ כנס ל-Supabase ואשר גישה למשתמש לפי כתובת האימייל שלעיל.
      </div>
    </div>
    <div class="footer">NewGen Finance — מערכת ניהול גישה</div>
  </div>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
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
      const errText = await response.text();
      console.error('Resend API error:', response.status, errText);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    const data = await response.json();
    console.log('Email sent successfully:', data.id);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Fetch to Resend failed:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
