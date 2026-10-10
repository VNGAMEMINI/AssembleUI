import { createRef } from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("does not render when closed", () => {
    render(
      <Toast
        open={false}
        message="Hello"
      />,
    );

    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders when open", () => {
    render(
      <Toast
        open
        message="Hello"
      />,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders title and message", () => {
    render(
      <Toast
        open
        title="Saved"
        message="Changes saved."
      />,
    );

    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(
      screen.getByText("Changes saved."),
    ).toBeInTheDocument();
  });

  it("uses info status by default", () => {
    render(
      <Toast
        open
        message="Info"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass("aui-toast--info");
  });

  it("supports success status", () => {
    render(
      <Toast
        open
        status="success"
        message="Success"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass("aui-toast--success");
  });

  it("supports warning status", () => {
    render(
      <Toast
        open
        status="warning"
        message="Warning"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass("aui-toast--warning");
  });

  it("uses alert role for errors", () => {
    render(
      <Toast
        open
        status="error"
        message="Something went wrong."
      />,
    );

    expect(
      screen.getByRole("alert"),
    ).toHaveClass("aui-toast--error");
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <Toast
        open
        message="Hello"
        onClose={onClose}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close",
      }),
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("supports a custom close label", () => {
    render(
      <Toast
        open
        message="Hello"
        onClose={vi.fn()}
        closeLabel="Dismiss notification"
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Dismiss notification",
      }),
    ).toBeInTheDocument();
  });

  it("does not render close button without onClose", () => {
    render(
      <Toast
        open
        message="Hello"
      />,
    );

    expect(
      screen.queryByRole("button"),
    ).not.toBeInTheDocument();
  });

  it("automatically closes after duration", () => {
    vi.useFakeTimers();

    const onClose = vi.fn();

    render(
      <Toast
        open
        message="Hello"
        duration={4000}
        onClose={onClose}
      />,
    );

    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3999);

    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);

    expect(onClose).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("does not automatically close when duration is zero", () => {
    vi.useFakeTimers();

    const onClose = vi.fn();

    render(
      <Toast
        open
        message="Hello"
        duration={0}
        onClose={onClose}
      />,
    );

    vi.advanceTimersByTime(10000);

    expect(onClose).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("does not start a timer without onClose", () => {
    vi.useFakeTimers();

    render(
      <Toast
        open
        message="Hello"
        duration={1000}
      />,
    );

    expect(
      screen.getByText("Hello"),
    ).toBeInTheDocument();

    vi.advanceTimersByTime(5000);

    vi.useRealTimers();
  });

  it("cleans up the timer when closed", () => {
    vi.useFakeTimers();

    const onClose = vi.fn();

    const { rerender } = render(
      <Toast
        open
        message="Hello"
        duration={4000}
        onClose={onClose}
      />,
    );

    rerender(
      <Toast
        open={false}
        message="Hello"
        duration={4000}
        onClose={onClose}
      />,
    );

    vi.advanceTimersByTime(5000);

    expect(onClose).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("supports a custom className", () => {
    render(
      <Toast
        open
        message="Hello"
        className="custom-toast"
      />,
    );

    expect(
      screen.getByRole("status"),
    ).toHaveClass("custom-toast");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Toast
        ref={ref}
        open
        message="Hello"
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("sets accessible relationships", () => {
    render(
      <Toast
        open
        title="Saved"
        message="Changes saved."
      />,
    );

    const toast = screen.getByRole("status");

    expect(
      toast.getAttribute("aria-labelledby"),
    ).toBeTruthy();

    expect(
      toast.getAttribute("aria-describedby"),
    ).toBeTruthy();
  });
});
