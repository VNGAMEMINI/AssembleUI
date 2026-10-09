import { useState } from "react";
import { DashboardPageTemplate } from "@assemble-ui/react";

const data = {
  title: "Tổng quan dự án",
  description: "Theo dõi tiến độ và hoạt động gần đây.",
  breadcrumbs: [
    { id: "home", label: "Trang chủ", href: "#home" },
    { id: "dashboard", label: "Dashboard", current: true },
  ],
  stats: [
    {
      id: "projects",
      label: "Tổng dự án",
      value: 24,
      description: "Dự án trong hệ thống",
    },
    {
      id: "active",
      label: "Đang thực hiện",
      value: 12,
      description: "Dự án đang hoạt động",
    },
    {
      id: "completed",
      label: "Đã hoàn thành",
      value: 9,
      description: "Dự án hoàn tất",
    },
  ],
  toolbar: {
    title: "Dự án gần đây",
    description: "Danh sách dự án minh họa.",
  },
  columns: [
    { key: "name", header: "Tên dự án" },
    { key: "owner", header: "Phụ trách" },
    { key: "status", header: "Trạng thái" },
  ],
  rows: [
    {
      id: "p1",
      name: "AssembleUI",
      owner: "An",
      status: "Đang thực hiện",
    },
    {
      id: "p2",
      name: "Examination",
      owner: "Minh",
      status: "Hoàn thành",
    },
    {
      id: "p3",
      name: "Check",
      owner: "Lan",
      status: "Đang thực hiện",
    },
  ],
  pagination: {
    page: 1,
    totalPages: 5,
    siblingCount: 1,
    summary: "24 dự án",
  },
};

export function DashboardPageTemplateDemo() {
  const [page, setPage] = useState(1);

  return (
    <div className="demo-preview">
      <DashboardPageTemplate
        data={{
          ...data,
          pagination: {
            ...data.pagination,
            page,
          },
        }}
        onPageChange={setPage}
      />
      <p role="status">Trang đang chọn: {page}</p>
    </div>
  );
}
