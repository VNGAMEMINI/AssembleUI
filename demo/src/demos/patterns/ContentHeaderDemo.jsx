import { useState } from "react";
import { Button, ContentHeader } from "@assemble-ui/react";

export function ContentHeaderDemo() {
  const [message, setMessage] = useState("");

  return (
    <div className="demo-preview">
      <ContentHeader
        title="Quản lý dự án"
        description="Theo dõi và quản lý các dự án của bạn tại một nơi."
        breadcrumbs={[
          { id: "home", label: "Trang chủ", href: "#home" },
          { id: "projects", label: "Dự án", current: true },
        ]}
        actions={
          <Button onClick={() => setMessage("Đã chọn tạo dự án mới.")}>
            Tạo dự án
          </Button>
        }
      />
      {message && <p role="status">{message}</p>}
    </div>
  );
}
