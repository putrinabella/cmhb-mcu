import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./index.css";
import { AuthProvider } from "./routes/AuthContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
