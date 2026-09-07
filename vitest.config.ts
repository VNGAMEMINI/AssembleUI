import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

const packageRoot = path.resolve(import.meta.dirname, "./packages/react");

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
  resolve: {
    alias: {
      "@assemble-ui/react": path.join(packageRoot, "index.ts"),
      "@assemble-ui/react/styles": path.join(packageRoot, "index.scss"),
      "@assemble-ui/react/": `${packageRoot}/`,
      "@": packageRoot,
    },
  },
});
