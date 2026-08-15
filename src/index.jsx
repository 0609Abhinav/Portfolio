import React from "react";
import { ViteReactSSG } from "vite-react-ssg/single-page";
import { HelmetProvider } from "react-helmet-async";
import "./styles/globals.css";
import App from "./App";

export const createRoot = ViteReactSSG(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
