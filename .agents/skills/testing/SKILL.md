---
name: assembleui-testing
description: Use when writing, updating, debugging, or reviewing tests, test setup, type checks, or build verification in AssembleUI.
---

# Testing

Read root `AGENTS.md`, this skill, `docs/13_TESTING.md`, and relevant source and test files.

## Test discipline

- Keep tests beside the existing implementation using the repository's established `*.test.tsx` convention.
- Extend existing test files when testing an existing component.
- Do not create separate `*.contract.test.tsx` files.
- Test observable behavior rather than private implementation details.
- Avoid brittle assertions tied to incidental markup or class ordering.
- Use the existing test utilities and environment.

## Component coverage

Where relevant, cover:

- Rendering and semantic structure.
- Props and native attribute forwarding.
- Controlled and uncontrolled state.
- Callbacks and event behavior.
- Ref forwarding.
- Keyboard interaction and focus management.
- Accessibility states.
- Disabled and loading behavior.
- Edge cases and regression scenarios.

## Debugging failures

1. Read the complete failure output.
2. Identify whether the issue is implementation, test expectation, environment, or setup.
3. Inspect related tests and source.
4. Reproduce with a focused test.
5. Fix the underlying issue without weakening meaningful assertions.

Do not disable tests or broadly change test configuration to make a failure disappear.

## Commands

Inspect `package.json` before running commands. Prefer one-shot execution:

```bash
npx vitest run path/to/file.test.tsx
npm run typecheck
npm run typecheck:public
npm run build
git diff --check
```

The `npm test` script may start watch mode; use `npx vitest run` for a one-shot run.

Report exact test counts and command results only when verified.
