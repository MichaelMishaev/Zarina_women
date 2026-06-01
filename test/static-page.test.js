import { readFileSync, statSync } from 'node:fs';
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
  assert.match(html, /property="og:url" content="https:\/\/michaelmishaev\.github\.io\/Zarina_women\/"/);
  assert.match(html, /property="og:image"[\s\S]+community-logo\.jpeg/);
  assert.match(html, /property="og:image:width" content="1254"/);
  assert.match(html, /property="og:image:height" content="1254"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="description"/);
});

test('provided community images are used for identity and hero surfaces', () => {
  assert.match(html, /class="hero-background"/);
  assert.match(html, /src="\.\/assets\/community-hero\.jpeg"/);
  assert.match(html, /src="\.\/assets\/community-logo\.jpeg"/);
  assert.match(html, /href="\.\/assets\/community-logo\.jpeg"/);

  const logo = statSync(new URL('../public/assets/community-logo.jpeg', import.meta.url));
  const hero = statSync(new URL('../public/assets/community-hero.jpeg', import.meta.url));
  assert.ok(logo.size > 1000);
  assert.ok(hero.size > 1000);
});

test('polished header uses the community logo image', () => {
  assert.match(html, /class="brand-image"/);
  assert.match(html, /src="\.\/assets\/community-logo\.jpeg"/);
  assert.match(html, /alt=""/);
});

test('WhatsApp CTAs are visually explicit and persist on mobile', () => {
  assert.match(html, /class="[^"]*primary-cta/);
  assert.match(html, /class="sticky-action-bar"/);
  assert.match(html, /aria-label="פעולת הצטרפות מהירה"/);
  assert.match(html, /לחצי להצטרפות עכשיו/);
  assert.match(html, /פותח את קבוצת ה־WhatsApp/);
});
