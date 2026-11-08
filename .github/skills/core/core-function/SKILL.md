---
name: core-function
description: Create, maintain, test, and export reusable TypeScript utilities in the AssembleUI Core layer.
---

# Core Function

## Purpose

Define conventions for reusable functions and utilities in `packages/react/core/`.

Follow `AGENTS.md` and `ARCHITECTURE.md`. They remain authoritative.

Use this Skill when creating, modifying, reviewing, or testing Core utilities.

## Source Structure

Core utilities currently live in `packages/react/core/utils/`.

Existing utility groups include:

- `classNames/`: class value normalization.
- `generateId/`: generated identifiers and reset support.
- `mergeRefs/`: React callback and object ref composition.
- `positioning/`: position calculation and related types.
- `accessibility/`: reusable accessibility metadata.
- `scrollLock/`: shared scroll-lock behavior.

Each utility group should keep its implementation, public entry, and focused tests together when appropriate.

The central `core/utils/index.ts` exposes selected utilities.

## Design Principles

- Keep each utility focused on one responsibility.
- Prefer deterministic, predictable behavior.
- Keep pure calculations free from DOM, React rendering, and global side effects.
- Make side effects explicit and give them a clear cleanup or release path.
- Use TypeScript types to describe input and output contracts.
- Handle nullable and optional values deliberately.
- Avoid unnecessary dependencies and abstractions.
- Do not duplicate existing Core behavior inside components.

Do not force every utility to be pure. Utilities that manage browser resources or shared state must define their lifecycle and cleanup behavior.

## Implementation Rules

### Pure Utilities

For utilities such as `classNames` and `calculatePosition`:

- Keep calculations independent of component rendering.
- Cover supported input combinations and boundary cases.
- Avoid mutating caller-owned input.
- Return stable, documented output shapes.
- Keep fallback behavior explicit.

### Stateful Utilities

For utilities such as `generateId`:

- Make state ownership and reset behavior explicit.
- Avoid unexpected resets during normal component usage.
- Test sequential calls and reset behavior.
- Do not assume module-level state is isolated across every rendering environment.

### React Ref Utilities

For utilities such as `mergeRefs`:

- Support the ref forms declared by the public TypeScript contract.
- Preserve correct generic typing.
- Handle null values and ref cleanup according to React's supported ref behavior.
- Test callback refs and mutable object refs.
- Do not silently discard a supported ref.

### Accessibility Utilities

For utilities such as `createAccessibilityMetadata`:

- Preserve caller-provided IDs and external ARIA metadata.
- Generate IDs only when required.
- Keep description and error relationships consistent.
- Do not overwrite external accessibility information without an explicit contract.
- Test combinations of description, error, external descriptions, and invalid state.

### Resource and DOM Utilities

For utilities such as `scrollLock`:

- Define when the resource is acquired and released.
- Make cleanup safe and predictable.
- Account for repeated acquisition and release.
- Avoid leaking global listeners, styles, or document state.
- Test observable side effects and cleanup behavior.

## File Organization and Exports

1. Inspect neighboring utility directories before adding files.
2. Keep implementation details private unless consumers need them.
3. Use the utility's `index.ts` for its local public exports when the directory follows that convention.
4. Update `core/utils/index.ts` only when the utility belongs in the central public utility surface.
5. Export types explicitly where they form part of the public contract.
6. Do not expose internal helpers merely for test convenience.

Follow existing naming conventions. Tests generally use `Name.test.ts` beside the utility implementation.

## Testing

Use the existing Vitest setup and conventions.

Test:

- Normal and boundary inputs.
- Null, undefined, and optional values where supported.
- Return values and observable behavior.
- State transitions and reset behavior for stateful utilities.
- Cleanup and repeated calls for side-effect utilities.
- Public TypeScript contracts where relevant.

Prefer focused unit tests. Avoid mocking implementation details when behavior can be tested directly.

Do not invent a new test framework or duplicate existing test infrastructure.

## Workflow

1. Inspect the utility, neighboring implementations, types, exports, and tests.
2. Determine whether the behavior already exists in Core.
3. Define the smallest appropriate input and output contract.
4. Implement the utility in its responsibility-specific directory.
5. Add or update focused tests.
6. Update local and central exports only when required.
7. Run the focused test file and relevant type checks.
8. Review the final diff for API changes, accidental side effects, and unrelated edits.

## Boundaries

- Do not put React components or hooks in the utility layer.
- Do not move Sass functions or mixins into Core.
- Do not create component-specific helpers in Core without a genuine reuse requirement.
- Do not change public exports without checking compatibility.
- Do not introduce browser globals into pure utilities.
- Do not perform unrelated utility cleanup.
