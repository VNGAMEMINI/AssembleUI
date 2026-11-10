import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Timeline } from "./Timeline";

const items = [
  {
    id: "created",
    title: "Created",
    content: "Project was created.",
    time: "09:00",
  },
  {
    id: "completed",
    title: "Completed",
    content: "Project was completed.",
    time: "12:00",
    status: "success" as const,
  },
];

describe("Timeline", () => {
  it("renders timeline items", () => {
    render(<Timeline items={items} />);

    expect(screen.getByText("Created")).toBeInTheDocument();
    expect(
      screen.getByText("Project was created."),
    ).toBeInTheDocument();

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(
      screen.getByText("Project was completed."),
    ).toBeInTheDocument();
  });

  it("renders item times", () => {
    render(<Timeline items={items} />);

    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
  });

  it("supports item status", () => {
    const { container } = render(<Timeline items={items} />);

    expect(
      container.querySelector(".aui-timeline__item--success"),
    ).toBeInTheDocument();
  });

  it("supports custom className", () => {
    const { container } = render(
      <Timeline
        items={items}
        className="custom-timeline"
      />,
    );

    expect(
      container.querySelector(".aui-timeline"),
    ).toHaveClass("custom-timeline");
  });

  it("supports custom icons", () => {
    render(
      <Timeline
        items={[
          {
            id: "custom",
            title: "Custom",
            icon: <span data-testid="timeline-icon">★</span>,
          },
        ]}
      />,
    );

    expect(
      screen.getByTestId("timeline-icon"),
    ).toBeInTheDocument();
  });
});
