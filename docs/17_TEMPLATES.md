# 17. Templates

Templates are page-level compositions built from reusable Patterns.

## Contract

```text
Template → Pattern → Component
```

A Template:

- represents a page structure;
- composes Patterns;
- does not compose another Template;
- should not contain reusable low-level Component implementations;
- should remain independent of application business logic.

## Example

```text
LandingPage
├── Header
├── Hero
├── Features
├── Testimonials
├── Pricing
├── CTA
└── Footer
```

The page is assembled from Patterns. The Patterns themselves are assembled from Components.

## Structure

```text
templates/
├── LandingPage/
│   ├── LandingPage.tsx
│   ├── LandingPage.scss
│   ├── LandingPage.test.tsx
│   ├── LandingPage.docs.md
│   └── index.ts
└── index.ts
```

## Templates are not pages owned by an application

A Template defines reusable structure. Routing, authentication, API data, database state and business rules remain application responsibilities.
