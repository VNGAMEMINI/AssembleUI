import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const compatibilityPath = join(
  process.cwd(),
  "packages/react/design/tokens/compatibility.scss",
);

const source = readFileSync(compatibilityPath, "utf8");

describe("Architecture: compatibility tokens", () => {
  const aliases = [
    ["--aui-color-primary", "--aui-token-color-primary"],
    ["--aui-color-primary-hover", "--aui-token-color-primary-hover"],
    ["--aui-color-background", "--aui-token-color-background"],
    ["--aui-color-surface", "--aui-token-color-surface"],
    ["--aui-color-surface-muted", "--aui-token-color-surface-muted"],
    ["--aui-color-text", "--aui-token-color-text"],
    ["--aui-color-text-muted", "--aui-token-color-text-muted"],
    ["--aui-color-border", "--aui-token-color-border"],
    ["--aui-color-border-hover", "--aui-token-color-border-hover"],
    ["--aui-color-success", "--aui-token-color-success"],
    ["--aui-color-warning", "--aui-token-color-warning"],
    ["--aui-color-danger", "--aui-token-color-danger"],
    ["--aui-color-info", "--aui-token-color-info"],
  ] as const;

  it("preserves legacy color aliases mapped to canonical tokens", () => {
    for (const [legacy, canonical] of aliases) {
      expect(source).toMatch(
        new RegExp(`${legacy}:\\s*var\\(${canonical}\\);`),
      );
    }
  });

  it("keeps compatibility aliases separate from semantic definitions", () => {
    expect(source).toContain("Backward-compatible aliases");
    expect(source).not.toMatch(/--aui-token-color-[\w-]+\s*:/);
  });
});
