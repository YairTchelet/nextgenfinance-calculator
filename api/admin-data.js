'use strict';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Verify admin token
  var adminToken   = req.headers['x-admin-token'];
  var ADMIN_SECRET = process.env.ADMIN_SECRET;

  if (!ADMIN_SECRET) {
    console.error('admin-data: ADMIN_SECRET not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }
  if (adminToken !== ADMIN_SECRET) {
    console.warn('admin-data: unauthorized request');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  var SUPABASE_URL         = process.env.SUPABASE_URL;
  var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('admin-data: missing Supabase env vars');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    var headers = {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_SERVICE_KEY,
      'Content-Type': 'application/json',
    };

    var [profilesRes, requestsRes] = await Promise.all([
      fetch(SUPABASE_URL + '/rest/v1/profiles?select=*&order=created_at.desc', { headers: headers }),
      fetch(SUPABASE_URL + '/rest/v1/access_requests?select=*&order=created_at.desc', { headers: headers }),
    ]);

    var profilesText  = await profilesRes.text();
    var requestsText  = await requestsRes.text();

    if (!profilesRes.ok) {
      console.error('admin-data: profiles fetch error', profilesRes.status, profilesText);
      throw new Error('Failed to fetch profiles: ' + profilesRes.status);
    }
    if (!requestsRes.ok) {
      console.error('admin-data: requests fetch error', requestsRes.status, requestsText);
      throw new Error('Failed to fetch access_requests: ' + requestsRes.status);
    }

    console.log('admin-data: fetched', JSON.parse(profilesText).length, 'profiles and', JSON.parse(requestsText).length, 'requests');

    return res.status(200).json({
      profiles: JSON.parse(profilesText),
      requests: JSON.parse(requestsText),
    });

  } catch (err) {
    console.error('admin-data error:', err.message, err.stack);
    return res.status(500).json({ error: err.message });
  }
};
