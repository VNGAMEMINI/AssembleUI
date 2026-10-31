import { Button, Tooltip } from "@vnallmini/react";

export function TooltipDemo() {
  return (
    <div
      className="demo-preview"
      data-demo-full
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
        padding: "4rem 2rem",
        overflow: "visible",
      }}
    >
      <Tooltip
        content="Lưu các thay đổi hiện tại."
        placement="top"
      >
        <Button>Lưu</Button>
      </Tooltip>

      <Tooltip
        content="Tạo một mục mới trong danh sách."
        placement="right"
      >
        <Button variant="secondary">Tạo mới</Button>
      </Tooltip>

      <Tooltip
        content="Hành động này không thể hoàn tác sau khi xác nhận."
        placement="bottom"
      >
        <Button variant="secondary">Xóa dữ liệu</Button>
      </Tooltip>
    </div>
  );
}
