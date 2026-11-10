import type {
  HTMLAttributes,
  ReactNode,
} from "react";

export type StepperStepStatus =
  | "pending"
  | "active"
  | "completed";

export interface StepperStep {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  status?: StepperStepStatus;
  disabled?: boolean;
}

export interface StepperProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "children"
  > {
  steps: StepperStep[];
  activeStep?: string;
  onStepChange?: (stepId: string) => void;
  orientation?: "horizontal" | "vertical";
}
