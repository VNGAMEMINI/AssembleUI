import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "./Stepper";

const steps = [
  {
    id: "account",
    label: "Account",
    description: "Create your account",
  },
  {
    id: "profile",
    label: "Profile",
    description: "Complete your profile",
  },
  {
    id: "done",
    label: "Done",
  },
];

describe("Stepper", () => {
  it("renders all steps", () => {
    render(<Stepper steps={steps} />);

    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("marks the active step", () => {
    render(
      <Stepper
        steps={steps}
        activeStep="profile"
      />,
    );

    const profile = screen.getByText("Profile");

    expect(profile.closest("li")).toHaveClass(
      "aui-stepper__step--active",
    );
  });

  it("derives completed steps from activeStep", () => {
    render(
      <Stepper
        steps={steps}
        activeStep="done"
      />,
    );

    expect(
      screen.getByText("Account").closest("li"),
    ).toHaveClass(
      "aui-stepper__step--completed",
    );

    expect(
      screen.getByText("Profile").closest("li"),
    ).toHaveClass(
      "aui-stepper__step--completed",
    );

    expect(
      screen.getByText("Done").closest("li"),
    ).toHaveClass(
      "aui-stepper__step--active",
    );
  });

  it("calls onStepChange when a step is clicked", () => {
    const onStepChange = vi.fn();

    render(
      <Stepper
        steps={steps}
        activeStep="account"
        onStepChange={onStepChange}
      />,
    );

    screen.getByRole("button", {
      name: /profile/i,
    }).click();

    expect(onStepChange).toHaveBeenCalledWith(
      "profile",
    );
  });

  it("does not call onStepChange for disabled steps", () => {
    const onStepChange = vi.fn();

    render(
      <Stepper
        steps={[
          steps[0],
          {
            ...steps[1],
            disabled: true,
          },
          steps[2],
        ]}
        onStepChange={onStepChange}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: /profile/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("supports vertical orientation", () => {
    render(
      <Stepper
        steps={steps}
        orientation="vertical"
      />,
    );

    expect(
      screen.getByRole("navigation"),
    ).toHaveClass("aui-stepper--vertical");
  });

  it("supports a custom aria-label", () => {
    render(
      <Stepper
        steps={steps}
        aria-label="Checkout progress"
      />,
    );

    expect(
      screen.getByRole("navigation", {
        name: "Checkout progress",
      }),
    ).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<Stepper steps={steps} />);

    expect(
      screen.getByText("Create your account"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Complete your profile"),
    ).toBeInTheDocument();
  });
});
