import { useState } from "react";

import {
  Button,
  Card,
  Drawer,
} from "@vnallmini/react";

export function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="demo-preview">
      <Button onClick={() => setOpen(true)}>
        Mở ngăn kéo
      </Button>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        closeOnBackdrop
        closeOnEscape
      >
        <Drawer.Content
          title="Không gian làm việc"
          description="Các khu vực và thông tin của bạn"
          placement="right"
          columns={2}
          gap="var(--aui-token-space-4)"
        >
          <Drawer.Item>
            <Card>
              <strong>Thông tin tài khoản</strong>
              <p>Nguyễn Văn A</p>
              <p>user@example.com</p>
            </Card>
          </Drawer.Item>

          <Drawer.Item>
            <Card variant="outlined">
              <strong>Hoạt động</strong>
              <p>12 dự án đang thực hiện</p>
            </Card>
          </Drawer.Item>

          <Drawer.Item>
            <Card>
              <strong>Thống kê</strong>
              <p>24 nhiệm vụ đã hoàn thành</p>
            </Card>
          </Drawer.Item>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}
