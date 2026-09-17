import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(process.cwd(), "packages/react");

function collectSourceFiles(directory: string): string[] {
  if (!existsSync(directory)) return [];

  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    const stat = statSync(absolute);

    if (stat.isDirectory()) {
      files.push(...collectSourceFiles(absolute));
      continue;
    }

    if (/\.(ts|tsx)$/.test(entry)) {
      files.push(absolute);
    }
  }

  return files;
}

function sourceOf(directory: string): string {
  return collectSourceFiles(directory)
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
}

describe("architecture import boundaries", () => {
  it("components cannot depend on patterns, templates, or registry", () => {
    const source = sourceOf(join(root, "components"));

    expect(source).not.toMatch(/patterns/);
    expect(source).not.toMatch(/templates/);
    expect(source).not.toMatch(/registry/);
  });

  it("patterns cannot depend on templates or registry", () => {
    const source = sourceOf(join(root, "patterns"));

    expect(source).not.toMatch(/templates/);
    expect(source).not.toMatch(/registry/);
  });

  it("templates cannot depend on registry", () => {
    const source = sourceOf(join(root, "templates"));

    expect(source).not.toMatch(/registry/);
  });

  it("components do not import their public barrel", () => {
    const source = sourceOf(join(root, "components"));

    expect(source).not.toMatch(
      /@assemble-ui\/react\/components|components\/index/,
    );
  });
});
