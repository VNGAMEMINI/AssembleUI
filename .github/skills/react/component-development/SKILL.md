---
name: component-development
description: Develop, modify, and maintain independent React UI Components in AssembleUI while preserving component contracts, architecture boundaries, public APIs, and existing conventions.
---

# Component Development

## Purpose

Use this Skill when creating, modifying, reviewing, or refactoring a
Component in `packages/react/components/`.

This Skill describes the Component implementation workflow. Repository
rules in `AGENTS.md` and architecture constraints in `ARCHITECTURE.md`
remain authoritative.

## Architecture

Components are independent, reusable UI building blocks.

- A Component must not import another Component, Pattern, or Template.
- Shared Core infrastructure may be used when its responsibility is genuinely reusable.
- Component-specific behavior must not be moved into Core merely to share code.
- Patterns compose public Components; Templates compose Patterns.
- Do not use existing architecture violations as permission to introduce new ones.

Read `ARCHITECTURE.md` before making changes that may affect layer boundaries.

## Standard structure

Every Component directory must contain:

```text
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.scss
├── ComponentName.test.tsx
└── index.ts
```

Components are grouped by responsibility under the existing categories:

- `forms/`
- `data/`
- `typography/`
- `layout/`
- `feedback/`
- `interaction/`
- `navigation/`

Do not create a new category without a justified architectural need.

The component contract test checks for all five required files.

## Implementation workflow

### 1. Inspect before changing

1. Read `AGENTS.md` and relevant sections of `ARCHITECTURE.md`.
2. Inspect the target Component's source, types, SCSS, tests, and exports.
3. Inspect a nearby Component with a similar responsibility.
4. Check existing Git changes and preserve unrelated user work.
5. Identify reusable Core utilities and existing design tokens.

Do not assume every Component follows an identical implementation.
Follow the target's actual API and responsibility.

### 2. Define the public API

Keep public props explicit in `ComponentName.types.ts`.

- Extend the appropriate native HTML attribute type when applicable.
- Add only props representing meaningful Component behavior or presentation.
- Use explicit union types for finite variants and sizes.
- Keep optional props and defaults consistent with existing behavior.
- Preserve native attributes, event handlers, and `className` where applicable.
- Do not expose private implementation details through public types.
- Do not create global tokens for Component-specific API values.

### 3. Implement the React Component

Keep the main implementation in `ComponentName.tsx`.

- Follow the repository's React and TypeScript conventions.
- Use `forwardRef` when the public API exposes a ref to an underlying DOM element.
- Preserve the correct ref element type and native attributes.
- Use the shared `classNames` utility when appropriate.
- Keep rendering logic focused on the Component's responsibility.
- Avoid unnecessary state, effects, wrappers, and abstractions.
- Set a meaningful `displayName` for components using `forwardRef`.

Do not silently change existing prop semantics, defaults, DOM structure,
or ref behavior during unrelated refactors.

### 4. Implement styles

Keep Component styles in `ComponentName.scss`.

- Use the existing AssembleUI Sass and design-token system.
- Prefer semantic tokens over hardcoded design values.
- Use theme properties for theme-dependent values.
- Scope selectors to the Component's class namespace.
- Follow existing naming conventions for base, variant, and size classes.
- Avoid global selectors and unintended style leakage.
- Never import SCSS from React implementation files.

Register styles through the existing category `index.scss`.
Do not create a competing style entry.

### 5. Extract private modules only when justified

Keep the main Component entry in the item root.

Use `module/` for extracted UI parts or private logic only when separation
creates a genuinely independent responsibility or improves maintainability.

Follow repository naming conventions:

- `_name.ts` / `_name.tsx`: private logic modules.
- `Name.tsx`: separately composed UI parts.
- `_name.test.ts` / `_name.test.tsx`: supplementary private-module tests.
- `_name.scss`: style partials separated by responsibility.

Do not split files merely to reduce line count. Do not create empty modules,
unnecessary wrappers, or abstractions without a clear responsibility.

Keep private modules out of public exports.

### 6. Maintain exports

Each Component's `index.ts` exports its intended public Component and
public types.

Update the owning category's `index.ts` to expose the Component.
Update the category's `index.scss` to register its stylesheet.

Update higher-level package exports only when required by the intended
public API. Never expose private module paths.

When changing public exports, verify runtime exports and TypeScript
declarations according to the repository's public API requirements.

### 7. Test behavior

Keep primary public Component tests in `ComponentName.test.tsx`.

Test relevant behavior, including:

- Rendering and children.
- Default props and variants.
- Native attributes and event handlers.
- `className` composition.
- Disabled, loading, or other supported states.
- Ref forwarding when applicable.
- Keyboard and accessible interaction behavior when relevant.

Test observable behavior rather than private implementation details.
Add supplementary tests beside extracted private modules only when needed.

Follow the existing Vitest and Testing Library conventions. Avoid duplicating
coverage already provided by focused tests or architecture contracts.

## Validation

After implementation:

1. Run the affected Component test.
2. Run relevant type checks.
3. Run relevant architecture or public API contract tests if exports or
   structural contracts changed.
4. Run `git diff --check`.
5. Inspect the final diff for accidental API, style, or unrelated changes.

Use scripts and test commands that actually exist in the repository.
Do not run the entire test suite for a narrowly scoped change unless
the change justifies it.

## Boundaries

This Skill does not redefine:

- Repository-wide rules in `AGENTS.md`.
- Layer dependencies and composition rules in `ARCHITECTURE.md`.
- Shared Sass functions, mixins, responsive behavior, tokens, or themes.
- General testing strategy.
- Accessibility policy.
- Public package export policy.

Use the relevant specialist Skill for those responsibilities when needed.
