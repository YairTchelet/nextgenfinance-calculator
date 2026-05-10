# Homepage Audit — newgenfinance.co.il

**Scope:** `index.html` (single file, all CSS/JS inline) + the shared nav-logo styles in `assets/css/course.css`.
**Lens:** Hebrew value-investing brand. Trust + restraint > distinctiveness. Buffett, not SaaS launch.
**Reference ceiling:** `blog/warren-buffett/index.html`, `blog/etf-guide/Index.html`.

---

## 1. What's working

1. **Reduced-motion respect.** [`index.html:285–292`](index.html:285) and [`index.html:432–437`](index.html:432) gate the heavy hero animations and entrance fades. Good hygiene that most "considered" sites still skip.
2. **Auth-aware hero CTA.** [`index.html:1137–1138`](index.html:1137) rewrites the primary button to "אזור החברים" for returning users — quiet, correct touch.
3. **Logged-out vs logged-in nav pills.** [`index.html:1129–1132`](index.html:1129) — the mint pill for register, ghost outline for login is the right hierarchy and it's executed cleanly.
4. **Footer logo bidi handling.** [`index.html:744–745`](index.html:744) — `direction:ltr; unicode-bidi:embed` on "NewGen Finance" inside an RTL doc is the right move; one of the few places the page treats Latin/Hebrew mixing on purpose.
5. **Section-level background rhythm at the structural level.** [`index.html:464`](index.html:464) (`#products` subtle white wash), [`index.html:570`](index.html:570) (`#why` solid navy), [`index.html:621–631`](index.html:621) (radial behind quote) — the *bones* of the depth system are right; it's the volume knob that's off.

---

## 2. High-impact issues — ranked by impact × brand fit

### A. The hero SVG is doing too much, and some of it is content masquerading as decoration *(highest impact)*
[`index.html:867–968`](index.html:867)

- The hero contains a draw-on chart line, a fading area fill, five staggered popping dots, an infinite pulse ring, two infinitely floating "stat badges," three abstract candlesticks, four floating particles, and a bouncing scroll arrow. That's **9 concurrent animation systems** in the first viewport. Restraint disappears.
- The two "stat badges" render the strings **"תשואה שנתית +24.7%"** ([`index.html:951–952`](index.html:951)) and **"תלמידים פעילים 500+"** ([`index.html:958–959`](index.html:958)) as SVG text. These are **claims**, not texture. A retail-investor site asserting "+24.7% annual return" in the hero — even decoratively — is the exact gesture this brand should never make. Drop these immediately; treat as the most urgent item in this audit, design issues aside.
- The infinite pulse ring (every 2.5s) and bouncing scroll arrow (every 2.2s) are attention-grabbers that never go away. Buffett-brand motion should resolve.

### B. Homepage and blog use *different* base palettes, breaking the "ceiling"
- Homepage body gradient: `linear-gradient(170deg, #071e2b → #0c3d52 → #0a3347)` ([`index.html:34`](index.html:34)) — **very dark, almost black-teal**.
- Buffett post body gradient: `linear-gradient(155deg, #0b4a64 → #1680a0 → #0d6a82)` ([`blog/warren-buffett/index.html:105`](blog/warren-buffett/index.html:105)) — **lighter, atmospheric, the documented system value in `design-system.md`**.
- Visitors who go homepage → blog see two different products. The blog is the polished one; the homepage feels heavier and moodier. Pick one and make it the homepage. The blog gradient is the right answer.

### C. Product cards are off-system (cream, not the documented light card)
[`index.html:474`](index.html:474) — `background: rgba(240, 236, 233, 0.97)` is a beige/cream that doesn't appear anywhere else in the design system. `design-system.md` defines `--card-light: #f7f9fa` (cool near-white). Result: the homepage products grid reads as "from a different deck" relative to every blog post and course chapter. Low-effort fix; high consistency win.

### D. The CTA banner section is the loudest gesture on the page, and it's the most "SaaS landing" moment
[`index.html:670–676`](index.html:670) — full-width mint gradient `#b3e0dc → #7dd8d2 → #a8d8d3`, dark navy button on top, "מוכן להתחיל?" copy. After 4 dark/atmospheric sections this flip to bright mint reads as a marketing closer. This brand should *not* close like a SaaS landing. The hero already has the same register CTA; this banner is duplicative *and* off-tone. Either remove it or make it a quiet card-style block on the existing dark background.

### E. The quote section's letter-spacing transition is theatrical
[`index.html:658–660`](index.html:658) — `transition: letter-spacing 1.4s ease` plus the visible-state spacing tweak. Animating letter-spacing on a Hebrew Buffett quote is the kind of "did you notice this?" gesture that contradicts the brand. The fade-up alone is enough; the letter-spacing reveal is over-design.

### F. The Hebrew title uses tight negative tracking
[`index.html:314`](index.html:314) — `letter-spacing: -1.5px` on the hero h1. This is a Latin display-type instinct. Hebrew letterforms (אות, ל, ק, מ) don't have the negative-space tolerance Latin caps do; tight tracking makes Hebrew look *cramped*, not refined. Same milder issue on `.hp-section-title` ([`index.html:457`](index.html:457), `-0.5px`).

### G. Missing weight in the loaded font set
[`index.html:20`](index.html:20) loads `Assistant:wght@300;400;600;700` — note **no 800**. The Buffett post and ETF guide both load `300;400;600;700;800` ([`blog/warren-buffett/index.html:83`](blog/warren-buffett/index.html:83), [`blog/etf-guide/Index.html:118`](blog/etf-guide/Index.html:118)). The homepage doesn't currently *use* Assistant 800, but anything you bold-emphasize in body copy will silently fall back to 700. Easy parity fix.

### H. Trust signals are absent
There's no Yair, no instructor face, no testimonial, no example student outcome, no "ranked X by Y" — nothing a wary first-time Israeli retail visitor can grab onto. The only "social proof" is the SVG-rendered "500+" badge in the hero, which is a) decorative-floating-text, b) unverifiable, and c) the wrong way to communicate trust on a money topic. This isn't a *design* miss strictly — but it's the single biggest impediment to the page doing its job for this brand.

### I. `text-transform: uppercase` on Hebrew section labels
[`index.html:299`](index.html:299) (hero badge), [`index.html:449`](index.html:449) (`.hp-section-label`). Hebrew has no case, so it's a no-op visually — but it signals "ported from an English template." Combined with `letter-spacing: 0.9px` it actively spreads Hebrew letters that already have wide bearings. Read closely it looks like English-template residue.

---

## 3. RTL / Hebrew-specific findings

- **Quote glyph is ASCII straight quote.** [`index.html:1078`](index.html:1078) renders `"` (U+0022). For a 5rem decorative quote mark in an RTL Hebrew quote, this is the wrong character. Should be a Hebrew quote (״ U+05F4) or a curly left-double-quotation (" U+201C / " U+201D) — typographic, not typewriter. Currently the hero quote mark is the most overtly "ASCII English template" mark on the page.
- **Negative letter-spacing on Hebrew display type.** Items F above; documented here for the Hebrew/RTL category specifically. Default 0 or +0.005em is usually safer for Hebrew display.
- **Uppercase + 0.9px tracking on Hebrew labels.** Documented in I above, repeated here for the same reason.
- **Hero title `<br>`.** [`index.html:971`](index.html:971) — the hard break "ערך —<br>פשוטות, מהנות ומשתלמות" works at desktop but the em-dash position depends on viewport. Better: let the title wrap naturally and rely on `max-width` for line shape. Today's break can land awkwardly between 600–800px.
- **Hebrew em-dash spacing.** "השקעות ערך —" uses `&#32;—&#32;` — that's correct in Hebrew (space–em-dash–space). No issue, just confirming.
- **`.footer-logo` LTR override is correct, but the `<span>` styling assumes the word "Finance" is the second word.** [`index.html:1096`](index.html:1096). Brittle but currently right.
- **Number formatting.** All numeric values render LTR natively (24.7%, 500+) — no issue functionally, but per item A those *strings* shouldn't be in the hero at all.
- **Line-height on Hebrew body.** `.hero-sub` uses 1.75 ([`index.html:333`](index.html:333)) — generous, correct for Hebrew. No issue. But `.hero-title` uses 1.1 ([`index.html:313`](index.html:313)), which on Hebrew can clip descenders/ascenders depending on weight; consider 1.15.

---

## 4. Conversion clarity findings

The page presents **four entry paths** with equal visual weight: Game, Calculator, Course, Portfolio Tracker (coming soon). The hero offers a fifth path: register. That's five forks above the fold + one screen down. For a beginner, "where do I click?" is unanswered.

- **The right hierarchy for this brand is:** Game (low-friction taste of method) → Calculator (free utility, builds trust) → Course (paid, the real product). Portfolio Tracker is "בקרוב" — including it as a peer card with its own CTA at this stage *dilutes* attention. Either demote it (smaller "what's coming" strip) or remove it from the homepage until it ships.
- **The hero CTAs split between Register and Course landing.** ([`index.html:974–975`](index.html:974)) For a first-time visitor who has no idea what value-investing is, "Register" before they've tasted anything is a high-friction ask. Consider the primary CTA being "שחק את המשחק" (Game — the free, fun on-ramp) and the secondary being "קרא על הגישה" (Buffett blog — the manifesto). Save Register for after the user has a reason to care.
- **The CTA banner repeats Register.** ([`index.html:1085–1089`](index.html:1085)) — same ask, second time, same primary button. If you keep Register as the hero primary, the banner should ask for a *different* commitment (e.g. "התחל מהסיפור של באפט" → blog post). Two identical CTAs in a 5-section page is wasted real estate.
- **No instructor / no Yair on the homepage.** ([`index.html:1112`](index.html:1112) — only as a footer credit). For an unknown Hebrew finance brand, the fastest trust-builder is a single short paragraph + photo: "מי אני, למה בניתי את זה." Currently a beginner has zero way to evaluate credibility before signing up.
- **No example of the actual content.** The blog has the Buffett post and the ETF guide — the polish ceiling. The homepage doesn't pull a teaser from either. A featured-article tile from the Buffett post would do double duty: it shows what the substance feels like, and it builds trust through depth.

---

## 5. Recommendations — ranked impact ÷ effort

Each line is the change + a one-sentence implementation sketch. No code.

### Do first (high impact, low effort)
1. **Remove the "+24.7%" and "500+" SVG stat badges from the hero.** Delete the two `<g class="hero-badge-svg ...">` blocks at [`index.html:949–960`](index.html:949). Brand + claim risk; tens of seconds of work.
2. **Replace the ASCII `"` in the quote with a typographic Hebrew quote.** [`index.html:1078`](index.html:1078) — swap to ״ or " / ".
3. **Match the homepage body gradient to the blog gradient.** [`index.html:34`](index.html:34) → use `linear-gradient(155deg, #0b4a64, #1680a0, #0d6a82)` so brand surfaces are continuous from homepage → blog → course.
4. **Add Assistant 800 to the font load.** [`index.html:20`](index.html:20) — append `;800` to the Assistant axis. Parity with the rest of the site.
5. **Drop `text-transform: uppercase` on `.hero-badge` and `.hp-section-label`.** [`index.html:299`](index.html:299), [`index.html:449`](index.html:449). It does nothing on Hebrew except signal "English template."
6. **Soften letter-spacing on Hebrew display.** [`index.html:314`](index.html:314): `-1.5px` → `0` or `-0.3px`. [`index.html:457`](index.html:457): `-0.5px` → `0`. Better Hebrew rendering.
7. **Remove the letter-spacing transition on the quote.** [`index.html:658–660`](index.html:658) — keep the fade-up only. Less theater.

### Do second (medium effort, high impact on brand fit)
8. **Reduce hero motion budget to one moment.** Keep the line draw-on; remove the infinite pulse ring, the floating badges (already gone per #1), the bouncing scroll arrow ([`index.html:395–420`](index.html:395)), and the looping particles. Motion should resolve.
9. **Reskin product cards to the documented `--card-light` (#f7f9fa).** [`index.html:474`](index.html:474). Stops the "different deck" effect; aligns with the polish ceiling of the blog posts.
10. **Replace the bright-mint CTA banner with a quiet on-brand close.** [`index.html:670–688`](index.html:670). Either remove the section entirely (the hero CTA is enough) or keep the layout but use the same dark navy background with a single mint button — no inversion.
11. **Add a "מי בנה את זה" mini-section above or below `#why`.** Yair photo, 2 sentences, nothing more. Single biggest trust gain available.
12. **Demote Portfolio Tracker.** Either remove from the products grid until it ships, or move to a thin "מה בדרך" strip beneath the grid. Currently it's a peer card with an active CTA, which is misleading.

### Do third (bigger calls, worth deciding on but not urgent)
13. **Reconsider hero CTA hierarchy.** Primary → Game (free, fun); Secondary → Buffett blog post; defer Register to after a value-add interaction. This is a strategic call, not a quick edit.
14. **Add a "from the blog" tile linking to the Buffett post.** A single horizontal card, image + title + reading time, between `#why` and `#quote`. Pulls the polish ceiling onto the homepage at almost no cost.
15. **Tighten the section template.** All five sections currently use identical max-width / padding / center alignment / `.fade-up`. The page reads as repeated. Consider one section breaking the pattern (e.g. the "מי אני" section asymmetric — photo right, text left) to add a single beat of variety without crossing into "distinctive in the Awwwards sense."

---

## 6. Things the frontend-design skill would push for that you should *not* do here

The skill's house style is built around bold, distinctive, "AI slop avoidance" maximalism. For this brand, several of its defaults are exactly wrong. Explicit rejections:

- **"Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic…"** — The brand isn't supposed to live at any extreme. It's supposed to live at **considered**. A homepage that tries to be a "tone" loses the point. Don't pick an extreme; pick discipline.
- **"Asymmetry. Overlap. Diagonal flow. Grid-breaking elements."** — Diagonal flow on a value-investing education page reads as crypto-launchpad. Trust on financial content correlates with rectilinear, predictable layout. Asymmetry is fine in *one* small place (e.g. the founder section); not as a system.
- **"Custom cursors, grain overlays, dramatic shadows, decorative borders."** — Custom cursors and grain overlays are a "look at the design" gesture. This brand wants users to look at the *content*. Skip.
- **"One well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions."** — Half-true here: yes, scattered micro-interactions are bad (already an issue), but the recommended fix is *more restraint*, not a more elaborate orchestrated reveal. The Buffett blog post's load — content already there, light fade-up on scroll — is the right model.
- **"Distinctive display font… unexpected, characterful font choices."** — No. Rubik + Assistant is the documented system, it works in Hebrew, and changing the display font on the homepage would visibly fork it from the blog/course. The discipline is to make Rubik *look intentional* through hierarchy and spacing, not to swap fonts.
- **"Dominant colors with sharp accents."** — The site already has this (navy + mint). The skill's instinct would be to *introduce a sharp accent* (gold, red, electric anything) on the homepage. Don't. The Buffett post's gold accent works *inside* a long-form post where it earns the variation; on the homepage it would look like a brand tier.
- **"Unforgettable" / "the one thing someone will remember."** — The thing they should remember is "this person seems serious about teaching me investing," not a visual tic. If your homepage is memorable for a design move, you've spent the wrong currency.

The skill is calibrated for portfolio-page design. This is an education-product homepage for a low-trust topic in a small market. Treat the skill's defaults as a list of *temptations to resist*, not a checklist to apply.
