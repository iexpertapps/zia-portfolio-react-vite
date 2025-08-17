import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: './', // 👈 relative path, production root ke liye
  plugins: [react()],
});
