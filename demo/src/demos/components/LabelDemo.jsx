import { Label } from "@assemble-ui/react";

export function LabelDemo() {
  return (
    <div className="demo-preview">
      <div>
        <Label htmlFor="demo-name">
          Họ tên
        </Label>

        <input
          id="demo-name"
          placeholder="Nhập họ tên..."
        />
      </div>

      <div>
        <Label htmlFor="demo-email" required>
          Email
        </Label>

        <input
          id="demo-email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
}
