import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const sourceRoots = [
  join(projectRoot, "demo/src"),
  join(projectRoot, "demo/styles"),
];

function listStyles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return listStyles(path);
    }

    return /\.(css|scss|sass|less)$/i.test(entry.name) ? [path] : [];
  });
}

describe("Architecture: demo custom-property contract", () => {
  const files = sourceRoots.flatMap(listStyles);

  it("does not declare --aui-* custom properties in demo source", () => {
    for (const file of files) {
      const source = readFileSync(file, "utf8");

      expect(
        source,
        `${relative(projectRoot, file)} must not declare --aui-* variables`,
      ).not.toMatch(/--aui-[\w-]+\s*:/);
    }
  });

  it("uses --demo-* for demo-owned custom properties", () => {
    const themeFile = join(
      projectRoot,
      "demo/src/app/styles/_theme.scss",
    );
    const source = readFileSync(themeFile, "utf8");

    expect(source).toContain("--demo-page:");
    expect(source).toContain("--demo-text:");
  });
});
