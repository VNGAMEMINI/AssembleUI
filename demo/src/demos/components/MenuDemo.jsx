import { useState } from "react";
import { Button, Menu } from "@vnallmini/react";

export function MenuDemo() {
  const [selected, setSelected] = useState("");

  const items = ["Dashboard", "Projects", "Settings"];

  return (
    <div className="demo-preview">
      <Menu>
        {items.map((item) => (
          <Menu.Item key={item}>
            <Button variant="ghost" onClick={() => setSelected(item)}>
              {item}
            </Button>
          </Menu.Item>
        ))}

        <Menu.Item>
          <Button variant="ghost" disabled>
            Không khả dụng
          </Button>
        </Menu.Item>
      </Menu>

      <p aria-live="polite">
        Mục đã chọn: <strong>{selected || "Chưa chọn"}</strong>
      </p>
    </div>
  );
}
