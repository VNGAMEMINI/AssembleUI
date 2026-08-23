import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: "packages/react/index.ts",
      formats: ["es"],
      fileName: "index"
    },

    outDir: "packages/react/dist",
    emptyOutDir: true,

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime"
      ]
    }
  }
});
