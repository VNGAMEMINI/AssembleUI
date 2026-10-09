import { StatsOverview } from "@assemble-ui/react";

export function StatsOverviewDemo() {
  return (
    <div className="demo-preview">
      <StatsOverview
        title="Tổng quan hệ thống"
        description="Các chỉ số minh họa cho tháng hiện tại."
        items={[
          {
            id: "users",
            label: "Người dùng",
            value: "2.480",
            description: "Tổng số tài khoản",
          },
          {
            id: "projects",
            label: "Dự án",
            value: "128",
            description: "Dự án đang quản lý",
          },
          {
            id: "completion",
            label: "Hoàn thành",
            value: "86%",
            description: "Tỷ lệ hoàn thành",
          },
        ]}
      />
    </div>
  );
}
