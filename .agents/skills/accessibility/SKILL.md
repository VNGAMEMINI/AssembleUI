---
name: assembleui-accessibility
description: Use when implementing or reviewing accessibility, keyboard interactions, focus management, semantics, ARIA, or assistive-technology behavior in AssembleUI.
---

# Accessibility

Read root `AGENTS.md`, this skill, `docs/14_ACCESSIBILITY.md`, and `docs/COMPONENT_CONTRACT.md`.

## Core principles

- Prefer native HTML semantics.
- Use ARIA only when native semantics are insufficient.
- Never add ARIA attributes merely to silence a warning.
- Accessible behavior is part of component correctness.
- Preserve consumer overrides where the public contract permits them.

## Review checklist

Inspect:

- Semantic elements and roles.
- Accessible names and descriptions.
- Labels and form relationships.
- Keyboard operation and expected key behavior.
- Focus entry, movement, restoration, and containment where applicable.
- Disabled, loading, expanded, selected, and invalid states.
- Appropriate live-region behavior.
- Contrast through the Design System.
- Nested interactive elements and event propagation.

## Interactive components

Use the correct interaction model for the widget. Do not assume every composite widget should use the same keyboard pattern.

For overlays and menus, inspect dismissal, Escape behavior, outside interaction, focus management, and scroll locking. Avoid regressions in nested overlays.

## Testing

Test keyboard behavior and focus transitions, not just ARIA attributes. Include meaningful edge cases and verify that tests reflect actual user interaction.

Do not add redundant ARIA or custom keyboard handling when native browser behavior already provides the correct result.
