# 06. Components

A Component is an independent, reusable UI building block.

## Contract

A Component:

- has one UI responsibility;
- owns its behavior and accessibility contract;
- accepts props and may accept `children`;
- may use Core infrastructure;
- consumes Design System values through styles;
- does not import another Component;
- does not import a Pattern or Template;
- does not import SCSS from its React implementation.

## Categories

```text
components/
├── forms/
├── navigation/
├── feedback/
├── layout/
└── data/
```

Categories organize Components by UI responsibility. They do not change the dependency rules.

## Component structure

When a Component is implemented, use:

```text
Button/
├── Button.tsx
├── Button.scss
├── Button.test.tsx
├── Button.docs.md
└── index.ts
```

The SCSS is colocated for maintainability, but it is registered through the style graph rather than imported by `Button.tsx`.

## Composition

This is valid:

```jsx
<Card>
  <CardContent />
</Card>
```

only when those elements are supplied as children by the consumer or a higher composition layer. A Component implementation itself must not import `CardContent` or another Component.

Composition belongs in Patterns:

```text
Pattern
  ↓
Card + Button + Text
```

## Styling

Prefer semantic variables:

```scss
color: var(--aui-color-primary);
padding: var(--aui-spacing-4);
border-radius: var(--aui-radius-md);
```

The application loads the public style entry:

```scss
@use "@assemble-ui/react/styles";
```
