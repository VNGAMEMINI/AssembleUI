import {
  useState,
} from "react";

import {
  SearchBar,
} from "@assemble-ui/react";

export function SearchBarDemo() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  }

  return (
    <div className="demo-preview">
      <SearchBar
        aria-label="SearchBar demo"
        onSubmit={handleSubmit}
        inputProps={{
          value: query,
          onChange: (event) => {
            setQuery(event.target.value);
          },
          placeholder: "Tìm kiếm...",
          "aria-label": "Từ khóa tìm kiếm",
        }}
        buttonLabel="Tìm"
      />

      {submittedQuery ? (
        <p>
          Kết quả tìm kiếm: <strong>{submittedQuery}</strong>
        </p>
      ) : null}
    </div>
  );
}
