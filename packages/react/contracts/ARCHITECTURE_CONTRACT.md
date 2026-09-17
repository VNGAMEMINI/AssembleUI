# AssembleUI Architecture Contract

## Purpose

AssembleUI is a UI assembly system.

Its purpose is to let users build interfaces by assembling
well-defined UI units instead of repeatedly implementing
complex UI structures from raw HTML and application code.

The architecture has three assembly levels:

Component → Pattern → Template

Each level has a different responsibility.

---

## 1. Component

A Component is a reusable UI unit with a clear purpose.

Examples:

- Button
- Input
- Select
- Checkbox
- Avatar
- Badge

A Component must:

- have a clear UI purpose
- expose a defined API
- have explicit TypeScript types
- be independently reusable
- be testable
- use AssembleUI styling conventions
- use semantic design tokens

A Component must not:

- import a Pattern
- import a Template
- import the Registry
- become a page-level composition

---

## 2. Pattern

A Pattern is a reusable UI concept composed from Components
and, when appropriate, other Patterns.

Examples:

- FormField
- UserCard
- NavigationSection
- SearchToolbar

A Pattern must:

- represent a meaningful UI concept
- have a clear purpose
- expose a defined API
- be independently reusable
- document its intended usage
- compose Components
- optionally compose other Patterns

A Pattern must not:

- import a Template
- import the Registry
- represent an entire web page

Pattern → Pattern is allowed.

Circular Pattern dependencies are forbidden.

---

## 3. Template

A Template is a page-level or web-level UI composition.

A Template may compose:

- Components
- Patterns

A Template must:

- represent a meaningful page or web structure
- have a clearly defined context
- expose structured Template Data when data is required
- compose Components and Patterns
- be independently testable
- document its intended usage

A Template must not:

- import another Template
- import the Registry
- become an arbitrary JSX container
- expose an uncontrolled collection of unrelated props

Template → Template is forbidden.

---

## 4. Dependency Direction

Allowed:

Foundation
  ↓
Design
  ↓
Core
  ↓
Component
  ↓
Pattern
  ↓
Template

Component → Foundation / Design / Core

Pattern → Component / Pattern

Template → Component / Pattern

Forbidden:

Component → Pattern
Component → Template

Pattern → Template

Template → Template

Any layer → Registry

---

## 5. Registry

Registry is metadata and tooling infrastructure.

Registry may describe:

- Components
- Patterns
- Templates
- categories
- status
- documentation metadata
- dependency metadata

Registry must not become a runtime dependency of UI units.

---

## 6. Assembly Principle

The three levels represent three stages:

Component
  = Create

Pattern
  = Compose

Template
  = Assemble

The user should be able to move from low-level UI
implementation toward complete interfaces without
reimplementing the same structure.

---

## 7. Extensibility

Third-party developers may extend AssembleUI.

Third-party extensions must follow the same contracts.

Extension must not redefine the meaning of:

- Component
- Pattern
- Template

Extension must preserve the dependency direction.

---

## 8. Scalability

The architecture must remain understandable when the library
contains hundreds or thousands of UI units.

Every new UI unit must have:

- identity
- purpose
- category
- API
- dependency boundary
- documentation
- tests

The number of UI units must not weaken the architecture.

---

## 9. Core Principle

AssembleUI controls not only how UI code is implemented,
but also what each UI unit means.

Correct dependency direction is a required part of the API.
