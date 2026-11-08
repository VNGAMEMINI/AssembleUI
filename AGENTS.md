# AssembleUI Instructions

## Architecture

- Build a composition-first React UI library.
- Follow `ARCHITECTURE.md` for actual layer responsibilities and dependency boundaries.
- Do not weaken architecture boundaries to make an implementation easier.
- Foundation owns low-level conventions and infrastructure.
- Design System owns design tokens, themes, icons, and design decisions.
- Style Engine owns reusable styling infrastructure.
- Core owns reusable React infrastructure such as hooks, contexts, providers, and utilities.
- Application-specific business logic belongs in the application layer.
- Follow the actual repository structure; do not create conceptual layers without justified responsibilities.
- Use TypeScript, React, and SCSS.
- Source code is the implementation source of truth.
- Preserve public APIs, behavior, accessibility, refs, and user changes.

## Dependency direction

- Component -> Pattern -> Template.
- Components are independent building blocks and must not import other Components, Patterns, or Templates.
- Patterns compose public Components and must not import Templates.
- Avoid Pattern-to-Pattern dependencies unless explicitly justified by an architecture decision.
- Templates compose Patterns and must not import other Templates.
- Avoid circular dependencies at every layer.

## File organization

Apply these conventions inside `components/`, `patterns/`, and `templates/`.

- `_name.ts` / `_name.tsx`: private logic modules.
- `Name.tsx`: separately composed UI parts, without the private `_` prefix.
- Keep the main component entry in the item root; place extracted UI parts in `module/`.
- Keep extracted UI parts focused and import them from the owning component.
- `Name.test.tsx`: primary tests for the public Component, Pattern, or Template.
- `_name.test.ts` / `_name.test.tsx`: supplementary tests for extracted private modules or UI parts.
- `_name.scss`: style partials separated by responsibility.
- `README.md`: documentation when usage or architecture needs explanation.

Place related files inside the relevant item's `module/` directory when separation is justified.

Do not split files merely to reduce line count. Split only when a responsibility is independently understandable, reusable, or difficult to maintain. Do not create empty modules or unnecessary abstractions.

Private modules must not become public exports. Keep tests close to the implementation they verify.

## Safe workflow

1. Read `git status --short`.
2. Inspect the relevant source, types, tests, imports, exports, and configuration.
3. Read existing diffs before editing modified files.
4. Understand the intended behavior and affected architecture.
5. Make the smallest complete change.
6. Verify behavior with relevant tests and checks.
7. Review the final diff and `git diff --check`.

Never discard user changes or run destructive Git commands without permission. Do not stage, commit, or push unless requested. Do not edit generated `dist/` files as source.

## Agent coordination

Use the specialized agents in `.github/agents/` when their expertise is needed:

- `orchestrator.agent.md`: understand and coordinate user requests.
- `code.agent.md`: implementation logic, defects, and tests.
- `style.agent.md`: SCSS, design tokens, cascade, and visual behavior.
- `documentation.agent.md`: README, usage guides, and code comments.

The Orchestrator owns task coordination and final reporting. Delegate only relevant work. Verify delegated results before reporting completion.

## Communication

- Understand requests in the user's language.
- Communicate between agents in English.
- Report to the user in the user's language.
- Distinguish verified results, assumptions, and unresolved issues.
- Give exact verification commands when the user must run them.
