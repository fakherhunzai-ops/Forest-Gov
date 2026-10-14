# Forest, Wildlife & Environment — Gilgit-Baltistan

A responsive React/Vite redesign based on the official **https://fwegb.gov.pk/** website. Original government/department marks and the requested brand greens (`#28B463` / `#58D68D`) are retained.

## Run

Requires Node.js 22+.

```sh
npm ci
npm run dev -- --port 5173
```

The server binds to `0.0.0.0`. Arena's `.e2b.app` preview hosts are allowed. All images and fonts are served locally; the browser does not depend on third-party asset servers.

```sh
npm run build
npm run preview -- --port 4173
```

Deploy the resulting `dist/` directory to any static web host. No credentials, database, or environment variables are needed.

## Features

- Sticky branded header; all nine desktop navigation items in the requested order.
- Click/keyboard dropdowns linking to reviewed official pages; responsive mobile navigation.
- Landscape homepage with concise source-based summaries and links to full official details.
- News, Public Notices, Tenders and Jobs tabs.
- Reports & Publications, Guidelines and Acts & Rules tabs.
- Search across the curated content index; filterable resource library and update archive dialog.
- Official PDF links, clearly identified as documents that open in the browser for reading/saving.
- Working email, phone, contact-directory and in-page navigation links.
- Skip link, semantic landmarks, keyboard-operable tabs, modal focus containment/restoration, Escape handling, visible focus, and reduced-motion support.
- Source/photography credits and accessibility information in the footer.

## Content and editorial policy

Content was reviewed against the official source on **14 October 2026**. This is a curated, static frontend, not a live WordPress mirror. Update `src/data.js` when the official department publishes new information.

The original source remains the destination for full department pages, archives, project portfolios, maps and documents. This project does not recreate a CMS, government submission service, or contact-form backend, and it does not claim to submit enquiries. Contact links lead to the official directory, telephone or email.

Dates are publication dates, **not evidence of a currently open tender or vacancy**. The official homepage says there are no jobs; the career page holds older advertisements. The Jobs panel makes this distinction explicit. Unverified statistics, deadlines, leadership updates and fictitious news are not added.

See [SOURCE_AUDIT.md](SOURCE_AUDIT.md) for reviewed destinations, known source defects and asset provenance. Confirm image reuse permissions and obtain department approval before launching this preview as a public government service.

## Tests

Standard local setup:

```sh
npx playwright install --with-deps chromium
npm test
```

For Linux CI with restricted browser-download access, the included npm-distributed Chromium package is available:

```sh
npm run test:ci
```

The CI configuration extracts the bundled runtime libraries into a temporary directory at runtime. They are not checked into Git.

The browser suite covers:

- Exact desktop navigation order and every dropdown destination.
- Tab selection by click and arrow/Home keys.
- Search, empty states, modal focus containment and restoration.
- Resource filters and PDF navigation actions.
- Mobile menu opening, closing and Escape handling.
- Layout widths of **320, 390, 768, 1024, 1440 and 1920px**, local image loading, internal anchors and sticky positioning.
- Browser errors, missing local assets, empty/placeholder links, phone links.
- Axe WCAG 2 A/AA and WCAG 2.1 AA scans at desktop/mobile sizes and interactive states.
- Reduced motion, skip navigation and informational dialogs.

PDF-navigation tests intercept external requests to test application behavior independently of the official server. Actual selected PDFs were separately reviewed using source retrieval; this is documented in the audit. External availability can change after review. Automated accessibility tests are not a substitute for a complete assistive-technology audit.

## Structure

```text
src/data.js          Official links, summaries, documents and search index
src/main.jsx         Page components, navigation, tabs, search and dialogs
src/styles.css       Brand system, responsive layouts and focus states
public/assets/       Local original marks and photography
playwright.config.js Browser test setup
 tests/site.spec.js  Functional, responsive and accessibility checks
```

`npm run format:check` checks source formatting. Build output, downloaded research images, test screenshots and dependencies are ignored by Git.
