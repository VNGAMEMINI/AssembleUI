import { useState } from "react";
import { NumberInput } from "@assemble-ui/react";

export function NumberInputDemo() {
  const [value, setValue] = useState(10);

  return (
    <div className="demo-preview">
      <NumberInput
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        min={0}
        max={100}
        step={5}
        aria-label="Số lượng"
      />

      <p>
        Giá trị: <strong>{value ?? "Trống"}</strong>
      </p>
    </div>
  );
}
