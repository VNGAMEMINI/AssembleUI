import { createRef } from "react";

import { describe, expect, it } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders fallback children", () => {
    render(<Avatar>AB</Avatar>);

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(
      <Avatar src="/avatar.png" alt="User avatar">
        AB
      </Avatar>,
    );

    const image = screen.getByRole("img", {
      name: "User avatar",
    });

    expect(image).toHaveAttribute("src", "/avatar.png");
  });

  it("falls back when image fails", () => {
    render(
      <Avatar src="/invalid.png" alt="User avatar">
        AB
      </Avatar>,
    );

    const image = screen.getByRole("img", {
      name: "User avatar",
    });

    fireEvent.error(image);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("supports sizes", () => {
    const { rerender } = render(<Avatar size="sm">A</Avatar>);

    expect(screen.getByText("A").parentElement).toHaveClass("aui-avatar--sm");

    rerender(<Avatar size="lg">A</Avatar>);

    expect(screen.getByText("A").parentElement).toHaveClass("aui-avatar--lg");
  });

  it("supports shapes", () => {
    const { rerender } = render(<Avatar shape="circle">A</Avatar>);

    expect(screen.getByText("A").parentElement).toHaveClass(
      "aui-avatar--circle",
    );

    rerender(<Avatar shape="square">A</Avatar>);

    expect(screen.getByText("A").parentElement).toHaveClass(
      "aui-avatar--square",
    );
  });

  it("merges className", () => {
    render(<Avatar className="custom-avatar">A</Avatar>);

    expect(screen.getByText("A").parentElement).toHaveClass(
      "aui-avatar",
      "custom-avatar",
    );
  });

  it("forwards span attributes", () => {
    render(
      <Avatar data-testid="avatar" title="Profile">
        A
      </Avatar>,
    );

    const avatar = screen.getByTestId("avatar");

    expect(avatar).toHaveAttribute("title", "Profile");
  });

  it("forwards ref", () => {
    let ref: HTMLSpanElement | null = null;

    render(
      <Avatar
        ref={(element) => {
          ref = element;
        }}
      >
        A
      </Avatar>,
    );

    expect(ref).toBe(screen.getByText("A").parentElement);
  });

  it("uses fallback content when no src is provided", () => {
    render(<Avatar>AB</Avatar>);

    const fallback = screen.getByText("AB");

    expect(fallback).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps fallback content accessible when alt is provided", () => {
    render(<Avatar alt="User avatar">AB</Avatar>);

    const fallback = screen.getByText("AB");

    expect(fallback).not.toHaveAttribute("aria-hidden");
  });
});
