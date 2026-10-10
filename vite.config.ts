import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/* GitHub Pages can't send security headers, so the production build carries
   them as meta tags. Everything is served from this site, except the Google
   Fonts used by one case-study type specimen. (The dev server needs inline
   scripts for hot reload, so this only applies to `vite build`.) */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",   // React sets inline style attributes
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityMeta = (): Plugin => ({
  name: "security-meta",
  apply: "build",
  transformIndexHtml: () => [
    { tag: "meta", attrs: { "http-equiv": "Content-Security-Policy", content: CSP }, injectTo: "head-prepend" },
    { tag: "meta", attrs: { name: "referrer", content: "strict-origin-when-cross-origin" }, injectTo: "head" },
  ],
});

export default defineConfig({
  plugins: [react(), securityMeta()],
  // GitHub Pages serves the site from https://vimal27-20.github.io/portfolio-vimal/
  base: "/portfolio-vimal/",
  build: { chunkSizeWarningLimit: 800 },
});
