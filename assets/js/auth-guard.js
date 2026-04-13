/**
 * auth-guard.js
 * Include this script (after supabase CDN + supabase-config.js) on any
 * page that requires a logged-in user. Unauthenticated visitors are
 * immediately redirected to the login page.
 */
(async () => {
  const _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.__supabase = _client; // Expose for calculator and other tools
  const { data: { session } } = await _client.auth.getSession();
  if (!session) {
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
    window.location.replace('/auth/login/');
  }
})();
