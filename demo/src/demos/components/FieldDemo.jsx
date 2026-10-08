import { Field, Input } from "@assemble-ui/react";

export function FieldDemo() {
  return (
    <div className="demo-preview">
      <Field
        label="Tên project"
        description="Tên định danh cho project."
        htmlFor="project-name"
        required
      >
        <Input
          id="project-name"
          placeholder="AssembleUI"
        />
      </Field>

      <Field
        label="Username"
        error="Username này đã tồn tại."
        htmlFor="username"
      >
        <Input
          id="username"
          defaultValue="assemble"
        />
      </Field>
    </div>
  );
}
