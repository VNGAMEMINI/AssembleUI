import { describe, expect, it } from "vitest";

import {
  resolveDemo,
} from "./resolve";

describe("Demo Resolver", () => {
  it("resolves an existing demo by path", () => {
    const demo = resolveDemo(
      "/templates/profile-page-template",
    );

    expect(demo).toBeDefined();
    expect(demo.type).toBe("templates");
    expect(demo.name).toBe("ProfilePageTemplate");
  });

  it("falls back to the default demo for an unknown path", () => {
    const demo = resolveDemo(
      "/does-not-exist",
    );

    expect(demo).toBeDefined();
    expect(demo.path).toBe(
      "/components/container",
    );
  });
});
