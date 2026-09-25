import { describe, expect, it } from "vitest";

import * as Root from "@assemble-ui/react";
import * as Components from "@assemble-ui/react/components";
import * as Patterns from "@assemble-ui/react/patterns";
import * as Templates from "@assemble-ui/react/templates";

describe("package exports", () => {
  it("exports all form components from root", () => {
    expect(Root.Button).toBeDefined();
    expect(Root.Input).toBeDefined();
    expect(Root.Checkbox).toBeDefined();
    expect(Root.Radio).toBeDefined();
    expect(Root.Select).toBeDefined();
    expect(Root.Textarea).toBeDefined();
    expect(Root.Switch).toBeDefined();
  });

  it("exports all form components from components entry", () => {
    expect(Components.Button).toBeDefined();
    expect(Components.Input).toBeDefined();
    expect(Components.Checkbox).toBeDefined();
    expect(Components.Radio).toBeDefined();
    expect(Components.Select).toBeDefined();
    expect(Components.Textarea).toBeDefined();
    expect(Components.Switch).toBeDefined();
  });

  it("exports patterns from the patterns entry", () => {
    expect(Patterns.UserCard).toBeDefined();
  });

  it("keeps templates entry independent", () => {
    expect(Object.keys(Templates)).toEqual([]);
  });
});
