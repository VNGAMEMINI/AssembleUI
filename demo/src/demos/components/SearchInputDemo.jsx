import { useState } from "react";
import { SearchInput } from "@assemble-ui/react";

export function SearchInputDemo() {
  const [value, setValue] = useState("AssembleUI");

  return (
    <div className="demo-preview">
      <SearchInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        clearable
        onClear={() => setValue("")}
        placeholder="Tìm kiếm..."
        aria-label="Tìm kiếm"
      />

      <p>
        Giá trị: <strong>{value || "Trống"}</strong>
      </p>
    </div>
  );
}
