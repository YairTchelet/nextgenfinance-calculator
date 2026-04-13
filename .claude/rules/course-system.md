# Course System — Chapters, Widgets, Protection

## Chapter Protection — Script Load Order

Every course chapter `<head>` MUST load in this exact order, BEFORE fonts:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.js"></script>
<script src="/assets/js/supabase-config.js"></script>
<script src="/assets/js/course-guard.js"></script>
<script src="/assets/js/course-tracker.js"></script>
```

CSS: link `/investor-academy/assets/css/course.css` (NOT `/assets/css/course.css`).

## Widget Types (Embedded Inline)

All widgets: scoped CSS with unique prefix, JS in IIFE, defined in inline `<style>` + `<script>` blocks.

| Widget | Class Prefix | Description |
|--------|-------------|-------------|
| הידעת (Did You Know) | `.did-you-know-widget` | Expandable reveal card, click to expand |
| Explainer / Slideshow | `.explainer-widget` | Multi-slide carousel with nav arrows |
| Deep Taste (DeepTase) | `.dpt-` | Deep-dive company/stock analysis |
| TOC Widget | `.toc-widget` | Chapter table of contents with hover effects |
| Course Section Card | `.course-card` | Standard content wrapper per lesson |
| YouTube Embed | `.course-yt-main` | Responsive 16:9 iframe wrapper |
| Resource/Blog CTA | unique prefix (e.g. `.buy-guide-`) | Full-width card linking to blog/resource |

## Course Section Card Pattern

```html
<div class="course-card" id="s[N]-lesson[N]">
  <h2 class="course-section-title">פרק X שיעור Y: כותרת</h2>
  <div class="course-yt-main">
    <iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
      title="..." allowfullscreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
    </iframe>
  </div>
  <!-- widgets follow here -->
</div>
```

YouTube embeds ALWAYS use `youtube-nocookie.com` — never `youtube.com`.

## Side-by-Side Widget Layout

```html
<div class="course-sidebyside dyk-pair" style="margin-top:1.5rem;">
  <!-- two widgets rendered side by side on desktop, stacked on mobile -->
</div>
```

## הידעת Widget Pattern

```html
<div class="did-you-know-widget" id="dyk-[unique-id]">
  <div class="card-inner-wrapper">
    <div class="card-teaser">
      <h2 class="teaser-title">&#128161; ?הידעת</h2>
      <p class="teaser-subtitle">כותרת הנושא</p>
      <p class="teaser-prompt">לחץ למידע נוסף</p>
    </div>
    <div class="card-content">
      <!-- optional: <button class="dyk-close-btn" aria-label="סגור">&times;</button> -->
      <h3 class="content-title">כותרת מלאה</h3>
      <p class="content-text">...</p>
      <img class="content-image" src="..." alt="...">
    </div>
  </div>
</div>
```

JS to activate: see existing chapter files for the click/expand toggle pattern.

## Resource CTA Widget (Between Lessons)

Full-width card inserted between course sections to link to companion blog posts. Use a unique class prefix (e.g. `.buy-guide-`). Minimum ~250px tall on desktop. Must include:
- Decorative gradient accent bar at top
- Eyebrow label + title + description
- Feature pills row
- Mint CTA button linking to blog post (same tab)
- Lock notice: "🔒 תוכן בלעדי לתלמידים"

See `investor-academy/lessons/chapter-3.html` for a complete example (`.buy-guide-` widget between שיעור 2 and שיעור 3).

## Course Chapters Overview

| File | Chapter | Status |
|------|---------|--------|
| `lessons/intro.html` | Intro | course-guard protected |
| `lessons/chapter-1.html` | פרק 1 | course-guard protected |
| `lessons/chapter-2.html` | פרק 2 | course-guard protected |
| `lessons/chapter-3.html` | פרק 3 — שלב הכלים | course-guard protected |
| `lessons/chapter-4.html` | פרק 4 | course-guard protected |
