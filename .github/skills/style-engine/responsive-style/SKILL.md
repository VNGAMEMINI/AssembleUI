---
name: responsive-style
description: Define and maintain responsive breakpoints and Sass media-query conventions in AssembleUI.
---

# Responsive Style

## Purpose

Define conventions for responsive styling in `packages/react/styles/responsive/`.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when creating, modifying, reviewing, or consuming responsive Sass utilities.

## Existing Implementation

The responsive style layer currently contains:

- `breakpoints.scss`: the `$breakpoints` Sass map.
- `media.scss`: the `media($breakpoint)` mixin.
- `index.scss`: forwards both modules.

The current breakpoint map is:

| Name | Minimum width |
|---|---:|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

The `media` mixin:

- Validates the requested key with `map.has-key`.
- Raises a Sass error for an unknown breakpoint.
- Generates a `min-width` media query.
- Exposes nested declarations through `@content`.

Inspect the source before relying on this contract.

## Responsive Principles

- Follow the existing mobile-first `min-width` convention.
- Prefer the named breakpoint map over scattered hardcoded media-query values.
- Use the smallest breakpoint that expresses the required layout change.
- Keep responsive changes close to the styles they affect.
- Avoid adding breakpoints without a demonstrated layout requirement.
- Do not create separate responsive rules when the base layout already works.
- Avoid overlapping or contradictory media queries.

## Using the Media Mixin

Use the existing mixin for breakpoint-based styles:

```scss
@use "path/to/responsive" as responsive;

.component {
  // Base styles.

  @include responsive.media(md) {
    // Styles from the md minimum width upward.
  }
}

Use only keys defined in the breakpoint map. Unknown keys are expected to produce a Sass error.

Resolve the actual import path from the consuming file. Do not copy the illustrative path blindly.

## Breakpoint Changes

When adding, removing, or changing a breakpoint:

1. Inspect all existing breakpoint definitions and consumers.
2. Confirm the change represents a real layout requirement.
3. Preserve the mobile-first `min-width` contract unless an architecture decision explicitly changes it.
4. Check the impact on component, pattern, and template layouts.
5. Keep the responsive index exports synchronized.
6. Review generated CSS for unintended changes.

Do not introduce aliases or duplicate breakpoint maps without a clear compatibility requirement.

## Sass Organization and Exports

- Keep breakpoint values in `breakpoints.scss`.
- Keep media-query behavior in `media.scss`.
- Keep the public responsive entry point in `index.scss`.
- Preserve the existing `@forward` structure.
- Do not duplicate responsive utilities in component styles.
- Do not assume a Sass `@use` statement re-exports its members.

## Validation

When changing responsive styles:

1. Search for all consumers of the affected breakpoint or mixin.
2. Validate unknown breakpoint handling.
3. Inspect generated media-query boundaries.
4. Check affected layouts at widths below, at, and above the changed breakpoint.
5. Run the existing Sass build or focused validation when available.

Do not invent test files or scripts. Inspect existing project tooling before selecting validation commands.

## Workflow

1. Inspect the responsive Sass modules.
2. Search existing breakpoint and mixin consumers.
3. Identify the smallest necessary responsive change.
4. Update the appropriate module.
5. Preserve exports and existing contracts.
6. Validate generated CSS and affected layouts.
7. Review the final diff for unrelated changes.

## Boundaries

- Do not put component-specific styles in the responsive utility layer.
- Do not put design-token definitions in breakpoint modules.
- Do not bypass the shared breakpoint map with arbitrary values without justification.
- Do not silently change `min-width` behavior.
- Do not add breakpoints solely for hypothetical future layouts.
