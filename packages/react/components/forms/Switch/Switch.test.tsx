import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { createRef } from "react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders switch", () => {
    render(<Switch />);

    expect(
      screen.getByRole("switch"),
    ).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Switch label="Enable notifications" />);

    expect(
      screen.getByLabelText("Enable notifications"),
    ).toBeInTheDocument();
  });

  it("generates an id when one is not provided", () => {
    render(<Switch label="Notifications" />);

    const switchControl =
      screen.getByRole("switch");

    expect(switchControl).toHaveAttribute("id");
    expect(switchControl.id).toMatch(
      /^aui-switch-\d+$/,
    );
  });

  it("preserves a provided id", () => {
    render(
      <Switch
        id="notifications"
        label="Notifications"
      />,
    );

    expect(
      screen.getByRole("switch"),
    ).toHaveAttribute(
      "id",
      "notifications",
    );
  });

  it("supports checked", () => {
    render(
      <Switch
        label="Notifications"
        checked
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByRole("switch"),
    ).toBeChecked();
  });

  it("supports defaultChecked", () => {
    render(
      <Switch
        label="Notifications"
        defaultChecked
      />,
    );

    expect(
      screen.getByRole("switch"),
    ).toBeChecked();
  });

  it("supports disabled", () => {
    render(
      <Switch
        label="Notifications"
        disabled
      />,
    );

    expect(
      screen.getByRole("switch"),
    ).toBeDisabled();
  });

  it("supports required", () => {
    render(
      <Switch
        label="Notifications"
        required
      />,
    );

    const switchControl =
      screen.getByRole("switch");

    expect(switchControl).toBeRequired();
    expect(switchControl).toHaveAttribute(
      "required",
    );
  });

  it("connects description through aria-describedby", () => {
    render(
      <Switch
        label="Notifications"
        description="Receive email notifications."
      />,
    );

    const switchControl =
      screen.getByRole("switch");

    const description = screen.getByText(
      "Receive email notifications.",
    );

    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      description.id,
    );
  });

  it("connects error through aria-describedby", () => {
    render(
      <Switch
        label="Notifications"
        error="Notifications could not be enabled."
      />,
    );

    const switchControl =
      screen.getByRole("switch");

    const error = screen.getByRole("alert");

    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      error.id,
    );

    expect(switchControl).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("uses error instead of description", () => {
    render(
      <Switch
        label="Notifications"
        description="Optional information."
        error="Notifications could not be enabled."
      />,
    );

    const switchControl =
      screen.getByRole("switch");

    const error = screen.getByRole("alert");

    expect(
      screen.queryByText(
        "Optional information.",
      ),
    ).not.toBeInTheDocument();

    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      error.id,
    );
  });

  it("preserves external aria-describedby", () => {
    render(
      <Switch
        aria-describedby="external-help"
      />,
    );

    const switchControl =
      screen.getByRole("switch");

    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      "external-help",
    );
  });

  it("merges external aria-describedby with generated description", () => {
    render(
      <Switch
        aria-describedby="external-help"
        description="Additional information"
      />,
    );

    const switchControl =
      screen.getByRole("switch");

    const description = screen.getByText(
      "Additional information",
    );

    expect(switchControl).toHaveAttribute(
      "aria-describedby",
      `external-help ${description.id}`,
    );
  });

  it("preserves external aria-invalid when there is no error", () => {
    render(
      <Switch aria-invalid="true" />,
    );

    expect(
      screen.getByRole("switch"),
    ).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("forwards ref to the native checkbox", () => {
    const ref =
      createRef<HTMLInputElement>();

    render(
      <Switch
        ref={ref}
        label="Notifications"
      />,
    );

    expect(ref.current).toBe(
      screen.getByRole("switch"),
    );

    expect(ref.current?.type).toBe(
      "checkbox",
    );
  });

  it("supports native input attributes", () => {
    render(
      <Switch
        name="notifications"
        value="enabled"
        data-testid="notifications-switch"
      />,
    );

    const switchControl =
      screen.getByTestId(
        "notifications-switch",
      );

    expect(switchControl).toHaveAttribute(
      "name",
      "notifications",
    );

    expect(switchControl).toHaveAttribute(
      "value",
      "enabled",
    );
  });

  it("calls onChange", () => {
    const onChange = vi.fn();

    render(
      <Switch
        label="Notifications"
        onChange={onChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("switch"),
    );

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
