import {
  cloneElement,
  useId,
  useState,
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

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
    setIsHovered(true);
    onOpen();
  };

  const handleMouseLeave = (
    event: MouseEvent<HTMLElement>,
  ) => {
    children.props.onMouseLeave?.(event);
    setIsHovered(false);

    if (!isFocused) {
      onClose();
    }
  };

  const handleFocus = (
    event: FocusEvent<HTMLElement>,
  ) => {
    children.props.onFocus?.(event);
    setIsFocused(true);
    onOpen();
  };

  const handleBlur = (
    event: FocusEvent<HTMLElement>,
  ) => {
    children.props.onBlur?.(event);
    setIsFocused(false);

    if (!isHovered) {
      onClose();
    }
  };

  const existingDescribedBy =
    children.props["aria-describedby"];

  const describedBy = isOpen
    ? [existingDescribedBy, tooltipId]
        .filter(Boolean)
        .join(" ")
    : existingDescribedBy;

  const trigger = cloneElement(children, {
    "aria-describedby": describedBy || undefined,
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
