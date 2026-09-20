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

  it("applies size and variant classes", () => {
    render(<Progress size="lg" variant="success" />);

    expect(screen.getByRole("progressbar")).toHaveClass(
      "aui-progress",
      "aui-progress--lg",
      "aui-progress--success",
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
});
