import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const componentsRoot = path.resolve(
  import.meta.dirname,
  "../../packages/react/components",
);

function getSourceFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
      continue;
    }

    if (entry.endsWith(".ts") || entry.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }

  return files;
}

function getComponentSource(): string {
  return getSourceFiles(componentsRoot)
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
}

describe("Components Architecture", () => {
  const source = getComponentSource();

  it("does not depend on patterns", () => {
    expect(source).not.toMatch(/from\s+["'][^"']*patterns/);
  });

  it("does not depend on templates", () => {
    expect(source).not.toMatch(/from\s+["'][^"']*templates/);
  });

  it("does not depend on registry", () => {
    expect(source).not.toMatch(/from\s+["'][^"']*registry/);
  });

  it("does not import Sass files directly", () => {
    expect(source).not.toMatch(/import\s+.*["'][^"']*\.(scss|sass)["']/);
  });

  it("does not depend on its own components barrel", () => {
    expect(source).not.toMatch(/from\s+["'][^"']*components/);
  });
});
