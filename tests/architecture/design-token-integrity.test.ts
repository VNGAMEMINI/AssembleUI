import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const designRoot = join(root, "packages/react/design");
const tokenRoot = join(designRoot, "tokens");

function read(relativePath: string): string {
  return readFileSync(join(designRoot, relativePath), "utf8");
}

function readToken(relativePath: string): string {
  return readFileSync(join(tokenRoot, relativePath), "utf8");
}

describe("Architecture: design token integrity", () => {
  const gradients = readToken("synthetic/gradients.scss");
  const syntheticStates = readToken("synthetic/states.scss");
  const semanticStates = readToken("semantic/states.scss");
  const sizing = readToken("semantic/sizing.scss");
  const zIndex = readToken("semantic/z-index.scss");
  const zIndexPrimitives = read("primitives/z-index.scss");
  const compositeBorders = readToken("synthetic/border.scss");
  const syntheticShadows = readToken("synthetic/shadow.scss");

  it("defines the expected gradient token families", () => {
    const names = [
      "primary",
      "primary-subtle",
      "accent",
      "surface",
      "surface-elevated",
      "neutral",
      "success",
      "warning",
      "danger",
      "info",
      "transparent",
      "none",
    ];

    for (const name of names) {
      expect(
        gradients,
        `Missing gradient token: --aui-token-gradient-${name}`,
      ).toMatch(
        new RegExp(`--aui-token-gradient-${name}:\\s*`),
      );
    }
  });

  it("keeps synthetic gradients independent of runtime CSS variables", () => {
    // Synthetic gradients are concrete values derived from design primitives.
    // Semantic and synthetic tokens must both remain independent of themes.
    expect(gradients).not.toMatch(/var\s*\(/);
  });

  it("defines physical sizing tokens from sizing primitives", () => {
    const expected = [
      ["none", "$size-none"],
      ["thin", "$size-thin"],
      ["default", "$size-default"],
      ["medium", "$size-medium"],
      ["thick", "$size-thick"],
      ["big", "$size-big"],
      ["heavy", "$size-heavy"],
    ] as const;

    for (const [name, primitive] of expected) {
      expect(sizing).toContain(
        `--aui-token-size-${name}: #{sizing.${primitive}};`,
      );
    }
  });

  it("uses one canonical focus-ring offset declaration", () => {
    expect(syntheticStates).toContain(
      "--aui-token-state-focus-ring-offset: #{spacing.$spacing-1};",
    );

    expect(semanticStates).not.toContain(
      "--aui-token-state-focus-ring-offset:",
    );
  });

  it("uses the sizing token for focus-ring width", () => {
    expect(syntheticStates).toContain(
      "--aui-token-state-focus-ring-width: #{size.$size-medium};",
    );
  });

  it("defines component-layer z-index tokens from primitives", () => {
    const layers = [
      ["dropdown", "$z-index-11"],
      ["overlay", "$z-index-10"],
      ["modal", "$z-index-10"],
      ["drawer", "$z-index-10"],
      ["skip-link", "$z-index-10"],
      ["popover", "$z-index-11"],
      ["autocomplete", "$z-index-11"],
      ["tooltip", "$z-index-10"],
      ["toast", "$z-index-12"],
    ] as const;

    for (const [name, primitive] of layers) {
      expect(zIndex).toContain(
        `--aui-token-z-index-${name}: #{${primitive}};`,
      );
    }

    for (const value of [1000, 1100, 1200]) {
      expect(zIndexPrimitives).toContain(`$z-index-${value / 100}: ${value};`);
    }
  });

  it("keeps composite borders independent of themes", () => {
    expect(compositeBorders).toContain("--aui-token-border-default:");
    expect(compositeBorders).toContain("--aui-token-border-focus:");
    expect(compositeBorders).not.toMatch(/--aui-theme-/);
  });

  it("defines and exports component-oriented synthetic shadow tokens", () => {
    const css = readFileSync(
      join(root, "packages/react/dist/styles.css"),
      "utf8",
    );
    const entry = readToken("synthetic/index.scss");

    expect(entry).toContain('@forward "./shadow";');
    for (const name of ["card", "popover", "modal", "focus"]) {
      expect(syntheticShadows).toMatch(
        new RegExp(`--aui-token-shadow-${name}:\\s*`),
      );
      expect(css).toContain(`--aui-token-shadow-${name}:`);
    }
    expect(syntheticShadows).not.toMatch(/--aui-theme-/);
  });

  it("exports the new tokens in the generated stylesheet", () => {
    const css = readFileSync(
      join(root, "packages/react/dist/styles.css"),
      "utf8",
    );

    for (const token of [
      "--aui-token-gradient-primary",
      "--aui-token-gradient-accent",
      "--aui-token-gradient-neutral",
      "--aui-token-gradient-success",
      "--aui-token-gradient-warning",
      "--aui-token-gradient-danger",
      "--aui-token-gradient-info",
      "--aui-token-state-focus-ring-width",
      "--aui-token-state-focus-ring-offset",
      "--aui-token-size-medium",
      "--aui-token-z-index-autocomplete",
      "--aui-token-z-index-drawer",
      "--aui-token-z-index-skip-link",
    ]) {
      expect(css, `Missing generated CSS token: ${token}`).toContain(
        token,
      );
    }
  });

  it("keeps theme-specific shadow values in their own theme files", () => {
    const light = read("themes/light/shadow.scss");
    const dark = read("themes/dark/shadow.scss");

    for (const name of ["sm", "md", "lg"] as const) {
      expect(light).toMatch(
        new RegExp(`--aui-theme-shadow-${name}:\\s*`),
      );
      expect(dark).toMatch(
        new RegExp(`--aui-theme-shadow-${name}:\\s*`),
      );
    }

    expect(light).not.toBe(dark);
  });
});
