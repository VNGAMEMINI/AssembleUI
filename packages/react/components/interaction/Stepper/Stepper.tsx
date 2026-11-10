import { forwardRef } from "react";
import { classNames } from "../../../core/utils";
import type {
  StepperProps,
  StepperStepStatus,
} from "./Stepper.types";

export const Stepper = forwardRef<
  HTMLElement,
  StepperProps
>(
  (
    {
      steps,
      activeStep,
      onStepChange,
      orientation = "horizontal",
      className,
      ...props
    },
    ref,
  ) => {
    const activeIndex = steps.findIndex(
      (step) => step.id === activeStep,
    );

    const getStatus = (
      index: number,
      status?: StepperStepStatus,
    ): StepperStepStatus => {
      if (status) {
        return status;
      }

      if (activeIndex === -1) {
        return "pending";
      }

      if (index < activeIndex) {
        return "completed";
      }

      if (index === activeIndex) {
        return "active";
      }

      return "pending";
    };

    return (
      <nav
        {...props}
        ref={ref}
        aria-label={
          props["aria-label"] ?? "Progress"
        }
        className={classNames(
          "aui-stepper",
          `aui-stepper--${orientation}`,
          className,
        )}
      >
        <ol className="aui-stepper__list">
          {steps.map((step, index) => {
            const status = getStatus(
              index,
              step.status,
            );

            const isInteractive =
              onStepChange != null &&
              !step.disabled;

            return (
              <li
                key={step.id}
                className={classNames(
                  "aui-stepper__step",
                  `aui-stepper__step--${status}`,
                  step.disabled &&
                    "aui-stepper__step--disabled",
                )}
              >
                {isInteractive ? (
                  <button
                    type="button"
                    className="aui-stepper__trigger"
                    disabled={step.disabled}
                    aria-current={
                      status === "active"
                        ? "step"
                        : undefined
                    }
                    onClick={() =>
                      onStepChange(step.id)
                    }
                  >
                    <span className="aui-stepper__indicator">
                      {index + 1}
                    </span>

                    <span className="aui-stepper__content">
                      <span className="aui-stepper__label">
                        {step.label}
                      </span>

                      {step.description != null && (
                        <span className="aui-stepper__description">
                          {step.description}
                        </span>
                      )}
                    </span>
                  </button>
                ) : (
                  <div className="aui-stepper__trigger">
                    <span className="aui-stepper__indicator">
                      {index + 1}
                    </span>

                    <span className="aui-stepper__content">
                      <span className="aui-stepper__label">
                        {step.label}
                      </span>

                      {step.description != null && (
                        <span className="aui-stepper__description">
                          {step.description}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Stepper.displayName = "Stepper";
