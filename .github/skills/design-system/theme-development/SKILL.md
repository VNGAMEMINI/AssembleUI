---
name: theme-development
description: Develop, extend, validate, and maintain Light, Dark, and Custom themes in AssembleUI.
---

# Theme Development

## Purpose

Define conventions for theme implementation in `packages/react/design/themes/` and its integration with the React theme system.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when adding, modifying, reviewing, or testing themes and theme behavior.

## Theme Architecture

Supported themes are defined by the React Theme contract:

- `light`
- `dark`
- `custom`

Theme styles live in:

- `packages/react/design/themes/light/`
- `packages/react/design/themes/dark/`
- `packages/react/design/themes/custom/`

The theme entry point `themes/index.scss` forwards Light, Dark, and Custom.

Light and Dark are organized into role-oriented Sass modules, including background, interaction, border, text, alert, shadow, selection area, and chart styles.

Custom is an extension point for consumer-defined theme roles.

## Theme Roles

Theme-dependent CSS custom properties use the `--aui-theme-*` namespace.

Examples include:

- `--aui-theme-bg`
- `--aui-theme-fg`
- `--aui-theme-primary`
- `--aui-theme-primary-hover`
- `--aui-theme-surface`
- `--aui-theme-surface-elevated`
- `--aui-theme-border`

Inspect actual theme files before relying on a role name.

Light and Dark should provide matching values for shared theme roles.

Keep foreground, background, surface, border, interaction, and status roles visually coherent and accessible.

Use semantic tokens and primitives as appropriate when defining theme values. Do not redefine `--aui-token-*` variables inside theme files.

## Theme Independence

Keep the design layers separate:

- Primitives provide foundational values.
- Semantic tokens provide stable, theme-independent values.
- Synthetic tokens provide derived or composite values.
- Theme files define theme-dependent roles.

Theme files may consume foundational values, but must not redefine semantic or synthetic token aliases.

Token definitions must not depend on theme selectors or `--aui-theme-*` variables.

Do not move theme-specific values into semantic or synthetic token files.

## Theme Selectors

Use the established selectors:

- `[data-aui-theme="light"]`
- `[data-aui-theme="dark"]`
- `[data-aui-theme="custom"]`

Keep selectors consistent with the existing theme modules.

Do not introduce unrelated global selectors or alternate theme attributes without an architectural decision.

## Light and Dark Themes

When changing a shared theme role:

1. Inspect the corresponding Light and Dark modules.
2. Update both themes when the role is shared.
3. Preserve intentional differences in values.
4. Check foreground/background relationships and contrast.
5. Verify components consume theme roles where adaptation is required.

Do not assume that matching role names require identical values.

## Custom Theme

The Custom theme is an extension point.

- Preserve the `[data-aui-theme="custom"]` scope.
- Document the supported role variables.
- Allow consumers to override the roles they need.
- Avoid coupling Custom to internal token definitions.
- Do not require consumers to duplicate every Light or Dark value unless the public contract explicitly requires it.

Inspect the existing Custom theme before expanding its contract.

## React Theme Integration

The React theme contract is defined in `packages/react/core/contexts/ThemeContext.tsx`.

`ThemeProvider` is implemented in `packages/react/core/providers/ThemeProvider.tsx`.

Its current public options include:

- `defaultTheme`, defaulting to `light`.
- `scope`, supporting `global` and `local`.
- `children`.

### Global Scope

Global scope manages `data-aui-theme` on `document.documentElement`.

The provider tracks active global entries, resolves the active entry using nesting depth and registration order, and restores the original root attribute when the final active provider is removed.

When changing this behavior:

- Preserve nested provider precedence.
- Preserve the original root attribute.
- Ensure cleanup removes the provider entry.
- Avoid leaving stale global theme state after unmount.

### Local Scope

Local scope renders a wrapper with `data-aui-theme` set to its current theme.

Use local scope when the theme should be scoped to a subtree rather than applied to the document root.

Preserve nested local theme boundaries.

### useTheme

`useTheme` reads the current theme and setter from `ThemeContext`.

It must be used within `ThemeProvider`; the current hook throws an error outside the provider.

Preserve the public `Theme` type and context contract when modifying theme integration.

## Sass Organization

- Keep theme styles in their existing role-oriented modules.
- Update the appropriate Light and Dark modules together when shared roles change.
- Update `themes/index.scss` only when adding or changing theme entry points.
- Keep Custom theme definitions in its own extension module.
- Preserve the design entry point's existing token and theme loading behavior.
- Follow the repository's Sass conventions; do not assume `@use` re-exports members.

## Accessibility and Validation

Theme changes must preserve readable contrast and usable interaction states.

Use the existing tests:

- `tests/architecture/theme-color-contract.test.ts`
- `tests/architecture/theme-color-contrast.test.ts`
- `tests/architecture/surface-tokens.test.ts`
- `tests/core/providers/ThemeProvider.test.tsx`
- `packages/react/core/providers/ThemeProvider.test.tsx`
- `packages/react/core/hooks/useTheme/useTheme.test.tsx`

Validate relevant contracts:

- Light and Dark define shared theme roles.
- Custom uses the supported theme selector and role namespace.
- Theme files do not redefine semantic tokens.
- Theme roles meet tested contrast requirements.
- Global scope applies and restores the root theme attribute.
- Local scope applies the theme to its wrapper.
- Nested providers and theme updates behave correctly.
- `useTheme` reads the correct context and rejects usage outside a provider.

Run focused tests for the changed behavior. Do not run the entire test suite for an isolated theme documentation or style change.

## Workflow

1. Inspect the relevant Light, Dark, and Custom modules.
2. Inspect ThemeProvider, ThemeContext, and useTheme when React integration is involved.
3. Search for consumers of the affected theme roles.
4. Define the smallest compatible theme change.
5. Update corresponding theme modules.
6. Update React integration only when required.
7. Run focused architecture and provider tests.
8. Review generated styles and the final diff.

## Boundaries

- Do not redefine semantic or synthetic tokens in theme files.
- Do not put theme-dependent values in token definitions.
- Do not change the public Theme type without compatibility review.
- Do not bypass ThemeProvider's global cleanup contract.
- Do not make Custom theme depend on private implementation details.
- Do not perform unrelated token or component refactoring.
