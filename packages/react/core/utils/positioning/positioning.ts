export type PositionPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left";

export interface PositionOffset {
  x?: number;
  y?: number;
}

export interface PositionOptions {
  placement: PositionPlacement;
  offset?: PositionOffset;
}

export interface PositionResult {
  top: number;
  left: number;
}

export function calculatePosition(
  triggerRect: DOMRect,
  popoverRect: DOMRect,
  {
    placement,
    offset = {},
  }: PositionOptions,
): PositionResult {
  const x = offset.x ?? 0;
  const y = offset.y ?? 0;

  switch (placement) {
    case "top":
      return {
        top: triggerRect.top - popoverRect.height - y,
        left:
          triggerRect.left +
          (triggerRect.width - popoverRect.width) / 2 +
          x,
      };

    case "right":
      return {
        top:
          triggerRect.top +
          (triggerRect.height - popoverRect.height) / 2 +
          y,
        left: triggerRect.right + x,
      };

    case "left":
      return {
        top:
          triggerRect.top +
          (triggerRect.height - popoverRect.height) / 2 +
          y,
        left: triggerRect.left - popoverRect.width - x,
      };

    case "bottom":
    default:
      return {
        top: triggerRect.bottom + y,
        left:
          triggerRect.left +
          (triggerRect.width - popoverRect.width) / 2 +
          x,
      };
  }
}
