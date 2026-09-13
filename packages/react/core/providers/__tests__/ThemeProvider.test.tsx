import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeProvider } from "../ThemeProvider";
import { useTheme } from "../../hooks";

function ThemeConsumer() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testid="theme">{theme}</span>

      <button type="button" onClick={() => setTheme("dark")}>
        Change theme
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  it("provides the default theme", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("supports a custom default theme", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("updates the theme through context", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await act(async () => {
      screen.getByRole("button", { name: "Change theme" }).click();
    });

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("does not add a wrapper element", () => {
    const { container } = render(
      <ThemeProvider>
        <span data-testid="child">Child</span>
      </ThemeProvider>,
    );

    expect(container.firstElementChild).toBe(screen.getByTestId("child"));
  });
});
