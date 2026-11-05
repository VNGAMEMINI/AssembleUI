import { beforeEach, describe, expect, it } from "vitest";
import { createAccessibilityMetadata } from "./accessibility";
import { resetGenerateId } from "../generateId/generateId";

describe("createAccessibilityMetadata", () => {
  beforeEach(() => {
    resetGenerateId();
  });

  it("generates an ID using idPrefix", () => {
    expect(
      createAccessibilityMetadata({ idPrefix: "field" }),
    ).toEqual({
      id: "field-1",
      descriptionId: undefined,
      errorId: undefined,
      describedBy: undefined,
      ariaInvalid: undefined,
    });
  });

  it("uses a supplied ID", () => {
    const result = createAccessibilityMetadata({
      id: "email",
      idPrefix: "field",
    });

    expect(result.id).toBe("email");
  });

  it("generates a description ID", () => {
    const result = createAccessibilityMetadata({
      id: "email",
      idPrefix: "field",
      description: "Email description",
    });

    expect(result.descriptionId).toBe("email-description");
    expect(result.describedBy).toBe("email-description");
  });

  it("generates an error ID and marks the control invalid", () => {
    const result = createAccessibilityMetadata({
      id: "email",
      idPrefix: "field",
      error: "Invalid email",
    });

    expect(result.errorId).toBe("email-error");
    expect(result.describedBy).toBe("email-error");
    expect(result.ariaInvalid).toBe(true);
  });

  it("combines external describedBy with generated error ID", () => {
    const result = createAccessibilityMetadata({
      id: "email",
      idPrefix: "field",
      error: "Invalid email",
      externalDescribedBy: "external-help",
    });

    expect(result.describedBy).toBe(
      "external-help email-error",
    );
  });

  it("preserves external aria-invalid when there is no error", () => {
    const result = createAccessibilityMetadata({
      idPrefix: "field",
      externalInvalid: "grammar",
    });

    expect(result.ariaInvalid).toBe("grammar");
  });
});
