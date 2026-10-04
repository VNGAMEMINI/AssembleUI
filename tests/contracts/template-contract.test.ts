import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
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

const REQUIRED_FILES = [
  "COMPONENT",
  "TYPES",
  "SCSS",
  "TEST",
  "ENTRY",
] as const;

const FORBIDDEN_FILES = [
  "store.ts",
  "state.ts",
  "api.ts",
  "service.ts",
  "router.ts",
  "registry.ts",
];

const FORBIDDEN_STRUCTURAL_PROPS = [
  "children",
  "content",
  "sidebar",
];

function getTemplateNames(): string[] {
  return readdirSync(TEMPLATES_DIR)
    .filter((entry) => !IGNORED_ENTRIES.has(entry))
    .filter((entry) => {
      return statSync(
        join(TEMPLATES_DIR, entry),
      ).isDirectory();
    })
    .sort();
}

function getRequiredFileName(
  templateName: string,
  type: (typeof REQUIRED_FILES)[number],
): string {
  switch (type) {
    case "COMPONENT":
      return `${templateName}.tsx`;

    case "TYPES":
      return `${templateName}.types.ts`;

    case "SCSS":
      return `${templateName}.scss`;

    case "TEST":
      return `${templateName}.test.tsx`;

    case "ENTRY":
      return "index.ts";
  }
}

function readTemplateTypes(
  templateName: string,
): string {
  return readFileSync(
    join(
      TEMPLATES_DIR,
      templateName,
      `${templateName}.types.ts`,
    ),
    "utf8",
  );
}

function readTemplateEntry(
  templateName: string,
): string {
  return readFileSync(
    join(
      TEMPLATES_DIR,
      templateName,
      "index.ts",
    ),
    "utf8",
  );
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

      for (const type of REQUIRED_FILES) {
        const file = getRequiredFileName(
          templateName,
          type,
        );

        expect(
          existsSync(join(templateDir, file)),
          `${templateName} is missing ${file}`,
        ).toBe(true);
      }
    },
  );

  it.each(templates)(
    "%s contains only contract files",
    (templateName) => {
      const templateDir = join(
        TEMPLATES_DIR,
        templateName,
      );

      const allowedFiles = new Set([
        `${templateName}.tsx`,
        `${templateName}.types.ts`,
        `${templateName}.scss`,
        `${templateName}.test.tsx`,
        "index.ts",
      ]);

      const actualFiles = readdirSync(templateDir)
        .filter((entry) => {
          return statSync(
            join(templateDir, entry),
          ).isFile();
        })
        .sort();

      expect(
        actualFiles,
        `${templateName} contains files outside the Template contract`,
      ).toEqual(
        [...allowedFiles].sort(),
      );
    },
  );

  it.each(templates)(
    "%s does not contain forbidden application-layer files",
    (templateName) => {
      const templateDir = join(
        TEMPLATES_DIR,
        templateName,
      );

      for (const file of FORBIDDEN_FILES) {
        expect(
          existsSync(join(templateDir, file)),
          `${templateName} must not contain ${file}`,
        ).toBe(false);
      }
    },
  );

  it.each(templates)(
    "%s does not use structural JSX-slot props",
    (templateName) => {
      const source = readTemplateTypes(
        templateName,
      );

      const violations =
        FORBIDDEN_STRUCTURAL_PROPS.filter(
          (prop) =>
            new RegExp(
              `\\b${prop}\\??\\s*:`,
            ).test(source),
        );

      expect(
        violations,
        `${templateName} must use structured data instead of structural JSX slots: ${violations.join(", ")}`,
      ).toEqual([]);
    },
  );

  it.each(templates)(
    "%s exports its Template component and props",
    (templateName) => {
      const source = readTemplateEntry(
        templateName,
      );

      expect(
        source,
        `${templateName}/index.ts must export the Template component`,
      ).toMatch(
        new RegExp(
          `export\\s*\\{[\\s\\S]*\\b${templateName}\\b[\\s\\S]*\\}\\s*from`,
        ),
      );

      expect(
        source,
        `${templateName}/index.ts must export Template props`,
      ).toMatch(
        new RegExp(
          `export\\s+type\\s*\\{[\\s\\S]*\\b${templateName}Props\\b[\\s\\S]*\\}\\s*from`,
        ),
      );
    },
  );
});
