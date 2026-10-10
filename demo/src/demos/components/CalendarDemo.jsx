import { useState } from "react";
import { Calendar } from "@assemble-ui/react";

export function CalendarDemo() {
  const [date, setDate] = useState(new Date(2026, 9, 8));

  return (
    <div className="demo-preview">
      <Calendar
        value={date}
        minDate={new Date(2026, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
        onChange={setDate}
      />

      <p>
        Ngày đã chọn:{" "}
        <strong>
          {date.toLocaleDateString("vi-VN")}
        </strong>
      </p>
    </div>
  );
}
