import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@vnallmini/react/core": path.resolve(
        "packages/react/core/index.ts",
      ),
    },
  },

  build: {
    lib: {
      entry: {
        index: "packages/react/index.ts",
        "components/index": "packages/react/components/index.ts",
        "patterns/index": "packages/react/patterns/index.ts",
        "templates/index": "packages/react/templates/index.ts",
        "core/index": "packages/react/core/index.ts",
      },
      formats: ["es"],
    },

    outDir: "packages/react/dist",
    emptyOutDir: true,

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],

      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
