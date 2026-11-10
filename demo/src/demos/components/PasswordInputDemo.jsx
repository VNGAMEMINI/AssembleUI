import { PasswordInput } from "@vnallmini/react";

export function PasswordInputDemo() {
  return (
    <div className="demo-preview">
      <PasswordInput
        placeholder="Nhập mật khẩu..."
      />

      <PasswordInput
        defaultValue="assemble-ui"
        defaultVisible
        aria-label="Mật khẩu hiển thị"
      />
    </div>
  );
}
