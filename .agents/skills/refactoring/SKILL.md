---
name: assembleui-refactoring
description: Use when restructuring modules, extracting private files, simplifying implementation, or reducing coupling without changing public behavior in AssembleUI.
---

# Refactoring

Read root `AGENTS.md`, this skill, and relevant source and tests before editing.

## Non-negotiable constraints

- Preserve public APIs, exports, props, types, refs, and behavior.
- Preserve user changes and unrelated worktree changes.
- Do not edit generated files as source.
- Do not combine unrelated cleanup with a targeted refactor.
- Do not stage, commit, or push unless explicitly requested.

## Before extracting modules

Inspect:

- Source implementation.
- Public and internal types.
- Imports and exports.
- Tests and test utilities.
- Related styles.
- Call sites and package boundaries.
- Current Git diff.

Extract only when responsibilities are genuinely distinct or the existing module has become difficult to reason about. Line count alone is not sufficient.

Use private `module/` directories and `_name` private files when consistent with the surrounding project. Do not expose private files in public exports.

## Safe editing

Prefer small, guarded edits. Verify exact replacement anchors before writing. Avoid broad formatting that creates unrelated diffs.

## Verification

Run focused tests, type checks, and relevant builds. Review:

```bash
git diff --check
git diff --stat
git diff
git status --short
```

Confirm the final diff contains only intended changes.
