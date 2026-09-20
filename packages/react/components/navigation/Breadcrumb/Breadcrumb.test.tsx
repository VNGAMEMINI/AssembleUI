import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Current" },
  ];

  it("renders all items", () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders navigation semantics", () => {
    render(<Breadcrumb items={items} />);

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
  });

  it("renders links for non-current items", () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );

    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products",
    );
  });

  it("marks the current item", () => {
    render(<Breadcrumb items={items} />);

    expect(screen.getByText("Current")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("uses the supplied separator", () => {
    render(
      <Breadcrumb
        items={items}
        separator=">"
      />,
    );

    expect(screen.getAllByText(">")).toHaveLength(2);
  });

  it("supports an explicit current item", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products", current: true },
          { label: "Details", href: "/details" },
        ]}
      />,
    );

    expect(screen.getByText("Products")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("supports className", () => {
    render(
      <Breadcrumb
        items={items}
        className="custom-breadcrumb"
      />,
    );

    expect(
      screen.getByRole("navigation"),
    ).toHaveClass("aui-breadcrumb", "custom-breadcrumb");
  });

  it("renders ReactNode labels", () => {
    render(
      <Breadcrumb
        items={[
          { label: <strong>Home</strong> },
          { label: "Current" },
        ]}
      />,
    );

    expect(screen.getByText("Home").tagName).toBe("STRONG");
  });
});
