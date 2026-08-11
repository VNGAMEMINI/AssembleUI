# CONTEXT.md

> This document provides the global context of AssembleUI.
>
> It explains **what AssembleUI is**, **why it exists**, **how it is organized**, and **the principles every contributor or AI assistant must understand before generating code**.
>
> Read this document before reading `RULES.md` or `SKILL.md`.

---

# Project

**Name**

```
AssembleUI
```

**Type**

```
React UI Ecosystem
```

**Language**

```
TypeScript

SCSS

React
```

---

# Vision

AssembleUI is **not** just another React Component Library.

The long-term vision is to become a complete UI Ecosystem.

```
Developer

↓

Components

↓

Patterns

↓

Templates

↓

Applications

↓

Production
```

Users should assemble interfaces instead of rebuilding them.

---

# Mission

AssembleUI exists to help developers:

- Build interfaces faster.
- Reuse UI consistently.
- Separate concerns clearly.
- Reduce duplicated code.
- Customize appearance easily.
- Scale projects without rewriting architecture.

---

# Core Philosophy

Everything follows six principles.

```
Simple

↓

Reusable

↓

Composable

↓

Flexible

↓

Performant

↓

Scalable
```

Every design decision should support these principles.

---

# Project Goals

The project focuses on

- UI Architecture
- Design System
- Reusable Components
- Theme System
- Performance
- Accessibility
- Developer Experience

The project intentionally avoids

- Backend
- Database
- Authentication
- Routing
- State Management
- Business Logic

---

# Architecture Overview

The architecture is layered.

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
Applications
```

Each layer has one responsibility.

Dependencies only flow downward.

---

# Foundation

Provides CSS foundations.

Includes

```
Reset

Normalize

Typography

Globals
```

Foundation never contains Components.

---

# Design System

Defines reusable design data.

Includes

```
Design Tokens

Themes

Icons
```

Design System contains data only.

No rendering logic.

---

# Style Engine

Transforms Design Tokens into reusable styles.

Includes

```
Functions

Mixins

Responsive

Layouts

Utilities
```

Style Engine generates styling.

It never renders UI.

---

# Core

Provides reusable application logic.

Includes

```
Hooks

Utilities

Contexts

Providers
```

Core has no visual elements.

---

# Components

Components are the smallest UI building blocks.

Examples

```
Button

Input

Card

Modal

Avatar

Badge
```

Components solve one UI problem.

---

# Patterns

Patterns combine Components.

Examples

```
Navbar

Hero

Pricing

Dashboard Header

Authentication Form
```

Patterns are reusable interface sections.

---

# Templates

Templates combine Patterns.

Examples

```
Landing Page

Dashboard

Portfolio

Documentation

Admin Panel
```

Templates are complete page layouts.

---

# Applications

Applications consume AssembleUI.

Applications own

- Business Logic
- API Calls
- Authentication
- Database
- Routing

These are outside AssembleUI.

---

# Design Tokens

Everything visual comes from Tokens.

Examples

```
Colors

Spacing

Radius

Typography

Shadow

Opacity

Motion

Breakpoint

Z-index
```

Never hardcode design values.

---

# Theme System

Themes never modify Components.

Themes only override Tokens.

```
Default

↓

Dark

↓

Corporate

↓

Custom
```

Components automatically update.

---

# Component Philosophy

Every Component should be

- Small
- Independent
- Reusable
- Accessible
- Typed
- Themeable

Components should never depend on Patterns or Templates.

---

# Composition

UI grows through composition.

```
Button

↓

Card

↓

Hero

↓

Landing
```

Never create giant Components.

---

# Styling Philosophy

Components never own design values.

```
Tokens

↓

Theme

↓

Style Engine

↓

Component
```

Component styles should be predictable.

---

# API Philosophy

Public APIs should be

- Simple
- Consistent
- Typed
- Stable

Users should not need documentation for basic usage.

---

# Accessibility

Accessibility is built into every public Component.

Support

- Semantic HTML
- Keyboard Navigation
- Focus Management
- Screen Readers
- ARIA

Accessibility is never optional.

---

# Performance

Performance is part of the architecture.

Prefer

- Tree Shaking
- CSS Variables
- Lazy Loading
- Memoization
- Minimal Runtime
- Small Bundle Size

Avoid unnecessary abstraction.

---

# Documentation

Documentation is considered part of the source code.

Every public module should provide

- Overview
- API
- Examples
- Accessibility
- Best Practices

---

# Testing

Every public module should include

- Rendering Tests
- Interaction Tests
- Accessibility Tests

Testing is part of development, not an afterthought.

---

# Repository Structure

```
assembleui/

docs/

packages/

demo/

playground/

tests/

scripts/

.github/
```

The repository is organized to separate documentation, library source, examples and tooling.

---

# Development Workflow

```
Design

↓

Design Tokens

↓

Component

↓

Pattern

↓

Template

↓

Demo

↓

Testing

↓

Documentation

↓

Release
```

Development always starts from the smallest reusable unit.

---

# Decision Making

When multiple solutions exist, prefer

```
Architecture

↓

Consistency

↓

Simplicity

↓

Reusability

↓

Performance

↓

Scalability
```

Never sacrifice architecture for short-term convenience.

---

# Audience

AssembleUI is designed for

- Individual Developers
- Teams
- Design Systems
- Startups
- Enterprise Applications
- Open Source Contributors

---

# Long-term Ecosystem

The long-term ecosystem includes

```
React Library

↓

CLI

↓

Documentation

↓

Playground

↓

VS Code Extension

↓

DevTools

↓

Website Builder

↓

Community Marketplace
```

Everything shares the same Design System and Architecture.

---

# Relationship with Other Documents

```
CONTEXT.md
        │
        ├── SKILL.md
        │
        ├── RULES.md
        │
        └── docs/
              ├── Architecture
              ├── API Design
              ├── Components
              ├── Themes
              ├── ...
```

- **CONTEXT.md** explains the project.
- **SKILL.md** explains how AI should work with the project.
- **RULES.md** defines mandatory development rules.
- **docs/** provides detailed technical documentation.

---

# Final Context

AssembleUI is a modular React UI ecosystem built around a layered architecture, a centralized Design System and a composable development model.

Every feature, Component, Pattern, Template, Theme and tool should reinforce the project's core values:

```
Simple

↓

Reusable

↓

Composable

↓

Flexible

↓

Performant

↓

Scalable
```

The goal is not to create the largest UI library, but to create one of the most maintainable, customizable and architecture-driven UI ecosystems.
