import { useState } from "react";
import { FileInput } from "@vnallmini/react";

export function FileInputDemo() {
  const [fileNames, setFileNames] = useState([]);

  return (
    <div className="demo-preview">
      <FileInput
        accept=".png,.jpg,.jpeg"
        multiple
        onChange={(files) => {
          setFileNames(
            Array.from(files ?? []).map((file) => file.name),
          );
        }}
        aria-label="Chọn hình ảnh"
      />

      <p aria-live="polite">
        {fileNames.length > 0
          ? `Đã chọn ${fileNames.length} tệp: ${fileNames.join(", ")}`
          : "Chưa chọn tệp nào."}
      </p>
    </div>
  );
}
