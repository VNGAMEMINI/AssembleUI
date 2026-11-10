import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const reactPackageRoot = fileURLToPath(
  new URL("../packages/react", import.meta.url),
);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        find: "@vnallmini/react/styles",
        replacement: `${reactPackageRoot}/index.scss`,
      },
      {
        find: "@vnallmini/react/patterns",
        replacement: `${reactPackageRoot}/patterns/index.ts`,
      },
      {
        find: "@vnallmini/react/components",
        replacement: `${reactPackageRoot}/components/index.ts`,
      },
      {
        find: "@vnallmini/react/templates",
        replacement: `${reactPackageRoot}/templates/index.ts`,
      },
      {
        find: "@vnallmini/react",
        replacement: `${reactPackageRoot}/index.ts`,
      },
    ],

    dedupe: ["react", "react-dom"],
  },
});
