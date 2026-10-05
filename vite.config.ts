import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from https://vimal27-20.github.io/portfolio-vimal/
  base: "/portfolio-vimal/",
});
