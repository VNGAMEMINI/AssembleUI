import { describe, expect, it } from "vitest";

import {
  getDemoByPath,
  getDemoRegistry,
} from "./registry";

describe("Demo Registry", () => {
  it("discovers all supported demo layers", () => {
    const demos = getDemoRegistry();

    expect(demos.length).toBeGreaterThan(0);

    expect(
      demos.some((demo) => demo.type === "components"),
    ).toBe(true);

    expect(
      demos.some((demo) => demo.type === "patterns"),
    ).toBe(true);

    expect(
      demos.some((demo) => demo.type === "templates"),
    ).toBe(true);
  });

  it("discovers ProfilePageTemplateDemo automatically", () => {
    const demo = getDemoByPath(
      "/templates/profile-page-template",
    );

    expect(demo).toBeDefined();
    expect(demo.type).toBe("templates");
    expect(demo.name).toBe("ProfilePageTemplate");
    expect(demo.title).toBe("ProfilePageTemplate");
    expect(typeof demo.component).toBe("function");
  });

  it("creates kebab-case demo paths", () => {
    const demo = getDemoByPath(
      "/templates/profile-page-template",
    );

    expect(demo.path).toBe(
      "/templates/profile-page-template",
    );
  });

  it("keeps registry entries ordered by layer and name", () => {
    const demos = getDemoRegistry();

    for (let index = 1; index < demos.length; index += 1) {
      const previous = demos[index - 1];
      const current = demos[index];

      if (previous.type === current.type) {
        expect(
          previous.name.localeCompare(current.name),
        ).toBeLessThanOrEqual(0);
      } else {
        expect(
          previous.type.localeCompare(current.type),
        ).toBeLessThanOrEqual(0);
      }
    }
  });

  it("returns undefined for an unknown demo path", () => {
    expect(
      getDemoByPath("/templates/not-found"),
    ).toBeUndefined();
  });
});
