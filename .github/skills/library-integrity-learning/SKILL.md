---
name: library-integrity-learning
description: Protect AssembleUI architecture and library conventions while learning from verified implementation mistakes. Use when planning, implementing, reviewing, debugging, refactoring, or maintaining any part of AssembleUI.
---

# Library Integrity and Continuous Learning

## 1. Mission

Protect the established AssembleUI architecture while improving future work through verified, reusable lessons.

Priorities:
1. Never violate repository rules to solve a local task.
2. Never repeat a previously verified mistake when its lesson applies.

## 2. Rule precedence

Follow this order:
1. Explicit user requirements.
2. AGENTS.md and established repository decisions.
3. Existing public APIs, source code, tests, and dependency structure.
4. This Skill and its verified lessons.
5. Agent assumptions.

Never use a lesson or assumption to silently override AGENTS.md.

If requirements conflict with repository rules or architecture, stop and explain the conflict. Ask before changing an established rule.

Only an explicitly authorized architecture change may revise an existing convention.

## 3. Understand before changing

1. Inspect git status and existing diffs.
2. Read relevant parts of AGENTS.md.
3. Inspect target source, types, tests, imports, exports, and dependencies.
4. Check whether the requested behavior already exists.
5. Identify the affected architecture layer.
6. Define the smallest complete change.

Do not scan unrelated packages or repeat completed analysis.

## 4. Protect library architecture

- Follow the actual repository structure; do not invent layers.
- Preserve Component → Pattern → Template dependency direction.
- Components remain independent.
- Patterns compose public Components, not Templates.
- Templates compose Patterns, not other Templates.
- Avoid circular dependencies.
- Preserve public APIs, types, behavior, accessibility, refs, and user changes.
- Use TypeScript, React, and SCSS according to repository conventions.
- Keep tokens, themes, and private modules in their established responsibilities.
- Follow file naming and module organization in AGENTS.md.

Never create duplicate components, patterns, templates, hooks, utilities, tokens, agents, or abstractions when existing code already fulfills the responsibility.

Do not create new directories or architectural structures merely for convenience or line-count reduction.

## 5. Check whether work is already complete

Before implementation:
- Search relevant source and tests.
- Inspect relevant diffs and documentation.
- Compare the requested outcome with actual behavior.

If the requested change is already implemented:
1. Do not repeat the implementation.
2. Report relevant files and evidence.
3. Explain which behavior is already supported.
4. Ask which specific part the user wants changed further.

Verify current source; do not assume old completion reports are still accurate.

## 6. Learn from mistakes

When an implementation mistake or verification failure occurs:

1. Identify expected versus actual behavior.
2. Find the root cause using source, test output, and evidence.
3. Classify the cause: implementation, assumption, test setup, environment, or repository constraint.
4. Correct the cause, not merely the symptom.
5. Verify with the narrowest relevant checks.

Never turn an unverified assumption into a permanent lesson.

### Learning record

Use lessons.md for concise, reusable lessons.

Add a lesson only when:
- The mistake and cause are evidence-based.
- It can prevent a similar future mistake.
- It does not conflict with repository rules.
- It is not already recorded.

Each entry contains:
- Symptom.
- Verified cause.
- Prevention.
- Evidence: relevant source file or test.

Merge duplicates and remove obsolete lessons when replacements are verified.

Never store credentials, private user data, lengthy logs, or speculative conclusions.

Do not automatically modify AGENTS.md, public APIs, architecture documents, agent definitions, or this Skill to record a lesson. Such changes require explicit authorization.

## 7. Repair limit

Allow at most three distinct attempts to fix the same unresolved defect.

An attempt must be a meaningful correction, not merely rerunning the same failed command.

After three unsuccessful attempts:
- Stop modifying the affected implementation.
- Do not weaken or remove tests to obtain a passing result.
- Report the defect, evidence, attempted approaches, failed checks, and uncertainty.
- Return control to the Orchestrator.

Do not continue indefinitely.

## 8. Preserve repository state

- Never discard user changes.
- Do not edit generated dist/ files as source.
- Do not stage, commit, push, or run destructive Git commands without permission.
- Never claim checks passed without evidence.
- Keep changes within the requested scope.

## 9. Completion review

1. Review the final diff.
2. Check public API and architecture impact.
3. Run relevant tests and checks.
4. Run git diff --check.
5. Record a verified reusable lesson when appropriate.

Report changed files, behavior, verification, and unresolved issues concisely.

## 10. Final principle

A new lesson improves how AssembleUI is maintained; it never grants permission to break how AssembleUI is designed.

When uncertain, preserve the existing architecture and ask before changing it.
