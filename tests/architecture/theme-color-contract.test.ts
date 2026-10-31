import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const designRoot = join(process.cwd(), "packages/react/design");

function readDesignFile(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

function extractTokens(source: string, prefix: string): Set<string> {
  const pattern = new RegExp(`(${prefix}[\\w-]+)\\s*:`, "g");
  return new Set([...source.matchAll(pattern)].map(([, token]) => token!));
}

function readTokenSources(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory()
      ? readTokenSources(path)
      : path.endsWith(".scss")
        ? [readFileSync(path, "utf8")]
        : [];
  });
}

describe("Architecture: theme and token contract", () => {
  const rootSource = readDesignFile("tokens/semantic/colors.scss");
  const themeFiles = [
    "background.scss",
    "interact.scss",
    "border.scss",
    "text.scss",
    "alert.scss",
    "shadow.scss",
    "selection-area.scss",
    "chart.scss",
  ];

  const lightSource = themeFiles
    .map((file) => readDesignFile(`themes/light/${file}`))
    .join("\n");
  const darkSource = themeFiles
    .map((file) => readDesignFile(`themes/dark/${file}`))
    .join("\n");

  const rootTokens = extractTokens(rootSource, "--aui-token-color-");
  const lightTheme = extractTokens(lightSource, "--aui-theme-");
  const darkTheme = extractTokens(darkSource, "--aui-theme-");

  it("defines reusable semantic color tokens independently", () => {
    expect(rootTokens.size).toBeGreaterThan(0);
    expect(rootTokens.has("--aui-token-color-primary")).toBe(true);
    expect(rootTokens.has("--aui-token-color-background")).toBe(true);
    expect(rootTokens.has("--aui-token-color-transparent")).toBe(true);
  });

  it("defines theme roles independently for light and dark", () => {
    expect(lightTheme.has("--aui-theme-bg")).toBe(true);
    expect(lightTheme.has("--aui-theme-fg")).toBe(true);
    expect(lightTheme.has("--aui-theme-primary")).toBe(true);
    expect(lightTheme.has("--aui-theme-border")).toBe(true);

    expect(darkTheme.has("--aui-theme-bg")).toBe(true);
    expect(darkTheme.has("--aui-theme-fg")).toBe(true);
    expect(darkTheme.has("--aui-theme-primary")).toBe(true);
    expect(darkTheme.has("--aui-theme-border")).toBe(true);
  });

  it("keeps all tokens independent from theme-role custom properties", () => {
    for (const source of readTokenSources(join(designRoot, "tokens"))) {
      expect(source).not.toMatch(/var\s*\(\s*--aui-theme-/);
    }
  });

  it("defines semantic status colors as fixed values", () => {
    for (const token of [
      "--aui-token-color-on-primary",
      "--aui-token-color-success",
      "--aui-token-color-warning",
      "--aui-token-color-danger",
      "--aui-token-color-info",
    ]) {
      expect(rootSource).toMatch(new RegExp(`${token}:\\s*(?!var\\().+;`));
    }
  });

  it("defines status color roles in both built-in themes", () => {
    const requiredRoles = [
      "--aui-theme-on-primary",
      "--aui-theme-success",
      "--aui-theme-warning",
      "--aui-theme-danger",
      "--aui-theme-info",
    ];

    for (const role of requiredRoles) {
      expect(lightTheme.has(role), `light theme missing ${role}`).toBe(true);
      expect(darkTheme.has(role), `dark theme missing ${role}`).toBe(true);
    }
  });

  it("does not redefine token variables inside themes", () => {
    expect(extractTokens(lightSource, "--aui-token-").size).toBe(0);
    expect(extractTokens(darkSource, "--aui-token-").size).toBe(0);
  });

  it("uses distinct background and foreground values for dark mode", () => {
    expect(darkSource).toMatch(
      /--aui-theme-bg:\s*#\{\$gray-900\};/,
    );
    expect(darkSource).toMatch(
      /--aui-theme-fg:\s*#\{\$gray-50\};/,
    );
  });

  it("does not retain the duplicated theme-color namespace", () => {
    for (const source of [lightSource, darkSource]) {
      expect(source).not.toMatch(/--aui-theme-color-[\w-]+\s*:/);
    }
  });
});

describe("Architecture: custom theme contract", () => {
  const customSource = readDesignFile("themes/custom/index.scss");

  it("provides a custom theme scope", () => {
    expect(customSource).toMatch(/\[data-aui-theme="custom"\]\s*\{/);
  });

  it("documents theme-role variables as the custom theme API", () => {
    expect(customSource).toContain("--aui-theme-bg");
    expect(customSource).toContain("--aui-theme-fg");
    expect(customSource).toContain("--aui-theme-border");
    expect(customSource).toContain("--aui-theme-primary");
  });

  it("does not couple custom themes to token definitions", () => {
    expect(extractTokens(customSource, "--aui-token-").size).toBe(0);
  });
});

describe("Architecture: theme entry points", () => {
  it("loads tokens and themes from the design entry point", () => {
    const source = readDesignFile("index.scss");

    expect(source).toMatch(/@use\s+["']\.\/tokens["'];/);
    expect(source).toMatch(/@use\s+["']\.\/themes["'];/);
  });

  it("forwards all supported themes", () => {
    const source = readDesignFile("themes/index.scss");

    expect(source).toMatch(/@forward\s+["']\.\/light["'];/);
    expect(source).toMatch(/@forward\s+["']\.\/dark["'];/);
    expect(source).toMatch(/@forward\s+["']\.\/custom["'];/);
  });
});
