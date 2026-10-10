import { useState } from "react";
import { Autocomplete } from "@assemble-ui/react";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

export function AutocompleteDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="demo-preview">
      <Autocomplete
        options={options}
        value={value}
        onChange={(nextValue, option) => {
          setValue(nextValue);

          if (option) {
            setValue(String(option.label));
          }
        }}
        placeholder="Gõ framework rồi nhấn Enter..."
        aria-label="Tìm framework"
      />

      <p>
        Giá trị: <strong>{value || "Trống"}</strong>
      </p>

      <p>
        Nhập từ khóa và nhấn <strong>Enter</strong> để chọn
        option đầu tiên phù hợp.
      </p>
    </div>
  );
}
