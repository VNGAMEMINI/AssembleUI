import { Form, Input, Button } from "@assemble-ui/react";

export function FormDemo() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="demo-preview">
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="Họ tên"
          placeholder="Nguyễn Văn An"
          required
        />

        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
        />

        <Button type="submit" variant="primary">
          Gửi biểu mẫu
        </Button>
      </Form>
    </div>
  );
}
