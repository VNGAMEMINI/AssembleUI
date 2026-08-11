# RULES.md

> This document defines the mandatory development rules of AssembleUI.
>
> Every source file, component, hook, utility, pattern, template, documentation and generated code **must comply with these rules**.
>
> If any generated code violates a rule in this document, the generated code is considered **incorrect**.

---

# Priority

When rules conflict, follow this priority:

```
Architecture
        ↓
Internal Standards
        ↓
API Design
        ↓
Design Tokens
        ↓
Performance
        ↓
Developer Convenience
```

Convenience must never override Architecture.

---

# Rule 1 — Architecture First

Everything must follow the official architecture.

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

# Rule 2 — Single Responsibility

Every module has one responsibility.

Correct

```
Component

↓

UI
```

```
Hook

↓

Logic
```

```
Utility

↓

Helper
```

Incorrect

```
Component

↓

UI

↓

Business Logic

↓

API Request
```

---

# Rule 3 — No Circular Dependency

Forbidden

```
Button

↓

Modal

↓

Button
```

Forbidden

```
Component

↓

Pattern

↓

Component
```

Dependencies must always move downward.

---

# Rule 4 — Public API Only

Never import internal implementation.

Correct

```ts
import { Button } from "@assembleui/react";
```

Correct

```ts
import { Button } from "@/components";
```

Forbidden

```ts
import Button from "@/components/Button/Button";
```

---

# Rule 5 — No Hardcoded Values

Never write

```scss
padding: 16px;

color: #2563eb;
```

Always use

```scss
padding: var(--aui-spacing-md);

color: var(--aui-color-primary);
```

Everything must come from Design Tokens.

---

# Rule 6 — Component Never Owns Style

Component renders UI only.

Style comes from

```
Foundation

↓

Tokens

↓

Theme

↓

Style Engine
```

Component must not generate CSS dynamically.

---

# Rule 7 — Theme Never Changes Component

Theme changes Tokens.

Never Component.

Correct

```
Theme

↓

Tokens

↓

Component
```

Wrong

```
Theme

↓

Button.tsx
```

---

# Rule 8 — Component Independence

Each Component must be independent.

Allowed

```
Button

↓

Core

↓

Style Engine
```

Forbidden

```
Button

↓

Hero
```

---

# Rule 9 — Pattern Composition

Patterns may only compose Components.

Correct

```
Navbar

↓

Logo

↓

Menu

↓

Button
```

Never duplicate UI.

---

# Rule 10 — Template Composition

Templates may only compose Patterns.

Correct

```
Landing

↓

Hero

↓

Pricing

↓

Footer
```

Templates never create reusable Components.

---

# Rule 11 — Hooks Contain Logic Only

Hooks

Allowed

```
State

Effects

Memo

Callbacks
```

Forbidden

```
JSX

CSS

DOM Rendering
```

---

# Rule 12 — Utilities Must Be Pure

Utility functions

Must

- deterministic
- reusable
- stateless

Must not

- mutate globals
- manipulate DOM
- depend on React

---

# Rule 13 — API Consistency

Every public Component should follow

```
variant

size

children

className

ref
```

Naming must stay consistent across the library.

---

# Rule 14 — Accessibility Is Mandatory

Every Component must support

- Semantic HTML
- Keyboard Navigation
- Focus Management
- Screen Reader
- ARIA

Accessibility cannot be optional.

---

# Rule 15 — Performance By Design

Always prefer

- Tree Shaking
- Lazy Loading
- CSS Variables
- Memoization
- Small Bundle

Never add unnecessary runtime logic.

---

# Rule 16 — Documentation Required

Public modules require

- Documentation
- Examples
- API Reference
- Accessibility Notes
- Best Practices

No documentation.

↓

Not complete.

---

# Rule 17 — Testing Required

Every public module requires

- Render Test
- Props Test
- Event Test
- Accessibility Test

Tests are required before release.

---

# Rule 18 — TypeScript First

Never use

```ts
any;
```

Prefer

- interface
- generic
- union
- unknown

Public APIs must be strongly typed.

---

# Rule 19 — One Public Entry

Each module exposes one public entry.

Correct

```
Button/

Button.tsx

Button.scss

index.ts
```

External users import only through

```
index.ts
```

---

# Rule 20 — Keep Components Small

Preferred

```
Button

Card

Badge

Avatar
```

Avoid giant Components with dozens of responsibilities.

---

# Rule 21 — Reuse Before Creating

Before creating a new Component ask

```
Can existing Components solve this?
```

If yes

↓

Compose.

Don't duplicate.

---

# Rule 22 — No Business Logic

AssembleUI is a UI Library.

Forbidden

```
Authentication

Database

Payment

API Client

State Management
```

Business logic belongs to Applications.

---

# Rule 23 — Stable API

Never rename public Props without migration.

Wrong

```
variant

↓

type
```

Breaking changes require

- Migration Guide
- Changelog
- Version Update

---

# Rule 24 — Documentation Reflects Source

Documentation must match implementation.

Never document features that do not exist.

Never hide breaking changes.

---

# Rule 25 — Every Change Preserves Architecture

Before merging ask

```
Does this break Architecture?

Does this break API?

Does this break Performance?

Does this break Reusability?

Does this break Design Tokens?
```

If yes

↓

Redesign.

---

# Golden Rules

Always

✔ Small Modules

✔ Composition

✔ Reusability

✔ Type Safety

✔ Accessibility

✔ Performance

✔ Documentation

✔ Testing

✔ Design Tokens

✔ Stable API

Never

✘ Hardcode Values

✘ Circular Dependency

✘ Duplicate Components

✘ Large Components

✘ Business Logic

✘ Public API Breaking

✘ Theme-specific Components

✘ Hidden Side Effects

---

# Decision Tree

Whenever multiple implementations are possible:

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

↓

Developer Convenience
```

Never violate a higher priority to satisfy a lower priority.

---

# Final Principle

Every file in AssembleUI must be:

```
Independent

Composable

Reusable

Typed

Documented

Tested

Accessible

Performant
```

If a generated file cannot be dropped into the repository without breaking the architecture or coding standards, it is **not considered valid AssembleUI code**.
