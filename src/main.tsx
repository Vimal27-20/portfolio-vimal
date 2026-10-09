import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource-variable/doto/full.css";   // full axes: ROND gives the round dots
import "@fontsource-variable/space-grotesk";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./styles/globals.css";
import App from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
