import { useState } from "react";
import { FilterBar } from "@assemble-ui/react";

export function FilterBarDemo() {
  const [applied, setApplied] = useState("Chưa áp dụng bộ lọc");

  return (
    <div className="demo-preview">
      <FilterBar
        aria-label="Lọc danh sách dự án"
        fields={[
          {
            id: "keyword",
            label: "Từ khóa",
            control: (
              <input
                name="keyword"
                type="search"
                placeholder="Tên dự án"
              />
            ),
          },
          {
            id: "status",
            label: "Trạng thái",
            control: (
              <select name="status" defaultValue="all">
                <option value="all">Tất cả</option>
                <option value="active">Đang thực hiện</option>
                <option value="completed">Hoàn thành</option>
              </select>
            ),
          },
        ]}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          setApplied(
            `Từ khóa: ${formData.get("keyword") || "Tất cả"}; trạng thái: ${formData.get("status")}`,
          );
        }}
        onReset={() => setApplied("Đã đặt lại bộ lọc")}
      />
      <p role="status">{applied}</p>
    </div>
  );
}
