import { describe, expect, it } from "vitest";

import packageJson from "../../packages/react/package.json";

describe("Package Exports", () => {
  const exports = packageJson.exports;

  it("defines the root export", () => {
    expect(exports["."]).toEqual({
      types: "./dist/index.d.ts",
      import: "./dist/index.js",
    });
  });

  it("defines the components export", () => {
    expect(exports["./components"]).toEqual({
      types: "./dist/components/index.d.ts",
      import: "./dist/components/index.js",
    });
  });

  it("defines the patterns export", () => {
    expect(exports["./patterns"]).toEqual({
      types: "./dist/patterns/index.d.ts",
      import: "./dist/patterns/index.js",
    });
  });

  it("defines the templates export", () => {
    expect(exports["./templates"]).toEqual({
      types: "./dist/templates/index.d.ts",
      import: "./dist/templates/index.js",
    });
  });

  it("defines the styles export", () => {
    expect(exports["./styles"]).toBe("./dist/styles.css");
  });
});
