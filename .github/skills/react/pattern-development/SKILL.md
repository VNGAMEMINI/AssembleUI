---
name: pattern-development
description: Develop reusable React UI Patterns from public Components while preserving architecture, APIs, and repository conventions.
---

# Pattern Development

## Purpose

Use this Skill when creating, modifying, reviewing, or refactoring a
Pattern in `packages/react/patterns/`.

Repository rules in `AGENTS.md` and architecture constraints in
`ARCHITECTURE.md` remain authoritative.

## Architecture

A Pattern is a reusable UI section composed from existing public Components.

- Compose public Components through their supported exports.
- Do not import another Pattern.
- Do not import Templates or Registry.
- Do not move one-off Pattern behavior into Core merely to share code.
- Use shared Core infrastructure only when its responsibility is reusable.
- Keep page-level composition in Templates.

The intended composition hierarchy is:

`Template → Pattern → Component`

## Standard structure

Every Pattern directory must contain:

```text
PatternName/
├── PatternName.tsx
├── PatternName.types.ts
├── PatternName.scss
├── PatternName.test.tsx
└── index.ts

The Pattern contract requires all five files.

## Implementation workflow

### 1. Inspect before changing

1. Read `AGENTS.md` and relevant sections of `ARCHITECTURE.md`.
2. Inspect the target Pattern's implementation, types, styles, tests, and exports.
3. Review an existing Pattern with a similar responsibility.
4. Inspect the public Components available for composition.
5. Check existing Git changes and preserve unrelated user work.

Do not assume all Patterns have identical composition or interaction needs.

### 2. Define the Pattern API

Keep public props explicit in `PatternName.types.ts`.

- Extend appropriate native HTML attributes when applicable.
- Use `ReactNode` for flexible content slots where appropriate.
- Prefer composition slots such as `actions`, `filters`, or `description`
  when consumers need to supply their own content.
- Keep required and optional props meaningful and predictable.
- Avoid exposing private implementation details.
- Do not duplicate the public API of child Components unnecessarily.
- Do not introduce application-specific business data models into a
  reusable Pattern without a clear requirement.

### 3. Compose Components

Keep the main implementation in `PatternName.tsx`.

- Import Components from the supported public Component entry.
- Compose Components rather than copying their implementation.
- Keep layout and coordination logic within the Pattern's responsibility.
- Use `classNames` from shared Core utilities when appropriate.
- Forward refs when the Pattern's public API requires a ref to its root.
- Preserve native attributes and event handlers where applicable.
- Avoid unnecessary state, effects, wrappers, and abstractions.

Do not import another Pattern to build a larger Pattern.
Do not import Templates, Registry, or private Component implementation paths.

### 4. Implement styles

Keep Pattern styles in `PatternName.scss`.

- Use the existing AssembleUI Sass and design-token system.
- Prefer semantic tokens and theme properties over hardcoded values.
- Scope selectors to the Pattern's class namespace.
- Follow existing naming conventions for layout and content slots.
- Avoid global selectors and unintended style leakage.
- Never import SCSS from React implementation files.

Register styles through `packages/react/patterns/index.scss`.
Do not create a competing style entry.


### 5. Maintain exports

- Export the Pattern and its public types from its `index.ts`.
- Update `packages/react/patterns/index.ts` when adding or removing a Pattern.
- Update package-level exports only when required by the public API.
- Do not expose private implementation paths.
- When public exports change, verify runtime exports and TypeScript
  declarations together.

### 6. Test behavior

Keep public Pattern tests in `PatternName.test.tsx`.

Test relevant observable behavior:

- Rendering and composed content slots.
- Conditional sections and optional content.
- Native attributes and event handlers.
- `className` composition.
- Ref forwarding when applicable.
- Keyboard and accessible behavior for interactive content.

Test Pattern composition without duplicating all child Component tests.
Follow existing Vitest and Testing Library conventions.

## Validation

1. Run the affected Pattern test.
2. Run `tests/contracts/pattern-contract.test.ts` when structure changes.
3. Run `tests/architecture/patterns.test.ts` when imports or composition
   boundaries change.
4. Run relevant type checks and public API checks when exports change.
5. Run `git diff --check` and inspect the final diff.

Use existing repository scripts. Avoid the full test suite for narrowly
scoped changes.

## Boundaries

This Skill does not redefine:

- Repository rules in `AGENTS.md`.
- Composition and dependency rules in `ARCHITECTURE.md`.
- Component implementation workflow.
- Shared Sass, design-token, or theme conventions.
- General testing and accessibility policies.
- Public package export policy.

Use the relevant specialist Skill for those responsibilities.
