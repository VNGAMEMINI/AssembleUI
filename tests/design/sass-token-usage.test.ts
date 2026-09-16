import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const semanticRoot = path.join(
  root,
  "packages/react/design/tokens/semantic",
);

const consumerRoots = [
  path.join(root, "packages/react/components"),
  path.join(root, "packages/react/patterns"),
  path.join(root, "demo/styles"),
];

function getScssFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getScssFiles(filePath);
    }

    return entry.name.endsWith(".scss") ? [filePath] : [];
  });
}

function getDefinedSemanticTokens(): Set<string> {
  const tokens = new Set<string>();

  for (const file of getScssFiles(semanticRoot)) {
    const source = fs.readFileSync(file, "utf8");

    for (const match of source.matchAll(/--aui-[a-zA-Z0-9_-]+\s*:/g)) {
      tokens.add(match[0].replace(/\s*:\s*$/, ""));
    }
  }

  return tokens;
}

function getUsedTokens(): Map<string, string[]> {
  const usage = new Map<string, string[]>();

  for (const rootDirectory of consumerRoots) {
    for (const file of getScssFiles(rootDirectory)) {
      const source = fs.readFileSync(file, "utf8");

      for (const match of source.matchAll(
        /var\(\s*(--aui-[a-zA-Z0-9_-]+)/g,
      )) {
        const token = match[1];
        const files = usage.get(token) ?? [];

        if (!files.includes(file)) {
          files.push(file);
        }

        usage.set(token, files);
      }
    }
  }

  return usage;
}

describe("Sass token architecture", () => {
  it("uses only defined semantic tokens", () => {
    const defined = getDefinedSemanticTokens();
    const used = getUsedTokens();

    const unknown = [...used.entries()]
      .filter(([token]) => !defined.has(token))
      .map(([token, files]) => ({
        token,
        files: files.map((file) =>
          path.relative(root, file),
        ),
      }));

    expect(unknown).toEqual([]);
  });

  it("does not use Sass variables in consumers", () => {
    const violations: string[] = [];

    for (const rootDirectory of consumerRoots) {
      for (const file of getScssFiles(rootDirectory)) {
        const source = fs.readFileSync(file, "utf8");

        if (/(^|[^\w-])\$[a-zA-Z_][a-zA-Z0-9_-]*/.test(source)) {
          violations.push(path.relative(root, file));
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("does not import primitive tokens into consumers", () => {
    const violations: string[] = [];

    for (const rootDirectory of consumerRoots) {
      for (const file of getScssFiles(rootDirectory)) {
        const source = fs.readFileSync(file, "utf8");

        if (
          /@use\s+["'][^"']*tokens\/primitives/.test(source) ||
          /@forward\s+["'][^"']*tokens\/primitives/.test(source)
        ) {
          violations.push(path.relative(root, file));
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
