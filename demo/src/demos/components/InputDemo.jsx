import { Input } from "@assemble-ui/react";

export function InputDemo() {
  return (
    <div className="demo-preview">
      <Input
        label="Tên người dùng"
        placeholder="Nhập tên..."
        description="Tên hiển thị trong hồ sơ."
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error="Email không hợp lệ."
      />
    </div>
  );
}
