'use strict';

var { createEmailTemplate } = require('../assets/js/email-templates.js');

async function sendEmail(apiKey, to, subject, html) {
  console.log('sendEmail: sending to', to, 'subject:', subject);
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
    throw new Error('Failed to send email: ' + errText);
  }
  var data = await response.json();
  console.log('Email sent successfully, id:', data.id);
}

// GET: returns parsed JSON array. PATCH/POST: returns null (minimal).
async function sbGet(supabaseUrl, serviceKey, path) {
  console.log('sbGet:', path);
  var response = await fetch(supabaseUrl + '/rest/v1/' + path, {
    method: 'GET',
    headers: {
      'apikey': serviceKey,
      'Authorization': 'Bearer ' + serviceKey,
      'Content-Type': 'application/json',
    },
  });
  var text = await response.text();
  if (!response.ok) {
    console.error('Supabase GET error:', response.status, text);
    throw new Error('Supabase GET error ' + response.status + ': ' + text);
  }
  console.log('sbGet result:', text.slice(0, 200));
  return text ? JSON.parse(text) : [];
}

async function sbPatch(supabaseUrl, serviceKey, path, body) {
  console.log('sbPatch:', path, JSON.stringify(body));
  var response = await fetch(supabaseUrl + '/rest/v1/' + path, {
    method: 'PATCH',
    headers: {
      'apikey': serviceKey,
      'Authorization': 'Bearer ' + serviceKey,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify(body),
  });
  var text = await response.text();
  if (!response.ok) {
    console.error('Supabase PATCH error:', response.status, text);
    throw new Error('Supabase PATCH error ' + response.status + ': ' + text);
  }
  console.log('sbPatch success, status:', response.status);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  var _b = req.body || {};
  var userId = _b.userId;
  var action = _b.action;

  console.log('manage-access called with:', { userId: userId, action: action });
  console.log('ADMIN_SECRET exists:', !!process.env.ADMIN_SECRET);
  console.log('SUPABASE_SERVICE_KEY exists:', !!process.env.SUPABASE_SERVICE_KEY);

  try {
    // ── Auth check ──
    var adminToken   = req.headers['x-admin-token'];
    var ADMIN_SECRET = process.env.ADMIN_SECRET;
    console.log('admin token present:', !!adminToken);

    if (!ADMIN_SECRET) {
      console.error('ADMIN_SECRET env var is not set');
      return res.status(500).json({ error: 'Server misconfiguration: ADMIN_SECRET not set' });
    }
    if (adminToken !== ADMIN_SECRET) {
      console.warn('Invalid admin token received');
      return res.status(401).json({ error: 'Unauthorized: invalid admin token' });
    }

    // ── Env vars ──
    var RESEND_API_KEY       = process.env.RESEND_API_KEY;
    var SUPABASE_URL         = process.env.SUPABASE_URL;
    var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
      return res.status(500).json({ error: 'Server configuration error: missing Supabase env vars' });
    }

    if (!userId || !action) {
      return res.status(400).json({ error: 'Missing userId or action' });
    }

    // ── Actions ──
    if (action === 'approve') {
      console.log('Step 1: setting has_access = true for user', userId);
      await sbPatch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId,
        { has_access: true });

      console.log('Step 2: updating access_requests status to approved');
      await sbPatch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&status=eq.pending',
        { status: 'approved' });

      console.log('Step 3: fetching user info for email');
      var rows = await sbGet(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&select=name,email&limit=1');

      if (RESEND_API_KEY && rows && rows.length > 0) {
        console.log('Step 4: sending access_granted email to', rows[0].email);
        var tpl = createEmailTemplate('access_granted', { name: rows[0].name });
        await sendEmail(RESEND_API_KEY, rows[0].email, tpl.subject, tpl.html);
      } else {
        console.warn('Step 4 skipped: no email sent (RESEND_API_KEY missing or no request row found)');
      }

    } else if (action === 'deny') {
      console.log('Step 1: fetching user info for email');
      var rows = await sbGet(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&select=name,email&limit=1');

      console.log('Step 2: updating access_requests status to denied');
      await sbPatch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'access_requests?user_id=eq.' + userId + '&status=eq.pending',
        { status: 'denied' });

      if (RESEND_API_KEY && rows && rows.length > 0) {
        console.log('Step 3: sending access_denied email to', rows[0].email);
        var tpl = createEmailTemplate('access_denied', { name: rows[0].name });
        await sendEmail(RESEND_API_KEY, rows[0].email, tpl.subject, tpl.html);
      } else {
        console.warn('Step 3 skipped: no email sent');
      }

    } else if (action === 'toggle') {
      console.log('Step 1: reading current has_access for user', userId);
      var current = await sbGet(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId + '&select=has_access');

      if (!current || current.length === 0) {
        console.error('Profile not found for userId', userId);
        return res.status(404).json({ error: 'Profile not found' });
      }

      var flipped = !current[0].has_access;
      console.log('Step 2: toggling has_access from', current[0].has_access, 'to', flipped);
      await sbPatch(SUPABASE_URL, SUPABASE_SERVICE_KEY,
        'profiles?id=eq.' + userId,
        { has_access: flipped });

    } else {
      return res.status(400).json({ error: 'Unknown action: ' + action });
    }

    console.log('manage-access: success for action', action);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('manage-access error:', err.message, err.stack);
    return res.status(500).json({ error: err.message });
  }
};
