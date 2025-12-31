import { defineConfig } from "vitest/config";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      enabled: true,
    },
    reporters: process.env.GITHUB_ACTIONS
      ? ["tree", "github-actions"]
      : ["tree"],
    projects: [
      {
        test: {
          include: ["src/**/*.unit.{test,spec}.ts"],
          name: "unit",
          environment: "node",
        },
      },
      {
        optimizeDeps: {
          include: ["react", "react-dom", "react/jsx-dev-runtime"],
        },
        test: {
          include: ["src/**/*.browser.{test,spec}.tsx"],
          name: "browser",
          alias: {
            "@": resolve(__dirname, "./src"),
          },
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
