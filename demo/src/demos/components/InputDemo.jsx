import { useState } from "react";
import { Input } from "@vnallmini/react";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function InputDemo() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const showEmailError =
    email.length > 0 && !isValidEmail(email);

  return (
    <div className="demo-preview">
      <Input
        label="Tên người dùng"
        placeholder="Nhập tên..."
        description="Tên hiển thị trong hồ sơ."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={showEmailError ? "Email không hợp lệ." : undefined}
      />
    </div>
  );
}
