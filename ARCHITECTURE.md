# AssembleUI Architecture

## 1. Authority

This document defines the library's structural responsibilities and dependency boundaries.

- `AGENTS.md` defines repository-wide mandatory rules and workflow.
- `ARCHITECTURE.md` defines the library architecture and dependency constraints.
- `.github/agents/` defines agent responsibilities and coordination.
- `.github/skills/` contains focused implementation guides. A Skill explains how to perform a task; it does not redefine architecture.

When implementation conflicts with this architecture, do not copy or extend the conflicting structure. Report the conflict and propose a bounded correction.

## 2. Actual source layout

The React library source is under `packages/react/`.

| Directory | Responsibility |
|---|---|
| `foundation/` | Global browser/document CSS: reset, normalize, typography defaults and global rules. No React runtime. |
| `design/` | Design data: primitives, semantic/synthetic tokens and themes. |
| `styles/` | Reusable Sass mechanisms: functions, mixins, responsive rules, layouts and utilities. No React rendering or application state. |
| `core/` | Shared React infrastructure: contexts, hooks, providers and utilities. No application business logic. |
| `components/` | Independent, reusable UI building blocks. |
| `patterns/` | Reusable sections composed from Components. |
| `templates/` | Page-level structures composed from Patterns. |

Do not create conceptual directories or layers that are not justified by an actual responsibility.

## 3. Design and styling boundaries

### Design

The actual directory is `design/`, not `design-system/`.

- `design/primitives/` contains primitive design values.
- `design/tokens/semantic/` contains semantic token definitions.
- `design/tokens/synthetic/` contains composite or multi-value tokens.
- `design/themes/light/`, `dark/` and `custom/` contain theme definitions and overrides.

Semantic token variables (`--aui-token-*`) are the stable interface consumed by styles. Theme palette variables (`--aui-theme-*`) provide theme-specific values. Preserve documented legacy aliases unless a migration is explicitly planned.

Do not put React components, hooks, application logic or component-specific styles in `design/`.

### Foundation

Foundation owns global CSS behavior. It must not own design-token policy, React components, hooks or runtime utilities.

### Style Engine

The actual Sass areas are:

- `functions/`: return Sass values.
- `mixins/`: emit reusable CSS declarations.
- `layouts/`: reusable layout rules.
- `responsive/`: breakpoint and media-query mechanisms.
- `utilities/`: reusable utility styles.

Style Engine consumes design values. It must not contain JSX, React state or business logic.

### Sass entry

`packages/react/index.scss` is the package-level style entry. Its current loading order is:

1. Foundation
2. Design
3. Style Engine
4. Components
5. Patterns
6. Templates
7. Tokens
8. Themes

Keep style registration in the Sass graph. React implementation files must not import SCSS directly. Do not create a competing style entry without an explicit architecture decision.

## 4. Core boundary

Core contains reusable framework infrastructure:

- `contexts/`
- `hooks/`
- `providers/`
- `utils/`

Core must not depend on Components, Patterns, Templates or application-specific business logic.

Higher layers may use Core infrastructure when needed. Avoid putting a one-off component behavior into Core merely to share a function; extraction must have a genuinely reusable responsibility.

## 5. Composition and dependency direction

The intended composition hierarchy is:

`Template → Pattern → Component`

Allowed composition:

- Component uses its own implementation and shared Core infrastructure. It does not import another Component, Pattern or Template.
- Pattern composes public Components. It does not compose another Pattern or Template.
- Template composes Patterns. It does not compose another Template or implement reusable low-level Components.
- Core, Design, Foundation and Style Engine must not depend upward on the composition layers.

Patterns and Templates may use shared Core infrastructure when justified. This does not grant permission to bypass the composition hierarchy.

### Existing migration debt

The inspected `ProfilePageTemplate` and `DashboardPageTemplate` currently import Components directly as well as Patterns. This conflicts with the intended Template contract above.

Treat these imports as existing migration debt, not as permission to add more direct Template-to-Component dependencies. Do not perform a broad migration as part of an unrelated task. Report the affected files when working in this area and propose a focused migration.

## 6. Public API boundary

The package public entry is `packages/react/index.ts`.

The inspected public exports include:

- Components
- Patterns
- Templates
- `ThemeProvider`
- `useTheme`
- Theme-related public types

`packages/react/package.json` also defines dedicated export paths for components, patterns, templates, core, styles, tokens, themes and primitives.

Rules:

- Preserve compatibility of existing public exports unless the user authorizes a breaking change.
- Keep private implementation modules out of public barrels and package export maps.
- Verify runtime exports and TypeScript declarations together when changing public API.
- Do not treat internal source paths as supported consumer imports unless explicitly exported.

## 7. Component and module organization

Follow the file organization rules in `AGENTS.md`.

In particular:

- Keep each public item entry in its own directory.
- Use `_name.ts` or `_name.tsx` for private logic modules.
- Put separately composed UI parts in `module/` using normal descriptive filenames.
- Keep the primary public item tests in `Name.test.tsx`.
- Add supplementary `_name.test.ts` or `_name.test.tsx` only for extracted private modules or UI parts.
- Split by responsibility, not line count.
- Do not introduce abstractions or modules without a clear ownership and reuse reason.

## 8. Agent architecture gate

Before any non-trivial implementation, the responsible agent must:

1. Read `AGENTS.md` and this document.
2. Inspect the affected source, imports, exports, tests and existing Git changes.
3. Identify the owning layer and allowed dependencies.
4. Check whether the requested change would cross or weaken a boundary.
5. Keep the change within the owning layer unless a cross-layer change is explicitly required.

The Orchestrator must:

- Assign work to the correct specialist.
- State the affected layer and dependency constraints in delegated tasks.
- Prevent overlapping ownership and conflicting edits.
- Reject changes that violate these boundaries.
- Request an architecture decision before changing a layer's responsibility or dependency direction.

The Code Agent must verify runtime and import dependencies. The Style Agent must verify Sass and design-token boundaries. The Documentation Agent must describe the actual implementation rather than inventing architecture.

If a task cannot satisfy these constraints, stop and report the conflict instead of silently weakening the architecture.

## 9. Verification status

The inspected React source contained no direct SCSS imports from `.ts` or `.tsx` files.

A filename search did not find dedicated architecture/dependency test files under `packages/`. This does not prove that no architecture checks exist elsewhere. Do not claim automated enforcement until the relevant test or configuration is located and verified.

When changing dependencies, exports or style registration, run the narrowest relevant checks and inspect the final diff. Do not claim visual correctness based only on Sass compilation.
