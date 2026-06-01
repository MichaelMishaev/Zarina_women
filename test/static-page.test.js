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
  assert.match(html, /property="og:image" content="\.\/assets\/whatsapp-group-picture\.png"/);
  assert.match(html, /name="description"/);
});

test('local generated assets are referenced', () => {
  assert.match(html, /src="\.\/assets\/hero-community\.png"/);
  assert.match(html, /href="\.\/assets\/whatsapp-group-picture\.png"/);
});

test('polished header uses a generated community badge image', () => {
  assert.match(html, /class="brand-image"/);
  assert.match(html, /src="\.\/assets\/header-community-badge\.png"/);
  assert.match(html, /alt=""/);

  const badge = statSync(new URL('../public/assets/header-community-badge.png', import.meta.url));
  assert.ok(badge.size > 1000);
});
