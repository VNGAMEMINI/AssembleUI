# AssembleUI — Agent Instructions

## 1. Mandatory reading

Before a non-trivial task, read:

1. `AGENTS.md` - repository-wide instructions.
2. `.agents/skills/` - task-specific workflows.
3. `docs/` - technical documentation.
4. Source code and tests - implementation truth.
4. The relevant `docs/` documents.
5. The actual source, types, tests, exports, and configuration.

Source code is the implementation source of truth. Do not assume documentation is current without checking the source.

## 2. Project principles

- Composition-first React UI library.
- Architectural hierarchy: Foundation → Component → Pattern → Template.
- Reusable behavior belongs in Core when it is genuinely cross-component infrastructure.
- Design values belong in Design System.
- Sass/SCSS is the styling source; do not introduce plain CSS source files.
- Preserve public APIs and existing consumer behavior unless explicitly asked to change them.
- Keep dependency direction explicit and avoid circular dependencies.

## 3. Repository safety

Before editing:

- Run `git status --short`.
- Inspect the target implementation and its related tests, types, imports, and exports.
- Read the relevant diff before touching already-modified files.
- Identify untracked files and preserve them.

Never run destructive Git commands or discard user changes without explicit permission. Do not stage, commit, or push unless requested.

Do not modify generated `dist/` files as source code.

## 4. Implementation workflow

1. Understand the requested behavior.
2. Identify the architectural layer.
3. Inspect existing patterns and conventions.
4. Plan the smallest correct change.
5. Implement without unrelated refactoring.
6. Add or update tests in the existing test file conventions.
7. Run relevant tests and type checks.
8. Run build checks when appropriate.
9. Review `git diff` and `git diff --check`.
10. Update documentation when behavior or architecture changes.

## 5. Technical constraints

- TypeScript and React are the implementation baseline.
- SCSS is the styling language.
- Reuse existing Core utilities and hooks when appropriate.
- Do not create abstractions solely to reduce line count.
- Split a module only when responsibilities are genuinely distinct.
- Private implementation files use the project's `_name` convention where applicable.
- Do not expose private implementation modules through public exports.
- Preserve refs, native attributes, accessibility semantics, and component contracts.

## 6. Verification

Inspect `package.json` before assuming scripts or package commands.

Common checks include:

```bash
npm run typecheck
npx vitest run
npm run build
npm run typecheck:public
git diff --check
git status --short
```

Use only checks relevant to the change, and report exactly which checks were run and their results.

## 7. Specialized skills

Load the relevant skill before substantial work:

- Architecture: `.agents/skills/architecture/SKILL.md`
- Components: `.agents/skills/component-development/SKILL.md`
- Patterns: `.agents/skills/pattern-development/SKILL.md`
- Templates: `.agents/skills/template-development/SKILL.md`
- Design System: `.agents/skills/design-system/SKILL.md`
- Accessibility: `.agents/skills/accessibility/SKILL.md`
- Testing: `.agents/skills/testing/SKILL.md`
- Refactoring: `.agents/skills/refactoring/SKILL.md`
- Public API: `.agents/skills/public-api/SKILL.md`

## 8. Communication

- Explain important architectural decisions briefly.
- Give exact commands for user-run operations.
- Never claim to have inspected local files or executed local commands unless actually done.
- Distinguish verified facts from assumptions.
- Ask before making a breaking API or architecture decision.
