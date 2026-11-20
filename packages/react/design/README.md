# AssembleUI Design System

## 1. Purpose

The Design System provides foundational design values, fixed Design Tokens,
and independent Theme definitions.

Components, Patterns, and Templates consume the appropriate public
design variables. They do not define application-wide design systems.

## 2. Architecture

- `primitives/`: foundational Sass design values.
- `tokens/semantic/`: individual semantic design properties.
- `tokens/synthetic/`: composite design values built from multiple properties.
- `themes/light/`: Light Theme role definitions.
- `themes/dark/`: Dark Theme role definitions.
- `themes/custom/`: extension point for consumer-defined Theme roles.

Design Tokens and Themes are independent systems.

## 3. Design Token Contract

`--aui-token-*` variables represent fixed default design values.

- Semantic Tokens represent individual design properties.
- Synthetic Tokens represent composite values derived from multiple properties.
- Tokens do not depend on the active Theme.
- Theme switching must never modify or remap Design Tokens.

Components use Design Tokens when they need fixed design values.

## 4. Theme Contract

`--aui-theme-*` variables represent visual roles supplied by a Theme.

Themes may provide different values for the same role without changing
the Design Token system.

Components use Theme roles for visual properties that should respond
to Theme switching.

### Light

The Light Theme provides the light appearance.

### Dark

The Dark Theme provides the dark appearance.

### Custom

The Custom Theme is an extension point for consumer-defined Theme roles.
Consumers may define only the roles they need.

Custom Theme definitions use the `--aui-theme-*` namespace.
They must not redefine or remap `--aui-token-*` variables.

## 5. Theme Runtime

`ThemeProvider` manages the active Theme and synchronizes it through
the `data-aui-theme` attribute.

Supported Theme values:

- `light`
- `dark`
- `custom`

`ThemeContext` exposes `theme` and `setTheme`.

`ThemeProvider` manages the Theme attribute. It does not automatically
import component stylesheets or Theme stylesheets.

Import the required stylesheets separately.

## 6. Stylesheet Responsibilities

- `@assemble-ui/react/styles`: component, pattern, and template styles.
  It consumes Theme roles but does not define Theme palettes.
- `@assemble-ui/react/tokens`: compiled Design Token definitions.
- `@assemble-ui/react/themes`: combined Light, Dark, and Custom Theme definitions.
- `@assemble-ui/react/themes/light`: Light Theme definitions.
- `@assemble-ui/react/themes/dark`: Dark Theme definitions.

## 7. Architectural Rules

1. Design Tokens are fixed defaults and never depend on Themes.
2. Themes define `--aui-theme-*` roles independently of Design Tokens.
3. Never map `--aui-token-*` variables to `--aui-theme-*` variables.
4. Components may consume both Token values and Theme roles.
5. Theme switching changes Theme roles, not Design Tokens.
6. `ThemeProvider` manages the active Theme attribute, not stylesheet imports.
7. Custom Themes must not redefine Design Tokens.
8. Changes to public design contracts must be covered by appropriate tests.

## 8. Validation

Run the following checks from the repository root:

```bash
npm run typecheck
npm run typecheck:public
npm test -- --run
npm run build
git diff --check
