import {
  forwardRef,
  type HTMLAttributes
} from "react";

import {
  classNames
} from "../../../core";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { className, ...props },
  ref
) {
  return <div {...props} ref={ref} className={classNames("aui-box", className)} />;
});
