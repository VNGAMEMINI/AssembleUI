# AssembleUI — SKILL

> Operating guide for AI agents and contributors working inside the AssembleUI repository.

---

## 1. Purpose

This file defines how an AI agent should understand, modify, extend, test, and maintain AssembleUI.

`SKILL.md` is an **operational document**.

It is not the architecture specification and not the user API documentation.

Use the documents in this order:

```text
SKILL.md
   ↓
CONTEXT.md
   ↓
RULES.md
   ↓
docs/
   ↓
source code
```

Responsibilities:

| File         | Responsibility                                |
| ------------ | --------------------------------------------- |
| `SKILL.md`   | How to work on the repository                 |
| `CONTEXT.md` | What AssembleUI is and its current context    |
| `RULES.md`   | Architectural rules that must not be violated |
| `docs/`      | Human-facing technical documentation          |
| Source code  | Actual implementation                         |

---

# 2. Core Objective

AssembleUI is a React UI library designed around **composition**.

The system separates UI into four levels:

```text
Foundation
    ↓
Component
    ↓
Pattern
    ↓
Template
```

The main composition rule is:

```text
Component → Pattern → Template
```

Each level has a different responsibility.

Do not collapse these levels merely to reduce the number of files.

---

# 3. Architectural Model

## 3.1 Foundation

Foundation provides the lowest-level visual and structural infrastructure.

Examples:

```text
foundation/
├── reset.scss
├── normalize.scss
├── typography.scss
├── globals.scss
└── index.scss
```

Foundation must not depend on Components, Patterns, or Templates.

```text
Foundation
    ↓
X Component
X Pattern
X Template
```

---

## 3.2 Design System

Design System contains reusable design decisions.

```text
design/
├── tokens/
├── themes/
└── icons/
```

The dependency direction is:

```text
Primitive Tokens
      ↓
Semantic Tokens
      ↓
Theme
      ↓
CSS Custom Properties
```

Components should consume semantic values rather than hard-coded design values.

Prefer:

```scss
color: var(--aui-color-primary);
```

Avoid:

```scss
color: #2563eb;
```

unless the value is intentionally local and not part of the design system.

---

# 4. Style System

AssembleUI uses **Sass/SCSS** as its stylesheet authoring system.

Do not introduce plain `.css` source files as an alternative architecture.

The style flow is:

```text
Application
    ↓
@assemble-ui/react/styles
    ↓
Foundation
    ↓
Design Tokens
    ↓
Themes
    ↓
Style Engine
    ↓
Component styles
```

The application should load the public style entry once.

Example:

```tsx
import "@assemble-ui/react/styles";
```

Components should not independently import the global AssembleUI stylesheet.

---

# 5. Component Rules

A Component is the smallest reusable UI building block.

Examples:

```text
Button
Input
Badge
Avatar
Card
Modal
```

A Component should be:

- reusable
- predictable
- independently testable
- configurable through props
- visually controlled through the design system
- free from application-specific business logic

---

## 5.1 Component dependencies

A Component must not import another Component.

Invalid:

```text
Button
  ↓
Card
```

Invalid:

```tsx
import { Button } from "../Button";
```

inside another Component implementation.

The rule is:

```text
Component
   ↓
Foundation / Design / Core
```

not:

```text
Component
   ↓
Component
```

If two Components need to appear together, composition should happen at a higher level.

---

# 6. Pattern Rules

A Pattern is a reusable composition of Components.

Example:

```text
Hero
├── Heading
├── Text
└── Button
```

Therefore:

```text
Pattern
   ↓
Component
```

is valid.

A Pattern should not become another hidden Component layer.

Avoid:

```text
Pattern
   ↓
Pattern
```

unless the architecture explicitly defines a future nested-pattern mechanism.

For the current architecture, keep Patterns compositionally simple and predictable.

---

# 7. Template Rules

A Template represents a reusable page-level structure.

Example:

```text
LandingPage
├── Header Pattern
├── Hero Pattern
├── Feature Pattern
├── CTA Pattern
└── Footer Pattern
```

Therefore:

```text
Template
   ↓
Pattern
   ↓
Component
```

is valid.

Templates should not contain application-specific business logic.

A Template defines structure.

The consuming application defines:

- real data
- routing
- API calls
- authentication
- application state
- business rules

---

# 8. Dependency Direction

The complete dependency model is:

```text
Foundation
     ↑
Design System
     ↑
Style Engine
     ↑
Core
     ↑
Component
     ↑
Pattern
     ↑
Template
```

More precisely:

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
```

Higher layers may use lower layers.

Lower layers must never import higher layers.

Never create circular dependencies.

Invalid:

```text
Component
   ↓
Pattern
   ↓
Component
```

Invalid:

```text
Pattern
   ↓
Template
   ↓
Pattern
```

---

# 9. Public API

The primary public API is:

```tsx
import { Button, Card, Hero, LandingPage } from "@assemble-ui/react";
```

The package should provide a unified public entry point.

Granular imports may exist:

```tsx
import { Button } from "@assemble-ui/react/components";
import { Hero } from "@assemble-ui/react/patterns";
import { LandingPage } from "@assemble-ui/react/templates";
```

but these are secondary entry points.

When adding a new public component, verify that its intended public export is correctly connected.

Check:

```text
implementation
    ↓
layer index
    ↓
package index
    ↓
public API
```

Do not expose internal implementation files directly unless there is an explicit architectural reason.

---

# 10. Data Flow

AssembleUI should separate UI structure from application data.

The intended flow is:

```text
Application Data
      ↓
Template
      ↓
Pattern
      ↓
Component
      ↓
DOM
```

Data should normally flow downward through props.

Example:

```tsx
<Hero
  title="Build faster"
  description="Compose your interface."
  action={{
    label: "Get started",
    href: "/start",
  }}
/>
```

The UI layer should not silently fetch application data.

Avoid putting:

```text
API requests
database access
authentication
business rules
application state
```

inside reusable Components.

---

# 11. State and Logic

Before adding state, determine where the state belongs.

Use this decision:

```text
Is it purely visual state?
        ↓
Component / Core

Is it reusable interaction state?
        ↓
Hook / Core

Is it page composition state?
        ↓
Pattern / Template

Is it application/business state?
        ↓
Application
```

Do not move application state into a Component merely because it is convenient.

---

# 12. Adding a New Component

When creating a Component:

### Step 1 — Identify responsibility

Ask:

```text
Is this truly a primitive/reusable UI element?
```

If yes, create a Component.

If it combines several Components, consider a Pattern instead.

---

### Step 2 — Create the implementation

Follow the existing Component structure.

Do not introduce a new architecture for a single Component.

---

### Step 3 — Add styles

Use the existing Sass architecture.

Prefer:

```text
component/
├── Component.tsx
├── Component.scss
└── index.ts
```

when the existing implementation convention uses colocated component styles.

Do not introduce CSS.

---

### Step 4 — Connect exports

Update the appropriate:

```text
component index
    ↓
components index
    ↓
package public index
```

---

### Step 5 — Add tests

Test behavior rather than implementation details.

At minimum verify:

- rendering
- important props
- interaction
- accessibility behavior
- edge cases relevant to the Component

---

### Step 6 — Verify

Run:

```bash
npm run typecheck
npm test
npm run build
```

Do not consider the Component complete until the relevant checks pass.

---

# 13. Adding a Pattern

Before creating a Pattern, identify the Components it composes.

Example:

```text
Hero
├── Heading
├── Text
└── Button
```

The Pattern may import these Components.

```text
Hero
 ↓
Heading
Text
Button
```

It must not duplicate their implementation.

Do not copy a Button implementation into Hero.

Reuse the existing Component.

---

# 14. Adding a Template

Before creating a Template, identify the Patterns it composes.

Example:

```text
LandingPage
├── Header
├── Hero
├── Features
├── Testimonials
└── Footer
```

The Template should primarily define:

- page structure
- composition
- layout relationships
- slots/regions
- configurable page-level properties

Do not place business-specific logic into the Template.

---

# 15. Modifying Existing Code

Before modifying code:

```text
1. Find the implementation.
2. Find its public export.
3. Find its tests.
4. Find its styles.
5. Check its dependencies.
6. Check related documentation.
```

Never modify only the first file that appears to contain the problem.

A change must be evaluated across:

```text
Implementation
Exports
Styles
Tests
Build
Documentation
Dependencies
```

---

# 16. Repository Investigation

When entering an unfamiliar area, inspect before editing.

Recommended commands:

```bash
pwd
git status
find packages/react -maxdepth 3 -type f | sort
```

Then inspect the relevant files:

```bash
cat packages/react/package.json
cat packages/react/index.ts
```

For a specific layer:

```bash
find packages/react/components -type f | sort
find packages/react/patterns -type f | sort
find packages/react/templates -type f | sort
```

Search for imports:

```bash
grep -R "from .*components" packages/react
grep -R "from .*patterns" packages/react
grep -R "from .*templates" packages/react
```

Use these searches to detect architectural violations before making changes.

---

# 17. Architectural Verification

After modifying the repository, check for forbidden dependency directions.

Search for Component-to-Component imports:

```bash
grep -R "from .*components" packages/react/components
```

Search for Component-to-Pattern imports:

```bash
grep -R "from .*patterns" packages/react/components
```

Search for Component-to-Template imports:

```bash
grep -R "from .*templates" packages/react/components
```

Search Pattern dependencies:

```bash
grep -R "from .*patterns" packages/react/patterns
grep -R "from .*templates" packages/react/patterns
```

Any unexpected result must be investigated.

Do not automatically delete an import without understanding why it exists.

---

# 18. Testing Strategy

Testing follows the same architectural levels.

```text
Component
   ↓
Component tests

Pattern
   ↓
Pattern composition tests

Template
   ↓
Template structure tests

Package
   ↓
Public API / export tests
```

The public API must be tested separately from internal implementation.

For example:

```tsx
import { Button } from "@assemble-ui/react";
```

and:

```tsx
import { Button } from "@assemble-ui/react/components";
```

should be verified according to the package's supported exports.

---

# 19. Build Verification

The minimum verification pipeline is:

```bash
npm run typecheck
npm test
npm run build
```

If styles are involved, verify the generated stylesheet as well.

Check:

```bash
find packages/react/dist -maxdepth 2 -type f | sort
```

The final package must contain the expected:

```text
JavaScript
TypeScript declarations
Styles
```

and the public package exports must point to valid files.

---

# 20. Fixing Build Problems

When a build fails, classify the problem first.

```text
TypeScript error
      ↓
typecheck

Module resolution error
      ↓
exports / paths / aliases

Sass error
      ↓
token / import / Sass architecture

Runtime error
      ↓
component / hook / logic

Test error
      ↓
behavior / environment / API

Package export error
      ↓
package.json + dist + export test
```

Do not randomly modify unrelated files.

---

# 21. Sass Debugging

For Sass errors, inspect the import chain.

Example:

```text
demo/styles/main.scss
        ↓
tokens/index.scss
        ↓
semantic/colors.scss
        ↓
primitive token
```

Then verify whether the required Sass variable is actually available.

Useful command:

```bash
grep -R '\$blue-600' packages/react
```

Inspect imports:

```bash
grep -R '@use\|@forward' packages/react/design
```

Never solve a token visibility problem by duplicating the variable in another file.

Fix the token architecture instead.

---

# 22. Package Export Debugging

When an import such as:

```tsx
import { Button } from "@assemble-ui/react/components";
```

fails:

### Check package exports

```bash
cat packages/react/package.json
```

### Check build output

```bash
find packages/react/dist -type f | sort
```

### Check declaration output

```bash
find packages/react/dist -name "*.d.ts" | sort
```

### Check the package directly

```bash
npm run build
npm test
```

The three systems must agree:

```text
Source
  ↓
Build output
  ↓
package.json exports
```

---

# 23. Documentation Synchronization

Code and documentation must describe the same architecture.

When an architectural rule changes, inspect:

```text
README.md
CONTEXT.md
RULES.md
SKILL.md
docs/
```

Search for outdated terminology:

```bash
grep -R "@assembleui/react" \
  --include="*.md" \
  --include="*.mdx" \
  .
```

Search for old dependency descriptions:

```bash
grep -R "Component.*Component" \
  --include="*.md" \
  .
```

Do not leave contradictory architecture statements in different documents.

---

# 24. Change Management

Prefer small, controlled changes.

Use this process:

```text
Inspect
  ↓
Understand
  ↓
Plan
  ↓
Modify
  ↓
Typecheck
  ↓
Test
  ↓
Build
  ↓
Inspect diff
  ↓
Document
```

Do not perform a large refactor when a local fix is sufficient.

However, if the current architecture is internally contradictory, fix the architectural root instead of accumulating patches.

---

# 25. Git Safety

Before changes:

```bash
git status
```

After changes:

```bash
git diff --stat
git diff
```

Before committing:

```bash
npm run typecheck
npm test
npm run build
git status
```

Do not discard unrelated user changes.

Never use destructive commands such as:

```bash
git reset --hard
git clean -fd
```

unless explicitly authorized.

---

# 26. Naming

Names must communicate architectural responsibility.

Use:

```text
Component
Pattern
Template
Hook
Utility
Token
Theme
```

Avoid ambiguous names such as:

```text
Common
Helper
Manager
Thing
Base
Misc
```

unless their responsibility is clearly defined.

A filename should make its layer and responsibility understandable.

---

# 27. When to Create a New Layer

Do not create a new architectural layer for every problem.

Before creating a directory, ask:

```text
Can the problem be solved inside an existing layer?
```

Create a new layer only when:

1. the responsibility is fundamentally different,
2. the dependency direction is clear,
3. the layer has a stable purpose,
4. the layer will likely contain multiple related modules.

Architecture should become clearer as the project grows, not more fragmented.

---

# 28. Performance

Prefer composition over duplication.

Avoid:

```text
same UI
   ↓
copied into multiple Templates
```

Prefer:

```text
Component
   ↓
Pattern
   ↓
multiple Templates
```

Avoid unnecessary runtime abstractions.

Do not introduce hooks, contexts, providers, or state management unless they solve a real problem.

---

# 29. Accessibility

Accessibility is part of Component correctness.

When creating or modifying Components, check:

- semantic HTML
- keyboard interaction
- focus behavior
- labels
- accessible names
- ARIA usage where necessary
- disabled/loading states
- contrast through the design system

Do not add ARIA attributes merely to silence a warning.

Use native HTML semantics whenever possible.

---

# 30. Error Handling

Errors should be handled at the appropriate layer.

```text
Component
    ↓
UI validation / rendering concerns

Core
    ↓
Reusable logic errors

Application
    ↓
Business/API errors
```

Do not introduce global error handling into individual Components.

---

# 31. Decision Process

When uncertain where code belongs, use:

```text
Is it a design value?
        ↓
Design System

Is it Sass infrastructure?
        ↓
Style Engine / Foundation

Is it reusable UI?
        ↓
Component

Does it compose Components?
        ↓
Pattern

Does it compose Patterns into a page?
        ↓
Template

Is it reusable React behavior?
        ↓
Core / Hook

Is it application-specific?
        ↓
Application
```

This decision tree should be used before creating new files.

---

# 32. Forbidden Shortcuts

Never solve a problem by:

```text
❌ importing a Component into another Component
❌ importing a Pattern into a Component
❌ importing a Template into a Component
❌ adding application logic to reusable UI
❌ duplicating design tokens
❌ hard-coding global design values
❌ adding plain CSS to replace Sass architecture
❌ creating circular dependencies
❌ bypassing public exports
❌ modifying generated dist files as the source of truth
❌ disabling tests to make the build pass
❌ hiding architectural errors with aliases
```

Generated files are outputs.

Source files are the source of truth.

---

# 33. Required Verification Checklist

Every meaningful code change should end with:

```text
[ ] Correct architectural layer
[ ] Dependency direction preserved
[ ] No circular dependency
[ ] Public exports updated if necessary
[ ] Sass architecture preserved
[ ] Tokens reused correctly
[ ] Tests added/updated
[ ] Typecheck passes
[ ] Tests pass
[ ] Build passes
[ ] Documentation updated when behavior/architecture changed
[ ] Git diff reviewed
```

---

# 34. Standard Agent Workflow

Use this workflow for every non-trivial task.

```text
START
  │
  ▼
Read SKILL.md
  │
  ▼
Read CONTEXT.md
  │
  ▼
Read RULES.md
  │
  ▼
Inspect repository
  │
  ▼
Identify affected layer
  │
  ▼
Check dependencies
  │
  ▼
Make the smallest correct change
  │
  ▼
Typecheck
  │
  ▼
Test
  │
  ▼
Build
  │
  ▼
Review architecture
  │
  ▼
Review git diff
  │
  ▼
Update documentation if necessary
  │
  ▼
END
```

---

# 35. Final Principle

The most important principle of AssembleUI is:

```text
Do not make the architecture convenient for one feature.

Make the architecture predictable for the next hundred features.
```

The library must remain:

```text
Composable
Predictable
Extensible
Testable
Maintainable
Customizable
```

while preserving the dependency direction:

```text
Component
    ↓
Pattern
    ↓
Template
```

and the style direction:

```text
Foundation
    ↓
Tokens
    ↓
Themes
    ↓
Style Engine
    ↓
UI
```

When a proposed change conflicts with these principles, stop and reassess the architecture before implementing the change.
