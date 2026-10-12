import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const designRoot = join(process.cwd(), "packages/react/design");

function readDesignFile(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

describe("Architecture: surface tokens", () => {
  const surfaces = readDesignFile("tokens/semantic/surfaces.scss");
  const lightTheme = readDesignFile("themes/light/index.scss");
  const darkTheme = readDesignFile("themes/dark/index.scss");
  const semanticColors = readDesignFile("tokens/semantic/colors.scss");

  it("maps surface aliases to semantic color tokens", () => {
    const aliases = [
      ["--aui-surface-page", "--aui-color-background"],
      ["--aui-surface-default", "--aui-color-surface"],
      ["--aui-surface-elevated", "--aui-color-surface-elevated"],
      ["--aui-surface-overlay", "--aui-color-overlay"],
    ] as const;

    for (const [alias, token] of aliases) {
      expect(surfaces).toMatch(
        new RegExp(`${alias}:\\s*var\\(${token}\\);`),
      );
    }
  });

  it("defines the elevated surface semantic token by default", () => {
    expect(semanticColors).toMatch(
      /--aui-color-surface-elevated:\s*#\{\$gray-100\};/,
    );
  });

  it("overrides semantic surface tokens in the dark theme", () => {
    expect(darkTheme).toMatch(
      /--aui-color-surface-elevated:\s*#\{\$gray-700\};/,
    );
    expect(darkTheme).toMatch(
      /--aui-color-overlay:\s*rgba\(0,\s*0,\s*0,\s*0\.8\);/,
    );
  });

  it("does not redefine surface aliases inside themes", () => {
    for (const [themeName, source] of [
      ["light", lightTheme],
      ["dark", darkTheme],
    ] as const) {
      expect(
        source,
        `${themeName} theme must use semantic tokens instead of redefining surface aliases`,
      ).not.toMatch(/--aui-surface-(?:page|default|elevated|overlay)\s*:/);
    }
  });

  it("keeps shadow primitives and semantic mappings consistent", () => {
    const primitives = readDesignFile("tokens/primitives/shadows.scss");
    const semantic = readDesignFile("tokens/semantic/shadows.scss");

    expect(primitives).toMatch(
      /\$shadow-sm:\s*0\s+1px\s+2px\s+rgb\(0\s+0\s+0\s*\/\s*5%\);/,
    );
    expect(primitives).toMatch(
      /\$shadow-md:\s*0\s+4px\s+6px\s+rgb\(0\s+0\s+0\s*\/\s*10%\);/,
    );
    expect(primitives).toMatch(
      /\$shadow-lg:\s*0\s+10px\s+15px\s+rgb\(0\s+0\s+0\s*\/\s*10%\);/,
    );

    for (const [name, variable] of [
      ["sm", "shadow-sm"],
      ["md", "shadow-md"],
      ["lg", "shadow-lg"],
    ] as const) {
      expect(semantic).toMatch(
        new RegExp(`--aui-shadow-${name}:\\s*#\\{shadows\\.\\$${variable}\\};`),
      );
    }
  });

  it("keeps border primitives and semantic mappings consistent", () => {
    const primitives = readDesignFile("tokens/primitives/border.scss");
    const semantic = readDesignFile("tokens/semantic/border.scss");

    const expected = [
      ["none", "0"],
      ["thin", "1px"],
      ["default", "1px"],
      ["medium", "2px"],
    ] as const;

    for (const [name, value] of expected) {
      expect(primitives).toMatch(
        new RegExp(`\\$border-width-${name}:\\s*${value};`),
      );
      expect(semantic).toMatch(
        new RegExp(`--aui-border-width-${name}:\\s*#\\{border\\.\\$border-width-${name}\\};`),
      );
    }
  });

});
