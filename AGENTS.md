# Codex — La Cassana® brand book digital

## Project
Build and maintain **La Cassana — Manual de marca interactivo**, a Spanish-language editorial website presenting the brand's official identity and graphic guidelines.

This repository starts from a standalone HTML/CSS/JS prototype whose files and optimized image assets are provided by the owner. **Preserve the existing implementation and its assets; do not replace them with a generic template or an e-commerce storefront.**

## Visual direction
- Swiss editorial / restrained brutalist web design based on the owner's visual references.
- Intentional grids, bold typography, asymmetric editorial layouts, thin dividers and controlled whitespace.
- Subtle, polished scroll reveals and hover feedback. Prefer native CSS and IntersectionObserver. Respect `prefers-reduced-motion`.
- Responsive desktop/tablet/mobile. Header should remain usable, with clear section navigation and active-section indication.

## Brand truth
The official palette, as specified in the manual:
- White `#FFFFFF`
- Burgundy `#7B1616`
- Terracotta `#D37832`
- Cream `#F3CB82`

Editorial UI neutral colors (such as almost-black or off-white) are **not** additional official palette swatches.

Original manual typography: **ThanatosVF** (primary) and **Candara** (secondary). Their webfont files are not included in the first prototype. Keep clear fallbacks; do not fetch or redistribute unlicensed fonts.

When present, `manual-la-cassana.pdf` is the authoritative source for claims about brand story, applications, logo usage and brand rules. Original art assets take precedence over approximate drawings. PNG logo exports in the starter are provisional; SVG replacements must be validated against the originals.

## Existing planned content
1. Cover / introduction
2. Brand essence, story, mission, vision and values
3. Logos and contrast variations with interactive previews
4. Typography specimens with editable sample text
5. Official color palette with click-to-copy HEX values
6. Graphic resources / pattern
7. Application gallery and manual PDF download

## Engineering guidelines
- Starter uses `index.html`, `styles.css`, `script.js`, `assets/` and the original PDF; no framework or build tooling is necessary.
- Preserve direct compatibility with GitHub Pages deployed from `main` and `/(root)`.
- Keep interactions keyboard-friendly, controls labeled, images with relevant alt text, readable contrast and no horizontal overflow.
- Avoid expensive libraries for simple animations.
- Prefer small, reviewable changes. Check desktop (1440px), tablet (768px) and mobile (375px).
- Do not invent brand facts, colors, logo versions, licensed assets, or photos.
- Do not claim that visual assets or the PDF were uploaded until they actually appear in the repo.

## Suggested first Codex task after source upload
Review the existing home page and all sections, ensure every `assets/` reference works, improve editorial layout and subtle animations according to the owner's references, check mobile behavior, and document what you changed.
