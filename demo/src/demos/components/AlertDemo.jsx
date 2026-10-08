import { Alert } from "@assemble-ui/react";

export function AlertDemo() {
  return (
    <div className="demo-preview">
      <Alert variant="info" heading="Thông tin">
        Đây là thông báo thông tin dành cho người dùng.
      </Alert>

      <Alert variant="success" heading="Thành công">
        Thao tác đã được thực hiện thành công.
      </Alert>

      <Alert variant="warning" heading="Cảnh báo">
        Hãy kiểm tra lại thông tin trước khi tiếp tục.
      </Alert>

      <Alert variant="danger" heading="Nguy hiểm">
        Đã xảy ra lỗi khi thực hiện thao tác.
      </Alert>
    </div>
  );
}
