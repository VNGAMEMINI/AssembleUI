import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const COMPONENTS_DIR = join(
  process.cwd(),
  "packages/react/components",
);

const IGNORED_ENTRIES = new Set([
  "README.md",
  "index.ts",
  "index.scss",
]);

function getComponentCategories() {
  return readdirSync(COMPONENTS_DIR)
    .filter((entry) => !IGNORED_ENTRIES.has(entry))
    .filter((entry) => {
      return statSync(join(COMPONENTS_DIR, entry)).isDirectory();
    })
    .sort();
}

function getComponentNames(category: string) {
  const categoryDir = join(COMPONENTS_DIR, category);

  return readdirSync(categoryDir)
    .filter((entry) => !IGNORED_ENTRIES.has(entry))
    .filter((entry) => {
      return statSync(join(categoryDir, entry)).isDirectory();
    })
    .sort();
}

describe("Component contract", () => {
  const categories = getComponentCategories();

  it("contains Component categories", () => {
    expect(categories.length).toBeGreaterThan(0);
  });

  it.each(categories)(
    "%s contains Components",
    (category) => {
      const components = getComponentNames(category);

      expect(
        components.length,
        `${category} does not contain any Component`,
      ).toBeGreaterThan(0);
    },
  );

  it.each(
    categories.flatMap((category) =>
      getComponentNames(category).map((componentName) => ({
        category,
        componentName,
      })),
    ),
  )(
    "$category/$componentName contains all required files",
    ({ category, componentName }) => {
      const componentDir = join(
        COMPONENTS_DIR,
        category,
        componentName,
      );

      const requiredFiles = [
        `${componentName}.tsx`,
        `${componentName}.types.ts`,
        `${componentName}.scss`,
        `${componentName}.test.tsx`,
        "index.ts",
      ];

      for (const file of requiredFiles) {
        expect(
          existsSync(join(componentDir, file)),
          `${category}/${componentName} is missing ${file}`,
        ).toBe(true);
      }
    },
  );
});
