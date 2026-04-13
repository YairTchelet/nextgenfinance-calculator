# CLAUDE.md — NewGen Finance Project Reference

Read at the start of every session. Detailed references in `.claude/rules/`.

---

## 1. PROJECT OVERVIEW

- **Site:** newgenfinance.co.il — Hebrew (RTL) fintech education platform
- **Owner:** Yair Tchelet (יאיר תכלת)
- **Stack:** Vanilla HTML/CSS/JS — no frameworks, no build step, no React/Vue/Next
- **Hosting:** GitHub → Vercel (static site + serverless API routes in `/api/`)
- **Auth/DB:** Supabase (email+password, Google OAuth, `profiles` table)
- **Email:** Resend API via `/api/send-welcome.js`
- **Language:** Hebrew, `dir="rtl"`, `lang="he"` on every page
- **Analytics:** Vercel Analytics (`/_vercel/insights/script.js`) on public pages only

---

## 2. FILE TREE

```
/
├── index.html                  Homepage (public)
├── about/ contact/ terms/ pricing/   Public pages
├── members/index.html          Members dashboard (auth-guard)
├── profile/index.html          User profile (auth-guard)
├── admin/index.html            Admin panel
├── auth/login/index.html       Login — supports ?redirect=
├── auth/register/index.html    Register — supports ?redirect=
│
├── blog/
│   ├── index.html              Blog listing (public)
│   ├── warren-buffett/         Public post
│   ├── etf-guide/              Public post (Index.html — capital I)
│   └── how-to-buy-stocks/      Course-exclusive post (paywall)
│       └── images/
│
├── calculator/index.html       Financial calculator (auth-guard)
│   └── css/ js/                Calculator-specific styles and modules
│
├── investor-academy/
│   ├── index.html              Course landing (public)
│   ├── dashboard/index.html    Course dashboard (course-guard)
│   ├── lessons/                intro + chapter-1 through chapter-4 (course-guard)
│   │   └── widgets-reference.html
│   ├── game/                   Investment simulation game
│   └── assets/css/course.css  ← FULL course styles (animated bg, widgets, cards)
│
├── assets/
│   ├── css/course.css          ← MINIMAL shared styles (.course-nav-logo ONLY)
│   └── js/
│       ├── supabase-config.js  Supabase URL + anon key constants
│       ├── auth-guard.js       Redirect to login if no session
│       ├── course-guard.js     Redirect if no session or no has_access
│       ├── course-tracker.js   Lesson progress tracking
│       └── email-templates.js  HTML email template generator
│
├── portfolio-tracker/index.html  (auth-guard)
└── api/                        Vercel serverless functions (Node.js CommonJS)
    └── send-welcome, manage-access, request-access, admin-data, chat
```

**Critical:** `/assets/css/course.css` (root) = nav logo styles ONLY. Full course styles = `/investor-academy/assets/css/course.css`.

---

## 3. DESIGN SYSTEM

- **Fonts:** Rubik (headings, UI) + Assistant (body) — loaded from Google Fonts. NEVER use Inter/Arial/system fonts
- **Key colors:** mint `#2a9d8f` · dark `#0c3d52` · light `#f7f9fa` · accent `#b3e0dc` · text `#22333b`
- **Cards:** `.card-light` (white bg, radius 18px) and `.card-dark` (navy bg) — always alternate for visual rhythm
- **Headings:** `.section-h2` + `.section-h2-gradient` (light cards) or `.section-h2-mint` (dark cards)
- **Body text:** `.article-p`, `.article-ul`, `.hook-p` (accented callout with mint left border)
- **Note boxes:** `.note-box-light` / `.note-box-dark` (mint accent border)
- **Screenshots:** `.sc-fig` > `.sc-img` + `.sc-caption`
- **Buttons:** primary = `#2a9d8f` bg + white text; secondary = transparent + mint border

→ Full CSS code for all patterns: **`.claude/rules/design-system.md`**

---

## 4. NAVIGATION & LAYOUT

- **Navbar:** `.hp-nav` — 62px, sticky, `#0c3d52` bg. Logo | center links | auth pills | hamburger
- Auth buttons in `#nav-auth` rendered dynamically by inline Supabase session check

**Blog post layout:**
```
┌────────────────────────────────────┐
│ .article-header (dark, centered)   │
├──────────┬─────────────────────────┤
│ TOC      │ .article-body           │
│ 240px    │   .card-light / .dark   │
│ sticky   │   alternating sections  │
└──────────┴─────────────────────────┘
```
- Sidebar collapses at **900px** · tight mobile at **600px**
- TOC active tracking via `IntersectionObserver`
- Reading progress: `#reading-progress-bar` sticky below navbar

---

## 5. AUTH & ACCESS CONTROL

- Supabase auth: email+password + Google OAuth
- `profiles.has_access` (boolean) gates all course content
- `auth-guard.js` = login required; `course-guard.js` = login + `has_access === true`
- Login/register support `?redirect=/path/` — capture BEFORE any `await` (Supabase wipes URL during auth)
- Blog paywall = blur content + overlay popup (NOT hard redirect like course pages)
- Login button URLs from gated content MUST include `?redirect=[current-path]`

→ Full Supabase setup, guard logic, paywall code: **`.claude/rules/auth-and-access.md`**

---

## 6. BLOG SYSTEM

- Blog index: 2-col `.posts-grid`, newest post FIRST (top-left)
- Each post: standalone `/blog/[slug]/index.html` with ALL CSS inline (no external files)
- Layout: 240px TOC sidebar + alternating `.card-light`/`.card-dark` sections
- Images at `/blog/[slug]/images/[kebab-name].png`
- Gated posts: `noindex,nofollow` + `.course-only-banner` + paywall overlay

→ Full post template, card HTML, existing posts list: **`.claude/rules/blog-system.md`**

---

## 7. COURSE SYSTEM

- Chapter pages load: Supabase CDN → `supabase-config.js` → `course-guard.js` → `course-tracker.js` (in `<head>`, before fonts)
- Link `/investor-academy/assets/css/course.css` (NOT the root one)
- Widgets embedded inline with scoped CSS prefixes + JS IIFEs
- Widget types: הידעת (expandable), Explainer (slideshow), DeepTase, TOC, YouTube, Resource CTA
- YouTube: always `youtube-nocookie.com`

→ Widget patterns, code examples, chapter list: **`.claude/rules/course-system.md`**

---

## 8. API ROUTES

Five Vercel serverless functions in `/api/`: `send-welcome` (Resend email), `manage-access` (admin), `request-access` (user), `admin-data` (admin), `chat` (AI).  
Env vars: `RESEND_API_KEY`, Supabase service role key.

→ Full route table and details: **`.claude/rules/api-routes.md`**

---

## 9. RULES — ALWAYS / NEVER

### Always
- `<html lang="he" dir="rtl">` on every page — no exceptions
- Rubik + Assistant fonts via Google Fonts on every page
- Scope widget CSS with a unique class prefix (e.g. `.buy-guide-`, `.dyk-apple-`)
- Wrap widget JS in IIFEs: `(function(){})()` or `(async function(){})()`
- Load course-guard scripts in correct order, in `<head>` before fonts
- Use `youtube-nocookie.com` for all YouTube embeds
- Alternate `.card-light` / `.card-dark` in blog posts and course chapters
- Put new blog post cards FIRST in the `/blog/index.html` grid
- Blog post images in `/blog/[slug]/images/` with kebab-case names
- Include `?redirect=[path]` on all login/register links from gated content
- Capture redirect destination before `await` in Supabase auth handlers
- Commit + push after every change (`main` branch, GitHub remote)

### Never
- `localStorage` — use `sessionStorage` only for temporary state
- CSS frameworks (Tailwind, Bootstrap, etc.)
- JS frameworks or bundlers
- External CSS/JS files for one-off page features — keep inline
- `youtube.com` embeds — always `youtube-nocookie.com`
- Duplicate styles from the page's existing `<style>` block
- Add docstrings, comments, or type annotations to code you didn't change
- Add error handling for scenarios that can't happen
- Hardcode redirect URLs in auth handlers without checking sessionStorage/URL params first
- `noindex` on public blog posts; `nofollow` is fine for external links only
