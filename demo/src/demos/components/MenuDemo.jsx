import { useState } from "react";
import { Menu } from "@assemble-ui/react";

export function MenuDemo() {
  const [selected, setSelected] = useState("");

  const items = [
    {
      id: "dashboard",
      label: "Dashboard",
    },
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "settings",
      label: "Settings",
    },
    {
      id: "disabled",
      label: "Không khả dụng",
      disabled: true,
    },
  ];

  return (
    <div className="demo-preview">
      <Menu
        items={items}
        loopFocus
        onItemSelect={(item) => {
          setSelected(item.id);
        }}
      />

      <p>
        Mục đã chọn:{" "}
        <strong>{selected || "Chưa chọn"}</strong>
      </p>
    </div>
  );
}
