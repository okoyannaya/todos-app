import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {ignores: ["dist"]},
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-unused-vars": "error",
      ...reactHooks.configs.recommended.rules,
      "object-curly-spacing": ["warn", "always"],
      "newline-before-return": "error",

      "react-refresh/only-export-components": [
        "warn",
        {allowConstantExport: true},
      ],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^components"],
            ["^const"],
            ["^constants"],
            ["^\\."],
            ["^.+\\.?(css)$"],
          ],
        },
      ],
    },
  }
);
