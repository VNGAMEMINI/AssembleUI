import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders an accessible native button with default styles", () => {
    const markup = renderToStaticMarkup(<Button>Save</Button>);

    expect(markup).toContain('type="button"');
    expect(markup).toContain("aui-button--primary");
    expect(markup).toContain("aui-button--md");
    expect(markup).toContain(">Save</button>");
  });

  it("disables itself and exposes busy state while loading", () => {
    const markup = renderToStaticMarkup(<Button loading>Save</Button>);

    expect(markup).toContain("disabled");
    expect(markup).toContain('aria-busy="true"');
    expect(markup).toContain("aui-button--loading");
  });

  it("preserves native props and custom classes", () => {
    const markup = renderToStaticMarkup(
      <Button className="custom-button" size="lg" variant="danger">
        Delete
      </Button>
    );

    expect(markup).toContain("custom-button");
    expect(markup).toContain("aui-button--danger");
    expect(markup).toContain("aui-button--lg");
  });
});
