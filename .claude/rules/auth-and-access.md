# Auth & Access Control — Supabase, Guards, Paywall

## Supabase Setup

```js
// /assets/js/supabase-config.js
const SUPABASE_URL = 'https://pmlkhkagtorhlteplvak.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tV2FY5_h6ba6-nhdVbENLQ_gkejPX38';
```

Always create the client as: `window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`

## `profiles` Table Schema

| Column     | Type      | Notes                            |
|------------|-----------|----------------------------------|
| id         | uuid      | FK → auth.users.id               |
| full_name  | text      |                                  |
| has_access | boolean   | `true` = course access granted   |
| phone      | text      |                                  |
| city       | text      |                                  |
| bio        | text      |                                  |
| created_at | timestamp |                                  |

## auth-guard.js

Protects pages requiring login (but NOT course access):
- No session → store `pathname+search` in `sessionStorage('redirectAfterLogin')` → redirect to `/auth/login/`
- Exposes `window.__supabase` for use by other scripts on the page

## course-guard.js

Protects course chapter pages (login AND `has_access === true`):
- No session → store redirect → `/auth/login/`
- Session but `has_access !== true` → `/profile/?access=denied`

## Login/Register Redirect Flow

Both `/auth/login/` and `/auth/register/` support `?redirect=/path/`:

1. On page load: read `?redirect=` param → validate `startsWith('/')` → store in `sessionStorage('redirectAfterLogin')`
2. **Capture redirect BEFORE the `await signInWithPassword()` call** — Supabase may call `window.history.replaceState` during auth, wiping `window.location.search`
3. Session detection on load: if session already exists (returning from Google OAuth), immediately forward to stored destination
4. Google OAuth: redirect destination encoded into `redirectTo` URL to survive the round-trip: `redirectTo: origin + '/auth/login/?redirect=' + encodeURIComponent(dest)`
5. Security: only redirect to paths starting with `/` (same-origin only)
6. Default fallback: `/members/`

## Blog Post Paywall Pattern

For course-exclusive blog posts. Add before `</body>`:

```html
<div id="paywall-overlay" style="display:none; position:fixed; inset:0; z-index:1000;
  background:rgba(11,74,100,0.85); backdrop-filter:blur(4px);
  align-items:center; justify-content:center; padding:2rem;">
  <div style="background:#fff; border-radius:20px; padding:3rem 2.5rem; max-width:440px;
    width:100%; text-align:center; box-shadow:0 20px 60px rgba(0,0,0,0.3); direction:rtl;">
    <div style="font-size:3rem; margin-bottom:1rem;">🔒</div>
    <h2 style="font-family:'Rubik'; font-size:1.5rem; font-weight:800; color:#0c3d52; margin-bottom:0.8rem;">תוכן בלעדי לתלמידי הקורס</h2>
    <p style="font-family:'Assistant'; font-size:1.05rem; color:#4a6472; line-height:1.7; margin-bottom:2rem;">...</p>
    <div id="paywall-buttons" style="display:flex; flex-direction:column; gap:0.8rem;"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="/assets/js/supabase-config.js"></script>
<script>
(async function() {
  if (typeof window.supabase === 'undefined') return;
  const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { user } } = await _sb.auth.getUser();
  let hasAccess = false;
  if (user) {
    const { data: profile } = await _sb.from('profiles').select('has_access').eq('id', user.id).single();
    hasAccess = profile?.has_access === true;
  }
  if (hasAccess) { document.getElementById('paywall-overlay')?.remove(); return; }

  // Blur content
  const al = document.querySelector('.article-layout');
  const ah = document.querySelector('.article-header');
  if (al) { al.style.filter = 'blur(6px)'; al.style.pointerEvents = 'none'; }
  if (ah) { ah.style.filter = 'blur(3px)'; }

  // Dynamic buttons — change SLUG per post
  const SLUG = '/blog/your-post-slug/';
  const primary   = 'font-family:Rubik; font-size:1rem; font-weight:800; padding:0.8rem 2rem; border-radius:10px; border:none; cursor:pointer; background:#2a9d8f; color:#fff; text-decoration:none; display:block; text-align:center;';
  const secondary = 'font-family:Rubik; font-size:1rem; font-weight:800; padding:0.8rem 2rem; border-radius:10px; border:2px solid #2a9d8f; cursor:pointer; background:transparent; color:#2a9d8f; text-decoration:none; display:block; text-align:center;';
  const btns = document.getElementById('paywall-buttons');
  if (!user) {
    btns.innerHTML = '<a href="/auth/login/?redirect=' + SLUG + '" style="' + primary + '">התחבר לחשבון</a>'
                   + '<a href="/auth/register/?redirect=' + SLUG + '" style="' + secondary + '">הרשמה</a>';
  } else {
    btns.innerHTML = '<a href="/profile/?access=denied" style="' + primary + '">בקש גישה לקורס</a>'
                   + '<a href="/blog/" style="' + secondary + '">חזרה לבלוג</a>';
  }
  document.getElementById('paywall-overlay').style.display = 'flex';
})();
</script>
```

**Important:** Login/register button URLs MUST include `?redirect=/blog/[slug]/` so users return after auth.
