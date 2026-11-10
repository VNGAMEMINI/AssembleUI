import { useRef, useState } from "react";
import { useFullscreen } from "../_hooks/_useFullscreen";

export function DemoPreview({ DemoComponent, importCode }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const frameRef = useRef(null);
  const canvasRef = useRef(null);

  const { supported, active, toggle } = useFullscreen(
    frameRef,
    canvasRef,
  );

  async function handleCopyUsage() {
    try {
      await navigator.clipboard.writeText(importCode);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <section className="demo-preview-section">
      <div className="demo-section-heading">
        <div>
          <h2>Preview</h2>
          <p>This example is rendered directly from the library.</p>
        </div>
      </div>

      <div className="demo-preview-frame" ref={frameRef}>
        <div className="demo-preview__toolbar">
          <span>Interactive preview</span>

          <div className="demo-preview__actions">
            {supported && (
              <button
                className="demo-copy-button"
                type="button"
                onClick={toggle}
                aria-label={active ? "Exit fullscreen" : "Enter fullscreen"}
                aria-pressed={active}
              >
                {active ? "Exit fullscreen" : "Fullscreen"}
              </button>
            )}

            <button
              className="demo-copy-button"
              type="button"
              onClick={handleCopyUsage}
              aria-live="polite"
            >
              {copyStatus === "copied"
                ? "Copied!"
                : copyStatus === "error"
                  ? "Copy failed"
                  : "Copy import"}
            </button>
          </div>
        </div>

        <div className="demo-preview__canvas" ref={canvasRef}>
          <DemoComponent />
        </div>
      </div>
    </section>
  );
}
