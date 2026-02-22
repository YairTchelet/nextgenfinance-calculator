/**
 * auth-guard.js
 * Include this script (after supabase CDN + supabase-config.js) on any
 * page that requires a logged-in user. Unauthenticated visitors are
 * immediately redirected to the login page.
 */
(async () => {
  const _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { session } } = await _client.auth.getSession();
  if (!session) {
    window.location.replace('/auth/login/');
  }
})();
