/**
 * course-guard.js
 * Include this script (after supabase CDN + supabase-config.js) on any
 * course page that requires a logged-in user WITH course access.
 * - Not logged in → redirect to /auth/login/
 * - Logged in but no access → redirect to /profile/?access=denied
 * - Has access → page loads normally
 */
(async () => {
  const _client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { session } } = await _client.auth.getSession();

  if (!session) {
    sessionStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.replace('/auth/login/');
    return;
  }

  const { data: profile } = await _client
    .from('profiles')
    .select('has_access')
    .eq('id', session.user.id)
    .single();

  if (!profile || !profile.has_access) {
    window.location.replace('/profile/?access=denied');
  }
})();
