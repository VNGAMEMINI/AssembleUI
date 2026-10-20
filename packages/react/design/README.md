# AssembleUI Design System

## 1. Purpose

The design system owns design tokens and theme definitions.
Components consume the public tokens instead of defining their own
application-wide color palettes.

## 2. Architecture

- `primitives/`: foundational design values.
- `tokens/semantic/`: semantic tokens consumed by components.
- `themes/light/`: default light theme.
- `themes/dark/`: dark palette and semantic-token mappings.
- `themes/custom/`: extension point for consumer-defined overrides.

## 3. Theme Runtime

`ThemeProvider` is the application-level owner of the active theme.

Supported theme values:

- `light`
- `dark`
- `custom`

`ThemeContext` exposes `theme` and `setTheme`.
The provider synchronizes the active theme to the root HTML element
through the `data-aui-theme` attribute.

Use one application-level `ThemeProvider` unless nested-provider
behavior has been explicitly designed and tested.

## 4. Token Contract

### Semantic tokens

`--aui-token-*` variables are the stable semantic token contract.

Components should prefer semantic tokens instead of hard-coded
theme-specific color values.

### Theme palette tokens

`--aui-theme-*` variables represent values supplied by a theme.

The dark theme maps its palette to the semantic color tokens.

### Legacy aliases

`--aui-color-*` variables are compatibility aliases.

Do not remove or rename these aliases without a migration plan and
appropriate compatibility tests.

## 5. Theme Responsibilities

### Light

The light theme uses the default semantic token values.

### Dark

The dark theme defines its palette and maps semantic tokens to it.

### Custom

The custom theme is an extension point for consumers.
Consumers can override public semantic tokens without having to
redefine every token.

## 6. Architectural Rules

1. Components consume design tokens; they do not own global themes.
2. Theme switching is managed through `ThemeProvider` and `ThemeContext`.
3. Semantic token names are the stable interface between themes and components.
4. Theme-specific palette values belong in the theme layer.
5. Legacy aliases remain until a deliberate migration is completed.
6. Changes to the token contract must be covered by architecture tests.
7. Nested provider behavior must be explicitly defined before implementation.

## 7. Validation

Run the following checks from the repository root:

```bash
npm run typecheck
npm run typecheck:public
npm test -- --run
npm run build
git diff --check
```
