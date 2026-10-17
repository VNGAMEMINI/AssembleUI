import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const designRoot = join(process.cwd(), "packages/react/design");

function readDesignFile(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

function extractTokens(source: string, prefix: string): Set<string> {
  const pattern = new RegExp(`(${prefix}[\\w-]+)\\s*:`, "g");
  return new Set(
    [...source.matchAll(pattern)].map(([, token]) => token!),
  );
}

function extractVariableReferences(
  source: string,
  prefix: string,
): Map<string, string> {
  const pattern = new RegExp(
    `(${prefix}[\\w-]+)\\s*:\\s*var\\((--aui-[\\w-]+)\\)`,
    "g",
  );

  return new Map(
    [...source.matchAll(pattern)].map(([, token, reference]) => [
      token!,
      reference!,
    ]),
  );
}

describe("Architecture: theme color contract", () => {
  const rootSource = readDesignFile("tokens/semantic/colors.scss");
  const lightSource = readDesignFile("themes/light/index.scss");
  const darkSource = readDesignFile("themes/dark/index.scss");

  const rootLegacy = extractTokens(rootSource, "--aui-color-");
  const rootTokens = extractTokens(rootSource, "--aui-token-color-");
  const darkTokens = extractTokens(darkSource, "--aui-token-color-");
  const darkThemeTokens = extractTokens(darkSource, "--aui-theme-color-");

  const rootAliases = extractVariableReferences(
    rootSource,
    "--aui-color-",
  );

  it("defines default semantic color tokens", () => {
    expect(rootTokens.size).toBeGreaterThan(0);
    expect(rootTokens.has("--aui-token-color-primary")).toBe(true);
    expect(rootTokens.has("--aui-token-color-background")).toBe(true);
    expect(rootTokens.has("--aui-token-color-transparent")).toBe(true);
  });

  it("keeps light theme on shared defaults", () => {
    expect(extractTokens(lightSource, "--aui-theme-color-").size).toBe(0);
    expect(extractTokens(lightSource, "--aui-token-color-").size).toBe(0);
  });

  it("preserves legacy color aliases in root", () => {
    expect(rootLegacy.size).toBeGreaterThan(0);
    expect(rootLegacy.has("--aui-color-primary")).toBe(true);
    expect(rootLegacy.has("--aui-color-background")).toBe(true);
    expect(rootLegacy.has("--aui-color-transparent")).toBe(true);
  });

  it("maps every legacy alias to an existing semantic token", () => {
    expect(rootAliases.size).toBe(rootLegacy.size);

    for (const [alias, target] of rootAliases) {
      expect(
        rootTokens.has(target),
        `${alias} references missing semantic token ${target}`,
      ).toBe(true);
    }
  });

  it("overrides semantic tokens directly in dark mode", () => {
    expect(darkTokens.size).toBe(rootTokens.size);
    expect(darkThemeTokens.size).toBe(0);

    for (const token of rootTokens) {
      expect(
        darkTokens.has(token),
        `Dark theme must define ${token}`,
      ).toBe(true);
    }

    expect(darkSource).toMatch(
      /--aui-token-color-primary:\s*#\{\$blue-500\};/,
    );
    expect(darkSource).toMatch(
      /--aui-token-color-background:\s*#\{\$gray-900\};/,
    );
  });

  it("keeps transparent available in the default and dark themes", () => {
    expect(rootTokens.has("--aui-token-color-transparent")).toBe(true);
    expect(darkTokens.has("--aui-token-color-transparent")).toBe(true);
  });
});

describe("Architecture: custom theme contract", () => {
  const customSource = readDesignFile("themes/custom/index.scss");
  const rootSource = readDesignFile("tokens/semantic/colors.scss");

  it("provides a custom theme scope", () => {
    expect(customSource).toMatch(/\[data-aui-theme="custom"\]\s*\{/);
  });

  it("allows consumer-defined theme overrides", () => {
    expect(customSource).not.toMatch(
      /--aui-theme-color-[\w-]+\s*:/,
    );
  });

  it("preserves the legacy alias for custom primary colors", () => {
    expect(rootSource).toMatch(
      /--aui-color-primary:\s*var\(--aui-token-color-primary\);/,
    );
  });

  it("does not require custom themes to redefine every semantic token", () => {
    const customTokens = extractTokens(customSource, "--aui-token-color-");
    const rootTokens = extractTokens(rootSource, "--aui-token-color-");

    expect(rootTokens.size).toBeGreaterThan(0);
    expect(customTokens.size).toBeLessThan(rootTokens.size);
  });
});

describe("Architecture: theme entry points", () => {
  it("loads tokens and themes from the design entry point", () => {
    const source = readDesignFile("index.scss");

    expect(source).toMatch(/@use\s+["']\.\/tokens["'];/);
    expect(source).toMatch(/@use\s+["']\.\/themes["'];/);
  });

  it("forwards all supported themes from the theme entry point", () => {
    const source = readDesignFile("themes/index.scss");

    expect(source).toMatch(/@forward\s+["']\.\/light["'];/);
    expect(source).toMatch(/@forward\s+["']\.\/dark["'];/);
    expect(source).toMatch(/@forward\s+["']\.\/custom["'];/);
  });
});
