# Button

`Button` triggers an action using an accessible native `button` element.

## Usage

```tsx
import { Button } from "@assemble-ui/react";
import "@assemble-ui/react/styles";

<Button variant="primary" size="md">
  Save changes
</Button>;
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `primary \| secondary \| danger \| ghost` | `primary` | Visual treatment. |
| `size` | `sm \| md \| lg` | `md` | Button spacing. |
| `loading` | `boolean` | `false` | Disables the button and adds `aria-busy`. |

All native `button` attributes are supported. `type` defaults to `button` to prevent unintended form submission.

## Accessibility

- Uses a semantic `button` element.
- Keeps the visible label available to assistive technology while loading.
- Disables interaction when `disabled` or `loading` is true.
- Provides a visible keyboard focus ring.
