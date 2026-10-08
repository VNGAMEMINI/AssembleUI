import {
  forwardRef,
  useId,
} from "react";

import {
  Heading,
  Text,
} from "../../components";

import { classNames } from "../../core/utils";

import type { FormSectionProps } from "./FormSection.types";

export const FormSection = forwardRef<
  HTMLElement,
  FormSectionProps
>(
  (
    {
      title,
      description,
      actions,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const titleId = useId();

    const hasHeader =
      title != null ||
      description != null ||
      actions != null;

    return (
      <section
        {...props}
        ref={ref}
        className={classNames(
          "aui-form-section",
          className,
        )}
        aria-labelledby={
          title != null ? titleId : undefined
        }
      >
        {hasHeader && (
          <header className="aui-form-section__header">
            <div className="aui-form-section__heading">
              {title != null && (
                <Heading
                  id={titleId}
                  level={2}
                  className="aui-form-section__title"
                >
                  {title}
                </Heading>
              )}

              {description != null && (
                <Text className="aui-form-section__description">
                  {description}
                </Text>
              )}
            </div>

            {actions != null && (
              <div className="aui-form-section__actions">
                {actions}
              </div>
            )}
          </header>
        )}

        {children != null && (
          <div className="aui-form-section__content">
            {children}
          </div>
        )}
      </section>
    );
  },
);

FormSection.displayName = "FormSection";
