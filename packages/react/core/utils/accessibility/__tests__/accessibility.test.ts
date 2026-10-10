import { describe, expect, it } from "vitest";

import { createAccessibilityMetadata } from "../accessibility";

describe("createAccessibilityMetadata", () => {
  it("creates an id when one is not provided", () => {
    const result = createAccessibilityMetadata({
      idPrefix: "aui-input",
    });

    expect(result.id).toMatch(/^aui-input-/);
  });

  it("preserves a provided id", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
    });

    expect(result.id).toBe("username");
  });

  it("creates a description id", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
      description: "Your username",
    });

    expect(result.descriptionId).toBe("username-description");

    expect(result.describedBy).toBe("username-description");
  });

  it("creates an error id", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
      error: "Username is required",
    });

    expect(result.errorId).toBe("username-error");

    expect(result.describedBy).toBe("username-error");

    expect(result.ariaInvalid).toBe(true);
  });

  it("prefers the error id when description and error exist", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
      description: "Your username",
      error: "Username is required",
    });

    expect(result.describedBy).toBe("username-error");
  });

  it("merges external describedby with generated metadata", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
      description: "Your username",
      externalDescribedBy: "external-help",
    });

    expect(result.describedBy).toBe("external-help username-description");
  });

  it("preserves external invalid state when there is no error", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
      externalInvalid: "true",
    });

    expect(result.ariaInvalid).toBe("true");
  });

  it("error state overrides external invalid state", () => {
    const result = createAccessibilityMetadata({
      id: "username",
      idPrefix: "aui-input",
      error: "Invalid username",
      externalInvalid: "false",
    });

    expect(result.ariaInvalid).toBe(true);
  });

  it("preserves grammar as an external invalid state", () => {
    const result = createAccessibilityMetadata({
      id: "content",
      idPrefix: "aui-input",
      externalInvalid: "grammar",
    });

    expect(result.ariaInvalid).toBe("grammar");
  });

  it("preserves spelling as an external invalid state", () => {
    const result = createAccessibilityMetadata({
      id: "content",
      idPrefix: "aui-input",
      externalInvalid: "spelling",
    });

    expect(result.ariaInvalid).toBe("spelling");
  });
});
