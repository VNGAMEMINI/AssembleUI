import { useState } from "react";
import { Button, Dropdown } from "@assemble-ui/react";

const items = [
  {
    id: "edit",
    label: "Chỉnh sửa",
  },
  {
    id: "duplicate",
    label: "Nhân bản",
  },
  {
    id: "archive",
    label: "Lưu trữ",
  },
  {
    id: "disabled",
    label: "Không khả dụng",
    disabled: true,
  },
];

export function DropdownDemo() {
  const [selected, setSelected] = useState("");

  return (
    <div className="demo-preview">
      <Dropdown
        trigger={<Button>Thao tác</Button>}
        items={items.map((item) => ({
          ...item,
          onSelect: () => setSelected(item.label),
        }))}
        placement="bottom"
      />

      <p>
        Đã chọn: <strong>{selected || "Chưa chọn"}</strong>
      </p>
    </div>
  );
}
