import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const designRoot = join(process.cwd(), "packages/react/design");

function readDesignFile(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

describe("Architecture: surface tokens", () => {
  const surfaces = readDesignFile("tokens/central/surfaces.scss");
  const lightTheme = readDesignFile("themes/light/index.scss");
  const darkTheme = readDesignFile("themes/dark/index.scss");
  const semanticColors = readDesignFile("tokens/semantic/colors.scss");

  it("maps surface aliases to semantic color tokens", () => {
    const aliases = [
      ["--aui-token-surface-page", "--aui-token-color-background"],
      ["--aui-token-surface-default", "--aui-token-color-surface"],
      ["--aui-token-surface-elevated", "--aui-token-color-surface-elevated"],
      ["--aui-token-surface-overlay", "--aui-token-color-overlay"],
    ] as const;

    for (const [alias, token] of aliases) {
      expect(surfaces).toMatch(
        new RegExp(`${alias}:\\s*var\\(${token}\\);`),
      );
    }
  });

  it("defines the elevated surface semantic token by default", () => {
    expect(semanticColors).toMatch(
      /--aui-token-color-surface-elevated:\s*var\(--aui-theme-surface-elevated,\s*#\{\$white\}\);/,
    );
  });

  it("defines dark surface roles in the theme branch", () => {
    expect(darkTheme).toMatch(
      /--aui-theme-surface-elevated:\s*#\{\$gray-700\};/,
    );
    expect(darkTheme).toMatch(
      /--aui-theme-overlay:\s*#\{\s*rgba\(\$black,\s*0\.8\)\s*\};/,
    );

    expect(darkTheme).not.toMatch(/--aui-token-[\w-]+\s*:/);
  });

  it("does not redefine surface aliases inside themes", () => {
    for (const [themeName, source] of [
      ["light", lightTheme],
      ["dark", darkTheme],
    ] as const) {
      expect(
        source,
        `${themeName} theme must use semantic tokens instead of redefining surface aliases`,
      ).not.toMatch(/--aui-token-surface-(?:page|default|elevated|overlay)\s*:/);
    }
  });

  it("keeps shadow primitives and semantic mappings consistent", () => {
    const primitives = readDesignFile("primitives/shadows.scss");
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
        new RegExp(`--aui-token-${variable}:\\s*#\\{shadows\\.\\$${variable}\\};`),
      );
      expect(semantic).not.toMatch(
        new RegExp(`--aui-shadow-${name}:\\s*`),
      );
    }
  });

  it("keeps border primitives and semantic mappings consistent", () => {
    const primitives = readDesignFile("primitives/border.scss");
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
        new RegExp(`--aui-token-border-width-${name}:\\s*#\\{border\\.\\$border-width-${name}\\};`),
      );
      expect(semantic).not.toMatch(
        new RegExp(`--aui-border-width-${name}:\\s*`),
      );
    }
  });

});
