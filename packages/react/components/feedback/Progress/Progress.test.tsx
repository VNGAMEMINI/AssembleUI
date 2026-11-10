import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("renders with default values", () => {
    render(<Progress />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress).toHaveAttribute("aria-valuenow", "0");
  });

  it("renders the supplied value and max", () => {
    render(<Progress value={40} max={80} />);

    const progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuemax", "80");
    expect(progress).toHaveAttribute("aria-valuenow", "40");
  });

  it("falls back to 100 when max is not positive", () => {
    const { rerender } = render(<Progress value={50} max={0} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "100",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );

    rerender(<Progress value={50} max={-10} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "100",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
  });

  it("clamps value below zero", () => {
    render(<Progress value={-20} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
  });

  it("clamps value above max", () => {
    render(<Progress value={120} max={100} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("supports all sizes", () => {
    const { rerender } = render(<Progress size="sm" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--sm",
    );

    rerender(<Progress size="md" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--md",
    );

    rerender(<Progress size="lg" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--lg",
    );
  });

  it("supports all variants", () => {
    const { rerender } = render(
      <Progress variant="primary" />,
    );

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--primary",
    );

    rerender(<Progress variant="success" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--success",
    );

    rerender(<Progress variant="warning" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--warning",
    );

    rerender(<Progress variant="danger" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress--danger",
    );
  });

  it("applies progress width", () => {
    render(<Progress value={25} max={100} />);

    expect(screen.getByRole("progressbar").firstElementChild).toHaveStyle({
      width: "25%",
    });
  });

  it("forwards native attributes", () => {
    render(<Progress data-testid="progress" aria-label="Upload progress" />);

    expect(screen.getByTestId("progress")).toHaveAttribute(
      "aria-label",
      "Upload progress",
    );
  });

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;

    render(<Progress ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("uses the progressbar role", () => {
    render(<Progress />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "role",
      "progressbar",
    );
  });

  it("handles non-finite values safely", () => {
    const { rerender } = render(<Progress value={NaN} />);

    let progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuenow", "0");
    expect(progress.firstElementChild).toHaveStyle({ width: "0%" });

    rerender(<Progress value={Infinity} />);

    progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuenow", "0");
    expect(progress.firstElementChild).toHaveStyle({ width: "0%" });
  });

  it("handles non-finite max safely", () => {
    const { rerender } = render(
      <Progress value={40} max={Infinity} />,
    );

    let progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress).toHaveAttribute("aria-valuenow", "40");
    expect(progress.firstElementChild).toHaveStyle({ width: "40%" });

    rerender(
      <Progress value={40} max={NaN} />,
    );

    progress = screen.getByRole("progressbar");

    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress).toHaveAttribute("aria-valuenow", "40");
    expect(progress.firstElementChild).toHaveStyle({ width: "40%" });
  });

});
