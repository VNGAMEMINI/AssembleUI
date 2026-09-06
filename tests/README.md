# Testing Guide

This directory contains all tests for AssembleUI.

## Structure

```
tests/
├── components/       # Component tests
│   ├── Box.test.tsx
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   ├── Flex.test.tsx
│   └── Stack.test.tsx
├── core/            # Hook and utility tests
│   ├── useDisclosure.test.tsx
│   ├── useMediaQuery.test.tsx
│   ├── useTheme.test.tsx
│   └── index.ts
├── utils.test.ts    # Utility function tests
├── setup.ts         # Test environment setup
└── README.md        # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- components/Button.test.tsx

# Run tests with coverage
npm test -- --coverage
```

## Testing Guidelines

### Components

Component tests should cover:

- Rendering and DOM structure
- Props and variants
- Event handling
- Accessibility attributes (aria-\*, role)
- Ref forwarding
- CSS classes

Example:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components";

describe("Button Component", () => {
  it("renders with default variant", () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole("button")).toHaveClass("aui-button--primary");
  });
});
```

### Hooks

Hook tests should cover:

- Initial state
- State updates
- Effect cleanup
- Error handling

Example:

```tsx
import { renderHook, act } from "@testing-library/react";
import { useDisclosure } from "@/core/hooks";

describe("useDisclosure", () => {
  it("toggles state", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.isOpen).toBe(true);
  });
});
```

### Utilities

Utility tests should cover:

- Normal inputs
- Edge cases
- Error scenarios

Example:

```tsx
import { classNames } from "@/core/utils";

describe("classNames", () => {
  it("filters falsy values", () => {
    expect(classNames("a", false, "b")).toBe("a b");
  });
});
```

## Test Dependencies

- **vitest** - Test runner
- **@testing-library/react** - React testing utilities
- **@testing-library/user-event** - User interaction simulation
- **jsdom** - DOM environment

## Coverage Goals

Target: >80% coverage for all public modules

- Components: 100%
- Hooks: 100%
- Utilities: 100%
- Providers: 90%

## Tips

1. **Write descriptive test names** - Use `it("should do X when Y is true")`
2. **Use semantic queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test behavior, not implementation** - Focus on what users see and do
4. **Keep tests isolated** - Each test should be independent
5. **Mock external dependencies** - Use vitest mocks for API calls
