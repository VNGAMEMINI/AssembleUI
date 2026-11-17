import { useState } from "react";
import { Button, Toast } from "@assemble-ui/react";

export function ToastDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="demo-preview">
      <Button
        variant="primary"
        onClick={() => setOpen(true)}
      >
        Hiện Toast
      </Button>

      <Toast
        open={open}
        title="Thành công"
        message="Dữ liệu đã được lưu thành công."
        status="success"
        duration={0}
        closeLabel="Đóng"
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
