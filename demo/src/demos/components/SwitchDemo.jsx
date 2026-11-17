import { useState } from "react";
import { Switch } from "@assemble-ui/react";

export function SwitchDemo() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="demo-preview">
      <Switch
        checked={enabled}
        onChange={(event) => {
          setEnabled(event.target.checked);
        }}
        label="Bật thông báo"
        description="Nhận thông báo khi có cập nhật mới."
      />

      <Switch
        label="Tính năng bắt buộc"
        required
      />

      <Switch
        label="Tùy chọn có lỗi"
        error="Không thể bật tùy chọn này."
      />

      <p>
        Trạng thái: <strong>{enabled ? "Bật" : "Tắt"}</strong>
      </p>
    </div>
  );
}
