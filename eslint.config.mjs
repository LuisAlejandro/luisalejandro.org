import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next", "next/core-web-vitals"),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prefer-const": "warn",
      "no-unused-vars": "warn",
    },
  },
];
