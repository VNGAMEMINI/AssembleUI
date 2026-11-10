import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Status } from "./Status";

describe("Status", () => {
  it("renders children", () => {
    render(<Status>Active</Status>);

    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("uses the default variant", () => {
    render(<Status>Active</Status>);

    expect(screen.getByText("Active").parentElement).toHaveClass(
      "aui-status",
      "aui-status--default",
    );
  });

  it("supports all variants", () => {
    const { rerender } = render(
      <Status variant="success">Active</Status>,
    );

    expect(screen.getByText("Active").parentElement).toHaveClass(
      "aui-status--success",
    );

    rerender(<Status variant="warning">Pending</Status>);

    expect(screen.getByText("Pending").parentElement).toHaveClass(
      "aui-status--warning",
    );

    rerender(<Status variant="danger">Failed</Status>);

    expect(screen.getByText("Failed").parentElement).toHaveClass(
      "aui-status--danger",
    );

    rerender(<Status variant="info">Processing</Status>);

    expect(screen.getByText("Processing").parentElement).toHaveClass(
      "aui-status--info",
    );
  });

  it("forwards native attributes", () => {
    render(
      <Status data-testid="status" aria-label="Current status">
        Active
      </Status>,
    );

    expect(screen.getByTestId("status")).toHaveAttribute(
      "aria-label",
      "Current status",
    );
  });

  it("supports className", () => {
    render(<Status className="custom-status">Active</Status>);

    expect(screen.getByText("Active").parentElement).toHaveClass(
      "custom-status",
    );
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLSpanElement | null>;

    render(<Status ref={ref}>Active</Status>);

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("renders a decorative indicator", () => {
    render(<Status>Active</Status>);

    const status = screen.getByText("Active").parentElement;

    expect(status?.querySelector(".aui-status__indicator")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("forwards id and style", () => {
    render(
      <Status
        id="current-status"
        style={{ opacity: 0.5 }}
      >
        Active
      </Status>,
    );

    const status = screen.getByText("Active").parentElement;

    expect(status).toHaveAttribute("id", "current-status");
    expect(status).toHaveStyle({ opacity: "0.5" });
  });

  it("forwards event handlers", () => {
    const onClick = vi.fn();

    render(
      <Status onClick={onClick}>
        Active
      </Status>,
    );

    screen.getByText("Active").parentElement?.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a custom ReactNode", () => {
    render(
      <Status>
        <strong>Active</strong>
      </Status>,
    );

    expect(screen.getByText("Active").tagName).toBe("STRONG");
  });

});
