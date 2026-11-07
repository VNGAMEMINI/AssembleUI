<!-- mermaid-ai-skills:start -->

## Mermaid Diagrams

When the user asks to create, edit, or visualize a diagram, follow the
instructions in `.github/instructions/mermaid.instructions.md`.

<!-- mermaid-ai-skills:end -->

<!-- assembleui-agent-guidance:start -->
## AssembleUI Agent Guidance

For repository-wide conventions, read `AGENTS.md` first.

Before non-trivial work, read `AGENTS.md`, the relevant task skill under `.agents/skills/`, and applicable files under `docs/`.

Load the relevant task skill from `.agents/skills/` before substantial architecture, component, pattern, template, design-system, accessibility, testing, refactoring, or public-API work.

Use the specialized agents under `.github/agents/` when their roles are useful:
- `architect.agent.md`
- `engineer.agent.md`
- `reviewer.agent.md`

Treat source code as the implementation source of truth. Preserve user changes, public contracts, dependency direction, and SCSS architecture. Inspect `git status` before editing and review the final diff.

Do not run destructive Git commands, discard user changes, or stage/commit/push unless explicitly authorized.
<!-- assembleui-agent-guidance:end -->
