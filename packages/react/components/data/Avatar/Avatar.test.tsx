import {
  createRef,
} from "react";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders fallback children", () => {
    render(<Avatar>AB</Avatar>);

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(
      <Avatar
        src="/avatar.png"
        alt="User avatar"
      >
        AB
      </Avatar>,
    );

    const image = screen.getByRole("img", {
      name: "User avatar",
    });

    expect(image).toHaveAttribute(
      "src",
      "/avatar.png",
    );
  });

  it("falls back when image fails", () => {
    render(
      <Avatar
        src="/invalid.png"
        alt="User avatar"
      >
        AB
      </Avatar>,
    );

    const image = screen.getByRole("img", {
      name: "User avatar",
    });

    fireEvent.error(image);

    expect(
      screen.queryByRole("img"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("AB"),
    ).toBeInTheDocument();
  });

  it("supports sizes", () => {
    const { rerender } = render(
      <Avatar size="sm">A</Avatar>,
    );

    expect(
      screen.getByText("A").parentElement,
    ).toHaveClass("aui-avatar--sm");

    rerender(
      <Avatar size="lg">A</Avatar>,
    );

    expect(
      screen.getByText("A").parentElement,
    ).toHaveClass("aui-avatar--lg");
  });

  it("supports shapes", () => {
    const { rerender } = render(
      <Avatar shape="circle">A</Avatar>,
    );

    expect(
      screen.getByText("A").parentElement,
    ).toHaveClass("aui-avatar--circle");

    rerender(
      <Avatar shape="square">A</Avatar>,
    );

    expect(
      screen.getByText("A").parentElement,
    ).toHaveClass("aui-avatar--square");
  });

  it("merges className", () => {
    render(
      <Avatar className="custom-avatar">
        A
      </Avatar>,
    );

    expect(
      screen.getByText("A").parentElement,
    ).toHaveClass(
      "aui-avatar",
      "custom-avatar",
    );
  });

  it("forwards span attributes", () => {
    render(
      <Avatar
        data-testid="avatar"
        title="Profile"
      >
        A
      </Avatar>,
    );

    const avatar = screen.getByTestId("avatar");

    expect(avatar).toHaveAttribute(
      "title",
      "Profile",
    );
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Avatar ref={ref}>A</Avatar>,
    );

    expect(ref.current).toBeInstanceOf(
      HTMLSpanElement,
    );
  });
});
