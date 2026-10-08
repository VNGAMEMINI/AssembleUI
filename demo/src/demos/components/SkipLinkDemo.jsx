import { SkipLink } from "@assemble-ui/react";

export function SkipLinkDemo() {
  return (
    <div className="demo-preview">
      <SkipLink href="#demo-main">
        Bỏ qua đến nội dung chính
      </SkipLink>

      <p>
        SkipLink thường được đặt ở đầu document để người dùng
        bàn phím có thể bỏ qua phần navigation.
      </p>

      <main id="demo-main">
        <h4>Nội dung chính</h4>
        <p>
          Đây là target mà SkipLink sẽ đưa focus/navigation tới.
        </p>
      </main>
    </div>
  );
}
