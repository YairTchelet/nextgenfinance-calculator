# Design System — Color, Typography, Cards, Components

## CSS Variables (defined inline in every blog post and course page)

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
  --accent-mint:       #2a9d8f;   /* primary brand green — CTA buttons */
  --accent-light:      #b3e0dc;   /* light mint — navbar links, borders */
  --green:             #2a9d8f;
  --red:               #c44e44;
  --orange:            #e8914f;
}
```

Additional values: navbar bg `#0c3d52`, accent darker `#1c6b61` (gradient headings), page gradient `linear-gradient(155deg, #0b4a64 0%, #1680a0 48%, #0d6a82 100%) fixed`, muted text on dark `rgba(240,248,250,0.68)`.

## Typography

- **Rubik** — headings, UI, buttons, nav. Weights: 400 500 700 800 900
- **Assistant** — body text, descriptions, lists. Weights: 300 400 600 700 800
- NEVER use Inter, Arial, system-ui, or any other font
- Google Fonts link required on every page:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700;800;900&family=Assistant:wght@300;400;600;700&display=swap" rel="stylesheet">
  ```

## Card Patterns

Cards alternate `.card-light` / `.card-dark` throughout blog posts and course chapters.

```css
.card-light {
  background: var(--card-light); border-radius: 18px; padding: 3rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15); color: var(--text-main);
  margin-bottom: 2.5rem; overflow: hidden;
}
.card-dark {
  background: var(--card-dark); border-radius: 18px; padding: 3rem 2.5rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25); color: var(--text-white);
  border: 1px solid rgba(179,224,220,0.12); margin-bottom: 2.5rem; overflow: hidden;
}
```

## Section Headings

```css
.section-h2 { font-size:1.8rem; font-weight:800; margin-bottom:1.5rem; letter-spacing:-0.3px; line-height:1.3; }
/* light cards → gradient text */
.section-h2-gradient { background:linear-gradient(135deg,#1c6b61,#0c3d52); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
/* dark cards → mint text */
.section-h2-mint { color: var(--accent-light); }

.section-h3 { font-size:1.35rem; font-weight:700; color:var(--text-main); margin:2.5rem 0 1rem; border-bottom:2px solid rgba(42,157,143,0.15); padding-bottom:0.5rem; display:inline-block; }
.card-dark .section-h3 { color:var(--accent-light); border-bottom-color:rgba(179,224,220,0.2); }
```

## Body Text Classes

```css
.article-p  { font-size:1.15rem; font-family:'Assistant'; color:#3a4f5c; line-height:1.85; margin-bottom:1.5rem; }
.article-ul { margin-bottom:1.5rem; padding-right:1.5rem; font-family:'Assistant'; font-size:1.15rem; line-height:1.85; }
.article-ul li::marker { color:var(--accent-mint); font-weight:bold; }

/* Accented callout paragraph */
.hook-p {
  font-size:1.25rem; font-family:'Assistant'; font-weight:600; line-height:1.8;
  border-right:4px solid var(--accent-mint); padding-right:1.25rem;
  background:linear-gradient(to left,rgba(42,157,143,0.05),transparent);
  padding-block:0.75rem; margin-bottom:2rem;
}
```

Dark card variants: `.card-dark .article-p { color:rgba(240,248,250,0.85); }` / `.card-dark .hook-p { color:rgba(240,248,250,0.9); }`

## Note Boxes

```css
.note-box-light { background:rgba(42,157,143,0.06); border:1px solid rgba(42,157,143,0.2); border-right:5px solid var(--accent-mint); border-radius:12px; padding:1.5rem; font-size:1.1rem; font-family:'Assistant'; line-height:1.7; margin:2rem 0; }
.note-box-dark  { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-right:5px solid var(--accent-light); border-radius:12px; padding:1.5rem; font-size:1.1rem; font-family:'Assistant'; line-height:1.7; margin:2rem 0; }
```

## Screenshot Pattern

```html
<figure class="sc-fig">
  <img class="sc-img" src="images/filename.png" alt="description">
  <figcaption class="sc-caption">Caption text</figcaption>
</figure>
```
```css
.sc-fig { margin:2rem 0; }
.sc-img { width:100%; border-radius:12px; border:1px solid rgba(0,0,0,0.08); box-shadow:0 4px 20px rgba(0,0,0,0.1); display:block; }
.sc-caption { font-size:0.85rem; font-family:'Assistant'; color:var(--text-light); text-align:center; margin-top:0.6rem; font-weight:600; }
.card-dark .sc-img { border-color:rgba(179,224,220,0.15); }
.card-dark .sc-caption { color:rgba(240,248,250,0.5); }
```

## Button Patterns

**Primary CTA (mint):**
```css
background:#2a9d8f; color:#fff; border:none; border-radius:10px;
padding:0.8rem 2rem; font-family:'Rubik'; font-size:1rem; font-weight:800; cursor:pointer;
/* hover: */ background:#23887c; transform:translateY(-2px);
```

**Secondary/outline CTA:**
```css
background:transparent; border:2px solid #2a9d8f; color:#2a9d8f;
border-radius:10px; padding:0.8rem 2rem; font-family:'Rubik'; font-weight:800;
```

**Navbar pill (mint):** `background:#b3e0dc; color:#0c3d52; border-radius:20px; padding:0.42rem 1.1rem; font-weight:700;`

**Navbar pill (outline):** `background:transparent; border:1.5px solid rgba(240,248,250,0.35); color:rgba(240,248,250,0.8);`

## Inline Code

```css
.code-block { background:var(--card-dark); color:var(--accent-light); padding:0.15rem 0.55rem; border-radius:4px; font-family:monospace; font-size:1.05rem; font-weight:bold; letter-spacing:1px; }
```
