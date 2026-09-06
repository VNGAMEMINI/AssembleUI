# RULES.md

Mandatory engineering rules for AssembleUI.

## 1. Architecture

The system is layered:

```text
Foundation
    ↓
Design System
    ↓
Style Engine
    ↓
Core
    ↓
Component
    ↓
Pattern
    ↓
Template
    ↓
Application
```

Dependencies must not reverse direction.

## 2. Composition boundaries

```text
Pattern  → Component   ✅
Template → Pattern      ✅

Component → Component  ❌
Component → Pattern    ❌
Component → Template   ❌
Pattern   → Pattern    ❌
Pattern   → Template   ❌
Template  → Template   ❌
```

A Component may accept `children`; that does not make it a Pattern. Composition of Components belongs in Patterns.

## 3. Component independence

A Component is an independent UI building block.

It may depend on:

- Core hooks/utilities.
- Design System values.
- Style Engine primitives.
- Foundation conventions.
- Its own props and children.

It must not import another Component.

## 4. Style boundary

Component implementation files must never import SCSS.

Forbidden:

```ts
import "./Button.scss";
```

The application owns the style entry:

```text
main.scss
   ↓
@assemble-ui/react/styles
```

Component SCSS may remain colocated beside the Component, but its import belongs to the style graph, not the React graph.

## 5. Design Tokens

Visual values must come from Design Tokens or semantic CSS variables.

Prefer:

```scss
color: var(--aui-color-primary);
padding: var(--aui-spacing-4);
```

Do not duplicate token values inside Components.

Theme definitions are allowed to contain concrete values because a Theme is the source of those values.

## 6. Themes

Themes change Design System variables, not Component implementations.

```text
Theme
  ↓
CSS Variables
  ↓
Component Styles
```

## 7. Core

Core contains reusable UI infrastructure only:

```text
core/
├── hooks/
├── contexts/
├── providers/
└── utils/
```

No business logic, API calls, routing or application state belongs in Core.

## 8. Public API

Consumers use package exports:

```ts
import { Button } from "@assemble-ui/react";
```

Internal source paths are not part of the public API.

## 9. Accessibility

Every interactive Component must define its accessibility behavior as part of its Component Contract.

## 10. TypeScript first

Public React APIs are typed. Runtime JavaScript duplicates are not maintained beside TypeScript source files.

## 11. Testing

Architecture tests must protect dependency boundaries. Component tests must cover behavior and accessibility-relevant states.

## 12. Documentation

Architecture changes must update the relevant documentation. Documentation must describe the source architecture that actually exists.
