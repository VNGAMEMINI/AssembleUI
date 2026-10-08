import { DatePicker } from "@assemble-ui/react";

export function DatePickerDemo() {
  return (
    <div className="demo-preview">
      <DatePicker
        label="Ngày bắt đầu"
        defaultValue="2026-10-08"
        description="Chọn ngày bắt đầu."
      />

      <DatePicker
        label="Ngày kết thúc"
        error="Ngày kết thúc phải sau ngày bắt đầu."
      />
    </div>
  );
}
