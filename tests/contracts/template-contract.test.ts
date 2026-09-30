import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const TEMPLATES_DIR = join(
  process.cwd(),
  "packages/react/templates",
);

const IGNORED_ENTRIES = new Set([
  "README.md",
  "index.ts",
]);

function getTemplateNames() {
  return readdirSync(TEMPLATES_DIR)
    .filter((entry) => !IGNORED_ENTRIES.has(entry))
    .filter((entry) => {
      return statSync(join(TEMPLATES_DIR, entry)).isDirectory();
    })
    .sort();
}

describe("Template contract", () => {
  const templates = getTemplateNames();

  it("allows the template layer to be empty", () => {
    expect(templates).toBeDefined();
  });

  it.each(templates)(
    "%s contains all required files",
    (templateName) => {
      const templateDir = join(
        TEMPLATES_DIR,
        templateName,
      );

      const requiredFiles = [
        `${templateName}.tsx`,
        `${templateName}.types.ts`,
        `${templateName}.scss`,
        `${templateName}.test.tsx`,
        "index.ts",
      ];

      for (const file of requiredFiles) {
        expect(
          existsSync(join(templateDir, file)),
          `${templateName} is missing ${file}`,
        ).toBe(true);
      }
    },
  );

  it.each(templates)(
    "%s has a matching entry file",
    (templateName) => {
      const entryFile = join(
        TEMPLATES_DIR,
        templateName,
        "index.ts",
      );

      expect(existsSync(entryFile)).toBe(true);
    },
  );

  it.each(templates)(
    "%s does not contain forbidden application-layer files",
    (templateName) => {
      const templateDir = join(
        TEMPLATES_DIR,
        templateName,
      );

      const forbiddenFiles = [
        "store.ts",
        "state.ts",
        "api.ts",
        "service.ts",
        "router.ts",
        "registry.ts",
      ];

      for (const file of forbiddenFiles) {
        expect(
          existsSync(join(templateDir, file)),
          `${templateName} must not contain ${file}`,
        ).toBe(false);
      }
    },
  );
});
