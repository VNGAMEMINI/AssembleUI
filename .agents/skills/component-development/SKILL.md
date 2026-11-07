---
name: assembleui-component-development
description: Use when creating, modifying, testing, or reviewing reusable React UI Components in AssembleUI.
---

# Component Development

Read root `AGENTS.md`, this skill, `docs/06_COMPONENTS.md`, and `docs/COMPONENT_CONTRACT.md` before substantial component work.

## Component boundaries

A Component is an independent reusable UI building block.

- Do not import another Component, Pattern, or Template into a Component.
- Reuse Core infrastructure and Design System values.
- Keep application-specific business logic outside reusable Components.
- Prefer native HTML semantics and composition through children or explicit slots.
- Avoid unnecessary state, contexts, providers, and hooks.

## Component contract

Inspect existing conventions and preserve:

- Public props and TypeScript types.
- Appropriate native HTML attributes.
- `className` merging and `style` forwarding where the contract requires them.
- Ref forwarding and correct ref types.
- Existing controlled/uncontrolled behavior.
- Stable callback semantics.
- Accessibility defaults and consumer overrides.

Do not apply a blanket root-element contract to form controls. Determine which element owns the actual control semantics.

## Styling

- Use SCSS architecture and existing tokens.
- Component TSX must not import SCSS directly.
- Do not hard-code design values when a suitable token exists.
- Do not introduce plain CSS source files.
- Preserve theme compatibility.

## Implementation

Inspect the existing component, types, tests, styles, exports, and similar components first.

Split implementation into private modules only when responsibilities are genuinely distinct. Keep public exports stable.

## Tests

Keep tests in the existing `*.test.tsx` convention. Cover rendering, props, callbacks, refs, keyboard behavior, accessibility, and relevant edge cases.

Run focused tests first, then broader checks when appropriate.
