import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          pdfjs: ["pdfjs-dist", "@react-pdf-viewer/core"],
        },
      },
    },
  },
  base: "/",
  server: {
    allowedHosts: ["1e6f6bbdee9c.ngrok-free.app"],
  },
});
