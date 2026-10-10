import { Textarea } from "@assemble-ui/react";

export function TextareaDemo() {
  return (
    <div className="demo-preview">
      <Textarea
        label="Mô tả"
        placeholder="Nhập mô tả..."
        description="Mô tả ngắn về nội dung."
        rows={4}
      />

      <Textarea
        label="Ghi chú"
        error="Nội dung không được để trống."
        defaultValue=""
        rows={4}
      />
    </div>
  );
}
