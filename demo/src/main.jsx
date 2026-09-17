import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import { Checkbox } from "@assemble-ui/react/components";

import "@assemble-ui/react/styles";
import "../styles/main.scss";

function App() {
  const [action, setAction] = useState("Chưa thực hiện");

  return (
    <main>

    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
