import { useState } from "react";
import { Textarea } from "@vnallmini/react";

export function TextareaDemo() {
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");

  const descriptionError =
    description.trim().length === 0
      ? "Vui lòng nhập mô tả."
      : undefined;

  const noteError =
    note.trim().length === 0
      ? "Nội dung không được để trống."
      : undefined;

  return (
    <div className="demo-preview">
      <Textarea
        label="Mô tả"
        placeholder="Nhập mô tả..."
        description="Mô tả ngắn về nội dung."
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        error={descriptionError}
      />

      <Textarea
        label="Ghi chú"
        placeholder="Nhập ghi chú..."
        value={note}
        onChange={(event) => setNote(event.target.value)}
        error={noteError}
        rows={4}
      />
    </div>
  );
}
