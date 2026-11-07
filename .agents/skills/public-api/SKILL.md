---
name: assembleui-public-api
description: Use when changing package exports, public types, entry points, subpath exports, declarations, or consumer-facing APIs in AssembleUI.
---

# Public API

Read root `AGENTS.md`, this skill, `docs/01_GETTING_STARTED.md`, `docs/06_COMPONENTS.md`, and package export documentation.

## Public API principles

- Consumer-facing imports must use supported package exports.
- Do not require consumers to import private implementation paths.
- Preserve existing exports unless a breaking change is explicitly requested.
- Keep runtime exports and TypeScript declarations consistent.
- Do not expose private `module/` files.
- Avoid duplicate or ambiguous entry points.

## Before changing exports

Inspect:

- Root and workspace `package.json`.
- `exports`, `types`, and entry-point declarations.
- Source barrel files.
- Build configuration.
- Declaration generation and normalization scripts.
- Existing public API tests and type checks.
- Actual package contents after build.

Do not infer supported subpaths from source directory names alone.

## Compatibility

Consider named exports, subpath exports, types, styles, refs, and consumer usage. Explain potential breaking changes before implementing them.

## Verification

Run relevant checks, including:

```bash
npm run typecheck
npm run typecheck:public
npm run build
```

Inspect generated declarations and package exports. Do not edit `dist/` as the source of truth.
