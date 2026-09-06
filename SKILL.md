# AssembleUI Skill

This document is the operating contract for generating or modifying AssembleUI code.

## 1. Architecture

```text
Foundation
    ↓
Design System
    ↓
Style Engine
    ↓
Core
    ↓
Components
    ↓
Patterns
    ↓
Templates
    ↓
Application
```

Composition boundaries are strict:

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

## 2. Folder structure

```text
packages/react/
├── foundation/
├── design-system/
├── styles/
├── core/
├── components/
├── patterns/
├── templates/
└── types/
```

Do not introduce an overlapping layer for convenience.

## 3. Component generation

Every implemented Component should have:

```text
Component/
├── Component.tsx
├── Component.scss
├── Component.test.tsx
├── Component.docs.md
└── index.ts
```

The React file must not import the SCSS file.

## 4. Style generation

The public style graph is loaded by the application:

```scss
@use "@assemble-ui/react/styles";
```

Keep React and Sass dependency graphs separate.

## 5. Design System

Use semantic CSS variables for component styles:

```scss
color: var(--aui-color-primary);
padding: var(--aui-spacing-4);
```

Theme changes variables, not Component implementations.

## 6. Core

Hooks, contexts, providers and utilities contain reusable UI infrastructure only. Do not place business logic, API requests or application-specific state in Core.

## 7. Quality gates

Before completing a change, run:

```bash
npm run typecheck
npm test -- --run
npm run build
npm --prefix demo run build
```

All checks must pass.
