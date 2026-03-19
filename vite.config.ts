import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  envPrefix: ["VITE_", "NEXT_PUBLIC_"],
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "next/link": path.resolve(__dirname, "src/compat/next-link.tsx"),
      "next/image": path.resolve(__dirname, "src/compat/next-image.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "src/compat/next-navigation.ts"
      ),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
