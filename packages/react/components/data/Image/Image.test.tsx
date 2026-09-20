import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Image } from "./Image";

describe("Image", () => {
  it("renders an image with src and alt", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
      />,
    );

    const image = container.querySelector("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/example.jpg");
    expect(image).toHaveAttribute("alt", "Example");
  });

  it("uses cover fit by default", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-cover",
    );
  });

  it("supports custom fit", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        fit="contain"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-contain",
    );
  });

  it("uses no radius by default", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-none",
    );
  });

  it("supports custom radius", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        radius="lg"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-lg",
    );
  });

  it("supports className", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        className="custom-image"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "custom-image",
    );
  });

  it("forwards native image attributes", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        loading="lazy"
        width={400}
        height={300}
      />,
    );

    const image = container.querySelector("img");

    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", "400");
    expect(image).toHaveAttribute("height", "300");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLImageElement>();

    render(
      <Image
        ref={ref}
        src="/images/example.jpg"
        alt="Example"
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });

  it("supports decorative images through an empty alt", () => {
    const { container } = render(
      <Image
        src="/images/decorative.jpg"
        alt=""
      />,
    );

    expect(container.querySelector("img"))
      .toHaveAttribute("alt", "");
  });
});
