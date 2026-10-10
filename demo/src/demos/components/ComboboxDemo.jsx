import { useState } from "react";
import { Combobox } from "@assemble-ui/react";

const options = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "svelte", label: "Svelte" },
  { id: "angular", label: "Angular" },
  { id: "solid", label: "Solid", disabled: true },
];

export function ComboboxDemo() {
  const [value, setValue] = useState("react");

  return (
    <div className="demo-preview">
      <Combobox
        label="Framework"
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="Tìm framework..."
        description="Gõ để lọc hoặc dùng Arrow Up/Down."
        noResultsText="Không tìm thấy framework."
      />

      <p>
        Đã chọn: <strong>{value || "Chưa chọn"}</strong>
      </p>
    </div>
  );
}
