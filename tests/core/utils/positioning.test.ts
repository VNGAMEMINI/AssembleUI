import { describe, expect, it } from "vitest";

import { calculatePosition } from "../../../packages/react/core/utils/positioning/positioning";

const triggerRect = {
  top: 100,
  right: 180,
  bottom: 140,
  left: 120,
  width: 60,
  height: 40,
} as DOMRect;

const popoverRect = {
  width: 100,
  height: 50,
} as DOMRect;

describe("calculatePosition", () => {
  it.each([
    ["top", { top: 50, left: 100 }],
    ["right", { top: 95, left: 180 }],
    ["bottom", { top: 140, left: 100 }],
    ["left", { top: 95, left: 20 }],
  ] as const)("calculates the %s placement", (placement, expected) => {
    expect(calculatePosition(triggerRect, popoverRect, { placement })).toEqual(
      expected,
    );
  });

  it("applies x and y offsets", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "bottom",
        offset: { x: 8, y: 12 },
      }),
    ).toEqual({ top: 152, left: 108 });
  });

  it("treats zero offsets as explicit values", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "right",
        offset: { x: 0, y: 0 },
      }),
    ).toEqual({ top: 95, left: 180 });
  });
});