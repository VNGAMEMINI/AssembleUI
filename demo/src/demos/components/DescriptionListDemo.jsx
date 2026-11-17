import { DescriptionList } from "@assemble-ui/react";

const items = [
  { id: "name", label: "Họ tên", value: "Nguyễn Văn An" },
  { id: "email", label: "Email", value: "an@example.com" },
  { id: "role", label: "Vai trò", value: "Developer" },
  { id: "status", label: "Trạng thái", value: "Đang hoạt động" },
  { id: "team", label: "Nhóm", value: "Frontend" },
  { id: "location", label: "Vị trí", value: "Việt Nam" },
];

export function DescriptionListDemo() {
  return (
    <div className="demo-preview">
      <DescriptionList items={items} columns={2} />
    </div>
  );
}
