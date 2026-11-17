import { DataGrid } from "@assemble-ui/react";

const rows = [
  { id: "1", name: "Nguyễn Văn An", role: "Developer", status: "Active" },
  { id: "2", name: "Trần Minh Anh", role: "Designer", status: "Active" },
  { id: "3", name: "Lê Hoàng Nam", role: "Manager", status: "Pending" },
];

const columns = [
  { key: "name", header: "Tên" },
  { key: "role", header: "Vai trò" },
  {
    key: "status",
    header: "Trạng thái",
    render: (value) => <strong>{value}</strong>,
  },
];

export function DataGridDemo() {
  return (
    <div className="demo-preview">
      <DataGrid
        columns={columns}
        rows={rows}
        rowKey="id"
        emptyState="Không có dữ liệu."
      />
    </div>
  );
}
