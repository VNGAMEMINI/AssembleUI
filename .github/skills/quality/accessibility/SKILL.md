---
name: accessibility
description: Build and review accessible React Components, Patterns, and Templates using semantic HTML, ARIA, keyboard interaction, and focus management.
---

# Accessibility

## Purpose

Use this Skill when implementing, reviewing, or testing accessibility
in AssembleUI.

`AGENTS.md` and `ARCHITECTURE.md` remain authoritative.

## Core principles

- Prefer semantic HTML elements over generic elements with ARIA roles.
- Use native browser interaction whenever it satisfies the requirement.
- Give interactive controls an accessible name.
- Associate form controls with their labels, descriptions, and errors.
- Use ARIA only when native HTML semantics are insufficient.
- Keep accessible names and descriptions meaningful and current.
- Do not add redundant or conflicting ARIA attributes.
- Preserve accessibility when composing Components into Patterns
  and Templates.

## Accessible component implementation

### 1. Semantic structure

- Choose elements according to their meaning and interaction.
- Use buttons for actions and links for navigation.
- Use headings in a meaningful document hierarchy.
- Use appropriate landmarks and native form elements.
- Do not use a generic element as an interactive control when a
  native control is appropriate.
- Do not use ARIA roles to contradict native element semantics.

### 2. Accessible names and descriptions

- Ensure controls have an accessible name.
- Prefer visible labels for form controls.
- Use `aria-label` only when a visible label is unavailable or
  inappropriate.
- Use `aria-labelledby` to reference existing visible naming content.
- Use `aria-describedby` for supplementary descriptions and errors.
- Ensure referenced IDs exist and are unique.
- Do not use placeholder text as the only accessible label.

### 3. Form validation metadata

Use the existing Core utility when its behavior matches the task:

`createAccessibilityMetadata()` from
`core/utils/accessibility/accessibility.ts`.

It supports:
- Supplied or generated control IDs.
- Description IDs.
- Error IDs.
- Merging external `aria-describedby` references.
- External `aria-invalid` values.
- Error state taking precedence for `aria-invalid`.

Keep generated IDs connected to the corresponding DOM elements.
Render description and error elements only when applicable.
Preserve external ARIA metadata when extending existing controls.

Do not duplicate this utility's behavior inside individual Components.

### 4. Keyboard interaction

- Ensure every interactive control is keyboard reachable.
- Preserve native keyboard behavior where possible.
- Use a logical and predictable focus order.
- Support the expected keyboard interaction for the chosen
  interaction pattern.
- Do not intercept keys unnecessarily.
- Respect `event.defaultPrevented` when composing keyboard handlers.
- Avoid positive `tabIndex` values.
- Do not remove visible focus indicators.

For custom composite interactions, document and test the expected
keyboard behavior.

### 5. Focus management

- Use `:focus-visible` for keyboard-oriented focus indicators.
- Use the existing `focus-ring` Sass mixin where appropriate.
- Use design tokens for focus outline width, color, and offset.
- Keep focus visible against the component's surrounding surfaces.
- For overlays, define where focus moves when opened and where it
  returns when closed.
- Prevent keyboard focus from escaping modal interaction when required.
- Handle empty focusable-element collections safely.
- Preserve caller-provided keyboard handlers.

`useDrawerFocus()` is a Drawer-specific implementation. Do not treat
it as a universal focus-management hook.

### 6. ARIA states and live regions

- Use roles and ARIA states only when their semantics are understood.
- Keep expanded, selected, checked, disabled, and invalid states
  synchronized with actual component state.
- Use `aria-live` only when dynamic updates need announcement.
- Choose an appropriate announcement priority.
- Avoid announcing unchanged or excessively frequent content.
- Hide purely decorative content from assistive technology when
  appropriate.
- Do not hide meaningful content from the accessibility tree.

### 7. Color and visual accessibility

- Do not communicate meaning through color alone.
- Verify text and relevant UI contrast using the existing theme
  contrast tests.
- Preserve visible focus indicators.
- Respect reduced-motion preferences when introducing motion.
- Avoid relying on visual position or shape as the only instruction.

## Composition workflow

When building Patterns or Templates:

- Check the accessibility of every composed interactive element.
- Give repeated controls distinguishable accessible names when needed.
- Preserve labels, descriptions, IDs, and ARIA relationships.
- Keep page headings and landmarks meaningful.
- Avoid adding duplicate announcements or nested interactive controls.
- Test the composed result, not only its individual Components.

## Testing workflow

Keep accessibility tests alongside the affected implementation
using existing Vitest and Testing Library conventions.

Test applicable behavior:

- Accessible names and roles.
- Label and description associations.
- Error and invalid states.
- ARIA relationships and referenced IDs.
- Keyboard reachability and expected key behavior.
- Focus entry, containment, and restoration for overlays.
- Visible focus styling through relevant style or contract checks.
- Semantic structure and meaningful document hierarchy.
- Theme contrast using existing architecture tests.

Prefer queries by role and accessible name when testing user-facing
controls.

Do not rely exclusively on snapshots or implementation-specific
selectors for accessibility assertions.

## Validation

1. Run tests for the affected Component, Pattern, or Template.
2. Run relevant Core accessibility utility tests when changing
   shared accessibility metadata.
3. Run relevant theme contrast tests when changing theme colors.
4. Run relevant architecture and contract tests.
5. Run applicable type checks.
6. Run `git diff --check` and inspect the final diff.

Use existing repository scripts and avoid unrelated full-suite runs.

## Boundaries

This Skill does not redefine:

- Repository rules in `AGENTS.md`.
- Dependency boundaries in `ARCHITECTURE.md`.
- Component, Pattern, or Template implementation workflows.
- Core utility API design.
- Design-token and theme conventions.
- General testing policies.

Use the relevant specialist Skill for those responsibilities.
