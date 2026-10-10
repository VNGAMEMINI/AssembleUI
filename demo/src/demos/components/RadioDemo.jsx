import { useState } from "react";
import { Radio } from "@assemble-ui/react";

export function RadioDemo() {
  const [value, setValue] = useState("react");

  return (
    <div className="demo-preview">
      <Radio
        name="framework"
        value="react"
        checked={value === "react"}
        onChange={(event) => setValue(event.target.value)}
        label="React"
        description="Thư viện UI phía client."
      />

      <Radio
        name="framework"
        value="vue"
        checked={value === "vue"}
        onChange={(event) => setValue(event.target.value)}
        label="Vue"
        description="Framework JavaScript."
      />

      <Radio
        name="framework"
        value="svelte"
        checked={value === "svelte"}
        onChange={(event) => setValue(event.target.value)}
        label="Svelte"
      />

      <p>
        Đã chọn: <strong>{value}</strong>
      </p>
    </div>
  );
}
