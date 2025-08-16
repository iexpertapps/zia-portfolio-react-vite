import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
   base: '/zia-portfolio-react-vite/',
  plugins: [react()],
});
