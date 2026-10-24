import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const designRoot = join(process.cwd(), "packages/react/design");

function readDesignFile(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

describe("Architecture: surface tokens", () => {
  const surfaces = readDesignFile("tokens/synthetic/surfaces.scss");
  const lightTheme = readDesignFile("themes/light/background.scss");
  const darkTheme = readDesignFile("themes/dark/background.scss");
  const semanticColors = readDesignFile("tokens/semantic/colors.scss");

  it("maps compatibility surface aliases to semantic color tokens", () => {
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

  it("maps the elevated surface semantic token to its theme role", () => {
    expect(semanticColors).toMatch(
      /--aui-token-color-surface-elevated:\s*var\(\s*--aui-theme-surface-elevated,\s*#\{\$white\}\s*\);/,
    );
    expect(darkTheme).toMatch(
      /--aui-theme-surface-elevated:\s*#\{\$gray-700\};/,
    );
    expect(lightTheme).toMatch(
      /--aui-theme-surface-elevated:\s*#\{\$white\};/,
    );
  });

  it("defines dark surface roles in the dark theme", () => {
    expect(darkTheme).toMatch(
      /--aui-theme-surface-elevated:\s*#\{\$gray-700\};/,
    );
    expect(darkTheme).toMatch(
      /--aui-theme-overlay:\s*#\{\s*rgba\(\$black,\s*0\.8\)\s*\};/,
    );
    expect(darkTheme).not.toMatch(/--aui-token-[\w-]+\s*:/);
  });

  it("does not redefine synthetic surface aliases inside themes", () => {
    for (const [themeName, source] of [
      ["light", lightTheme],
      ["dark", darkTheme],
    ] as const) {
      expect(
        source,
        `${themeName} theme must not redefine synthetic surface aliases`,
      ).not.toMatch(
        /--aui-token-surface-(?:page|default|elevated|overlay)\s*:/,
      );
    }
  });

  it("keeps shadow primitives and theme-aware semantic mappings consistent", () => {
    const primitives = readDesignFile("primitives/shadows.scss");
    const semantic = readDesignFile("tokens/semantic/shadows.scss");

    for (const [name, dimensions] of [
      ["sm", "0\\s+1px\\s+2px"],
      ["md", "0\\s+4px\\s+6px"],
      ["lg", "0\\s+10px\\s+15px"],
    ] as const) {
      expect(primitives).toMatch(
        new RegExp(`\\$shadow-${name}:\\s*${dimensions};`),
      );
      expect(semantic).toContain(`--aui-token-shadow-${name}:`);
      expect(semantic).toContain(`var(--aui-theme-shadow-${name},`);
      expect(semantic).toContain(`#{$shadow-${name}}`);
    }

    for (const name of ["xs", "xl", "2xl", "inner"] as const) {
      expect(semantic).toContain(`--aui-token-shadow-${name}:`);
    }

    expect(semantic).not.toMatch(/--aui-shadow-(?:sm|md|lg):\s*/);
  });

  it("keeps border primitives and semantic mappings consistent", () => {
    const primitives = readDesignFile("primitives/border.scss");
    const semantic = readDesignFile("tokens/semantic/border.scss");

    for (const [name, value] of [
      ["none", "0"],
      ["thin", "1px"],
      ["default", "1px"],
      ["medium", "2px"],
    ] as const) {
      expect(primitives).toMatch(
        new RegExp(`\\$border-width-${name}:\\s*${value};`),
      );
      expect(semantic).toMatch(
        new RegExp(
          `--aui-token-border-width-${name}:\\s*#\\{\\$border-width-${name}\\};`,
        ),
      );
      expect(semantic).not.toMatch(
        new RegExp(`--aui-border-width-${name}:\\s*`),
      );
    }
  });
});
