---
name: style-mixin
description: Create, maintain, compose, and export reusable Sass mixins in AssembleUI.
---

# Style Mixin

## Purpose

Define conventions for reusable Sass mixins in `packages/react/styles/mixins/`.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when creating, modifying, reviewing, or exporting reusable mixins.

## Existing Mixins

The current mixin directory contains:

- `focus.scss`: `focus-ring` for visible keyboard focus.
- `truncate.scss`: `truncate` for single-line text truncation.
- `interactive.scss`: `interactive` for hover opacity and transition behavior.
- `index.scss`: central mixin entry point.

Inspect implementations before reusing or extending them.

## Design Principles

- A mixin must represent a reusable styling behavior.
- Keep each mixin focused on one responsibility.
- Prefer CSS custom properties and canonical design tokens over hardcoded values.
- Avoid duplicating behavior already provided by existing mixins.
- Keep generated CSS predictable.
- Avoid unnecessary selectors, specificity, and nested rules.
- Do not introduce mixins for one-off component styling without a genuine reuse requirement.

## Implementation

### Focus Behavior

Use `focus-ring` for visible keyboard focus.

- Preserve the `:focus-visible` behavior.
- Use the established focus-ring and spacing tokens.
- Do not remove the browser focus indicator without providing an accessible replacement.
- Avoid applying focus styling indiscriminately to non-interactive elements.

### Text Truncation

Use `truncate` for single-line text truncation.

Its current behavior uses:

- `overflow: hidden`
- `text-overflow: ellipsis`
- `white-space: nowrap`

Do not silently change it into a multiline truncation utility. A different behavior requires a separate, clearly named contract.

### Interactive Styling

Use `interactive` for the existing opacity transition and hover behavior.

- Preserve the established motion tokens.
- Respect the project's reduced-motion and interaction conventions when extending behavior.
- Do not treat hover as the only indication of interactivity.
- Do not introduce pointer-only assumptions for keyboard interactions.

## Token and Theme Integration

- Consume canonical semantic, synthetic, or theme tokens as appropriate.
- Do not hardcode values when an appropriate public token exists.
- Do not define design tokens inside mixins.
- Do not couple reusable mixins to a specific component or theme selector.
- Keep theme-dependent values expressed through the appropriate theme roles.

## Sass Organization and Exports

- Keep mixin implementations in focused `.scss` files.
- Follow existing kebab-case file and mixin naming conventions.
- Update `mixins/index.scss` when adding or removing a reusable mixin.
- Inspect whether the entry point uses `@forward` or `@use`.
- Do not assume `@use` re-exports mixins.
- Preserve existing public Sass entry points and compatibility.

## Validation

When changing a mixin:

1. Search all existing `@include` consumers.
2. Check whether the change affects generated selectors or CSS declarations.
3. Inspect relevant component and pattern styles.
4. Run the existing Sass build or focused validation when available.
5. Review generated CSS for unintended duplication or selector changes.

Do not invent test files or validation scripts. Inspect the repository's existing scripts and architecture tests before choosing commands.

## Workflow

1. Inspect the target mixin and neighboring implementations.
2. Search for existing behavior and consumers.
3. Define the smallest reusable contract.
4. Implement or update the focused Sass module.
5. Update the mixin entry point when required.
6. Validate affected consumers and generated styles.
7. Review the final diff for unrelated changes.

## Boundaries

- Do not put component implementations in the mixin layer.
- Do not put Sass functions in the mixin layer.
- Do not duplicate design tokens as mixin-local constants.
- Do not introduce component-specific mixins into the global API without reuse justification.
- Do not change public mixin behavior without checking consumers.
- Do not perform unrelated Sass cleanup.
