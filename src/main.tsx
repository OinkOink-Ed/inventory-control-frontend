import { App } from "@app/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Не найден элемент с id='root'");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
