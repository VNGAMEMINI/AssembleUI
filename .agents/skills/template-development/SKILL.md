---
name: assembleui-template-development
description: Use when creating, modifying, composing, or reviewing page-level Templates in AssembleUI.
---

# Template Development

Read root `AGENTS.md`, this skill, and `docs/17_TEMPLATES.md`.

## Responsibility

A Template provides page-level structure by composing Patterns.

- Reuse Patterns rather than duplicating their structure.
- Do not import other Templates.
- Do not move application business logic into reusable Templates.
- Keep routing, API calls, and application state in the application layer.
- Make page structure configurable through clear props and composition slots.

## Contracts

Preserve appropriate root attributes, `className`, `style`, and accessibility semantics. Do not expose implementation details unnecessarily.

## Styling

Use the established SCSS and Design System architecture. Avoid hard-coded global design values and application-specific style leakage.

## Verification

Test structural composition, customization, responsive layout, and accessibility. Check that all dependencies follow the intended direction and public exports remain valid.
