import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const root = resolve(process.cwd());

function read(path: string): string {
  return readFileSync(resolve(root, path), "utf8");
}

function extractTokens(source: string, prefix: string): string[] {
  return [
    ...new Set(
      [...source.matchAll(new RegExp(`${prefix}[a-zA-Z0-9_-]+`, "g"))]
        .map((match) => match[0]),
    ),
  ].sort();
}

const semanticColors = read(
  "packages/react/design/tokens/semantic/colors.scss",
);

const semanticSurfaces = read(
  "packages/react/design/tokens/semantic/surfaces.scss",
);

const lightTheme = read(
  "packages/react/design/themes/light/index.scss",
);

const darkTheme = read(
  "packages/react/design/themes/dark/index.scss",
);

const requiredColorTokens = [
  "--aui-color-primary",
  "--aui-color-primary-hover",
  "--aui-color-background",
  "--aui-color-surface",
  "--aui-color-text",
  "--aui-color-text-muted",
  "--aui-color-border",
  "--aui-color-on-primary",
  "--aui-color-success",
  "--aui-color-on-success",
  "--aui-color-warning",
  "--aui-color-on-warning",
  "--aui-color-danger",
  "--aui-color-on-danger",
  "--aui-color-info",
  "--aui-color-on-info",
  "--aui-color-transparent",
].sort();

const requiredSurfaceTokens = [
  "--aui-surface-page",
  "--aui-surface-default",
  "--aui-surface-elevated",
  "--aui-surface-overlay",
].sort();

const semanticColorTokens = extractTokens(
  semanticColors,
  "--aui-color-",
);

const semanticSurfaceTokens = extractTokens(
  semanticSurfaces,
  "--aui-surface-",
);

const lightColorTokens = extractTokens(
  lightTheme,
  "--aui-color-",
);

const darkColorTokens = extractTokens(
  darkTheme,
  "--aui-color-",
);

const lightSurfaceTokens = extractTokens(
  lightTheme,
  "--aui-surface-",
);

const darkSurfaceTokens = extractTokens(
  darkTheme,
  "--aui-surface-",
);

describe("design token contract", () => {
  it("defines every required semantic color token", () => {
    expect(semanticColorTokens).toEqual(
      requiredColorTokens,
    );
  });

  it("only overrides valid semantic color tokens in themes", () => {
    expect(
      lightColorTokens.every((token) =>
        requiredColorTokens.includes(token),
      ),
    ).toBe(true);

    expect(
      darkColorTokens.every((token) =>
        requiredColorTokens.includes(token),
      ),
    ).toBe(true);
  });

  it("defines every required semantic surface token", () => {
    expect(semanticSurfaceTokens).toEqual(
      requiredSurfaceTokens,
    );
  });

  it("uses the same surface token contract in light and dark themes", () => {
    expect(lightSurfaceTokens).toEqual(
      requiredSurfaceTokens,
    );

    expect(darkSurfaceTokens).toEqual(
      requiredSurfaceTokens,
    );
  });

  it("does not duplicate semantic color token names", () => {
    expect(new Set(semanticColorTokens).size).toBe(
      semanticColorTokens.length,
    );
  });

  it("does not duplicate semantic surface token names", () => {
    expect(new Set(semanticSurfaceTokens).size).toBe(
      semanticSurfaceTokens.length,
    );
  });
});
