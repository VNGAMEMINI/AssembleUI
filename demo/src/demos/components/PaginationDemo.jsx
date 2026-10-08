import { useState } from "react";
import { Pagination } from "@assemble-ui/react";

export function PaginationDemo() {
  const [page, setPage] = useState(6);

  return (
    <div className="demo-preview">
      <Pagination
        page={page}
        totalPages={12}
        siblingCount={1}
        onPageChange={setPage}
        aria-label="Phân trang danh sách"
      />

      <p>
        Trang hiện tại: <strong>{page}</strong> / 12
      </p>
    </div>
  );
}
