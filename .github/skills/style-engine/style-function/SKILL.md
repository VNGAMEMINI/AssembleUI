---
name: style-function
description: Create, maintain, and use AssembleUI Sass functions for design tokens, spacing, and reusable style calculations.
---

# Style Function

## Purpose

Define conventions for Sass `@function` in the AssembleUI Style Engine.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when creating, modifying, reviewing, or consuming reusable Sass functions.

## Source Structure

Style Engine source lives in `packages/react/styles/`.

- `functions/`: reusable Sass functions.
- `responsive/`: breakpoint data and responsive media mixins.
- `mixins/`: reusable style behavior.
- `layouts/`: layout abstractions.
- `utilities/`: reusable utility styles.
- `index.scss`: public Style Engine forwarding entry.

Keep functions in `functions/` unless their responsibility clearly belongs to another existing subsystem.

## Existing Functions

### token($name)

Source: `functions/token.scss`

Returns a CSS custom property reference:

`var(--aui-token-#{$name})`

Use it to consume an existing semantic token.

### spacing($size)

Source: `functions/spacing.scss`

Returns a spacing CSS custom property reference:

`var(--aui-token-space-#{$size})`

Use it for existing spacing tokens.

Both functions return CSS `var()` references. They do not resolve token values during Sass compilation.

Do not duplicate these functions or hardcode equivalent variable construction throughout new styles.

## Design Rules

- Prefer existing design tokens over raw values.
- Use `token()` for semantic token references.
- Use `spacing()` for spacing scale references.
- Do not invent token names; verify them in `packages/react/design/`.
- Do not use a Sass function to hide component-specific styling decisions.
- Keep functions deterministic and focused on one responsibility.
- Avoid unnecessary configuration, arguments, or abstractions.
- Preserve existing function signatures unless a deliberate migration is required.

## Creating a Function

Before implementation:

1. Search existing functions and their consumers.
2. Confirm the behavior cannot be handled by an existing function.
3. Define the input contract and returned Sass/CSS value.
4. Decide whether invalid inputs need explicit validation.
5. Check whether the function belongs in the public Style Engine entry.

Implementation:

- Use Sass `@function` and `@return`.
- Follow neighboring file naming and formatting.
- Use Sass modules (`@use`) when dependencies are required.
- Avoid global Sass namespace assumptions.
- Use clear errors for invalid inputs when validation is appropriate.
- Do not silently return misleading fallback values.

## Responsive Boundary

Responsive breakpoint behavior currently belongs to `responsive/`.

- Breakpoint values are defined in `responsive/breakpoints.scss`.
- `responsive/media.scss` provides the `media($breakpoint)` mixin.
- Unknown breakpoint names raise a Sass `@error`.

Do not move responsive media-query behavior into token functions. Do not duplicate the breakpoint map in another function.

## Exports

The current export chain is:

- `functions/index.scss` loads `spacing` and `token` with `@use`.
- `styles/index.scss` forwards `functions`, `mixins`, `responsive`, `layouts`, and `utilities`.

Inspect the actual Sass module behavior before changing exports.

If a function must be publicly accessible through the Style Engine, use the appropriate `@forward` entry and verify the package's actual style entry points.

Do not assume `@use` re-exports members.

## Validation

- Compile the relevant Sass entry point after changing a function.
- Check all existing consumers when changing a function signature or return value.
- Search for affected function calls across `packages/react`.
- Run relevant style or package build checks when public style output changes.
- Add focused tests only where the repository has an established test mechanism for the behavior.
- Do not run the full React test suite for an isolated Sass-only change unless broader behavior is affected.

## Workflow

1. Inspect the function, its dependencies, exports, and consumers.
2. Confirm the smallest correct responsibility and API.
3. Implement the function in the appropriate source file.
4. Update the relevant Sass forwarding entry when required.
5. Compile the affected Sass entry point.
6. Inspect generated output and affected consumers.
7. Review the final diff for unrelated changes.

## Boundaries

- Do not redefine design-token architecture.
- Do not create or rename design tokens in this Skill.
- Do not replace mixins with functions when content blocks or emitted CSS are required.
- Do not add duplicate helpers for existing behavior.
- Do not claim a function is publicly exported without verifying the Sass entry point.
