# Input

A flexible input component for user text input.

## API

- `size` - Size variant: `sm`, `md`, `lg`
- `isInvalid` - Show invalid state
- `isDisabled` - Disable input
- `className` - Additional CSS class
- `ref` - Forward ref to input element

## Examples

```tsx
<Input placeholder="Enter text" />
<Input size="lg" />
<Input isInvalid />
<Input isDisabled />
```

## Accessibility

- Semantic HTML `<input>`
- ARIA attributes for invalid and disabled states
- Full keyboard support
