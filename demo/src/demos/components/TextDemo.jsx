import { Text } from "@assemble-ui/react";

export function TextDemo() {
  return (
    <div className="demo-preview">
      <Text size="sm">
        Văn bản kích thước nhỏ.
      </Text>

      <Text size="md">
        Văn bản kích thước mặc định.
      </Text>

      <Text size="lg">
        Văn bản kích thước lớn.
      </Text>

      <Text tone="muted">
        Văn bản với tone muted.
      </Text>

      <Text tone="danger">
        Văn bản cảnh báo hoặc lỗi.
      </Text>

      <Text as="span" size="sm">
        Text có thể render dưới dạng span.
      </Text>
    </div>
  );
}
