---
name: testing
description: Write and maintain focused tests for AssembleUI React components, patterns, templates, hooks, providers, utilities, and repository contracts.
---

# Testing

## Purpose

Define how to verify observable behavior and prevent regressions in AssembleUI.

This Skill describes testing practices. Repository architecture and mandatory rules remain governed by `AGENTS.md` and `ARCHITECTURE.md`.

## When to use

Use when:
- Adding or changing a component, pattern, or template.
- Changing hooks, providers, utilities, or shared behavior.
- Fixing a regression.
- Changing public API, accessibility, or interaction contracts.
- Adding or updating architecture and package contract tests.

## Existing test environment

- Vitest with `happy-dom`.
- Global test APIs are enabled.
- Setup file: `tests/setup.ts`.
- React tests use `@testing-library/react`.
- DOM assertions use `@testing-library/jest-dom/vitest`.
- User interactions may use `@testing-library/user-event`.
- Test discovery is configured in `vitest.config.ts`.

Do not introduce another test runner or duplicate existing test infrastructure.

## File placement and naming

- Main component, pattern, or template tests belong beside the implementation.
- Use `Name.test.tsx` for primary public behavior tests.
- Use `_name.test.ts` or `_name.test.tsx` for extracted private modules.
- Repository-wide architecture, contract, and core tests belong in the existing `tests/` structure.
- Keep tests close to the behavior they protect.
- Extend existing test files when cases belong to the same responsibility.

## Testing principles

1. Test observable behavior, not implementation details.
2. Prefer accessible queries: role and accessible name, label, placeholder, and visible text.
3. Query test IDs only when semantic queries are unsuitable.
4. Verify callbacks, state transitions, rendered output, and relevant DOM attributes.
5. Test public contracts rather than private implementation structure.
6. Avoid duplicate assertions that do not protect distinct behavior.
7. Keep each test focused on one meaningful behavior.

## React interaction tests

Consider applicable cases:

- Default rendering and default props.
- Supported variants, sizes, and states.
- Enabled and disabled behavior.
- User interaction and callback arguments.
- Controlled and uncontrolled operation.
- Keyboard interaction and focus behavior.
- Accessible name, role, labels, and ARIA state.
- Empty, boundary, and invalid input cases.
- Cleanup and behavior after rerender or unmount.

Do not add irrelevant cases merely to increase test count.

Use `userEvent` for realistic interactions where appropriate. Use `fireEvent` when a lower-level event is specifically required.

## Testing by responsibility

### Components

Test public props, rendering, interactions, accessibility, and state contracts.

### Patterns

Test composition of public Components, data mapping, child interaction, and pattern-level behavior.

### Templates

Test page-level composition, supplied data, major regions, and integration with Patterns. Avoid duplicating every child Component test.

### Hooks and providers

Test state transitions, context behavior, subscriptions, cleanup, and invalid usage where applicable. Use a small test component when a hook requires React rendering.

### Utilities

Test input/output, edge cases, invalid inputs, and deterministic behavior. Mock external dependencies only when necessary.

### Architecture and public contracts

Test dependency boundaries, exports, package contracts, and repository-wide invariants in the existing `tests/` structure.

## Async behavior and mocks

- Await asynchronous user interactions and assertions.
- Prefer `findBy*` or `waitFor` for genuinely asynchronous DOM changes.
- Do not use arbitrary delays to hide timing problems.
- Mock only external boundaries or nondeterministic dependencies.
- Restore spies and mocks when their state could leak between tests.
- Do not mock the behavior that the test is intended to verify.

## Workflow

1. Inspect implementation, types, existing tests, and relevant public contracts.
2. Identify changed behavior and regression risk.
3. Add the smallest useful set of tests.
4. Run the affected test file first.
5. Run related tests when shared behavior is affected.
6. Run type checks when TypeScript contracts change.
7. Inspect the final diff for unrelated changes.

## Verification commands

Run focused tests first:

```bash
npx vitest run path/to/Name.test.tsx```
