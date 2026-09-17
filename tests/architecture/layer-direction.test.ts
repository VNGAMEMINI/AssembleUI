import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = join(process.cwd(), "packages/react");

function collect(directory: string): string[] {
  if (!existsSync(directory)) return [];

  const result: string[] = [];

  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);

    if (statSync(file).isDirectory()) {
      result.push(...collect(file));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      result.push(file);
    }
  }

  return result;
}

function readLayer(layer: string): string {
  return collect(join(root, layer))
    .map((file) => readFileSync(file, "utf8"))
    .join("\n");
}

describe("layer direction", () => {
  it("components are lower than patterns", () => {
    const source = readLayer("components");

    expect(source).not.toMatch(/from ["'].*patterns/);
    expect(source).not.toMatch(/from ["'].*templates/);
  });

  it("patterns are lower than templates", () => {
    const source = readLayer("patterns");

    expect(source).not.toMatch(/from ["'].*templates/);
  });
});
