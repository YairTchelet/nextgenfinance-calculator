/* === access-system.js ===
 * Paywall / access-tier system for BuffettGame
 * Tiers: Guest (easy only) → Member (easy+medium) → Course Access (all)
 */

window.BuffettAccess = (function () {
    'use strict';

    let _user = null;
    let _hasCourseAccess = false;

    const TIER_MAP = { easy: 1, medium: 2, hard: 3, expert: 4 };

    function _getClient() {
        // Reuse shared client if available (e.g. set by auth-guard.js), else create one
        if (window.__supabase) return window.__supabase;
        // Note: SUPABASE_URL/KEY are const — not on window — so check typeof, not window.X
        try {
            if (window.supabase?.createClient &&
                typeof SUPABASE_URL !== 'undefined' &&
                typeof SUPABASE_ANON_KEY !== 'undefined') {
                window.__supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                return window.__supabase;
            }
        } catch (e) {}
        return null;
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    async function init() {
        try {
            const client = _getClient();
            if (!client) { refreshUI(); return; }
            const { data: { session } } = await client.auth.getSession();
            _user = session?.user || null;
            if (_user) await _loadProfile();
        } catch (e) {
            // Supabase down or unavailable → guest mode, no crash
            _user = null;
            _hasCourseAccess = false;
        }
        refreshUI();
        _setupAuthListener();
    }

    async function _loadProfile() {
        try {
            const client = _getClient();
            if (!client) return;
            const { data } = await client
                .from('profiles')
                .select('has_access')
                .eq('id', _user.id)
                .single();
            _hasCourseAccess = data?.has_access === true;
        } catch (e) {
            _hasCourseAccess = false;
        }
    }

    function _setupAuthListener() {
        try {
            const client = _getClient();
            if (!client) return;
            client.auth.onAuthStateChange(async (event, session) => {
                _user = session?.user || null;
                _hasCourseAccess = false;
                if (_user) await _loadProfile();
                refreshUI();
            });
        } catch (e) {}
    }

    // ── Access checks ─────────────────────────────────────────────────────────
    function canPlay(diffOrTier) {
        const tier = typeof diffOrTier === 'number' ? diffOrTier : (TIER_MAP[diffOrTier] || 1);
        if (tier <= 1) return true;
        if (tier === 2) return !!_user;
        return !!_user && _hasCourseAccess;
    }

    function isLoggedIn() { return !!_user; }

    function getAccessLevel() {
        if (!_user) return 'guest';
        if (!_hasCourseAccess) return 'member';
        return 'course';
    }

    function getUser() { return _user; }

    // ── UI refresh ────────────────────────────────────────────────────────────
    function refreshUI() {
        if (typeof updateDifficultyButtonsState === 'function') updateDifficultyButtonsState();
        _updateMenuIndicator();
        _updateCTA();
        _updateNavbar();
    }

    function _updateMenuIndicator() {
        const el = document.getElementById('access-level-indicator');
        if (!el) return;
        const level = getAccessLevel();
        const name = _user?.user_metadata?.full_name?.split(' ')[0] || '';
        const greeting = name ? ` ${name}` : '';
        if (level === 'guest') {
            el.textContent = '🎮 מצב חינמי — רמה קלה בלבד';
            el.className = 'access-level-indicator access-guest';
        } else if (level === 'member') {
            el.textContent = `👋 שלום${greeting} — רמות קל ובינוני`;
            el.className = 'access-level-indicator access-member';
        } else {
            el.textContent = `🎓 שלום${greeting} — גישה מלאה`;
            el.className = 'access-level-indicator access-course';
        }
    }

    function _updateCTA() {
        const el = document.getElementById('access-cta');
        if (!el) return;
        const level = getAccessLevel();
        if (level === 'guest') {
            el.innerHTML = '<a href="/auth/register/?redirect=/investor-academy/game/" class="access-cta-link">הצטרפו בחינם</a> כדי לפתוח גם את הרמה הבינונית';
            el.style.display = '';
        } else if (level === 'member') {
            el.innerHTML = '<a href="/investor-academy/" class="access-cta-link">קורס Investor Academy</a> — פתחו את כל הרמות';
            el.style.display = '';
        } else {
            el.style.display = 'none';
        }
    }

    function _updateNavbar() {
        const signoutBtn = document.getElementById('game-signout-btn');
        const membersLink = document.querySelector('.course-nav-links a[href="/members/"]');
        if (!_user) {
            if (signoutBtn) signoutBtn.style.display = 'none';
            if (membersLink) membersLink.style.display = 'none';
            const navLinks = document.querySelector('.course-nav-links');
            if (navLinks && !document.getElementById('game-login-link')) {
                const a = document.createElement('a');
                a.href = '/auth/login/?redirect=/investor-academy/game/';
                a.className = 'course-nav-link';
                a.id = 'game-login-link';
                a.textContent = 'התחברות';
                navLinks.insertBefore(a, navLinks.firstChild);
            }
        } else {
            if (signoutBtn) signoutBtn.style.display = '';
            if (membersLink) membersLink.style.display = '';
            document.getElementById('game-login-link')?.remove();
        }
    }

    // ── Modals ─────────────────────────────────────────────────────────────────
    function showLoginModal() {
        document.getElementById('access-login-overlay')?.classList.remove('hidden');
    }
    function hideLoginModal() {
        document.getElementById('access-login-overlay')?.classList.add('hidden');
    }
    function showAccessModal() {
        document.getElementById('access-request-overlay')?.classList.remove('hidden');
        // Reset to form state
        const form = document.getElementById('access-request-form');
        const confirm = document.getElementById('access-request-confirm');
        if (form) form.style.display = '';
        if (confirm) confirm.style.display = 'none';
    }
    function hideAccessModal() {
        document.getElementById('access-request-overlay')?.classList.add('hidden');
    }

    // ── Access request submit ─────────────────────────────────────────────────
    async function submitAccessRequest(notes) {
        if (!_user) return false;
        try {
            const client = _getClient();
            if (!client) return false;
            const { error } = await client
                .from('access_requests')
                .insert({ user_id: _user.id, email: _user.email, notes: notes || null });
            return !error;
        } catch (e) {
            return false;
        }
    }

    return {
        init,
        canPlay,
        isLoggedIn,
        getAccessLevel,
        getUser,
        refreshUI,
        showLoginModal, hideLoginModal,
        showAccessModal, hideAccessModal,
        submitAccessRequest
    };
})();
