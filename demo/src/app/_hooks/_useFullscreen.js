import { useCallback, useEffect, useState } from "react";

export function useFullscreen(targetRef, contentRef) {
  const [supported, setSupported] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    const target = targetRef.current;

    if (!content || !target) return undefined;

    const updateSupport = () => {
      setSupported(
        Boolean(
          content.querySelector("[data-demo-full]") &&
            target.requestFullscreen &&
            document.fullscreenEnabled,
        ),
      );
    };

    const observer = new MutationObserver(updateSupport);

    observer.observe(content, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["data-demo-full"],
    });

    updateSupport();

    const handleFullscreenChange = () => {
      setActive(document.fullscreenElement === target);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      observer.disconnect();
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
    };
  }, [targetRef, contentRef]);

  const toggle = useCallback(async () => {
    const target = targetRef.current;

    if (!target || !supported) return;

    try {
      if (document.fullscreenElement === target) {
        await document.exitFullscreen();
      } else if (!document.fullscreenElement) {
        await target.requestFullscreen();
      }
    } catch (error) {
      console.error("Unable to toggle fullscreen:", error);
    }
  }, [targetRef, supported]);

  return { supported, active, toggle };
}
