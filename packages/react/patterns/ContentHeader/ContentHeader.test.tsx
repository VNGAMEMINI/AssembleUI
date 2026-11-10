import {
  render,
  screen,
} from "@testing-library/react";

import {
  describe,
  expect,
  it,
} from "vitest";

import { ContentHeader } from "./ContentHeader";

describe("ContentHeader", () => {
  it("renders the title and description", () => {
    render(
      <ContentHeader
        title="Dashboard"
        description="Overview of your workspace."
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Dashboard",
        level: 1,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Overview of your workspace.",
      ),
    ).toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    render(
      <ContentHeader
        title="Settings"
        breadcrumbs={[
          {
            id: "home",
            label: "Home",
            href: "/",
          },
          {
            id: "settings",
            label: "Settings",
            current: true,
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("link", {
        name: "Home",
      }),
    ).toHaveAttribute("href", "/");

    expect(
      screen.getByRole("heading", {
        name: "Settings",
        level: 1,
      }),
    ).toBeInTheDocument();
  });

  it("renders actions", () => {
    render(
      <ContentHeader
        title="Projects"
        actions={
          <button type="button">
            Create project
          </button>
        }
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Create project",
      }),
    ).toBeInTheDocument();
  });

  it("supports custom content", () => {
    render(
      <ContentHeader
        title={
          <span>
            Custom title
          </span>
        }
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Custom title",
      }),
    ).toBeInTheDocument();
  });

  it("supports a custom class name", () => {
    render(
      <ContentHeader
        title="Dashboard"
        className="custom-content-header"
      />,
    );

    expect(
      document.querySelector(
        ".aui-content-header",
      ),
    ).toHaveClass(
      "custom-content-header",
    );
  });

  it("supports section HTML attributes", () => {
    render(
      <ContentHeader
        title="Dashboard"
        data-testid="content-header"
      />,
    );

    expect(
      screen.getByTestId("content-header"),
    ).toBeInTheDocument();
  });
});
