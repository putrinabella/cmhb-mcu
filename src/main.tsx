import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./app.css";
import { AuthProvider } from "./routes/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
