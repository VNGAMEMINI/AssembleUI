import { useState } from "react";
import { DataToolbar } from "@assemble-ui/react";

export function DataToolbarDemo() {
  const [status, setStatus] = useState("Tất cả trạng thái");

  return (
    <div className="demo-preview">
      <DataToolbar
        title="Danh sách người dùng"
        description="Tìm kiếm và quản lý người dùng trong hệ thống."
        filters={
          <label>
            Trạng thái{" "}
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>Tất cả trạng thái</option>
              <option>Đang hoạt động</option>
              <option>Đã khóa</option>
            </select>
          </label>
        }
        actions={
          <button type="button" onClick={() => setStatus("Tất cả trạng thái")}>
            Xóa bộ lọc
          </button>
        }
      />
      <p role="status">Bộ lọc hiện tại: {status}</p>
    </div>
  );
}
