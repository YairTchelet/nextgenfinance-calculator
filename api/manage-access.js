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
  var adminToken   = req.headers['x-admin-token'];
  var ADMIN_SECRET = process.env.ADMIN_SECRET;
  console.log('manage-access: token received:', adminToken ? '[present]' : '[missing]');
  if (!ADMIN_SECRET) {
    console.error('manage-access: ADMIN_SECRET env var is not set');
    return res.status(500).json({ error: 'Server misconfiguration: ADMIN_SECRET not set' });
  }
  if (adminToken !== ADMIN_SECRET) {
    console.warn('manage-access: invalid admin token — expected ADMIN_SECRET, got:', adminToken ? '[wrong value]' : '[empty]');
    return res.status(401).json({ error: 'Unauthorized: invalid admin token' });
  }

  var RESEND_API_KEY       = process.env.RESEND_API_KEY;
  var SUPABASE_URL         = process.env.SUPABASE_URL;
  var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('manage-access: missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
    return res.status(500).json({ error: 'Server configuration error: missing Supabase env vars' });
  }

  var _b = req.body || {};
  var userId = _b.userId;
  var action = _b.action;  // 'approve' | 'deny' | 'toggle'

  console.log('manage-access: action =', action, '| userId =', userId);

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

    } else if (action === 'toggle') {
      // Read current has_access value, then flip it — no email sent
      var current = await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId + '&select=has_access', 'GET');

      if (!current || current.length === 0) {
        console.error('manage-access: profile not found for userId', userId);
        return res.status(404).json({ error: 'Profile not found' });
      }

      var flipped = !current[0].has_access;
      console.log('manage-access: toggling has_access from', current[0].has_access, 'to', flipped);

      await sbFetch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId, 'PATCH', { has_access: flipped });

    } else {
      return res.status(400).json({ error: 'Unknown action: ' + action });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('manage-access failed:', err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
