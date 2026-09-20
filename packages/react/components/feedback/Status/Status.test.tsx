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

    rerender(<Status variant="error">Failed</Status>);

    expect(screen.getByText("Failed").parentElement).toHaveClass(
      "aui-status--error",
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
});
