import { Callout } from "@assemble-ui/react";

export function CalloutDemo() {
  return (
    <div className="demo-preview">
      <Callout tone="neutral" title="Neutral">
        Nội dung trung lập dùng để cung cấp thêm thông tin.
      </Callout>

      <Callout tone="info" title="Information">
        Đây là thông tin bổ sung cho người dùng.
      </Callout>

      <Callout tone="success" title="Success">
        Thao tác đã hoàn tất thành công.
      </Callout>

      <Callout tone="warning" title="Warning">
        Một số dữ liệu cần được kiểm tra.
      </Callout>

      <Callout tone="danger" title="Danger">
        Có vấn đề cần được xử lý trước khi tiếp tục.
      </Callout>
    </div>
  );
}
