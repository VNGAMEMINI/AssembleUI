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

  it("supports all fit values", () => {
    const { container, rerender } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        fit="contain"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-contain",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        fit="cover"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-cover",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        fit="fill"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-fill",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        fit="none"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-none",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        fit="scale-down"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--fit-scale-down",
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

  it("supports all radius values", () => {
    const { container, rerender } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        radius="none"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-none",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        radius="sm"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-sm",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        radius="md"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-md",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        radius="lg"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-lg",
    );

    rerender(
      <Image
        src="/images/example.jpg"
        alt="Example"
        radius="full"
      />,
    );

    expect(container.firstChild).toHaveClass(
      "aui-image--radius-full",
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

  it("forwards aria and data attributes", () => {
    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        aria-label="Example image"
        data-testid="example-image"
      />,
    );

    const image = container.querySelector("img");

    expect(image).toHaveAttribute("aria-label", "Example image");
    expect(image).toHaveAttribute("data-testid", "example-image");
  });

  it("forwards style and id", () => {
    const { container } = render(
      <Image
        id="example-image"
        src="/images/example.jpg"
        alt="Example"
        style={{ aspectRatio: "4 / 3" }}
      />,
    );

    const image = container.querySelector("img");

    expect(image).toHaveAttribute("id", "example-image");
    expect(image).toHaveStyle({ aspectRatio: "4 / 3" });
  });

  it("forwards image event handlers", () => {
    const onLoad = vi.fn();
    const onError = vi.fn();

    const { container } = render(
      <Image
        src="/images/example.jpg"
        alt="Example"
        onLoad={onLoad}
        onError={onError}
      />,
    );

    const image = container.querySelector("img");

    image?.dispatchEvent(new Event("load"));
    image?.dispatchEvent(new Event("error"));

    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledTimes(1);
  });

});
