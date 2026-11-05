import { describe, expect, it } from "vitest";
import { calculatePosition } from "./positioning";

const triggerRect = {
  top: 100,
  left: 80,
  right: 180,
  bottom: 140,
  width: 100,
  height: 40,
} as DOMRect;

const popoverRect = {
  width: 60,
  height: 20,
} as DOMRect;

describe("calculatePosition", () => {
  it("calculates top placement", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "top",
      }),
    ).toEqual({ top: 80, left: 100 });
  });

  it("calculates right placement", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "right",
      }),
    ).toEqual({ top: 110, left: 180 });
  });

  it("calculates bottom placement", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "bottom",
      }),
    ).toEqual({ top: 140, left: 100 });
  });

  it("calculates left placement", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "left",
      }),
    ).toEqual({ top: 110, left: 20 });
  });

  it("applies custom offsets", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "bottom",
        offset: { x: 5, y: 7 },
      }),
    ).toEqual({ top: 147, left: 105 });
  });

  it("supports zero offsets", () => {
    expect(
      calculatePosition(triggerRect, popoverRect, {
        placement: "bottom",
        offset: { x: 0, y: 0 },
      }),
    ).toEqual({ top: 140, left: 100 });
  });
});
