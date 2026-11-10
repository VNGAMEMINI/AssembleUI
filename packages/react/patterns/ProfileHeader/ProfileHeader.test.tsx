import {
  createRef,
} from "react";

import {
  render,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
} from "vitest";

import {
  ProfileHeader,
} from "./ProfileHeader";

describe("ProfileHeader", () => {
  it("renders the profile name", () => {
    render(
      <ProfileHeader name="Nguyen Van A" />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Nguyen Van A",
      }),
    ).toBeInTheDocument();
  });

  it("renders the avatar", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        avatarSrc="/avatar.png"
        avatarAlt="Nguyen Van A"
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Nguyen Van A",
      }),
    ).toBeInTheDocument();
  });

  it("renders initials when avatar source is not provided", () => {
    render(
      <ProfileHeader name="Nguyen Van A" />,
    );

    expect(
      screen.getByText("NV"),
    ).toBeInTheDocument();
  });

  it("renders a custom avatar fallback", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        avatarFallback="A"
      />,
    );

    expect(
      screen.getByText("A"),
    ).toBeInTheDocument();
  });

  it("uses the profile name as the default avatar alt", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        avatarSrc="/avatar.png"
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Nguyen Van A",
      }),
    ).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        description="Frontend Developer"
      />,
    );

    expect(
      screen.getByText("Frontend Developer"),
    ).toBeInTheDocument();
  });

  it("renders a custom badge", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        badge={<span>Pro</span>}
      />,
    );

    expect(
      screen.getByText("Pro"),
    ).toBeInTheDocument();
  });

  it("renders a custom action", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        action={<button type="button">Edit</button>}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Edit",
      }),
    ).toBeInTheDocument();
  });

  it("forwards native attributes and className", () => {
    render(
      <ProfileHeader
        name="Nguyen Van A"
        className="custom-profile"
        data-testid="profile-header"
        aria-label="User profile"
      />,
    );

    const profile = screen.getByTestId(
      "profile-header",
    );

    expect(profile).toHaveClass(
      "aui-profile-header",
      "custom-profile",
    );

    expect(profile).toHaveAttribute(
      "aria-label",
      "User profile",
    );
  });

  it("forwards the ref", () => {
    const ref = createRef<HTMLElement>();

    render(
      <ProfileHeader
        ref={ref}
        name="Nguyen Van A"
        data-testid="profile-header-ref"
      />,
    );

    expect(ref.current).toBe(
      screen.getByTestId("profile-header-ref"),
    );
  });
});
