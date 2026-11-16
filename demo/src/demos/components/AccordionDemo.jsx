import { Accordion, Button } from "@vnallmini/react";

export function AccordionDemo() {
  return (
    <div className="demo-preview">
      <Accordion
        defaultOpenIds={["overview"]}
        aria-label="Thông tin AssembleUI"
      >
        <Accordion.Item
          id="overview"
          title="Tổng quan"
        >
          <p>
            AssembleUI là thư viện React UI theo hướng
            Composition First.
          </p>
        </Accordion.Item>

        <Accordion.Item
          id="components"
          title="Components"
        >
          <p>
            Component là các khối UI cơ bản, độc lập
            và có thể tái sử dụng.
          </p>
          <Button size="sm" variant="primary">
            Khám phá Components
          </Button>
        </Accordion.Item>

        <Accordion.Item
          id="patterns"
          title="Patterns"
        >
          <p>
            Pattern kết hợp nhiều UI để tạo ra một
            khối giao diện có ý nghĩa.
          </p>
        </Accordion.Item>

        <Accordion.Item
          id="disabled"
          title="Mục bị vô hiệu hóa"
          disabled
        >
          Nội dung này không thể mở.
        </Accordion.Item>
      </Accordion>

      <Accordion
        multiple
        defaultOpenIds={["components", "patterns"]}
        aria-label="Chi tiết AssembleUI"
      >
        <Accordion.Item
          id="components"
          title="Components"
        >
          Component là các khối UI cơ bản.
        </Accordion.Item>

        <Accordion.Item
          id="patterns"
          title="Patterns"
        >
          Pattern kết hợp nhiều component.
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
