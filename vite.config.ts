import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from https://vimal27-20.github.io/portfolio-vimal/
  base: "/portfolio-vimal/",
  // three.js ships in its own lazy chunk, loaded only for the desktop 3D network
  build: { chunkSizeWarningLimit: 800 },
});
