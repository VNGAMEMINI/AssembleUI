import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const tokenEntryPath = join(root, "packages/react/design/tokens/index.scss");
const activeSassRoots = [
  "packages/react/foundation",
  "packages/react/styles",
  "demo/src",
];
const tokenRoot = join(root, "packages/react/design/tokens");

describe("Architecture: canonical token usage", () => {
  it("removes the compatibility token layer", () => {
    expect(
      existsSync(join(root, "packages/react/design/tokens/compatibility.scss")),
    ).toBe(false);
    expect(readFileSync(tokenEntryPath, "utf8")).not.toContain("compatibility");
  });

  it("keeps active Sass outside components, patterns, and templates on canonical tokens", () => {
    const legacyReference = /var\(\s*--aui-(?!token-|theme-)[\w-]+/;

    for (const sassRoot of activeSassRoots) {
      const sourceFiles = readdirSync(join(root, sassRoot), { recursive: true })
        .filter((path): path is string => typeof path === "string" && path.endsWith(".scss"));

      for (const sourceFile of sourceFiles) {
        const source = readFileSync(join(root, sassRoot, sourceFile), "utf8");
        expect(source, `${sassRoot}/${sourceFile}`).not.toMatch(legacyReference);
      }
    }
  });

  it("keeps token definitions independent of theme variables", () => {
    const sourceFiles = readdirSync(tokenRoot, { recursive: true })
      .filter((path): path is string => typeof path === "string" && path.endsWith(".scss"));

    for (const sourceFile of sourceFiles) {
      const source = readFileSync(join(tokenRoot, sourceFile), "utf8");
      expect(source, `packages/react/design/tokens/${sourceFile}`).not.toMatch(/var\(\s*--aui-theme-/);
    }
  });
});
