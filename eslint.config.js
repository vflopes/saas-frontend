import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import tanstackQuery from "@tanstack/eslint-plugin-query";

const project = ["./tsconfig.node.json", "./tsconfig.app.json"];

export default defineConfig([
  globalIgnores([
    "dist",
    "coverage",
    "node_modules",
    "src/components/ui",
    "src/routeTree.gen.ts",
  ]),
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      "@tanstack/query": tanstackQuery,
    },
    languageOptions: {
      parserOptions: {
        project,
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
      globals: globals.browser,
    },
    rules: {
      "react-refresh/only-export-components": "warn",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@tanstack/query/no-rest-destructuring": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
  },
  {
    files: ["src/**/*.{test,spec}.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
]);
