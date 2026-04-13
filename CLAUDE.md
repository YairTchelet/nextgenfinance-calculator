# CLAUDE.md — NewGen Finance Project Reference

This file is read by Claude Code at the start of every session. Keep it accurate and up to date.

---

## 1. PROJECT OVERVIEW

- **Site:** newgenfinance.co.il — Hebrew (RTL) fintech education platform
- **Owner:** Yair Tchelet (יאיר תכלת)
- **Stack:** Vanilla HTML/CSS/JS — no frameworks, no build step, no React/Vue/Next
- **Hosting:** GitHub → Vercel (static site + serverless API routes in `/api/`)
- **Auth/DB:** Supabase (email+password, Google OAuth, `profiles` table)
- **Email:** Resend API via `/api/send-welcome.js`
- **Language:** Hebrew, `dir="rtl"`, `lang="he"` on every page
- **Analytics:** Vercel Analytics (`/_vercel/insights/script.js`) loaded on public pages

---

## 2. FULL FILE TREE

```
/                           ← project root
├── index.html              ← Homepage (public)
├── about/index.html        ← About page (public)
├── contact/index.html      ← Contact page (public)
├── terms/index.html        ← Terms of use (public)
├── pricing/index.html      ← Pricing/plans page (public)
├── members/index.html      ← Members dashboard (auth-guard protected)
├── profile/index.html      ← User profile page (auth-guard protected)
├── admin/index.html        ← Admin panel (restricted)
│
├── auth/
│   ├── login/index.html    ← Login page (supports ?redirect= param)
│   └── register/index.html ← Registration page (supports ?redirect= param)
│
├── blog/
│   ├── index.html          ← Blog listing page (public)
│   ├── warren-buffett/index.html   ← Blog post (public)
│   ├── etf-guide/Index.html        ← Blog post (public) [note capital I]
│   └── how-to-buy-stocks/index.html ← Blog post (course-exclusive, paywall)
│       └── images/         ← Screenshots for this post
│
├── calculator/
│   ├── index.html          ← Financial calculator (auth-guard protected)
│   ├── css/calculator.css
│   ├── css/calculator-wizard.css
│   └── js/
│       ├── calculator-ai.js
│       ├── calculator-bridge.js
│       ├── calculator-db.js
│       ├── calculator-pdf.js
│       └── calculator-wizard.js
│
├── investor-academy/
│   ├── index.html          ← Course landing page (public)
│   ├── dashboard/index.html ← Course dashboard (course-guard protected)
│   ├── lessons/
│   │   ├── index.html      ← Lessons index
│   │   ├── intro.html      ← Intro lesson (course-guard protected)
│   │   ├── chapter-1.html  ← Chapter 1 (course-guard protected)
│   │   ├── chapter-2.html  ← Chapter 2 (course-guard protected)
│   │   ├── chapter-3.html  ← Chapter 3 (course-guard protected)
│   │   ├── chapter-4.html  ← Chapter 4 (course-guard protected)
│   │   ├── quiz-widget.html
│   │   └── widgets-reference.html ← Widget pattern reference
│   ├── game/
│   │   ├── index.html      ← Investment simulation game
│   │   ├── css/game.css
│   │   └── js/             ← Multiple game JS modules
│   └── assets/
│       ├── css/course.css  ← Full course chapter styles (animated bg, widgets, cards)
│       └── js/course-bg.js
│
├── assets/
│   ├── css/course.css      ← SHARED minimal styles (only .course-nav-logo)
│   └── js/
│       ├── supabase-config.js  ← Supabase URL + anon key constants
│       ├── auth-guard.js       ← Redirects unauthenticated users to /auth/login/
│       ├── course-guard.js     ← Redirects users without has_access
│       ├── course-tracker.js   ← Tracks lesson progress
│       └── email-templates.js  ← HTML email template generator
│
├── portfolio-tracker/index.html ← Portfolio tracker (auth-guard protected)
│
└── api/                    ← Vercel serverless functions (Node.js, CommonJS)
    ├── send-welcome.js     ← POST /api/send-welcome — sends welcome email via Resend
    ├── manage-access.js    ← Admin: grant/revoke course access
    ├── request-access.js   ← User: request course access
    ├── admin-data.js       ← Admin data endpoint
    └── chat.js             ← AI chat endpoint
```

**Important:** `/assets/css/course.css` (root) contains ONLY `.course-nav-logo` shared navbar styles. It is NOT the full course stylesheet. The full course chapter styles live at `/investor-academy/assets/css/course.css`.

---

## 3. DESIGN SYSTEM

### CSS Variables (defined inline in blog posts and course pages)

```css
:root {
  --bg-gradient-start: #0b4a64;
  --bg-gradient-mid:   #1680a0;
  --bg-gradient-end:   #0d6a82;
  --card-light:        #f7f9fa;   /* light card background */
  --card-dark:         #0c3d52;   /* dark card / navbar background */
  --text-main:         #22333b;   /* primary body text on light cards */
  --text-light:        #4a6472;   /* secondary/muted text */
  --text-white:        #f0f8fa;   /* text on dark backgrounds */
  --accent-mint:       #2a9d8f;   /* primary brand green — CTA buttons, highlights */
  --accent-light:      #b3e0dc;   /* light mint — navbar links, borders */
  --green:             #2a9d8f;   /* same as accent-mint */
  --red:               #c44e44;
  --orange:            #e8914f;
}
```

Additional color values used across the site:
- Navbar bg: `#0c3d52` (= `--card-dark`)
- Page gradient bg: `linear-gradient(155deg, #0b4a64 0%, #1680a0 48%, #0d6a82 100%) fixed`
- Homepage bg: `linear-gradient(170deg, #071e2b 0%, #0c3d52 50%, #0a3347 100%) fixed`
- Course chapter bg: `#0b4a64` (animated blobs overlay)
- Accent darker: `#1c6b61` (used in gradient text, section headers)
- Muted text on dark: `rgba(240,248,250,0.68)` or `rgba(240,248,250,0.85)`

### Typography

- **Rubik** — headings, UI labels, buttons, nav, titles. Weights: 400, 500, 700, 800, 900
- **Assistant** — body text, descriptions, paragraphs, list items. Weights: 300, 400, 600, 700, 800
- Both loaded from Google Fonts on every page:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800;900&family=Assistant:wght@300;400;600;700&display=swap" rel="stylesheet">
  ```
- **NEVER use** Inter, Arial, system-ui, or any other font.

### Card Patterns (blog posts & course chapters)

```css
/* Light card — white background, used for most content sections */
.card-light {
  background: var(--card-light);   /* #f7f9fa */
  border-radius: 18px;
  padding: 3rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  color: var(--text-main);
  margin-bottom: 2.5rem;
  overflow: hidden;
}

/* Dark card — navy background, used for alternating sections */
.card-dark {
  background: var(--card-dark);   /* #0c3d52 */
  border-radius: 18px;
  padding: 3rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  color: var(--text-white);
  border: 1px solid rgba(179,224,220,0.12);
  margin-bottom: 2.5rem;
  overflow: hidden;
}
```

Cards alternate `.card-light` / `.card-dark` for visual rhythm throughout blog posts and course chapters.

### Section Headings

```css
.section-h2 {
  font-size: 1.8rem; font-weight: 800;
  margin-bottom: 1.5rem; letter-spacing: -0.3px; line-height: 1.3;
}
/* On light cards — gradient text */
.section-h2-gradient {
  background: linear-gradient(135deg,#1c6b61,#0c3d52);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
/* On dark cards — mint text */
.section-h2-mint { color: var(--accent-light); }   /* #b3e0dc */

.section-h3 {
  font-size: 1.35rem; font-weight: 700; color: var(--text-main);
  margin: 2.5rem 0 1rem;
  border-bottom: 2px solid rgba(42,157,143,0.15); padding-bottom: 0.5rem;
  display: inline-block;
}
/* On dark cards */
.card-dark .section-h3 { color: var(--accent-light); border-bottom-color: rgba(179,224,220,0.2); }
```

### Body Text Classes

```css
.article-p  { font-size:1.15rem; font-family:'Assistant'; color:#3a4f5c; line-height:1.85; margin-bottom:1.5rem; }
.article-ul { margin-bottom:1.5rem; padding-right:1.5rem; font-family:'Assistant'; font-size:1.15rem; line-height:1.85; }
.article-ul li::marker { color: var(--accent-mint); font-weight: bold; }

/* Accented hook paragraph — used for key callouts */
.hook-p {
  font-size:1.25rem; font-family:'Assistant'; font-weight:600; line-height:1.8;
  border-right: 4px solid var(--accent-mint); padding-right:1.25rem;
  background: linear-gradient(to left, rgba(42,157,143,0.05), transparent);
  padding-block: 0.75rem; margin-bottom:2rem;
}
```

### Note Boxes

```css
.note-box-light { background:rgba(42,157,143,0.06); border:1px solid rgba(42,157,143,0.2); border-right:5px solid var(--accent-mint); border-radius:12px; padding:1.5rem; font-size:1.1rem; font-family:'Assistant'; line-height:1.7; margin:2rem 0; }
.note-box-dark  { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-right:5px solid var(--accent-light); border-radius:12px; padding:1.5rem; font-size:1.1rem; font-family:'Assistant'; line-height:1.7; margin:2rem 0; }
```

### Screenshot Pattern

```html
<figure class="sc-fig">
  <img class="sc-img" src="images/filename.png" alt="description">
  <figcaption class="sc-caption">Caption text here</figcaption>
</figure>
```
```css
.sc-fig  { margin: 2rem 0; }
.sc-img  { width:100%; border-radius:12px; border:1px solid rgba(0,0,0,0.08); box-shadow:0 4px 20px rgba(0,0,0,0.1); display:block; }
.sc-caption { font-size:0.85rem; font-family:'Assistant'; color:var(--text-light); text-align:center; margin-top:0.6rem; font-weight:600; }
/* Dark card variant */
.card-dark .sc-img    { border-color:rgba(179,224,220,0.15); box-shadow:0 4px 20px rgba(0,0,0,0.3); }
.card-dark .sc-caption { color: rgba(240,248,250,0.5); }
```

### Button Patterns

**Primary CTA (mint):**
```css
background: #2a9d8f; color: #fff; border: none; border-radius: 10px;
padding: 0.8rem 2rem; font-family: 'Rubik'; font-size: 1rem; font-weight: 800;
cursor: pointer; transition: background 0.2s;
/* hover: */ background: #23887c; transform: translateY(-2px);
```

**Navbar pill (mint):** `background:#b3e0dc; color:#0c3d52; border-radius:20px; padding:0.42rem 1.1rem; font-weight:700;`

**Navbar pill (outline):** `background:transparent; border:1.5px solid rgba(240,248,250,0.35); color:rgba(240,248,250,0.8);`

**Secondary/outline CTA:**
```css
background: transparent; border: 2px solid #2a9d8f; color: #2a9d8f;
border-radius: 10px; padding: 0.8rem 2rem; font-family: 'Rubik'; font-weight: 800;
```

### Code Inline

```css
.code-block { background:var(--card-dark); color:var(--accent-light); padding:0.15rem 0.55rem; border-radius:4px; font-family:monospace; font-size:1.05rem; font-weight:bold; letter-spacing:1px; }
```

---

## 4. NAVIGATION & LAYOUT

### Navbar (`.hp-nav`)

- Height: `62px`, sticky top, `z-index:100`, `background:#0c3d52`
- Structure: logo (left) | center links | auth buttons (right) | hamburger (mobile)
- Auth buttons rendered dynamically via Supabase session check (`id="nav-auth"`)
- Mobile: hamburger toggles `.hp-mobile-menu` drawer, links hidden at `768px`

### Blog Post Layout

```
┌─────────────────────────────────────────┐
│ .article-header  (dark bg, centered)    │
│   category badge | reading time | h1   │
│   subtitle | course banner (if gated)  │
├──────────┬──────────────────────────────┤
│ TOC      │ .article-body                │
│ sidebar  │   alternating .card-light /  │
│ 240px    │   .card-dark sections        │
│ sticky   │                              │
└──────────┴──────────────────────────────┘
```

- Grid: `grid-template-columns: 240px minmax(0,1fr)`, gap `2.5rem`
- TOC sidebar: `position:sticky; top:90px` — active link tracked via `IntersectionObserver`
- Reading progress bar: `#reading-progress` / `#reading-progress-bar` — sticky below navbar
- Sidebar collapses to full-width at **900px** (single column)

### Course Chapter Layout

- Protected by `course-guard.js` (loaded in `<head>` before fonts)
- Uses `/investor-academy/assets/css/course.css` (animated blob background)
- Course nav panel with chapter list on left, content on right
- Widgets embedded inline (see Section 7)
- Bottom prev/next chapter navigation

---

## 5. AUTH & ACCESS CONTROL

### Supabase Setup

```js
// /assets/js/supabase-config.js
const SUPABASE_URL = 'https://pmlkhkagtorhlteplvak.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tV2FY5_h6ba6-nhdVbENLQ_gkejPX38';
```

Client is always created as: `window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)`

### Supabase `profiles` Table

| Column      | Type      | Notes                                      |
|-------------|-----------|---------------------------------------------|
| id          | uuid      | FK → auth.users.id                         |
| full_name   | text      |                                             |
| has_access  | boolean   | `true` = course access granted             |
| phone       | text      |                                             |
| city        | text      |                                             |
| bio         | text      |                                             |
| created_at  | timestamp |                                             |

### auth-guard.js

Protects pages that require login (but NOT course access):
- If no session → store `pathname+search` in `sessionStorage('redirectAfterLogin')` → redirect to `/auth/login/`
- Exposes `window.__supabase` for use by other scripts on the page

### course-guard.js

Protects course chapter pages (requires login AND `has_access === true`):
- No session → store redirect → `/auth/login/`
- Session but `has_access !== true` → `/profile/?access=denied`

### Login/Register Redirect Flow

Both pages support `?redirect=/path/` URL param:
- Login page (`/auth/login/`): reads `?redirect=`, stores in `sessionStorage('redirectAfterLogin')`, captures BEFORE the `await signInWithPassword()` call (timing fix — Supabase may wipe URL during auth)
- Session detection on load: if session already exists (returning from Google OAuth), immediately redirect to stored destination
- Google OAuth: passes redirect destination encoded in `redirectTo` URL so it survives the OAuth round-trip
- Security: only redirects to paths starting with `/` (same-origin only)
- Default fallback: `/members/`

### Blog Post Paywall Pattern

For course-exclusive blog posts (e.g. `/blog/how-to-buy-stocks/`):

```html
<!-- Add this HTML before </body> -->
<div id="paywall-overlay" style="display:none; position:fixed; inset:0; z-index:1000; ...">
  ...
  <div id="paywall-buttons"></div>
</div>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="/assets/js/supabase-config.js"></script>
<script>
(async function() {
  const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data: { user } } = await _sb.auth.getUser();
  let hasAccess = false;
  if (user) {
    const { data: profile } = await _sb.from('profiles').select('has_access').eq('id', user.id).single();
    hasAccess = profile?.has_access === true;
  }
  if (hasAccess) { document.getElementById('paywall-overlay')?.remove(); return; }
  // Blur content
  document.querySelector('.article-layout').style.filter = 'blur(6px)';
  document.querySelector('.article-layout').style.pointerEvents = 'none';
  document.querySelector('.article-header').style.filter = 'blur(3px)';
  // Dynamic buttons
  const btns = document.getElementById('paywall-buttons');
  const SLUG = '/blog/your-post-slug/';   // ← change per post
  if (!user) {
    btns.innerHTML = '<a href="/auth/login/?redirect=' + SLUG + '" ...>התחבר לחשבון</a>'
                   + '<a href="/auth/register/?redirect=' + SLUG + '" ...>הרשמה</a>';
  } else {
    btns.innerHTML = '<a href="/profile/?access=denied" ...>בקש גישה לקורס</a>'
                   + '<a href="/blog/" ...>חזרה לבלוג</a>';
  }
  document.getElementById('paywall-overlay').style.display = 'flex';
})();
</script>
```

Login/register button URLs MUST include `?redirect=/blog/[slug]/` so users return to the post after auth.

---

## 6. BLOG SYSTEM

### Blog Index (`/blog/index.html`)

- `.posts-grid` — 2-column grid, collapses to 1 col at 700px
- Each post: `.post-card` with `.post-card-header` (category badge + date), `.post-title`, `.post-desc`, `.post-meta`, `.post-btn`
- "Coming soon" section: `.coming-grid` (3 cols) with `.coming-card`
- New posts go FIRST in the grid (newest at top-left)

### Blog Post Structure (`/blog/[slug]/index.html`)

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <!-- meta, robots, OG, canonical -->
  <!-- Fonts: Rubik + Assistant -->
  <!-- /assets/css/course.css (shared nav logo only) -->
  <!-- Inline <style> with :root variables and all page CSS -->
</head>
<body>
  <!-- .hp-nav (navbar) -->
  <!-- .course-only-banner (if course-exclusive) -->
  <!-- #reading-progress bar -->
  <!-- .article-header (h1, category, reading time, subtitle) -->
  <!-- .article-layout (240px TOC sidebar + .article-body) -->
    <!-- alternating .card-light and .card-dark sections -->
    <!-- each section has id for TOC linking -->
  <!-- footer -->
  <!-- Supabase CDN + config + paywall script (if gated) -->
  <!-- TOC IntersectionObserver script -->
  <!-- Reading progress script -->
</body>
```

- `meta name="robots"`: `noindex, nofollow` for course-exclusive posts; `index, follow` for public posts
- Images stored at `/blog/[slug]/images/[descriptive-name].png`
- All CSS defined inline in `<style>` — NOT in external files
- Navigation bar auth buttons rendered dynamically by inline script

### Existing Blog Posts

| Slug | Title | Access |
|------|-------|--------|
| `/blog/warren-buffett/` | וורן באפט | Public |
| `/blog/etf-guide/` | מדריך ETF | Public |
| `/blog/how-to-buy-stocks/` | איך קונים ומוכרים מניה | Course-exclusive (paywall) |

---

## 7. COURSE SYSTEM

### Chapter Protection

Every course chapter `<head>` must load scripts in this exact order:
```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="/assets/js/supabase-config.js"></script>
<script src="/assets/js/course-guard.js"></script>
<script src="/assets/js/course-tracker.js"></script>
```

Links to: `/investor-academy/assets/css/course.css` (NOT the root one).

### Widget Types (embedded inline in chapters)

All widgets use scoped CSS with unique class/ID prefixes. JS wrapped in IIFEs. Defined in `<style>` + `<script>` blocks inline.

| Widget | Prefix | Description |
|--------|--------|-------------|
| הידעת (Did You Know) | `.did-you-know-widget` | Expandable reveal card, click to open |
| Explainer / Slideshow | `.explainer-widget` | Multi-slide carousel with nav arrows |
| Deep Taste (DeepTase) | `.dpt-` | Deep-dive company analysis widget |
| TOC Widget | `.toc-widget` | Chapter table of contents with hover effects |
| Course Section Card | `.course-card` | Standard content section wrapper |
| YouTube Embed | `.course-yt-main` | Responsive video embed |
| Resource/Blog CTA | `.buy-guide-` (or similar) | Full-width resource card linking out |

YouTube embeds ALWAYS use `youtube-nocookie.com`:
```html
<iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" allowfullscreen ...></iframe>
```

### Course Section Card Pattern

```html
<div class="course-card" id="s[N]-lesson[N]">
  <h2 class="course-section-title">פרק X שיעור Y: כותרת</h2>
  <div class="course-yt-main">
    <iframe src="https://www.youtube-nocookie.com/embed/..." ...></iframe>
  </div>
  <!-- widgets follow -->
</div>
```

### Side-by-Side Widget Layout

```html
<div class="course-sidebyside dyk-pair" style="margin-top:1.5rem;">
  <!-- two .did-you-know-widget divs side by side -->
</div>
```

---

## 8. API ROUTES (`/api/`)

All are Vercel serverless functions (Node.js, CommonJS `module.exports`):

| Route | Method | Auth | Purpose |
|-------|--------|------|---------|
| `/api/send-welcome` | POST | None | Sends welcome email via Resend after registration |
| `/api/manage-access` | POST | Admin | Grant/revoke `has_access` on profiles table |
| `/api/request-access` | POST | User | User submits access request |
| `/api/admin-data` | GET | Admin | Fetch admin dashboard data |
| `/api/chat` | POST | ? | AI chat (Claude API) |

Env vars required: `RESEND_API_KEY`, Supabase service role key (for admin routes).

---

## 9. KEY PATTERNS & CONVENTIONS

### CSS

- **NEVER duplicate** styles that exist in the page's own `<style>` block
- Blog post pages define their entire design system in an inline `<style>` tag — do NOT create external CSS files for them
- Always use unique class prefixes for embedded widgets (e.g., `.buy-guide-`, `.dyk-apple-`, `.sim-`) to avoid conflicts
- Widget CSS goes in a `<style>` block immediately before the widget HTML

### JavaScript

- Wrap all widget/page scripts in IIFEs: `(function() { ... })();` or `(async function() { ... })()`
- **NEVER use `localStorage`** — use `sessionStorage` for temporary state only
- Supabase client: always `window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)` — never import from npm
- Capture session/redirect values **before** any `await` that calls Supabase auth methods (Supabase may wipe URL during processing)

### HTML Structure

- Every page: `<html lang="he" dir="rtl">` — no exceptions
- Fonts loaded in `<head>` via Google Fonts link
- `/assets/css/course.css` linked on most pages (provides only `.course-nav-logo`)
- Course chapters additionally link `/investor-academy/assets/css/course.css`
- `meta name="robots" content="noindex, nofollow"` on auth pages, course pages, and gated content
- Vercel Analytics script only on public-facing pages

### Images

- Blog post images: `/blog/[slug]/images/[descriptive-kebab-name].png`
- Descriptive filenames, no spaces — e.g., `spark-full-dashboard.png`

### Git Workflow

- Always `git add` + `git commit` + `git push` after any change
- Commit messages in English, descriptive
- Remote: `https://github.com/YairTchelet/nextgenfinance-calculator.git` on branch `main`

### Content / Gating

- Course chapter pages: use `course-guard.js` (hard redirect)
- Course-exclusive blog posts: use paywall overlay (blur + popup, NOT redirect)
- When linking to login from gated content: always append `?redirect=[current-path]`
- Card sections in blog posts alternate `.card-light` / `.card-dark` for visual rhythm
- New blog post cards go FIRST in `/blog/index.html` grid

### Responsive

- Sidebar collapses at **900px** (blog TOC, course nav)
- Tight mobile layout at **600px** (reduced padding, stacked grids)
- Always test at both breakpoints when adding new sections
- Course widgets: `@media (max-width: 600px)` breakpoints required

---

## 10. THINGS TO AVOID

- Do NOT add `localStorage` anywhere
- Do NOT use any CSS framework (no Tailwind, Bootstrap, etc.)
- Do NOT use any JS framework or bundler
- Do NOT add docstrings, comments, or type annotations to code you didn't touch
- Do NOT add error handling for scenarios that can't happen
- Do NOT create separate CSS/JS files for one-off page features — keep them inline
- Do NOT use `youtube.com` for embeds — always `youtube-nocookie.com`
- Do NOT hardcode redirect destinations in auth handlers without checking sessionStorage/URL params first
