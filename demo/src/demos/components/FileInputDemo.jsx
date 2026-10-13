import { useState } from "react";
import { FileInput } from "@vnallmini/react";

export function FileInputDemo() {
  const [fileName, setFileName] = useState("");

  return (
    <div className="demo-preview">
      <FileInput
        accept=".png,.jpg,.jpeg"
        onChange={(files) => {
          setFileName(files?.[0]?.name ?? "");
        }}
        aria-label="Chọn hình ảnh"
      />

      <p>
        {fileName ? (
          <>
            File đã chọn: <strong>{fileName}</strong>
          </>
        ) : (
          "Chưa chọn file."
        )}
      </p>
    </div>
  );
}
