import { useState } from "react";
import { Button, ListHeader } from "@assemble-ui/react";

export function ListHeaderDemo() {
  const [count, setCount] = useState(3);

  return (
    <div className="demo-preview">
      <ListHeader
        title="Thành viên nhóm"
        description="Những người đang tham gia dự án."
        count={`${count} thành viên`}
        actions={
          <Button
            size="sm"
            onClick={() => setCount((current) => current + 1)}
          >
            Thêm thành viên
          </Button>
        }
      />
      <p role="status">Số thành viên: {count}</p>
    </div>
  );
}
