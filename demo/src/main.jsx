import { createRoot } from "react-dom/client";

import {
  ThemeProvider,
} from "@vnallmini/react";

import "@vnallmini/react/styles";

import "./styles/index.scss";

import { App } from "./app/App";

createRoot(
  document.getElementById("root"),
).render(
  <ThemeProvider defaultTheme="light">
    <App />
  </ThemeProvider>,
);
