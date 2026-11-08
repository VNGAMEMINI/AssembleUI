---
name: design-token
description: Define, consume, validate, and maintain semantic and synthetic design tokens in AssembleUI.
---

# Design Token

## Purpose

Define conventions for design tokens in `packages/react/design/tokens/`.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when creating, changing, reviewing, consuming, or exporting design tokens.

## Token Layers

### Semantic Tokens

Location: `packages/react/design/tokens/semantic/`

Semantic tokens provide stable, theme-independent named values.

Examples include:

- `--aui-token-color-primary`
- `--aui-token-color-background`
- `--aui-token-space-*`
- `--aui-token-radius-*`
- `--aui-token-shadow-*`

Use semantic tokens as the canonical interface for reusable design values.

### Synthetic Tokens

Location: `packages/react/design/tokens/synthetic/`

Synthetic tokens represent derived or composite design concepts.

Examples include:

- Surface aliases that resolve through semantic color tokens.
- Composite borders and shadows.
- Layout-oriented values.
- Transition, animation, effect, gradient, and state values.

A synthetic token must provide a meaningful abstraction. Do not create aliases that add no useful semantic or compositional value.

### Theme Roles

Theme-dependent values belong in `packages/react/design/themes/`, not in token definitions.

Theme roles use the `--aui-theme-*` namespace.

Do not make semantic or synthetic token definitions depend on theme selectors or `--aui-theme-*` variables.

## Naming and Design

- Follow the existing `--aui-token-*` naming convention.
- Inspect neighboring token files before choosing a name.
- Prefer names describing purpose and meaning over implementation details.
- Keep related token families consistent.
- Reuse existing primitives and canonical semantic tokens.
- Avoid duplicate definitions and competing aliases.
- Do not create global tokens for every component-specific prop, size, or variant.
- Preserve existing public token names unless an explicit migration is planned.

## Dependency Rules

Keep dependencies within the intended design layers:

1. Primitives provide foundational values.
2. Semantic tokens expose stable named values.
3. Synthetic tokens derive reusable or composite values.
4. Themes provide theme-specific role values.
5. Components and higher-level UI consume the appropriate public tokens.

Token definitions must remain independent of theme variables and theme selectors.

Synthetic tokens may reference semantic tokens when that relationship represents their intended meaning.

Do not redefine semantic or synthetic token aliases inside theme files.

## Sass Organization and Entry Points

- Keep token definitions in their existing semantic or synthetic directories.
- Update the corresponding `index.scss` when adding a token module.
- Inspect whether an entry point uses `@use` or `@forward`; they have different export behavior.
- Do not assume loading a Sass module automatically re-exports its members.
- Preserve the existing `packages/react/design/tokens/index.scss` loading contract.
- Verify the design entry point includes both tokens and themes when changing integration.

Do not introduce a new token directory or export mechanism without an architectural reason.

## Component Consumption

- Prefer existing semantic tokens for reusable component styling.
- Use synthetic tokens when their derived meaning is appropriate.
- Use theme roles for values that must change with the active theme.
- Do not replace a theme role with a fixed semantic value when the component requires theme adaptation.
- Avoid hardcoded palette values when an appropriate public token exists.
- Do not invent token names; verify the definition and generated output.

## Compatibility

- Treat existing token names as public styling contracts.
- Check component, pattern, template, demo, and package usage before renaming or removing tokens.
- Preserve documented legacy aliases unless a migration is explicitly planned.
- Avoid maintaining duplicate namespaces for the same role.
- Review generated stylesheet output when changing token exports.

## Validation

Use the existing architecture tests:

- `tests/architecture/design-token-integrity.test.ts`
- `tests/architecture/compatibility-tokens.test.ts`
- `tests/architecture/surface-tokens.test.ts`
- `tests/architecture/theme-color-contract.test.ts`

Check that:

- Required token families are defined and exported.
- Synthetic aliases resolve through their intended canonical tokens.
- Token definitions do not depend on theme variables.
- Theme files do not redefine token variables.
- Component styles use canonical token names.
- Generated CSS contains the expected public variables.

Run only the focused tests relevant to the change, followed by the appropriate existing type or build check when necessary.

## Workflow

1. Inspect the relevant primitive, semantic, synthetic, and theme definitions.
2. Search for existing names and consumers.
3. Decide which layer owns the value.
4. Define the smallest meaningful token contract.
5. Update the token module and its Sass entry point.
6. Update consumers only when required.
7. Run relevant architecture tests.
8. Review generated output and the final diff.

## Boundaries

- Do not put theme-specific values in semantic or synthetic token definitions.
- Do not turn component-only props into global tokens without a reuse requirement.
- Do not bypass canonical semantic tokens with duplicate values.
- Do not change theme behavior from this Skill; use the theme-development Skill.
- Do not change public token names without compatibility review.
- Do not perform unrelated token cleanup.
