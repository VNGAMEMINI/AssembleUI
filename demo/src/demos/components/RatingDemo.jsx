import { useState } from "react";
import { Rating } from "@assemble-ui/react";

export function RatingDemo() {
  const [value, setValue] = useState(3);

  return (
    <div className="demo-preview">
      <Rating
        value={value}
        max={5}
        onChange={setValue}
        ariaLabel="Đánh giá sản phẩm"
      />

      <p>
        Đánh giá: <strong>{value}/5</strong>
      </p>

      <Rating
        value={5}
        max={5}
        readOnly
        ariaLabel="Đánh giá tối đa"
      />
    </div>
  );
}
