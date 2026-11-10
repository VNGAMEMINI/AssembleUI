import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type { FormProps } from "./Form.types";

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        {...props}
        ref={ref}
        className={classNames("aui-form", className)}
      />
    );
  },
);

Form.displayName = "Form";
