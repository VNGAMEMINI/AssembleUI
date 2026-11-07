---
name: assembleui-design-system
description: Use when changing design tokens, themes, icons, SCSS foundations, style infrastructure, or visual consistency in AssembleUI.
---

# Design System

Read root `AGENTS.md`, this skill, `docs/03_FOUNDATION.md`, `docs/04_DESIGN_TOKENS.md`, `docs/05_STYLE_ENGINE.md`, and `docs/08_THEMES.md`.

## Source conventions

- SCSS is the styling source language.
- Do not introduce plain CSS source files.
- Reuse existing token and theme infrastructure.
- Do not duplicate a token under another name to work around an import problem.
- Component TSX must not import SCSS directly.
- Consumer applications should use the supported package style entry.

## Token architecture

The current source tree uses:

- `packages/react/design/tokens/semantic/`
- `packages/react/design/tokens/synthetic/`

Project terminology:

- Semantic tokens represent a single semantic design role/value.
- Synthetic tokens represent composite or multi-value design constructs.

Do not reintroduce `central/` or assume a `primitive/` directory exists without verifying the source.

## Themes

Inspect `packages/react/design/themes/` before changing theme behavior.

Preserve the supported light, dark, and custom theme conventions and the `[data-aui-theme="..."]` selector contract. Theme changes should alter Design System values rather than component implementation.

Check compatibility styles and existing CSS custom property mappings before renaming or moving tokens.

## Debugging

Trace the Sass `@use` / `@forward` chain. Verify token ownership and visibility at the source. Do not fix missing token visibility by duplicating variables.

## Verification

Run relevant Sass builds, tests, and package builds. Inspect generated styles as outputs, not as source files. Update documentation when token or theme contracts change.
