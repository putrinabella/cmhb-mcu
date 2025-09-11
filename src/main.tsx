import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import { AuthProvider } from "./routes/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { Worker } from "@react-pdf-viewer/core";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";
import "@react-pdf-viewer/core/lib/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system">
    <AuthProvider>
      <Worker workerUrl={pdfWorker}>
        <RouterProvider router={router} />
      </Worker>
    </AuthProvider>
  </ThemeProvider>
);
