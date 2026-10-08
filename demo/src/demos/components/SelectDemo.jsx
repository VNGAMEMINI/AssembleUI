import { Select } from "@assemble-ui/react";

export function SelectDemo() {
  return (
    <div className="demo-preview">
      <Select
        label="Framework"
        defaultValue="react"
        description="Chọn framework bạn muốn sử dụng."
      >
        <option value="">Chọn framework...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>

      <Select
        label="Trạng thái"
        defaultValue=""
        error="Vui lòng chọn trạng thái."
      >
        <option value="">Chọn trạng thái...</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="disabled">Disabled</option>
      </Select>
    </div>
  );
}
