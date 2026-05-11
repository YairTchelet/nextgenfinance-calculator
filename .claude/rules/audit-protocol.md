# Audit Protocol — How to Audit a Surface

Applies to any audit/review of a page on this site: homepage, blog post, course chapter, calculator, game, members area, profile.

## 1. Mobile is a first-class surface

Israeli retail investors are mobile-first. Audit **375px and 414px viewports** with the same depth as desktop — not as an appendix.

Every surface audit must include a "Mobile (375px / 414px)" section ranked by impact, with `file:line` citations, alongside (not after) typography, color, motion, and spatial-composition sections.

When delegating an audit to a subagent, include this literal instruction in the prompt:

> Audit mobile (375px and 414px viewports) as a first-class surface, not an afterthought. Flag any text that wraps awkwardly in Hebrew on narrow screens, any hit targets under 44px, and any motion that hurts performance on mid-range Android.

## 2. What to flag on mobile

- **Hebrew wrap quality** — forced `<br>`s that land badly between 360–420px, orphaned single words on their own line, em-dashes ending a line, line-height clipping diacritics on tight headings.
- **Hit targets under 44×44px** — links, buttons, nav items, hamburger toggle, card CTAs, accordion headers, paywall buttons, footer links. Apple HIG / Material both call ≥44px.
- **Motion that hurts mid-range Android** — animating `transform` and `opacity` is usually fine; animating `r` (SVG radius), `width`, `height`, `letter-spacing`, `box-shadow`, large `filter: blur`, or `background-position` is not. Flag any infinite loop on those properties.
- **Sticky-element stacking** — navbar (62px) + reading progress bar (4px) + course-only banner + paywall = real estate gone before content. Audit the cumulative height at the top of the viewport.
- **Off-system mobile-only patterns** — inline styles in JS-rendered drawer markup that drift from the design tokens, `display:none` hiding desktop nav with parallel mobile markup that diverges over time, mobile breakpoints that hardcode colors instead of using the documented variables.
- **Touch vs hover affordances** — anything that depends on `:hover` to reveal information (tooltips, hover cards, hover-only CTAs) is invisible on touch. Flag.

## 3. Tone & brand context for any audit

The brand is Hebrew value-investing education for Israeli retail investors — Warren Buffett, not a SaaS launch page. Reject suggestions that push toward maximalism, dramatic motion, hover surprises, diagonal flow, or marketing-page energy. Animations should read as texture, not content. The bar is "considered and polished," not "distinctive in the Awwwards sense."

The polish ceiling is `blog/warren-buffett/index.html` and `blog/etf-guide/Index.html`. Compare any audited surface against those two for typographic consistency, card rhythm, and motion restraint.

## 4. Output format

Audits live in `audits/[surface-name].md` (e.g. `audits/homepage.md`). Standard sections:

1. What's working (3–5 specific items, `file:line` citations)
2. High-impact issues, ranked by impact × brand fit
3. **Mobile (375px / 414px)** — first-class section, not appended
4. RTL / Hebrew-specific findings
5. Conversion clarity findings
6. Recommendations ranked impact ÷ effort, with 1-line implementation sketches (no code unless the user asks for it)
7. What the design tooling/skill would push for that contradicts this brand, and why

Audits are research artifacts — markdown only, no code edits in the same pass unless the user asks.
