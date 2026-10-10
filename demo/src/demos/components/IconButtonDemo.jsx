import { useState } from "react";
import { IconButton } from "@assemble-ui/react";

export function IconButtonDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="demo-preview">
      <IconButton
        icon={liked ? "♥" : "♡"}
        label={liked ? "Bỏ yêu thích" : "Yêu thích"}
        onClick={() => setLiked((value) => !value)}
      />

      <IconButton
        icon="×"
        label="Đóng"
        size="sm"
      />

      <IconButton
        icon="⋮"
        label="Thêm tùy chọn"
        size="lg"
      />

      <p>
        Trạng thái: <strong>{liked ? "Đã thích" : "Chưa thích"}</strong>
      </p>
    </div>
  );
}
