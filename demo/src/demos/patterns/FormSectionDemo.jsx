import { useState } from "react";
import { Button, FormSection, Input } from "@assemble-ui/react";

export function FormSectionDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="demo-preview">
      <FormSection
        title="Thông tin tài khoản"
        description="Cập nhật thông tin cơ bản của bạn."
        actions={
          <Button variant="ghost" onClick={() => setSaved(false)}>
            Hủy thay đổi
          </Button>
        }
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSaved(true);
          }}
        >
          <div style={{ display: "grid", gap: "1rem" }}>
            <label>
              Họ và tên
              <Input name="name" defaultValue="Nguyễn Văn An" />
            </label>
            <label>
              Email
              <Input
                name="email"
                type="email"
                defaultValue="an@example.com"
              />
            </label>
            <div>
              <Button type="submit">Lưu thông tin</Button>
            </div>
          </div>
        </form>
      </FormSection>
      {saved && <p role="status">Thông tin đã được xác nhận.</p>}
    </div>
  );
}
