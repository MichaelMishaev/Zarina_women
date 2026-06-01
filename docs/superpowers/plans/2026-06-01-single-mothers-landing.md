# Single Mothers Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Hebrew RTL GitHub Pages landing page that explains the support community and drives visitors to join the WhatsApp group.

**Architecture:** A Vite static site with one `index.html`, one source module for small UI behavior, one stylesheet, local generated image assets, and Node-based static tests. The page has no backend, no form, no routing, and no data collection.

**Tech Stack:** Vite, plain HTML/CSS/JavaScript, Node built-in test runner, generated PNG/WebP assets.

---

## File Structure

- `package.json`: npm scripts and dev dependencies.
- `vite.config.js`: GitHub Pages-safe base path.
- `index.html`: Hebrew RTL page, SEO metadata, and all landing-page content.
- `src/main.js`: small progressive enhancement for smooth scrolling and current-year footer text.
- `src/styles.css`: responsive visual system and layout.
- `test/static-page.test.js`: Node tests for required static behavior.
- `public/assets/hero-community.png`: generated hero image copied into the repo.
- `public/assets/whatsapp-group-background.png`: generated square group concept copied into the repo.
- `public/assets/whatsapp-group-picture.png`: final square WhatsApp picture with crisp Hebrew overlay.
- `.gitignore`: ignore generated local/dev artifacts.

## Task 1: Project Scaffold And Static Tests

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `test/static-page.test.js`
- Modify: `.gitignore`

- [ ] **Step 1: Write the static tests**

Create `test/static-page.test.js` with tests that read `index.html` and assert the required contract:

```js
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('document is Hebrew RTL with the core slogan', () => {
  assert.match(html, /<html[^>]+lang="he"[^>]+dir="rtl"/);
  assert.match(html, /אף אחת לא נשארת לבד/);
});

test('primary WhatsApp group link and phone link are present', () => {
  assert.match(html, /https:\/\/chat\.whatsapp\.com\/FH8QDSnoqkE71WpdhhYgpo\?mode=gi_t/);
  assert.match(html, /href="tel:0509066422"/);
  assert.match(html, /050-9066422/);
});

test('page has no contact form or personal-data fields', () => {
  assert.doesNotMatch(html, /<form[\s>]/i);
  assert.doesNotMatch(html, /<input[\s>]/i);
  assert.doesNotMatch(html, /textarea/i);
});

test('SEO and social metadata are present', () => {
  assert.match(html, /<title>אף אחת לא נשארת לבד/);
  assert.match(html, /property="og:locale" content="he_IL"/);
  assert.match(html, /property="og:image" content="\.\/assets\/whatsapp-group-picture\.png"/);
  assert.match(html, /name="description"/);
});

test('local generated assets are referenced', () => {
  assert.match(html, /src="\.\/assets\/hero-community\.png"/);
  assert.match(html, /href="\.\/assets\/whatsapp-group-picture\.png"/);
});
```

- [ ] **Step 2: Add package scripts**

Create `package.json`:

```json
{
  "name": "single-mothers-landing",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "preview": "vite preview --host 127.0.0.1",
    "test": "node --test test/*.test.js"
  },
  "devDependencies": {
    "vite": "^8.0.16"
  }
}
```

- [ ] **Step 3: Add Vite config**

Create `vite.config.js`:

```js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './'
});
```

- [ ] **Step 4: Run tests to verify RED**

Run: `npm test`

Expected: fail with `ENOENT` for missing `index.html`.

## Task 2: Assets

**Files:**
- Create: `public/assets/hero-community.png`
- Create: `public/assets/whatsapp-group-background.png`
- Create: `public/assets/whatsapp-group-picture.png`

- [ ] **Step 1: Copy generated assets into the project**

Copy:

```bash
mkdir -p public/assets
cp /Users/michaelmishayev/.codex/generated_images/019e83c6-b70a-7630-b6d4-f2579dcf6476/ig_005387ae71907eaf016a1da984d1b88191ace5304e16d90fcf.png public/assets/hero-community.png
cp /Users/michaelmishayev/.codex/generated_images/019e83c6-b70a-7630-b6d4-f2579dcf6476/ig_005387ae71907eaf016a1da9df3d988191b6797ab14b5f62e2.png public/assets/whatsapp-group-background.png
```

- [ ] **Step 2: Create the WhatsApp group picture**

Use a local image composition script or available image tooling to render `public/assets/whatsapp-group-picture.png` from the square background with crisp Hebrew overlay:

```text
Main text: אף אחת לא נשארת לבד
Supporting text: קהילה של נשים למען נשים
Output: 1200x1200 PNG
```

- [ ] **Step 3: Verify assets exist**

Run: `test -s public/assets/hero-community.png && test -s public/assets/whatsapp-group-picture.png`

Expected: exit code 0.

## Task 3: Landing Page Implementation

**Files:**
- Create: `index.html`
- Create: `src/main.js`
- Create: `src/styles.css`

- [ ] **Step 1: Implement the HTML**

Create `index.html` with:

```html
<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="אף אחת לא נשארת לבד - קהילה ארצית של אימהות יחידניות וחד-הוריות, מתנדבים ועסקים לתמיכה רגשית, חברתית ומעשית." />
    <meta property="og:title" content="אף אחת לא נשארת לבד" />
    <meta property="og:description" content="קהילה של נשים למען נשים - מצטרפות לקבוצת WhatsApp לתמיכה, חיבור ועזרה בכבוד." />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="he_IL" />
    <meta property="og:image" content="./assets/whatsapp-group-picture.png" />
    <meta name="theme-color" content="#25d366" />
    <title>אף אחת לא נשארת לבד | קהילה לאימהות יחידניות</title>
    <link rel="preload" as="image" href="./assets/hero-community.png" />
    <link rel="icon" href="./assets/whatsapp-group-picture.png" />
    <link rel="stylesheet" href="./src/styles.css" />
  </head>
  <body>
    <!-- Full implementation follows the approved spec. -->
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

Then fill the body with semantic `header`, `main`, and `footer` content matching the design spec.

- [ ] **Step 2: Implement styles**

Create `src/styles.css` with responsive RTL layout, mobile-first hero, WhatsApp green CTA, accessible focus states, image framing, and no nested card-heavy layout.

- [ ] **Step 3: Implement small JS enhancement**

Create `src/main.js` to set current year and preserve normal link behavior:

```js
const year = document.querySelector('[data-current-year]');

if (year) {
  year.textContent = new Date().getFullYear().toString();
}
```

- [ ] **Step 4: Run tests to verify GREEN**

Run: `npm test`

Expected: all tests pass.

## Task 4: Build And Browser Verification

**Files:**
- Verify only.

- [ ] **Step 1: Install dependencies**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 2: Run build**

Run: `npm run build`

Expected: Vite build succeeds and writes `dist/`.

- [ ] **Step 3: Run local preview**

Run: `npm run dev`

Expected: local Vite URL is available.

- [ ] **Step 4: Browser QA**

Open the local Vite URL in the in-app browser and verify:

- Desktop hero shows headline, CTA, phone, and hero image without overlap.
- Mobile viewport keeps the WhatsApp CTA prominent.
- WhatsApp buttons link to the exact group URL.
- Phone link uses `tel:0509066422`.
- No form is visible.
- Assets load from local project paths.

- [ ] **Step 5: Visual comparison**

Use `view_image` on the accepted hero concept and the browser screenshot. Fix any obvious mismatch in palette, hierarchy, spacing, imagery, or mobile readability.
