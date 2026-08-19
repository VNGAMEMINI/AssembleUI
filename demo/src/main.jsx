import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { Button } from "@assemble-ui/react";
import "@assemble-ui/react/styles";

export default function App() {
  return (
    <h1>
      Hello AssembleUI
    </h1>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
