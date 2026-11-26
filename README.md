# Lords Skill Academy website

Static React and TypeScript site for GitHub Pages. There is no server runtime, API, database, authentication, or CMS requirement.

## Commands

```sh
npm install
npm run dev
npm run build
npm run lint
```

`npm run build` generates one static HTML entry for each route in `scripts/generate-static-routes.mjs`, then writes `dist/` for GitHub Pages. Set `BASE_PATH` for a project site path and `SITE_URL` for production canonical URLs, sitemap, and robots metadata. Without `SITE_URL`, local builds use `http://localhost:4173`; the GitHub Actions workflow supplies the production value from the repository name.

## Content architecture

Verified content belongs in `src/data/content.ts` and should follow the types in `src/data/types.ts`. Blog and event detail routes can be added to the route generator from those data collections when real content is available. Google Drive links should be stored as resource URLs; no Drive API is used.

## Featured career opportunity

The site has no CMS or recruitment backend. Edit `src/data/career-opportunity.json` and rebuild and deploy the static site to update the popup and the searchable home-page summary; no component changes are needed. Set `popupEnabled` to `true` and provide an `opportunity` object with:

- Required: `id` (a unique string for each opportunity), `active` (boolean), `jobTitle`, `companyName`, `location`, `postedDate`, and `summary` (non-empty strings).
- Optional strings: `requisitionId`, `hiringType`, `employmentType`, `experience`, `salary`, `qualifications`, `deadline`, `description`, `recruiter`, `importantNote`, and `additionalDetails`. Dates are displayed exactly as entered.
- Optional `responsibilities`, `skills`, and `highlightedAreas`: arrays of strings. Use `skills` only for employer-stated requirements; `highlightedAreas` are explicitly presented as LSA's own areas of interest.
- Optional `companyLogo` and `poster`: HTTPS URLs or paths relative to `public/`, such as `media/careers/poster.jpg`. Add local images to `public/` before deployment.

`studentOutcomes` is a separate, optional top-level array of previous student achievements, not outcomes of the featured vacancy. Each entry requires `studentName`, `role`, `package`, `verified`, and `publicConsent`; `company` is optional. Only entries with both booleans set to `true` are displayed. Verify the achievement and obtain permission for public display and search indexing before adding an entry; remove it from the JSON and redeploy if consent is withdrawn. Search engines may retain cached results after removal. An empty array hides the section.

Omit optional fields or leave them empty when unavailable. Set `active` or `popupEnabled` to `false` to hide the popup and home-page summary, or set `opportunity` to `null` when there is no opportunity. Check the build or browser console if the settings or an image cannot be loaded. The popup appears after four seconds on every home-page visit. On other pages, it is shown at most once per opportunity per 24 hours on the same browser; changing the `id` allows a new opportunity to appear. If browser storage is unavailable, the frequency limit lasts only for the current page. The call button uses `careerPhone` in `src/data/site.ts`. The summary is included in the generated home-page HTML, but search engines control whether and when it is indexed.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
