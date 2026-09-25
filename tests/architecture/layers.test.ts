import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const packageRoot = join(process.cwd(), "packages/react");

const layerRoots = {
  components: join(packageRoot, "components"),
  patterns: join(packageRoot, "patterns"),
  templates: join(packageRoot, "templates"),
};

function getSourceFiles(directory: string): string[] {
  if (!existsSync(directory)) {
    return [];
  }

  const files: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...getSourceFiles(path));
      continue;
    }

    if (
      entry.isFile() &&
      /\.(ts|tsx)$/.test(entry.name) &&
      !entry.name.endsWith(".test.ts") &&
      !entry.name.endsWith(".test.tsx")
    ) {
      files.push(path);
    }
  }

  return files;
}

function getImports(directory: string): Array<{
  file: string;
  importPath: string;
}> {
  const importPattern =
    /(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g;

  return getSourceFiles(directory).flatMap((file) => {
    const source = readFileSync(file, "utf8");
    const imports: Array<{ file: string; importPath: string }> = [];

    for (const match of source.matchAll(importPattern)) {
      imports.push({
        file,
        importPath: match[1],
      });
    }

    return imports;
  });
}

function assertNoImports(
  layer: keyof typeof layerRoots,
  forbidden: string[],
) {
  const imports = getImports(layerRoots[layer]);

  const violations = imports.filter(({ importPath }) =>
    forbidden.some(
      (target) =>
        importPath.includes(`/${target}/`) ||
        importPath.endsWith(`/${target}`) ||
        importPath === `@assemble-ui/react/${target}`,
    ),
  );

  expect(
    violations,
    violations
      .map(
        ({ file, importPath }) =>
          `${relative(process.cwd(), file)} -> ${importPath}`,
      )
      .join("\n"),
  ).toEqual([]);
}

describe("Architecture: layer dependencies", () => {
  it("Components must not import Patterns or Templates", () => {
    assertNoImports("components", ["patterns", "templates"]);
  });

  it("Patterns must not import Templates", () => {
    assertNoImports("patterns", ["templates"]);
  });

  it("Patterns must not import Patterns", () => {
    assertNoImports("patterns", ["patterns"]);
  });

  it("Templates must not import Templates", () => {
    assertNoImports("templates", ["templates"]);
  });

  it("no UI layer may import Registry", () => {
    for (const layer of Object.keys(layerRoots) as Array<
      keyof typeof layerRoots
    >) {
      assertNoImports(layer, ["registry", "Registry"]);
    }
  });
});
