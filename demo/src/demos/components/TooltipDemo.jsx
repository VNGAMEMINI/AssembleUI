import { Button, Tooltip } from "@assemble-ui/react";

export function TooltipDemo() {
  return (
    <div className="demo-preview">
      <Tooltip content="Thao tác chính" placement="top">
        <Button>Di chuột hoặc focus</Button>
      </Tooltip>

      <Tooltip
        content="Thông tin bổ sung"
        placement="right"
      >
        <Button variant="secondary">
          Tooltip bên phải
        </Button>
      </Tooltip>
    </div>
  );
}
