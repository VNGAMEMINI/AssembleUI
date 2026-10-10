import { Tabs } from "@assemble-ui/react";

const items = [
  {
    id: "overview",
    label: "Tổng quan",
    content: <p>Thông tin tổng quan của dự án.</p>,
  },
  {
    id: "components",
    label: "Components",
    content: <p>Danh sách các Component trong AssembleUI.</p>,
  },
  {
    id: "settings",
    label: "Cài đặt",
    content: <p>Các thiết lập của dự án.</p>,
  },
  {
    id: "disabled",
    label: "Không khả dụng",
    disabled: true,
    content: <p>Nội dung này không thể truy cập.</p>,
  },
];

export function TabsDemo() {
  return (
    <div className="demo-preview">
      <Tabs
        items={items}
        defaultValue="overview"
        aria-label="Thông tin dự án"
      />
    </div>
  );
}
