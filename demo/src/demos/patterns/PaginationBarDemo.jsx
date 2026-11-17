import { useState } from "react";
import { PaginationBar } from "@assemble-ui/react";

export function PaginationBarDemo() {
  const [page, setPage] = useState(1);
  const totalPages = 8;

  return (
    <div className="demo-preview">
      <PaginationBar
        page={page}
        totalPages={totalPages}
        siblingCount={1}
        onPageChange={setPage}
        summary={`Trang ${page}/${totalPages} · 80 bản ghi`}
        aria-label="Phân trang bản ghi"
      />
      <p role="status">Đang xem trang {page}.</p>
    </div>
  );
}
