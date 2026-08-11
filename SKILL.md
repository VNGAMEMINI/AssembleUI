# AssembleUI Skill

> This document defines the development rules, architecture and coding standards for AssembleUI.
>
> Every generated code, component, pattern, template and documentation **must follow this file**.

---

# Project Overview

AssembleUI is a modular React UI ecosystem.

Core principles:

- Simple
- Reusable
- Composable
- Flexible
- Performant
- Scalable

---

# Documentation

Always follow the documentation in this order.

```
00 Introduction
01 Getting Started
02 Project Structure
03 Foundation
04 Design Tokens
05 Style Engine
06 Components
07 Templates
08 Themes
09 Hooks
10 Utils
11 Performance
12 Build
13 Testing
14 Accessibility
15 Contributing
16 Roadmap
17 Ecosystem
18 Architecture
19 API Design
20 Philosophy
21 Internal Standards
```

---

# Architecture

Always follow

```
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

Never reverse dependencies.

---

# Folder Structure

```
packages/react/

foundation/

design-system/

styles/

core/

components/

patterns/

templates/
```

Never change this structure.

---

# Component Rules

Each component must

- have one responsibility
- use TypeScript
- use Design Tokens
- support Theme
- support Accessibility
- have Documentation
- have Unit Test

Each component folder

```
Component/

Component.tsx

Component.scss

Component.test.tsx

Component.docs.md

index.ts
```

---

# Style Rules

Component never contains hardcoded values.

Wrong

```scss
padding: 16px;
```

Correct

```scss
padding: spacing(md);
```

or

```scss
padding: var(--aui-spacing-md);
```

---

# Theme Rules

Never use

```scss
#2563eb
```

Always use

```
Design Tokens

↓

Theme

↓

CSS Variables
```

---

# API Rules

Component API should be

```
variant

size

children

className

ref
```

Support

- controlled
- uncontrolled
- native html props

---

# Hook Rules

Hook only contains logic.

Never render UI.

---

# Utility Rules

Utility must be

- pure
- reusable
- independent

---

# Pattern Rules

Pattern is built from Components.

Never create duplicated UI.

---

# Template Rules

Template is built from Patterns.

Never implement business logic.

---

# Accessibility Rules

Every component must support

- semantic html
- keyboard
- focus
- aria
- screen reader

---

# Performance Rules

Always prefer

- tree shaking
- lazy loading
- memoization
- css variables

Never optimize by sacrificing readability.

---

# Documentation Rules

Every public module requires

- overview
- api
- examples
- accessibility
- best practices

---

# Testing Rules

Every public module requires

- render test
- interaction test
- accessibility test

---

# Coding Style

Prefer

Small modules

↓

Composable modules

↓

Reusable modules

Avoid

Large components

↓

Deep dependency

↓

Hardcoded values

---

# Dependency Rules

Allowed

```
Component

↓

Core
```

Allowed

```
Pattern

↓

Component
```

Allowed

```
Template

↓

Pattern
```

Forbidden

```
Component

↓

Pattern
```

Forbidden

```
Pattern

↓

Template
```

Forbidden

```
Core

↓

Component
```

---

# Import Rules

Public import only.

Correct

```ts
import { Button } from "@assembleui/react";
```

Never

```ts
import Button from "../Button/Button";
```

---

# Code Generation Rules

When generating code

- never break architecture
- never hardcode values
- never duplicate components
- always use Design Tokens
- always support Theme
- always support Accessibility
- always generate TypeScript
- always generate documentation
- always generate tests if required

---

# Decision Priority

When multiple implementations are possible, always choose:

```
Architecture

↓

Simplicity

↓

Consistency

↓

Reusability

↓

Performance

↓

Scalability
```

Never sacrifice architecture for convenience.

---

# Final Goal

Every generated file should integrate seamlessly into AssembleUI without requiring architectural changes.

All generated code must feel like it was written by the original AssembleUI maintainers.
