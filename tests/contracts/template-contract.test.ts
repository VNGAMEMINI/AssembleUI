import {
  existsSync,
  readdirSync,
  readFileSync,
} from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const templatesRoot = join(
  process.cwd(),
  "packages/react/templates",
);

const requiredFiles = [
  "Template.tsx",
  "Template.types.ts",
  "Template.scss",
  "Template.test.tsx",
  "index.ts",
];

function getTemplateDirectories(): string[] {
  return readdirSync(templatesRoot, {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function readTemplateSource(template: string): string {
  const directory = join(templatesRoot, template);

  return readdirSync(directory)
    .filter(
      (file) =>
        file.endsWith(".ts") ||
        file.endsWith(".tsx"),
    )
    .map((file) =>
      readFileSync(join(directory, file), "utf8"),
    )
    .join("\n");
}

describe("Template contract", () => {
  const templates = getTemplateDirectories();

  it("allows an empty Template layer before the first Template exists", () => {
    expect(templates).toBeInstanceOf(Array);
  });

  for (const template of templates) {
    describe(template, () => {
      it("has the required file structure", () => {
        const directory = join(
          templatesRoot,
          template,
        );

        expect(
          requiredFiles.map((file) =>
            existsSync(
              join(
                directory,
                file.replace(
                  "Template",
                  template,
                ),
              ),
            ),
          ),
        ).toEqual([
          true,
          true,
          true,
          true,
          true,
        ]);
      });

      it("does not import SCSS from TypeScript", () => {
        expect(
          readTemplateSource(template),
        ).not.toMatch(
          /(?:from|import)\s+["'][^"']+\.(scss|sass)["']/,
        );
      });

      it("does not use Sass variables", () => {
        const scss = readFileSync(
          join(
            templatesRoot,
            template,
            `${template}.scss`,
          ),
          "utf8",
        );

        expect(scss).not.toMatch(
          /\$[a-zA-Z0-9_-]+/,
        );
      });

      it("does not import primitive tokens", () => {
        expect(
          readTemplateSource(template),
        ).not.toMatch(
          /(?:from|import)\s+["'][^"']*primitives/,
        );
      });

      it("does not import the public Template barrel", () => {
        expect(
          readTemplateSource(template),
        ).not.toMatch(
          /@assemble-ui\/react\/templates/,
        );
      });

      it("does not import the public Pattern barrel", () => {
        expect(
          readTemplateSource(template),
        ).not.toMatch(
          /@assemble-ui\/react\/patterns/,
        );
      });

      it("does not import another Template", () => {
        expect(
          readTemplateSource(template),
        ).not.toMatch(
          /(?:from|import)\s+["'][^"']*\/templates\//,
        );
      });

      it("does not import Registry", () => {
        expect(
          readTemplateSource(template),
        ).not.toMatch(
          /(?:from|import)\s+["'][^"']*registry/,
        );
      });
    });
  }
});
