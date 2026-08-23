import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Box } from "./Box";
import { Flex } from "./Flex";
import { Stack } from "./Stack";

describe("base layout components", () => {
  it("keeps Box native props and custom classes", () => {
    const markup = renderToStaticMarkup(
      <Box aria-label="content" className="custom-box">Content</Box>
    );

    expect(markup).toContain("aui-box");
    expect(markup).toContain("custom-box");
    expect(markup).toContain('aria-label="content"');
  });

  it("maps Flex layout props to stable classes", () => {
    const markup = renderToStaticMarkup(
      <Flex align="center" direction="column" gap="4" justify="between" wrap />
    );

    expect(markup).toContain("aui-flex--column");
    expect(markup).toContain("aui-flex--align-center");
    expect(markup).toContain("aui-flex--justify-between");
    expect(markup).toContain("aui-flex--gap-4");
    expect(markup).toContain("aui-flex--wrap");
  });

  it("uses a vertical Stack with medium spacing by default", () => {
    const markup = renderToStaticMarkup(<Stack>Content</Stack>);

    expect(markup).toContain("aui-stack--vertical");
    expect(markup).toContain("aui-stack--spacing-4");
  });
});
