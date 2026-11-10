import {
  forwardRef,
  type SubmitEvent,
} from "react";
import { Button } from "../../components/forms/Button";
import { classNames } from "../../core/utils";
import type { FilterBarProps } from "./FilterBar.types";

export const FilterBar = forwardRef<
  HTMLFormElement,
  FilterBarProps
>(
  (
    {
      fields,
      submitLabel = "Apply",
      resetLabel = "Reset",
      onReset,
      onSubmit,
      className,
      ...props
    },
    ref,
  ) => {
    const handleSubmit = (
      event: SubmitEvent<HTMLFormElement>,
    ) => {
      onSubmit?.(event);
    };

    const handleReset = () => {
      onReset?.();
    };

    return (
      <form
        {...props}
        ref={ref}
        className={classNames(
          "aui-filter-bar",
          className,
        )}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="aui-filter-bar__fields">
          {fields.map((field) => (
            <div
              key={field.id}
              className="aui-filter-bar__field"
            >
              {field.label != null && (
                <div className="aui-filter-bar__label">
                  {field.label}
                </div>
              )}

              <div className="aui-filter-bar__control">
                {field.control}
              </div>
            </div>
          ))}
        </div>

        <div className="aui-filter-bar__actions">
          {resetLabel != null && (
            <Button
              type="reset"
              variant="ghost"
              size="sm"
            >
              {resetLabel}
            </Button>
          )}

          {submitLabel != null && (
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              {submitLabel}
            </Button>
          )}
        </div>
      </form>
    );
  },
);

FilterBar.displayName = "FilterBar";
