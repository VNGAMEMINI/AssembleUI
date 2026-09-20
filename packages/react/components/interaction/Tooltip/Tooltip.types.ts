import type {
  FocusEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";

export type TooltipPlacement =
  | "top"
  | "right"
  | "bottom"
  | "left";

export interface TooltipTriggerProps {
  "aria-describedby"?: string;
  onMouseEnter?: MouseEventHandler<HTMLElement>;
  onMouseLeave?: MouseEventHandler<HTMLElement>;
  onFocus?: FocusEventHandler<HTMLElement>;
  onBlur?: FocusEventHandler<HTMLElement>;
}

export interface TooltipProps {
  children: ReactElement<TooltipTriggerProps>;
  content: ReactNode;
  placement?: TooltipPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
