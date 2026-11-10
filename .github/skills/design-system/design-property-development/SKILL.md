---
name: design-property-development
description: Create, modify, deprecate, and validate AssembleUI design primitives, semantic tokens, synthetic tokens, and theme properties.
---

# Design Property Development

## Purpose

Define the workflow for creating, modifying, and removing design properties in AssembleUI.

Use `design-property` when the task only requires selecting or consuming existing properties.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They are authoritative.

## When to Use

- A required design property does not exist.
- Existing properties need correction or extension.
- A token is duplicated, incorrectly classified, or no longer needed.
- A theme property must be introduced or updated.
- Design property changes affect public styles or compatibility.

## Source Structure

All design-system source lives in `packages/react/design/`.

- `primitives/`: foundational Sass values.
- `tokens/semantic/`: stable semantic CSS custom properties using `--aui-token-*`.
- `tokens/synthetic/`: composite or multi-value design properties.
- `themes/light/` and `themes/dark/`: theme-specific `--aui-theme-*` definitions.
- `themes/custom/`: custom theme extension point.

Inspect the relevant `index.scss` files before adding or moving source files. A property file that is not forwarded or loaded may not reach consumers.

## Classification Rules

### Primitive

Add a primitive when the value is foundational and belongs to a reusable design scale or category.

Keep primitive naming and Sass conventions consistent with its neighboring source file.

### Semantic Token

Add a semantic token when consumers need a stable, reusable design-system property with a clear meaning.

Semantic tokens are the stable interface consumed by styles. Avoid exposing arbitrary implementation details as semantic names.

### Synthetic Token

Add a synthetic token when it expresses a derived, composite, or multi-value design purpose.

Do not create a synthetic token that merely duplicates an existing semantic token.

### Theme Property

Add a theme property when its value depends on the active theme.

Keep the role consistent across Light and Dark themes. Check Custom theme behavior and document the expected override contract.

Do not move theme-dependent values into semantic tokens merely to make them globally available.

## Before Creating a Property

1. Search all relevant primitive, semantic, synthetic, and theme files.
2. Search component styles and existing consumers.
3. Check whether an existing property already expresses the same meaning.
4. Decide the correct layer and naming convention.
5. Confirm the property is reusable and not merely a component implementation detail.
6. Check Light, Dark, and Custom theme implications.
7. Identify compatibility and public API consequences.

Do not invent names based only on naming patterns.

## Implementation Rules

- Follow the formatting and Sass conventions of neighboring files.
- Keep each property in its correct source layer.
- Update the appropriate `index.scss` forwarding or loading entry.
- Preserve existing public token names unless a migration is explicitly required.
- Preserve documented legacy aliases unless an explicit migration is planned.
- Avoid unrelated renaming or bulk token reorganization.
- Avoid introducing duplicate aliases without a compatibility reason.
- Keep component-specific values local when they are not shared design properties.
- Do not hardcode theme-specific values in shared component styles when a theme property is appropriate.

## Theme Requirements

For a new theme-dependent role:

1. Define the role consistently in Light and Dark.
2. Check how Custom theme consumers are expected to override it.
3. Preserve the `data-aui-theme` selector convention.
4. Check foreground/background contrast where applicable.
5. Verify existing theme properties and aliases remain compatible.

Do not assume that adding a Light value alone completes a theme property.

## Changing or Removing Properties

Before changing or removing a property:

- Search every source and consumer reference.
- Check package exports and generated style entry points.
- Check demos, tests, and documentation.
- Determine whether the property is part of the stable public styling interface.
- Preserve compatibility or provide an explicit migration when required.

Never silently remove or rename a public token.

## Validation

Use focused checks based on the change:

- `tests/architecture/design-token-integrity.test.ts`
- `tests/architecture/theme-color-contract.test.ts`
- `tests/architecture/theme-color-contrast.test.ts`
- `tests/architecture/compatibility-tokens.test.ts`
- Relevant Sass build or package style build.

Run only relevant tests first. Run broader validation when the change affects shared design-system behavior or public exports.

## Workflow

1. Inspect the existing source, indexes, consumers, and relevant tests.
2. Decide the property layer and compatibility requirements.
3. Make the smallest coherent source change.
4. Update indexes, theme counterparts, tests, and documentation as required.
5. Run focused validation.
6. Inspect the final diff for accidental changes and duplicated properties.

## Boundaries

- Do not redefine the design-system architecture.
- Do not create global tokens for every component prop.
- Do not change React component APIs unless the task requires it.
- Do not perform unrelated token cleanup.
- Do not claim a property is public or exported without verifying the package entry points.
