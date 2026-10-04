import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProfilePageTemplate } from "./ProfilePageTemplate";

describe("ProfilePageTemplate", () => {
  it("renders profile content", () => {
    render(
      <ProfilePageTemplate
        profile={<div>Profile</div>}
        content={<div>Content</div>}
      />,
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders optional actions", () => {
    render(
      <ProfilePageTemplate
        profile={<div>Profile</div>}
        content={<div>Content</div>}
        actions={<button>Actions</button>}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Actions" }),
    ).toBeInTheDocument();
  });

  it("renders optional sidebar", () => {
    render(
      <ProfilePageTemplate
        profile={<div>Profile</div>}
        content={<div>Content</div>}
        sidebar={<div>Sidebar</div>}
      />,
    );

    expect(screen.getByText("Sidebar")).toBeInTheDocument();
  });

  it("forwards native attributes", () => {
    render(
      <ProfilePageTemplate
        profile={<div>Profile</div>}
        content={<div>Content</div>}
        data-testid="profile-page"
        aria-label="Profile page"
      />,
    );

    const template = screen.getByTestId("profile-page");

    expect(template).toHaveAttribute(
      "aria-label",
      "Profile page",
    );
  });

  it("merges custom className", () => {
    render(
      <ProfilePageTemplate
        profile={<div>Profile</div>}
        content={<div>Content</div>}
        className="custom-template"
        data-testid="profile-page"
      />,
    );

    expect(screen.getByTestId("profile-page")).toHaveClass(
      "aui-profile-page-template",
      "custom-template",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <ProfilePageTemplate
        ref={ref}
        profile={<div>Profile</div>}
        content={<div>Content</div>}
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toHaveClass(
      "aui-profile-page-template",
    );
  });

  it("does not render optional regions when omitted", () => {
    render(
      <ProfilePageTemplate
        profile={<div>Profile</div>}
        content={<div>Content</div>}
      />,
    );

    expect(
      document.querySelector(
        ".aui-profile-page-template__actions",
      ),
    ).not.toBeInTheDocument();

    expect(
      document.querySelector(
        ".aui-profile-page-template__sidebar",
      ),
    ).not.toBeInTheDocument();
  });
});
