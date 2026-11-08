---
name: design-property
description: Select and use existing AssembleUI design primitives, semantic tokens, synthetic tokens, theme properties, and component properties consistently.
---

# Design Property

## Purpose

Select and use existing design properties from AssembleUI.

This Skill covers property discovery, selection, and usage. Creating, changing, or removing design properties belongs to `design-property-development`.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

## When to Use

Use this Skill when:

- Choosing spacing, sizing, radius, typography, color, motion, or other design values.
- Deciding between primitives, semantic tokens, synthetic tokens, and theme properties.
- Reviewing component styles for inconsistent or duplicated values.
- Determining whether a property should remain component-specific.
- Reusing existing design properties in components, patterns, or templates.

## Property Layers

### Design Primitives

Location: `packages/react/design/primitives/`

Foundational Sass values such as spacing, radius, typography, colors, shadows, and breakpoints.

Use primitives as foundational design-system values. In ordinary component SCSS, prefer an existing semantic token when one represents the intended meaning.

### Semantic Tokens

Location: `packages/react/design/tokens/semantic/`

Stable, reusable CSS custom properties representing design-system concepts.

Examples include:

- `--aui-token-space-4`
- `--aui-token-color-primary`
- `--aui-token-radius-full`

Prefer semantic tokens for reusable design properties in component styles.

### Synthetic Tokens

Location: `packages/react/design/tokens/synthetic/`

Derived properties that combine or express a specific design purpose.

Examples include surface, layout, transition, animation, and effect properties.

Use them when their meaning matches the requirement. Do not create or use synthetic tokens merely to duplicate semantic token values.

### Theme Properties

Location: `packages/react/design/themes/`

Theme-dependent properties whose values may differ between Light, Dark, and Custom themes.

Examples include:

- `--aui-theme-surface`
- `--aui-theme-primary`

Use theme properties for values that must adapt to the active theme. Avoid hardcoding palette colors when an appropriate theme property exists.

### Component Properties

Component-specific public API properties defined by component types and implementation.

Examples include `Progress.size` and `Progress.variant`.

Keep component-specific behavior and presentation in the component API when it does not represent a genuinely shared design-system property.

Do not turn every component size or variant into a global token.

## Selection Process

1. Identify the design concern: color, spacing, radius, typography, layout, motion, or another property.
2. Search the existing design-system source for a matching property.
3. Select the narrowest appropriate property layer.
4. Check whether the value must adapt to Light, Dark, or Custom themes.
5. Determine whether the property is shared or component-specific.
6. Reuse the existing property instead of introducing a duplicate.
7. If no suitable property exists, consult `design-property-development` before creating one.

Never invent property names. Verify every property in the source.

## Practical Guidance

- Spacing: prefer existing semantic spacing tokens.
- Radius: use the existing radius token that matches the intended shape.
- Typography: reuse existing typography properties instead of introducing arbitrary values.
- Layout: use synthetic layout tokens when their purpose matches the requirement.
- Surfaces and foregrounds: prefer theme properties for theme-dependent colors.
- Status colors: use the existing theme status properties.
- Motion: reuse existing duration and easing properties.
- Component variants: keep local unless there is a verified shared design-system concept.

## Example

The Progress component already uses properties such as:

- `--aui-theme-surface-2`
- `--aui-token-radius-full`
- `--aui-token-motion-duration-normal`
- `--aui-token-motion-ease-standard`
- `--aui-token-space-1`
- `--aui-theme-primary`
- `--aui-theme-success`
- `--aui-theme-warning`
- `--aui-theme-danger`

When working on Progress, inspect its existing types and SCSS before choosing replacements.

Do not replace component-specific `size` or `variant` API values with newly invented global tokens.

## Boundaries

- Do not redefine the design-system architecture.
- Do not modify token source files as part of property selection.
- Do not create aliases that duplicate existing properties.
- Do not use raw palette values when a matching theme property exists.
- Do not assume a property exists based on its naming pattern.
- Do not change public component APIs without an explicit requirement.

## Workflow

1. Read the relevant component types and SCSS.
2. Inspect the relevant primitive, semantic, synthetic, or theme source.
3. Confirm the selected property exists and matches the intended meaning.
4. Make the smallest necessary change.
5. Review the diff for duplicated values and unintended API changes.
