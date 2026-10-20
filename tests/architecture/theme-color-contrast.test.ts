import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const designRoot = join(process.cwd(), "packages/react/design");

function readTheme(name: "light" | "dark"): string {
  return readFileSync(
    join(designRoot, `themes/${name}/index.scss`),
    "utf8",
  );
}

function relativeLuminance(hex: string): number {
  const normalized = hex.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`Unsupported hex color: ${hex}`);
  }

  const channels = [0, 2, 4].map((index) => {
    const value = parseInt(normalized.slice(index, index + 2), 16) / 255;

    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * channels[0]! +
    0.7152 * channels[1]! +
    0.0722 * channels[2]!
  );
}

function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);

  return (lighter + 0.05) / (darker + 0.05);
}

const cases = [
  {
    theme: "light",
    foreground: "#1a2230",
    background: "#f6f7f9",
    minimum: 4.5,
    label: "primary text on page background",
  },
  {
    theme: "light",
    foreground: "#566174",
    background: "#f6f7f9",
    minimum: 4.5,
    label: "muted text on page background",
  },
  {
    theme: "light",
    foreground: "#2448c4",
    background: "#f6f7f9",
    minimum: 4.5,
    label: "link on page background",
  },
  {
    theme: "light",
    foreground: "#14613a",
    background: "#e6f4ec",
    minimum: 4.5,
    label: "success text on success background",
  },
  {
    theme: "light",
    foreground: "#7d4a00",
    background: "#fdf2dc",
    minimum: 4.5,
    label: "warning text on warning background",
  },
  {
    theme: "light",
    foreground: "#9b2420",
    background: "#fbe8e7",
    minimum: 4.5,
    label: "danger text on danger background",
  },
  {
    theme: "light",
    foreground: "#085a69",
    background: "#e1f4f7",
    minimum: 4.5,
    label: "info text on info background",
  },
  {
    theme: "light",
    foreground: "#ffffff",
    background: "#2f5bea",
    minimum: 4.5,
    label: "text on accent button",
  },
  {
    theme: "dark",
    foreground: "#e5e9ef",
    background: "#161d27",
    minimum: 4.5,
    label: "primary text on surface",
  },
  {
    theme: "dark",
    foreground: "#97a2b3",
    background: "#161d27",
    minimum: 4.5,
    label: "muted text on surface",
  },
  {
    theme: "dark",
    foreground: "#8fabff",
    background: "#161d27",
    minimum: 4.5,
    label: "link on surface",
  },
  {
    theme: "dark",
    foreground: "#7fdcaa",
    background: "#12261d",
    minimum: 4.5,
    label: "success text on success background",
  },
  {
    theme: "dark",
    foreground: "#f2c274",
    background: "#2a2010",
    minimum: 4.5,
    label: "warning text on warning background",
  },
  {
    theme: "dark",
    foreground: "#f7a09c",
    background: "#2c1514",
    minimum: 4.5,
    label: "danger text on danger background",
  },
  {
    theme: "dark",
    foreground: "#85dbe9",
    background: "#0f2529",
    minimum: 4.5,
    label: "info text on info background",
  },
  {
    theme: "dark",
    foreground: "#0b1020",
    background: "#7f9eff",
    minimum: 4.5,
    label: "text on accent button",
  },
] as const;

describe("Accessibility: built-in theme color contrast", () => {
  for (const testCase of cases) {
    it(`${testCase.theme}: ${testCase.label}`, () => {
      const ratio = contrastRatio(
        testCase.foreground,
        testCase.background,
      );

      expect(
        ratio,
        `${testCase.theme}: ${testCase.label}; ` +
          `foreground=${testCase.foreground}, ` +
          `background=${testCase.background}, ` +
          `ratio=${ratio.toFixed(2)}:1, ` +
          `required=${testCase.minimum}:1`,
      ).toBeGreaterThanOrEqual(testCase.minimum);
    });
  }

  it("uses the expected source colors for tested theme roles", () => {
    const light = readTheme("light");
    const dark = readTheme("dark");

    const expectedDeclarations = [
      [light, "--aui-theme-text:", "#1a2230"],
      [light, "--aui-theme-text-muted:", "#566174"],
      [light, "--aui-theme-link:", "#2448c4"],
      [light, "--aui-theme-success-text:", "#14613a"],
      [light, "--aui-theme-warning-text:", "#7d4a00"],
      [light, "--aui-theme-danger-text:", "#9b2420"],
      [light, "--aui-theme-info-text:", "#085a69"],
      [light, "--aui-theme-accent:", "#2f5bea"],
      [light, "--aui-theme-on-accent:", "#ffffff"],
      [dark, "--aui-theme-text:", "#e5e9ef"],
      [dark, "--aui-theme-text-muted:", "#97a2b3"],
      [dark, "--aui-theme-link:", "#8fabff"],
      [dark, "--aui-theme-success-text:", "#7fdcaa"],
      [dark, "--aui-theme-warning-text:", "#f2c274"],
      [dark, "--aui-theme-danger-text:", "#f7a09c"],
      [dark, "--aui-theme-info-text:", "#85dbe9"],
      [dark, "--aui-theme-accent:", "#7f9eff"],
      [dark, "--aui-theme-on-accent:", "#0b1020"],
    ] as const;

    for (const [source, role, value] of expectedDeclarations) {
      expect(
        source,
        `Expected ${role} ${value} in theme source`,
      ).toContain(`${role} ${value};`);
    }
  });
});
