import { readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

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
  assert.match(html, /property="og:url" content="https:\/\/mother\.netanya\.club\/"/);
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

test('generated support illustrations are used in the support cards', () => {
  const assets = [
    'support-emotional.jpeg',
    'support-practical.jpeg',
    'support-volunteers.jpeg'
  ];

  for (const asset of assets) {
    assert.match(html, new RegExp(`src="\\.\\/assets\\/${asset}"`));
    const image = statSync(new URL(`../public/assets/${asset}`, import.meta.url));
    assert.ok(image.size > 1000);
  }

  assert.match(html, /alt="איור של שתי נשים בשיחה תומכת ורגועה"/);
  assert.match(html, /alt="איור של נשים מסדרות תרומות וציוד בסיסי בכבוד"/);
  assert.match(html, /alt="איור של קבוצת נשים ומתנדבות עומדות יחד בקהילה"/);
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

test('visual palette stays calm and aligned with the artwork', () => {
  assert.match(css, /--bg: #fbf3ea;/);
  assert.match(css, /--green: #95c7a2;/);
  assert.match(css, /--coral: #d59b8a;/);
  assert.match(css, /--teal: #6f9486;/);
  assert.doesNotMatch(css, /#25d366|#31ed78|#18bf56|#42f283|#2bdc6e|#13aa4c/i);
});
