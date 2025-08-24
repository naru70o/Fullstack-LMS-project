import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Base JS rules
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    extends: [js.configs.recommended], // use ESLint's recommended rules
    languageOptions: {
      parser: tsParser, // use TS parser for .ts files
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
      },
      globals: {
        ...globals.node,     // Node.js globals
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin as any,
    },
    rules: {
      ...(tsPlugin.configs && tsPlugin.configs["recommended"]
        ? (tsPlugin.configs["recommended"].rules as any)
        : {}), // TS recommended rules
      "prefer-const": "error",
    },
  },
]);
