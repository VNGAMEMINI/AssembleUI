import { useRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FileInput } from "./FileInput";

describe("FileInput", () => {
  it("renders a file input", () => {
    render(<FileInput aria-label="Upload file" />);

    expect(
      screen.getByLabelText("Upload file"),
    ).toHaveAttribute("type", "file");
  });

  it("forwards standard input props", () => {
    render(
      <FileInput
        aria-label="Upload image"
        accept="image/*"
        multiple
        disabled
      />,
    );

    const input = screen.getByLabelText("Upload image");

    expect(input).toHaveAttribute("accept", "image/*");
    expect(input).toHaveAttribute("multiple");
    expect(input).toBeDisabled();
  });

  it("returns selected files through onChange", () => {
    const onChange = vi.fn();

    render(
      <FileInput
        aria-label="Upload file"
        onChange={onChange}
      />,
    );

    const file = new File(
      ["hello"],
      "hello.txt",
      { type: "text/plain" },
    );

    fireEvent.change(
      screen.getByLabelText("Upload file"),
      {
        target: {
          files: [file],
        },
      },
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBeInstanceOf(FileList);
    expect(onChange.mock.calls[0][0][0]).toBe(file);
  });

  it("supports a custom class name", () => {
    render(
      <FileInput
        aria-label="Upload file"
        className="custom-file-input"
      />,
    );

    expect(
      screen.getByLabelText("Upload file"),
    ).toHaveClass(
      "aui-file-input",
      "custom-file-input",
    );
  });

  it("forwards a ref", () => {
    const Test = () => {
      const ref = useRef<HTMLInputElement>(null);

      return (
        <FileInput
          ref={ref}
          aria-label="Upload file"
        />
      );
    };

    render(<Test />);

    expect(
      screen.getByLabelText("Upload file"),
    ).toBeInTheDocument();
  });

  it("supports an empty file selection", () => {
    const onChange = vi.fn();

    render(
      <FileInput
        aria-label="Upload file"
        onChange={onChange}
      />,
    );

    fireEvent.change(
      screen.getByLabelText("Upload file"),
      {
        target: {
          files: [],
        },
      },
    );

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
