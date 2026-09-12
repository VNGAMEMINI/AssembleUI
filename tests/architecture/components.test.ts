import {
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const componentsRoot = path.resolve(
  import.meta.dirname,
  "../../packages/react/components",
);

const REQUIRED_COMPONENT_FILES = [
  ".tsx",
  ".types.ts",
  ".scss",
  ".test.tsx",
  "index.ts",
];

function getDirectories(directory: string): string[] {
  const directories: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);

    if (statSync(fullPath).isDirectory()) {
      directories.push(fullPath);
    }
  }

  return directories;
}

function getComponentDirectories(
  directory: string,
): string[] {
  const components: string[] = [];

  for (const child of getDirectories(directory)) {
    const entries = readdirSync(child);

    const hasComponentFile = entries.some(
      (entry) =>
        entry.endsWith(".tsx") &&
        !entry.endsWith(".test.tsx"),
    );

    if (hasComponentFile) {
      components.push(child);
      continue;
    }

    components.push(
      ...getComponentDirectories(child),
    );
  }

  return components;
}

function getSourceFiles(directory: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
      continue;
    }

    if (
      entry.endsWith(".ts") ||
      entry.endsWith(".tsx")
    ) {
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
  const componentDirectories =
    getComponentDirectories(componentsRoot);

  const source = getComponentSource();

  it("has at least one component", () => {
    expect(componentDirectories.length).toBeGreaterThan(0);
  });

  it("uses the required component contract", () => {
    for (const directory of componentDirectories) {
      const entries = readdirSync(directory);

      const componentFile = entries.find(
        (entry) =>
          entry.endsWith(".tsx") &&
          !entry.endsWith(".test.tsx"),
      );

      expect(
        componentFile,
        `${directory} is missing component implementation`,
      ).toBeDefined();

      const componentName = componentFile!.replace(
        /\.tsx$/,
        "",
      );

      expect(
        entries,
        `${directory} is missing ${componentName}.types.ts`,
      ).toContain(`${componentName}.types.ts`);

      expect(
        entries,
        `${directory} is missing ${componentName}.scss`,
      ).toContain(`${componentName}.scss`);

      expect(
        entries,
        `${directory} is missing ${componentName}.test.tsx`,
      ).toContain(`${componentName}.test.tsx`);

      expect(
        entries,
        `${directory} is missing index.ts`,
      ).toContain("index.ts");
    }
  });

  it("does not depend on patterns", () => {
    expect(source).not.toMatch(
      /from\s+["'][^"']*patterns/,
    );
  });

  it("does not depend on templates", () => {
    expect(source).not.toMatch(
      /from\s+["'][^"']*templates/,
    );
  });

  it("does not depend on registry", () => {
    expect(source).not.toMatch(
      /from\s+["'][^"']*registry/,
    );
  });

  it("does not import Sass files directly", () => {
    expect(source).not.toMatch(
      /import\s+.*["'][^"']*\.(scss|sass)["']/,
    );
  });

  it("does not depend on its own components barrel", () => {
    expect(source).not.toMatch(
      /from\s+["'][^"']*components/,
    );
  });
});
