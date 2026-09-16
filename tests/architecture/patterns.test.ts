import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const patternsRoot = path.resolve(
  process.cwd(),
  "packages/react/patterns",
);

function getSourceFiles(directory: string): string[] {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getSourceFiles(entryPath);
    }

    return /\.(ts|tsx)$/.test(entry.name) &&
      !entry.name.endsWith(".test.ts") &&
      !entry.name.endsWith(".test.tsx")
      ? [entryPath]
      : [];
  });
}

describe("patterns architecture", () => {
  const files = getSourceFiles(patternsRoot);

  it("does not import templates", () => {
    const violations = files.filter((file) => {
      const source = fs.readFileSync(file, "utf8");

      return (
        /from\s+["'][^"']*templates/.test(source) ||
        /@assemble-ui\/react\/templates/.test(source)
      );
    });

    expect(violations).toEqual([]);
  });

  it("does not import the pattern public barrel", () => {
    const violations = files.filter((file) => {
      const source = fs.readFileSync(file, "utf8");

      return /@assemble-ui\/react\/patterns/.test(source);
    });

    expect(violations).toEqual([]);
  });

  it("does not import registry", () => {
    const violations = files.filter((file) => {
      const source = fs.readFileSync(file, "utf8");

      return /(?:from|import)\s+["'][^"']*registry/.test(source);
    });

    expect(violations).toEqual([]);
  });
});
