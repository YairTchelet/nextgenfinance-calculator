'use strict';

var { createEmailTemplate } = require('../assets/js/email-templates.js');

async function sendEmail(apiKey, to, subject, html) {
  var response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'NewGen Finance <noreply@newgenfinance.co.il>',
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  if (!response.ok) {
    var errText = await response.text();
    console.error('Resend error:', response.status, errText);
    throw new Error('Failed to send email');
  }
  var data = await response.json();
  console.log('Email sent:', data.id);
}

async function sbFetch(supabaseUrl, serviceKey, path, method, body) {
  var opts = {
    method: method || 'GET',
    headers: {
      'apikey': serviceKey,
      'Authorization': 'Bearer ' + serviceKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  var response = await fetch(supabaseUrl + '/rest/v1/' + path, opts);
  var text = await response.text();
  if (!response.ok) {
    console.error('Supabase error:', response.status, text);
    throw new Error('Supabase error: ' + response.status);
  }
  return text ? JSON.parse(text) : null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify admin token
  var adminToken = req.headers['x-admin-token'];
  var ADMIN_SECRET = process.env.ADMIN_SECRET;
  if (!ADMIN_SECRET || adminToken !== ADMIN_SECRET) {
    console.warn('Unauthorized manage-access attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  var RESEND_API_KEY       = process.env.RESEND_API_KEY;
  var SUPABASE_URL         = process.env.SUPABASE_URL;
  var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('Missing Supabase env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  var _b = req.body || {};
  var userId = _b.userId;
  var action = _b.action;  // 'approve' | 'deny' | 'set_access'

  if (!userId || !action) {
    return res.status(400).json({ error: 'Missing userId or action' });
  }

  try {
    if (action === 'approve') {
      // 1. Set has_access = true in profiles
      await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId, 'PATCH', { has_access: true });

      // 2. Update access_requests status
      await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&status=eq.pending', 'PATCH', { status: 'approved' });

      // 3. Get user info from access_requests to send email
      var rows = await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&select=name,email&limit=1', 'GET');

      if (RESEND_API_KEY && rows && rows.length > 0) {
        var tpl = createEmailTemplate('access_granted', { name: rows[0].name });
        await sendEmail(RESEND_API_KEY, rows[0].email, tpl.subject, tpl.html);
      }

    } else if (action === 'deny') {
      // 1. Update access_requests status
      await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&status=eq.pending', 'PATCH', { status: 'denied' });

      // 2. Get user info and send denial email
      var rows = await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&select=name,email&limit=1', 'GET');

      if (RESEND_API_KEY && rows && rows.length > 0) {
        var tpl = createEmailTemplate('access_denied', { name: rows[0].name });
        await sendEmail(RESEND_API_KEY, rows[0].email, tpl.subject, tpl.html);
      }

    } else if (action === 'set_access') {
      // Direct toggle — no email sent
      var newValue = _b.value === true || _b.value === 'true';
      await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId, 'PATCH', { has_access: newValue });

    } else {
      return res.status(400).json({ error: 'Unknown action: ' + action });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('manage-access failed:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
