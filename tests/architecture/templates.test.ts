import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const templatesRoot = path.resolve(
  process.cwd(),
  "packages/react/templates",
);

function getSourceFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  return entries.flatMap((entry) => {
    const entryPath = path.join(
      directory,
      entry.name,
    );

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

describe("templates architecture", () => {
  const files = getSourceFiles(templatesRoot);

  it("does not import another Template", () => {
    const violations = files.filter((file) => {
      const source = fs.readFileSync(
        file,
        "utf8",
      );

      return /(?:from|import)\s+["'][^"']*\/templates\//.test(
        source,
      );
    });

    expect(violations).toEqual([]);
  });

  it("does not import the Template public barrel", () => {
    const violations = files.filter((file) => {
      const source = fs.readFileSync(
        file,
        "utf8",
      );

      return /@assemble-ui\/react\/templates/.test(
        source,
      );
    });

    expect(violations).toEqual([]);
  });

  it("does not import Registry", () => {
    const violations = files.filter((file) => {
      const source = fs.readFileSync(
        file,
        "utf8",
      );

      return /(?:from|import)\s+["'][^"']*registry/.test(
        source,
      );
    });

    expect(violations).toEqual([]);
  });
});
