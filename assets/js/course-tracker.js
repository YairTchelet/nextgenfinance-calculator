/**
 * course-tracker.js
 * Lightweight lesson visit + time tracker.
 * Fire-and-forget — never blocks page load. Silent on all errors.
 * Add after course-guard.js on every lesson page.
 */
(function () {
    'use strict';

    // Detect chapter slug from URL: /lessons/chapter-1.html → "chapter-1"
    function getSlug() {
        var m = window.location.pathname.match(/\/lessons\/([^\/]+?)\.html/);
        return m ? m[1] : null;
    }

    // Create a Supabase client (each call creates a lightweight instance that
    // shares the same localStorage session as all other clients for this URL).
    function mkClient() {
        try {
            if (window.supabase && window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
                return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            }
        } catch (e) {}
        return null;
    }

    var _client   = null;
    var _userId   = null;
    var _slug     = null;
    var _baseTime = 0;      // seconds already stored in DB for this chapter
    var _sesTime  = 0;      // seconds accumulated in this session
    var _started  = false;

    function fmtSecs(s) { return s; } // just store raw seconds

    async function start() {
        if (_started) return;
        _started = true;

        _slug = getSlug();
        if (!_slug) return;

        _client = mkClient();
        if (!_client) return;

        var userData;
        try {
            var res = await _client.auth.getUser();
            userData = res.data && res.data.user;
        } catch (e) { return; }
        if (!userData) return;
        _userId = userData.id;

        // Fetch existing progress (if any) to get accumulated time
        try {
            var existing = await _client
                .from('course_progress')
                .select('time_spent_seconds')
                .eq('user_id', _userId)
                .eq('chapter', _slug)
                .maybeSingle();
            if (existing.data) {
                _baseTime = existing.data.time_spent_seconds || 0;
            } else {
                // First visit — insert row
                await _client.from('course_progress').insert({
                    user_id: _userId,
                    chapter: _slug,
                    time_spent_seconds: 0
                });
            }
        } catch (e) { return; }

        // Update time every 30 s (pause when tab hidden)
        setInterval(function () {
            if (!document.hidden) {
                _sesTime += 30;
                _persist();
            }
        }, 30000);

        window.addEventListener('beforeunload', function () {
            if (_sesTime > 0) _persist();
        });
    }

    function _persist() {
        if (!_client || !_userId || !_slug) return;
        _client.from('course_progress').update({
            time_spent_seconds: _baseTime + _sesTime
        }).eq('user_id', _userId).eq('chapter', _slug).then(function () {})
          .catch(function () {});
    }

    // Defer until scripts are parsed; course-guard.js is async so this
    // runs shortly after without blocking render.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); });
    } else {
        setTimeout(start, 0);
    }
})();
