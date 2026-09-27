import { describe, expect, it } from "vitest";
import {
  existsSync,
  readdirSync,
  readFileSync,
} from "node:fs";
import { join, relative } from "node:path";

const patternsRoot = join(
  process.cwd(),
  "packages/react/patterns",
);

function getPatternDirectories(): string[] {
  if (!existsSync(patternsRoot)) {
    return [];
  }

  return readdirSync(patternsRoot, {
    withFileTypes: true,
  })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith("."),
    )
    .map((entry) => join(patternsRoot, entry.name));
}

function getPatternName(directory: string): string {
  return directory.split("/").pop() ?? "";
}

describe("Architecture: Pattern contract", () => {
  it("has at least one Pattern", () => {
    expect(getPatternDirectories()).not.toHaveLength(0);
  });

  it("every Pattern has the required files", () => {
    const requiredSuffixes = [
      ".tsx",
      ".types.ts",
      ".test.tsx",
      ".scss",
      "/index.ts",
    ];

    const violations: string[] = [];

    for (const directory of getPatternDirectories()) {
      const name = getPatternName(directory);

      for (const suffix of requiredSuffixes) {
        const path =
          suffix === "/index.ts"
            ? join(directory, "index.ts")
            : join(directory, `${name}${suffix}`);

        if (!existsSync(path)) {
          violations.push(
            `${relative(process.cwd(), directory)} -> missing ${suffix}`,
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("Pattern source must not import Templates or Registry", () => {
    const violations: string[] = [];

    for (const directory of getPatternDirectories()) {
      const name = getPatternName(directory);
      const sourcePath = join(directory, `${name}.tsx`);

      if (!existsSync(sourcePath)) {
        continue;
      }

      const source = readFileSync(sourcePath, "utf8");

      const importPattern =
        /(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g;

      for (const match of source.matchAll(importPattern)) {
        const importPath = match[1];

        if (
          /(?:^|\/)(templates|registry|Registry)(?:\/|$)/.test(
            importPath,
          )
        ) {
          violations.push(
            `${relative(
              process.cwd(),
              sourcePath,
            )} -> ${importPath}`,
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("Pattern source must not import another Pattern", () => {
    const violations: string[] = [];

    for (const directory of getPatternDirectories()) {
      const name = getPatternName(directory);
      const sourcePath = join(directory, `${name}.tsx`);

      if (!existsSync(sourcePath)) {
        continue;
      }

      const source = readFileSync(sourcePath, "utf8");

      const importPattern =
        /(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g;

      for (const match of source.matchAll(importPattern)) {
        const importPath = match[1];

        if (
          importPath.includes("/patterns/") ||
          importPath === "@assemble-ui/react/patterns"
        ) {
          violations.push(
            `${relative(
              process.cwd(),
              sourcePath,
            )} -> ${importPath}`,
          );
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
