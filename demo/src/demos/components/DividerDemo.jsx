import { Divider } from "@assemble-ui/react";

export function DividerDemo() {
  return (
    <div className="demo-preview">
      <div>
        <p>Nội dung phía trên</p>
        <Divider />
        <p>Nội dung phía dưới</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          minHeight: "4rem",
        }}
      >
        <span>Trái</span>
        <Divider orientation="vertical" />
        <span>Phải</span>
      </div>
    </div>
  );
}
