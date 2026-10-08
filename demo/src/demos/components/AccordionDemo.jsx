import { Accordion } from "@assemble-ui/react";

const items = [
  {
    id: "overview",
    title: "Tổng quan",
    content: "AssembleUI là thư viện React UI theo hướng Composition First.",
  },
  {
    id: "components",
    title: "Components",
    content: "Component là các khối UI cơ bản, độc lập và có thể tái sử dụng.",
  },
  {
    id: "patterns",
    title: "Patterns",
    content: "Pattern kết hợp nhiều UI để tạo ra một khối giao diện có ý nghĩa.",
  },
  {
    id: "disabled",
    title: "Mục bị vô hiệu hóa",
    content: "Nội dung này không thể mở.",
    disabled: true,
  },
];

export function AccordionDemo() {
  return (
    <div className="demo-preview">
      <Accordion
        items={items}
        defaultOpenIds={["overview"]}
        aria-label="Thông tin AssembleUI"
      />

      <h4>Cho phép mở nhiều mục</h4>

      <Accordion
        items={items}
        multiple
        defaultOpenIds={["components", "patterns"]}
        aria-label="Chi tiết AssembleUI"
      />
    </div>
  );
}
