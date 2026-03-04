'use strict';

var { createEmailTemplate } = require('../assets/js/email-templates.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var _b = req.body || {};
  var name  = _b.name  || '';
  var email = _b.email || '';

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  var RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    var tpl = createEmailTemplate('welcome', { name: name });

    var response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NewGen Finance <noreply@newgenfinance.co.il>',
        to: [email],
        subject: tpl.subject,
        html: tpl.html,
      }),
    });

    if (!response.ok) {
      var errText = await response.text();
      console.error('Resend welcome email error:', response.status, errText);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    var data = await response.json();
    console.log('Welcome email sent:', data.id);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('send-welcome failed:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
