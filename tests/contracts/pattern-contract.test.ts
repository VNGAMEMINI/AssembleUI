import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const PATTERNS_DIR = join(
  process.cwd(),
  "packages/react/patterns",
);

const IGNORED_ENTRIES = new Set([
  "README.md",
  "index.ts",
  "index.scss",
]);

function getPatternNames() {
  return readdirSync(PATTERNS_DIR)
    .filter((entry) => !IGNORED_ENTRIES.has(entry))
    .filter((entry) => {
      return statSync(join(PATTERNS_DIR, entry)).isDirectory();
    })
    .sort();
}

describe("Pattern contract", () => {
  const patterns = getPatternNames();

  it("contains at least one Pattern", () => {
    expect(patterns.length).toBeGreaterThan(0);
  });

  it.each(patterns)(
    "%s contains all required files",
    (patternName) => {
      const patternDir = join(PATTERNS_DIR, patternName);

      const requiredFiles = [
        `${patternName}.tsx`,
        `${patternName}.types.ts`,
        `${patternName}.scss`,
        `${patternName}.test.tsx`,
        "index.ts",
      ];

      for (const file of requiredFiles) {
        expect(
          existsSync(join(patternDir, file)),
          `${patternName} is missing ${file}`,
        ).toBe(true);
      }
    },
  );

  it.each(patterns)(
    "%s has a matching component entry file",
    (patternName) => {
      const entryFile = join(
        PATTERNS_DIR,
        patternName,
        "index.ts",
      );

      expect(existsSync(entryFile)).toBe(true);
    },
  );
});
