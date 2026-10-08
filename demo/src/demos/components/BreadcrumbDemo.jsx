import { Breadcrumb } from "@assemble-ui/react";

const items = [
  {
    id: "home",
    label: "Trang chủ",
    href: "#home",
  },
  {
    id: "projects",
    label: "Dự án",
    href: "#projects",
  },
  {
    id: "assemble-ui",
    label: "AssembleUI",
    href: "#assemble-ui",
  },
  {
    id: "components",
    label: "Components",
    current: true,
  },
];

export function BreadcrumbDemo() {
  return (
    <div className="demo-preview">
      <Breadcrumb
        items={items}
        separator="/"
        aria-label="Đường dẫn trang"
      />

      <Breadcrumb
        items={items}
        separator="›"
        aria-label="Đường dẫn trang dạng mũi tên"
      />
    </div>
  );
}
