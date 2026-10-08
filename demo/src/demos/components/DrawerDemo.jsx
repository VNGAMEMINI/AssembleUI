import { useState } from "react";
import { Button, Drawer } from "@assemble-ui/react";

export function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="demo-preview">
      <Button onClick={() => setOpen(true)}>
        Mở Drawer
      </Button>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Thông tin tài khoản"
        description="Đây là nội dung được hiển thị trong Drawer."
        footer={
          <Button onClick={() => setOpen(false)}>
            Đóng
          </Button>
        }
      >
        <p>
          Drawer có thể đóng bằng nút đóng, backdrop hoặc phím
          Escape.
        </p>
      </Drawer>
    </div>
  );
}
