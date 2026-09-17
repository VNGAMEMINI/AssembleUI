import {
  existsSync,
  readdirSync,
  readFileSync,
} from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const patternsRoot = join(
  process.cwd(),
  "packages/react/patterns",
);

const expectedFiles = [
  "Pattern.tsx",
  "Pattern.types.ts",
  "Pattern.scss",
  "Pattern.test.tsx",
  "index.ts",
];

function getPatternDirectories(): string[] {
  return readdirSync(patternsRoot, {
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function readPatternSource(pattern: string): string {
  const directory = join(patternsRoot, pattern);

  return readdirSync(directory)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
    .map((file) => readFileSync(join(directory, file), "utf8"))
    .join("\n");
}

describe("Pattern contract", () => {
  const patterns = getPatternDirectories();

  it("has at least one Pattern", () => {
    expect(patterns.length).toBeGreaterThan(0);
  });

  for (const pattern of patterns) {
    describe(pattern, () => {
      it("has the required file structure", () => {
        const directory = join(patternsRoot, pattern);

        expect(
          expectedFiles.map((file) =>
            existsSync(
              join(
                directory,
                file.replace("Pattern", pattern),
              ),
            ),
          ),
        ).toEqual([true, true, true, true, true]);
      });

      it("does not import SCSS from TypeScript", () => {
        expect(readPatternSource(pattern)).not.toMatch(
          /(?:from|import)\s+["'][^"']+\.(scss|sass)["']/,
        );
      });

      it("does not use Sass variables", () => {
        const directory = join(patternsRoot, pattern);
        const scss = readFileSync(
          join(directory, `${pattern}.scss`),
          "utf8",
        );

        expect(scss).not.toMatch(/\$[a-zA-Z0-9_-]+/);
      });

      it("does not import primitive tokens", () => {
        const source = readPatternSource(pattern);

        expect(source).not.toMatch(
          /(?:from|import)\s+["'][^"']*primitives/,
        );
      });

      it("does not import the public Component barrel", () => {
        expect(readPatternSource(pattern)).not.toMatch(
          /@assemble-ui\/react\/components/,
        );
      });

      it("does not import Templates or Registry", () => {
        const source = readPatternSource(pattern);

        expect(source).not.toMatch(
          /(?:from|import)\s+["'][^"']*(templates|registry)/,
        );
      });
    });
  }
});
