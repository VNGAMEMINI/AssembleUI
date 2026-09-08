import { describe, expect, it } from "vitest";

import { Button, Input } from "@assemble-ui/react";

import {
  Button as LayerButton,
  Input as LayerInput,
} from "@assemble-ui/react/components";

describe("Components Layer API", () => {
  it("exports Button", () => {
    expect(LayerButton).toBeDefined();
  });

  it("exports Input", () => {
    expect(LayerInput).toBeDefined();
  });

  it("uses the same Button implementation as the root API", () => {
    expect(LayerButton).toBe(Button);
  });

  it("uses the same Input implementation as the root API", () => {
    expect(LayerInput).toBe(Input);
  });
});
