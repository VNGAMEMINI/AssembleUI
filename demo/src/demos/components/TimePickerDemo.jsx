import { TimePicker } from "@assemble-ui/react";

export function TimePickerDemo() {
  return (
    <div className="demo-preview">
      <TimePicker
        label="Thời gian bắt đầu"
        defaultValue="09:00"
        description="Chọn thời gian bắt đầu."
      />

      <TimePicker
        label="Thời gian họp"
        defaultValue="14:30"
        required
      />
    </div>
  );
}
