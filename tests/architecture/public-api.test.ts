import { describe, expect, it } from "vitest";
import * as AssembleUI from "../../packages/react";
import * as Components from "../../packages/react/components";
import * as Patterns from "../../packages/react/patterns";
import * as Templates from "../../packages/react/templates";

describe("Architecture: public API", () => {
  it("exposes Components from the root package", () => {
    expect(AssembleUI.Button).toBeDefined();
    expect(AssembleUI.Input).toBeDefined();
    expect(AssembleUI.Avatar).toBeDefined();
  });

  it("exposes Patterns from the root package", () => {
    expect(AssembleUI.UserCard).toBeDefined();
  });

  it("exposes Components from the components entry point", () => {
    expect(Components.Button).toBeDefined();
    expect(Components.Input).toBeDefined();
    expect(Components.Avatar).toBeDefined();
  });

  it("exposes Patterns from the patterns entry point", () => {
    expect(Patterns.UserCard).toBeDefined();
  });

  it("does not expose a Template before one exists", () => {
    expect(Object.keys(Templates)).toHaveLength(0);
  });
});
