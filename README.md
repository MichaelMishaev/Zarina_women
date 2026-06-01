# Zarina Women

Static Hebrew landing page for the community initiative "אף אחת לא נשארת לבד",
supporting single mothers and one-parent families through a WhatsApp community,
volunteers, donors, and practical local help.

## Project

- Vite static site
- Hebrew RTL page
- No contact form and no personal data collection
- WhatsApp group and phone call CTAs
- GitHub Pages deployment workflow

## Development

Install dependencies:

```sh
npm ci
```

Run the local dev server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Run tests:

```sh
npm test
```

## Deployment

The repository includes a GitHub Actions workflow at
`.github/workflows/deploy-pages.yml`. On pushes to `main`, it installs
dependencies, runs tests, builds the Vite site, and deploys the `dist` output to
GitHub Pages.

## Assets

Generated community images live under `public/assets/` and are referenced by the
landing page for the hero section, header badge, and WhatsApp group artwork.
