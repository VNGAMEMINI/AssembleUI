import { createRoot } from "react-dom/client";

import "@assemble-ui/react/styles";

import "./styles/index.scss";

import { App } from "./app/App";

createRoot(
  document.getElementById("root"),
).render(
  <App />,
);
