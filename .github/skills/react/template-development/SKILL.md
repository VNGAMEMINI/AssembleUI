---
name: template-development
description: Develop reusable React page Templates from public Patterns using structured data while preserving architecture, APIs, and repository conventions.
---

# Template Development

## Purpose

Use this Skill when creating, modifying, reviewing, or refactoring a
Template in `packages/react/templates/`.

`AGENTS.md` and `ARCHITECTURE.md` remain authoritative.

## Architecture

A Template defines a reusable page-level structure composed from Patterns.

The intended composition hierarchy is:

`Template → Pattern → Component`

- Compose Patterns through their public exports.
- Do not import another Template.
- Do not introduce direct Component dependencies into new Templates.
- Do not implement reusable low-level Components inside Templates.
- Keep application business logic and data fetching outside Templates.
- Use shared Core infrastructure only when genuinely justified.

Existing migration debt:
- `ProfilePageTemplate` and `DashboardPageTemplate` currently import
  Components directly.
- Do not treat those imports as permission to add more direct dependencies.
- Do not perform broad migrations during unrelated work.
- Report affected files and propose a focused migration when relevant.

## Standard structure

Every Template directory must contain exactly these five files:

```text
TemplateName/
├── TemplateName.tsx
├── TemplateName.types.ts
├── TemplateName.scss
├── TemplateName.test.tsx
└── index.ts
```

## Implementation workflow

### 1. Inspect before changing

- Read `AGENTS.md` and relevant sections of `ARCHITECTURE.md`.
- Inspect the Template contract and relevant architecture tests.
- Inspect target source, types, styles, tests, and exports.
- Review existing Patterns suitable for the page structure.
- Preserve unrelated user changes.

### 2. Define structured data

Keep public types in `TemplateName.types.ts`.

- Define explicit interfaces for page data and nested collections.
- Use stable identifiers for repeated items.
- Keep required and optional fields meaningful.
- Extend appropriate native HTML attributes when applicable.
- Define interaction callbacks explicitly.
- Export public data types through `index.ts`.

Do not use structural JSX-slot props named `children`, `content`, or `sidebar`. Prefer structured data instead.

Do not introduce application-specific services, stores, routers, or business logic into a Template.

### 3. Compose Patterns

Keep page composition in `TemplateName.tsx`.

- Import Patterns through `../../patterns`.
- Compose existing Patterns instead of copying their implementations.
- Pass structured data through Pattern props.
- Keep page-level layout and conditional section coordination here.
- Use shared Core utilities only when justified.
- Forward refs and preserve applicable native attributes.
- Avoid unnecessary state, effects, wrappers, and abstractions.
- Do not import other Templates or add direct Component imports.
- Do not bypass public exports through private implementation paths.

### 4. Implement styles

Keep styles in `TemplateName.scss`.

- Use existing AssembleUI Sass and design-token conventions.
- Prefer semantic tokens over hardcoded values.
- Scope selectors to the Template class namespace.
- Avoid global selectors and unintended style leakage.
- Never import SCSS from React implementation files.
- Register styles through `packages/react/templates/index.scss`.

### 5. Maintain exports

Each Template's `index.ts` must export:
- The Template component.
- Its `TemplateNameProps` type.
- Its public data interfaces and types.

Update `packages/react/templates/index.ts` when adding or removing
a Template.

Verify runtime exports and TypeScript declarations together when
changing the public API.

### 6. Test behavior

Keep tests in `TemplateName.test.tsx`.

Test relevant observable behavior:
- Rendering from structured data.
- Optional and conditional sections.
- Repeated data collections.
- Interaction callbacks.
- Native HTML attributes and className.
- Ref forwarding when applicable.
- Accessible page structure and navigation.

Avoid duplicating every Pattern test. Follow existing Vitest and
Testing Library conventions.

## Validation

1. Run the affected Template test.
2. Run `tests/contracts/template-contract.test.ts` when structure or props change.
3. Run relevant architecture tests when dependencies change.
4. Verify stylesheet registration when adding or removing a Template.
5. Run relevant type and public API checks when exports change.
6. Run `git diff --check` and inspect the final diff.

Use existing repository scripts. Avoid running the full test suite
for narrowly scoped changes.

## Boundaries

This Skill does not redefine:
- Repository rules in `AGENTS.md`.
- Dependency boundaries in `ARCHITECTURE.md`.
- Component or Pattern implementation workflows.
- Shared Sass, design-token, or theme conventions.
- General testing and accessibility policies.
- Public package export policy.

Use the relevant specialist Skill for those responsibilities.
