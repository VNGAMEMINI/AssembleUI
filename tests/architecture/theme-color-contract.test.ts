import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const designRoot = join(process.cwd(), "packages/react/design");

function readDesignFile(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

function extractColorTokens(source: string): Set<string> {
  return new Set(
    [...source.matchAll(/(--aui-color-[\w-]+)\s*:/g)].map(
      ([, token]) => token!,
    ),
  );
}

describe("Architecture: theme color contract", () => {
  const rootTokens = extractColorTokens(
    readDesignFile("tokens/semantic/colors.scss"),
  );
  const lightTokens = extractColorTokens(
    readDesignFile("themes/light/index.scss"),
  );
  const darkTokens = extractColorTokens(
    readDesignFile("themes/dark/index.scss"),
  );

  it("defines the same color token names in root, light and dark", () => {
    expect([...lightTokens].sort()).toEqual([...rootTokens].sort());
    expect([...darkTokens].sort()).toEqual([...rootTokens].sort());
  });

  it("provides transparent color in all three scopes", () => {
    expect(rootTokens.has("--aui-color-transparent")).toBe(true);
    expect(lightTokens.has("--aui-color-transparent")).toBe(true);
    expect(darkTokens.has("--aui-color-transparent")).toBe(true);
  });
});
