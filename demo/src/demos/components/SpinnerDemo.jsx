import { Spinner } from "@vnallmini/react";

export function SpinnerDemo() {
  return (
    <div className="demo-preview">
      <Spinner size="sm" label="Đang tải..." />
      <Spinner size="md" label="Đang xử lý..." />
      <Spinner size="lg" label="Đang tải dữ liệu..." />
    </div>
  );
}
