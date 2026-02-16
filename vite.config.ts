import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base:
    mode === "development"
      ? "/"
      : "https://annagolmakova.github.io/web3-metamask-wallet/",
  plugins: [react()],
}));
