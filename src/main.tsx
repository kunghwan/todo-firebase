import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CrudMain from "./CrudMain";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CrudMain />
  </StrictMode>
);
