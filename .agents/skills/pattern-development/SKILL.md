---
name: assembleui-pattern-development
description: Use when creating, modifying, composing, or reviewing reusable UI Patterns in AssembleUI.
---

# Pattern Development

Read root `AGENTS.md`, this skill, `docs/07_PATTERNS.md`, and relevant Component documentation.

## Responsibility

A Pattern is a reusable composition of Components into a meaningful interface section.

- Compose existing public Components.
- Do not reimplement a Component's internal behavior.
- Do not import Templates.
- Avoid Pattern-to-Pattern dependencies unless an explicit architecture decision permits them.
- Keep business logic and application data orchestration outside reusable Patterns.

## Composition

- Prefer explicit, typed props and composition slots.
- Keep customization predictable.
- Forward appropriate root attributes, `className`, and `style` according to the Pattern contract.
- Preserve accessibility across the complete composition.
- Avoid coupling to a specific application or route.

## Styling

Use existing Design System tokens and SCSS conventions. Do not create duplicate design values or import SCSS from TSX.

## Verification

Inspect all composed Components and their public APIs. Test composition, customization, responsive behavior where applicable, and accessibility. Update exports and documentation only when required.
