import {
  cloneElement,
  useId,
} from "react";
import type {
  FocusEvent,
  MouseEvent,
} from "react";
import { useDisclosure } from "../../../core/hooks";
import type { TooltipProps } from "./Tooltip.types";

export function Tooltip({
  children,
  content,
  placement = "top",
  open,
  defaultOpen = false,
  onOpenChange,
}: TooltipProps) {
  const generatedId = useId();
  const tooltipId = `aui-tooltip-${generatedId.replace(/:/g, "")}`;

  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure({
    open,
    defaultIsOpen: defaultOpen,
    onOpenChange,
  });

  const handleMouseEnter = (
    event: MouseEvent<HTMLElement>,
  ) => {
    children.props.onMouseEnter?.(event);
    onOpen();
  };

  const handleMouseLeave = (
    event: MouseEvent<HTMLElement>,
  ) => {
    children.props.onMouseLeave?.(event);
    onClose();
  };

  const handleFocus = (
    event: FocusEvent<HTMLElement>,
  ) => {
    children.props.onFocus?.(event);
    onOpen();
  };

  const handleBlur = (
    event: FocusEvent<HTMLElement>,
  ) => {
    children.props.onBlur?.(event);
    onClose();
  };

  const trigger = cloneElement(children, {
    "aria-describedby": isOpen
      ? tooltipId
      : undefined,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
  });

  return (
    <span className="aui-tooltip">
      {trigger}

      {isOpen ? (
        <span
          id={tooltipId}
          role="tooltip"
          className={`aui-tooltip__content aui-tooltip__content--${placement}`}
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}

Tooltip.displayName = "Tooltip";
