import { Icon } from "@assemble-ui/react";

export function IconDemo() {
  return (
    <div className="demo-preview">
      <div>
        <Icon size="sm">★</Icon>
        <Icon size="md">★</Icon>
        <Icon size="lg">★</Icon>
      </div>

      <div>
        <Icon label="Yêu thích" size="md">
          ♥
        </Icon>
      </div>

      <p>
        Icon không có label được xem là decorative và tự động
        có <code>aria-hidden</code>.
      </p>
    </div>
  );
}
