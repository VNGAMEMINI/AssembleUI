import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DescriptionList } from "./DescriptionList";

const items = [
  {
    id: "name",
    label: "Name",
    value: "John Doe",
  },
  {
    id: "email",
    label: "Email",
    value: "john@example.com",
  },
];

describe("DescriptionList", () => {
  it("renders labels and values", () => {
    render(<DescriptionList items={items} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("supports multiple columns", () => {
    render(<DescriptionList items={items} columns={2} />);

    expect(
      document.querySelector(".aui-description-list"),
    ).toHaveClass("aui-description-list--columns-2");
  });

  it("supports custom className", () => {
    render(
      <DescriptionList
        items={items}
        className="custom-description-list"
      />,
    );

    expect(
      document.querySelector(".aui-description-list"),
    ).toHaveClass("custom-description-list");
  });

  it("supports ReactNode content", () => {
    render(
      <DescriptionList
        items={[
          {
            id: "status",
            label: <span>Status</span>,
            value: <strong>Active</strong>,
          },
        ]}
      />,
    );

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
