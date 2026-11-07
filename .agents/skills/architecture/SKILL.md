---
name: assembleui-architecture
description: Use when analyzing or changing AssembleUI architecture, dependency direction, layer ownership, module boundaries, or repository structure.
---

# AssembleUI Architecture

## Read first

Read root `AGENTS.md`, this skill, and relevant architecture documentation. Inspect actual source before relying on documentation.

## Layer responsibilities

- Foundation: low-level foundational conventions and infrastructure.
- Design System: tokens, themes, icons, and design decisions.
- Style Engine: reusable styling infrastructure.
- Core: reusable React infrastructure such as hooks, contexts, providers, and utilities.
- Component: independent reusable UI building blocks.
- Pattern: composition of Components into reusable interface sections.
- Template: composition of Patterns into page-level structures.
- Application: application-specific business behavior and integration.

Follow the actual repository structure; do not create missing layers merely because they appear in a conceptual diagram.

## Dependency direction

The composition hierarchy is:

`Component → Pattern → Template`

This means higher-level structures may compose lower-level structures, not the reverse.

- Components must not import other Components, Patterns, or Templates.
- Patterns compose Components and must not import Templates.
- Templates compose Patterns.
- Avoid circular dependencies at every level.
- Core must not become a home for application-specific business logic.

Check existing imports before changing dependencies. Investigate unexpected imports instead of deleting them blindly.

## Decision process

Ask:

1. Is this a design value? Use Design System.
2. Is this reusable React infrastructure? Consider Core.
3. Is this an independent UI building block? Consider Component.
4. Does it compose Components? Consider Pattern.
5. Does it compose Patterns into a page structure? Consider Template.
6. Is it application-specific? Keep it in the application.

## Change discipline

- Prefer the smallest architectural change that solves the real problem.
- Do not introduce a new layer without a stable responsibility and dependency direction.
- Do not create abstractions for hypothetical future requirements.
- Update tests and documentation when architectural rules change.
- Preserve public APIs unless a change is explicitly authorized.

## Verification

Inspect imports, exports, tests, and package boundaries. Run relevant architecture tests, type checks, and build checks. Review the final diff for unintended changes.
