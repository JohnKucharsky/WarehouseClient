import React from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
