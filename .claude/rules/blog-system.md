# Blog System — Index Page, Post Structure, Paywall Posts

## Blog Index (`/blog/index.html`)

- `.posts-grid` — 2-column grid, collapses to 1 col at 700px
- Each card: `.post-card` > `.post-card-header` (category badge + date), `.post-title`, `.post-desc`, `.post-meta` (reading time + tags), `.post-btn`
- "Coming soon" section: `.coming-grid` (3 cols) with `.coming-card`
- **New posts go FIRST** in the grid (newest at top-left)

## Existing Blog Posts

| Slug | Title | Access |
|------|-------|--------|
| `/blog/warren-buffett/` | וורן באפט: מילד שמכר מסטיקים | Public |
| `/blog/etf-guide/` | מדריך ETF המלא | Public (`Index.html` — note capital I) |
| `/blog/how-to-buy-stocks/` | איך קונים ומוכרים מניה בפועל | Course-exclusive (paywall) |

## Blog Post HTML Structure (`/blog/[slug]/index.html`)

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <!-- viewport, title, meta description -->
  <!-- robots: "noindex, nofollow" for gated posts, "index, follow" for public -->
  <!-- OG tags, canonical -->
  <!-- Google Fonts: Rubik + Assistant -->
  <link rel="stylesheet" href="/assets/css/course.css"> <!-- shared nav logo only -->
  <style>
    :root { /* all CSS variables */ }
    /* ALL page CSS inline here — no external files */
  </style>
</head>
<body>
  <!-- .hp-nav navbar (auth buttons injected by JS) -->
  <!-- .course-only-banner (gated posts only) -->
  <!-- #reading-progress + #reading-progress-bar (sticky below nav) -->
  <!-- .article-header: category badge, reading time, h1, subtitle -->
  <div class="article-layout"> <!-- grid: 240px TOC + 1fr body -->
    <aside class="toc-sidebar">
      <div class="toc-card"> <!-- TOC with IntersectionObserver active tracking --> </div>
    </aside>
    <main class="article-body">
      <!-- alternating .card-light / .card-dark sections, each with id for TOC -->
    </main>
  </div>
  <!-- footer -->
  <!-- Paywall scripts (gated posts only) — see auth-and-access.md -->
  <!-- Inline JS: TOC IntersectionObserver, reading progress bar, nav auth -->
</body>
```

## Blog Post CSS Pattern

All CSS is inline in `<style>` — never create external CSS files for blog posts. Define the full `:root` variable block at the top of the style tag. Reference the classes from `design-system.md` — they're defined inline in each post, not imported from anywhere.

## Images

- Stored at `/blog/[slug]/images/[descriptive-kebab-name].png`
- No spaces in filenames, e.g. `spark-full-dashboard.png`
- Use the `.sc-fig` / `.sc-img` / `.sc-caption` pattern (see design-system.md)

## Course-Only Banner (gated posts)

```html
<div class="course-only-banner">🔒 תוכן בלעדי לתלמידי הקורס <span>| מופיע כחלק מפרק N</span></div>
```
Place immediately after `.hp-nav`, before `#reading-progress`.
