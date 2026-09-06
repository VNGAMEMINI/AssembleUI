# 02. Architecture

AssembleUI uses a layered architecture plus an explicit composition graph. The goal is to keep responsibilities small, dependencies predictable and future expansion safe.

## Runtime architecture

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

The arrows describe dependency direction, not a runtime render order.

## Composition contract

```text
Pattern  → Component
Template → Pattern
```

Forbidden:

```text
Component → Component
Component → Pattern
Component → Template
Pattern   → Pattern
Pattern   → Template
Template  → Template
```

A Component can receive `children`. That is ordinary React composition and does not make the Component responsible for assembling other Components.

## Style architecture

React and Sass are separate dependency graphs.

```text
Application main.scss
        ↓
Foundation
        ↓
Design System
        ↓
Style Engine
        ↓
Component / Pattern SCSS
```

A React implementation file must not import its own SCSS. The application chooses the style entry.

## Foundation

Owns global browser and document-level CSS concerns:

- Reset
- Normalize
- Typography defaults
- Global rules

It contains no React components or runtime logic.

## Design System

Owns design data:

```text
Tokens
Themes
Icons
```

Tokens define reusable values. Themes override semantic CSS variables.

## Style Engine

Owns Sass mechanisms that consume the design system:

```text
functions/
mixins/
responsive/
layouts/
utilities/
```

It does not contain React rendering logic.

## Core

Owns framework infrastructure shared by Components:

```text
hooks/
contexts/
providers/
utils/
```

Core must remain free of application business logic.

## Components

Components are independent UI building blocks. A Component may use Core, Design System and Style Engine capabilities, but it does not assemble another Component.

## Patterns

Patterns compose Components into reusable sections.

```text
Hero = Container + Heading + Text + Button + Image
```

## Templates

Templates compose Patterns into page-level structures.

```text
LandingPage = Header + Hero + Features + Pricing + Footer
```

## Architecture enforcement

The repository contains architecture tests that detect invalid composition dependencies and direct SCSS imports from React source files. Architecture is therefore a technical constraint, not only a documentation convention.
