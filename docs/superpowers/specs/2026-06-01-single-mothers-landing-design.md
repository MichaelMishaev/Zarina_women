# Single Mothers Landing Page Design

## Goal

Build a static Hebrew RTL landing page for a national support community for single mothers and one-parent families. The page must explain that this is a supportive women-centered community and drive visitors to join the WhatsApp group.

## Audience

- Single mothers and one-parent families who need emotional, social, or practical support.
- Volunteers who want to offer time, knowledge, transport, accompaniment, or practical help.
- Businesses and donors who want to contribute products, services, vouchers, or direct support.

## Core Decisions

- The page has no contact form and collects no personal data.
- The primary action is joining the WhatsApp group:
  `https://chat.whatsapp.com/FH8QDSnoqkE71WpdhhYgpo?mode=gi_t`
- Zarina's phone number remains visible: `050-9066422`.
- The page is action-first: WhatsApp CTA appears above the fold and repeats near the end.
- Tone is warm, direct, dignified, and optimistic. Avoid pity-based charity language.
- The page will be hosted on GitHub Pages as a static site.

## Visual Direction

Use the selected "women helping women" direction:

- Bright, optimistic, respectful, and community-centered.
- Premium editorial illustration rather than generic stock photography.
- Palette: white, soft cool background, WhatsApp green, coral, teal, and muted golden yellow.
- The hero should feel hopeful and safe, not dramatic or sad.
- Use generated imagery as a real asset, not as a placeholder.

Generated concept assets:

- Hero concept source: `/Users/michaelmishayev/.codex/generated_images/019e83c6-b70a-7630-b6d4-f2579dcf6476/ig_005387ae71907eaf016a1da984d1b88191ace5304e16d90fcf.png`
- WhatsApp group picture concept source: `/Users/michaelmishayev/.codex/generated_images/019e83c6-b70a-7630-b6d4-f2579dcf6476/ig_005387ae71907eaf016a1da9df3d988191b6797ab14b5f62e2.png`

The final implementation should copy project-bound image assets into the repo and reference those local files.

## Page Structure

1. Hero
   - H1: `אף אחת לא נשארת לבד`
   - Body: `קהילה ארצית של אימהות יחידניות וחד־הוריות, נשים, מתנדבים ועסקים שנרתמים כדי לתת תמיכה רגשית, חברתית ומעשית ברגעים שצריך גב.`
   - Primary CTA: `הצטרפי לקבוצת ה־WhatsApp`
   - Trust line: `ההצטרפות לקבוצה נועדה לחיבור, תמיכה ועדכונים. אפשר להצטרף בקצב שלך.`
   - Phone line: `לשיחה עם זרינה: 050-9066422`

2. Who this is for
   - Heading: `מקום לנשים שמחזיקות הרבה לבד`
   - Copy explains that mothers do not have to go through financial, emotional, or social burden quietly.

3. What happens here
   - Heading: `מה קורה כאן בפועל`
   - Three support blocks:
     - `תמיכה רגשית`
     - `עזרה מעשית`
     - `קהילה נשית`

4. Ways to take part
   - Heading: `כל אחת ואחד יכולים להיות חלק`
   - Three audience blocks:
     - `לאימהות`
     - `למתנדבות ומתנדבים`
     - `לעסקים ותורמים`

5. Trust and dignity
   - Heading: `בכבוד, בשקט ובגובה העיניים`
   - Copy emphasizes help without judgment, unnecessary exposure, or pity language.

6. Final CTA
   - Heading: `רוצה להצטרף או לעזור?`
   - Repeat WhatsApp CTA and Zarina phone number.
   - Include the supporting slogan: `יחד מחזירים תקווה לאימהות יחידניות`

## WhatsApp Group Picture

Create a square group picture asset from the generated square concept. Add crisp code-rendered Hebrew text rather than AI-generated text:

- Main text: `אף אחת לא נשארת לבד`
- Supporting text: `קהילה של נשים למען נשים`

The image must remain readable as a circular WhatsApp avatar crop.

## Technical Requirements

- Use a static GitHub Pages-friendly build.
- Prefer Vite with a single-page app only if it improves local development and asset bundling.
- Set Vite `base` to `./` so assets work under a GitHub Pages repo subpath.
- Use `<html lang="he" dir="rtl">`.
- Keep phone numbers and URLs readable with explicit bidi handling.
- Add Hebrew SEO metadata, Open Graph tags, and social preview image references.
- Use semantic landmarks, one `h1`, visible focus states, high contrast, and large tap targets.
- No client router, backend, database, or contact form.

## Verification

- Build must pass.
- Automated tests should verify key static requirements: RTL Hebrew document, WhatsApp link, phone link, no form, SEO metadata, and local image references.
- Browser QA must cover desktop and mobile viewports.
- The final implementation must be visually compared against the accepted generated hero concept.
