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
        find: "@assemble-ui/react/styles",
        replacement: `${reactPackageRoot}/index.scss`,
      },
      {
        find: "@assemble-ui/react/patterns",
        replacement: `${reactPackageRoot}/patterns/index.ts`,
      },
      {
        find: "@assemble-ui/react/components",
        replacement: `${reactPackageRoot}/components/index.ts`,
      },
      {
        find: "@assemble-ui/react/templates",
        replacement: `${reactPackageRoot}/templates/index.ts`,
      },
      {
        find: "@assemble-ui/react",
        replacement: `${reactPackageRoot}/index.ts`,
      },
    ],

    dedupe: ["react", "react-dom"],
  },
});
