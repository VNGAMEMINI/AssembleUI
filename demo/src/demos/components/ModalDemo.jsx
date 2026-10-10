import { useState } from "react";
import { Button, Modal } from "@assemble-ui/react";

export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="demo-preview">
      <Button onClick={() => setOpen(true)}>
        Mở Modal
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Xác nhận thao tác"
        description="Kiểm tra lại thông tin trước khi tiếp tục."
        footer={
          <>
            <Button onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="primary"
              onClick={() => setOpen(false)}
            >
              Xác nhận
            </Button>
          </>
        }
      >
        <p>
          Modal khóa scroll của trang và hỗ trợ đóng bằng
          Escape hoặc backdrop.
        </p>
      </Modal>
    </div>
  );
}
