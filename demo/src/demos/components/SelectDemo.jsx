import { useState } from "react";
import { Select } from "@vnallmini/react";

export function SelectDemo() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!status) {
      return;
    }
  };

  return (
    <form className="demo-preview" onSubmit={handleSubmit}>
      <Select
        label="Trạng thái"
        name="status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        error={!status ? "Vui lòng chọn trạng thái." : undefined}
      >
        <option value="">Chọn trạng thái...</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="disabled">Disabled</option>
      </Select>
    </form>
  );
}