# 07. Patterns

Patterns are reusable UI sections composed from Components.

## Contract

```text
Pattern → Component
```

A Pattern:

- composes Components;
- does not compose another Pattern;
- does not compose a Template;
- does not redefine Component behavior;
- may expose section-level props;
- has its own accessibility and layout responsibilities.

## Examples

```text
Hero
├── Container
├── Heading
├── Text
├── Button
└── Image
```

```text
Pricing
├── Card
├── Text
├── Badge
└── Button
```

## Structure

```text
patterns/
├── Hero/
│   ├── Hero.tsx
│   ├── Hero.scss
│   ├── Hero.test.tsx
│   ├── Hero.docs.md
│   └── index.ts
└── index.ts
```

Pattern styles follow the same rule as Component styles: React files do not import SCSS.

## Why Pattern exists

Without Patterns, page-level code repeatedly assembles the same Components. Patterns provide a stable intermediate layer without turning Components into tightly coupled collections.
