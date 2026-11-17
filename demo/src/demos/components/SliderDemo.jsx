import { useState } from "react";
import { Slider } from "@assemble-ui/react";

export function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <div className="demo-preview">
      <Slider
        value={value}
        min={0}
        max={100}
        step={5}
        onChange={setValue}
        aria-label="Mức độ"
      />

      <p>
        Mức độ: <strong>{value}%</strong>
      </p>
    </div>
  );
}
