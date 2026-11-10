---
name: react-hook
description: Develop, maintain, test, and export reusable React hooks in AssembleUI.
---

# React Hook

## Purpose

Define conventions for reusable React hooks in `packages/react/core/hooks/`.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when creating, modifying, reviewing, or exporting core React hooks.

## Existing Hooks

The current hook layer contains:

- `useDisclosure`: controlled and uncontrolled disclosure state.
- `useTheme`: reads the active theme from `ThemeContext`.
- `useMediaQuery`: tracks a browser media query and its changes.
- `index.ts`: central public hook exports.

Inspect the implementation and tests before changing an existing hook contract.

## Design Principles

- A hook must represent reusable stateful behavior or React integration.
- Keep each hook focused on one responsibility.
- Follow React's Rules of Hooks.
- Keep state ownership and side effects explicit.
- Avoid unnecessary state, effects, and derived-state synchronization.
- Keep browser APIs guarded when server-side rendering or non-browser environments are possible.
- Preserve existing public APIs unless a deliberate migration is required.

## Existing Hook Contracts

### useDisclosure

The current API supports:

- `defaultIsOpen`: initial uncontrolled state, defaulting to `false`.
- `open`: optional controlled state.
- `onOpenChange`: optional notification when an open-state change is requested.

The return value contains:

- `isOpen`
- `onOpen`
- `onClose`
- `onToggle`

Important behavior:

- Controlled mode is determined by `open !== undefined`.
- Controlled actions notify through `onOpenChange` without updating internal state.
- Uncontrolled actions update internal state.
- Preserve the existing callback behavior and dependencies.

Do not silently change controlled/uncontrolled semantics.

### useTheme

The hook reads `ThemeContext` and returns its context value.

- It requires a `ThemeProvider`.
- It throws when the context is `undefined`.
- Keep provider ownership in the context/provider layer.
- Do not duplicate theme state inside the hook.

Inspect the context type and ThemeProvider contract before changing its return type or behavior.

### useMediaQuery

The hook accepts a media-query string and returns a boolean.

Current behavior:

- Reads the initial result through `window.matchMedia`.
- Returns `false` when `window` or `matchMedia` is unavailable.
- Subscribes to the media query `change` event.
- Updates the result when the query changes.
- Removes the event listener during effect cleanup.
- Re-runs its effect when the query changes.

Preserve environment guards and listener cleanup.

Do not assume that every runtime implements `matchMedia` or the same event API.

## Implementation

When creating or modifying a hook:

1. Inspect neighboring hooks and their public contracts.
2. Keep implementation files focused.
3. Define explicit parameter and return types when useful.
4. Use `useCallback`, `useMemo`, or `useEffect` only when their semantics are needed.
5. Include correct dependencies for callbacks and effects.
6. Clean up subscriptions and external resources.
7. Guard browser-only APIs where required.
8. Avoid coupling generic hooks to component-specific markup.

Do not add abstractions solely to make a small hook appear more generic.

## Testing

Keep hook tests beside their implementation using the existing `*.test.tsx` convention.

Cover relevant behavior:

- Initial state and default values.
- Controlled and uncontrolled behavior.
- Callback notifications.
- Context requirements and provider integration.
- Browser API availability.
- External event updates.
- Effect cleanup.
- Behavior when hook inputs change.

Use the existing test setup and testing utilities. Do not invent test paths or replace the repository's established conventions.

## Exports

- Export public hooks through `packages/react/core/hooks/index.ts`.
- Export public hook types when they form part of the API.
- Keep implementation-only helpers private.
- Check package-level exports before claiming a hook is publicly available.
- Preserve existing export paths and compatibility.

## Workflow

1. Inspect the target hook, related context/provider code, and tests.
2. Identify the existing public contract.
3. Make the smallest focused implementation change.
4. Add or update colocated tests.
5. Update the central hook export when necessary.
6. Run the focused test file and relevant type checks.
7. Review the final diff for API changes and unrelated edits.

## Boundaries

- Do not put component rendering logic in the core hook layer.
- Do not move provider ownership into hooks.
- Do not bypass context contracts.
- Do not access browser globals without considering runtime availability.
- Do not leave event listeners or subscriptions without cleanup.
- Do not change public hook behavior without checking consumers and tests.
