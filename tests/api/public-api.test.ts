import { describe, expect, it } from "vitest";
import { createElement } from "react";

import { Button, Input } from "@assemble-ui/react";

describe("Public API", () => {
  it("exports Button", () => {
    expect(Button).toBeDefined();
  });

  it("exports Input", () => {
    expect(Input).toBeDefined();
  });

  it("creates a Button element", () => {
    const element = createElement(Button, {
      children: "Button",
    });

    expect(element.type).toBe(Button);
  });

  it("creates an Input element", () => {
    const element = createElement(Input, {
      label: "Name",
    });

    expect(element.type).toBe(Input);
  });
});
