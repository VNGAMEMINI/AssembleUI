import { useState } from "react";
import { Checkbox } from "@assemble-ui/react";

export function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="demo-preview">
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        label="Sử dụng Design Tokens"
        description="Áp dụng token của AssembleUI."
      />

      <Checkbox
        label="Tùy chọn bị vô hiệu hóa"
        disabled
      />

      <Checkbox
        label="Tùy chọn có lỗi"
        error="Bạn cần xác nhận tùy chọn này."
      />
    </div>
  );
}
