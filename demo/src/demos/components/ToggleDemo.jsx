import { useState } from "react";
import { Toggle } from "@assemble-ui/react";

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="demo-preview">
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Bật chế độ xem"
      >
        {pressed ? "Đang bật" : "Đang tắt"}
      </Toggle>

      <p>
        Toggle: <strong>{pressed ? "Pressed" : "Not pressed"}</strong>
      </p>

      <Toggle defaultPressed>
        Toggle mặc định bật
      </Toggle>
    </div>
  );
}
