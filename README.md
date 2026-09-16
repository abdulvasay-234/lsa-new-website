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
