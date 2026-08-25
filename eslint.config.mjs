import nextConfig from "eslint-config-next";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "public/**",
      ".cursor/**",
      "rosey/**",
      "content/**",
      "coverage/**",
      "**/.venv/**",
    ],
  },
  ...nextConfig,
  {
    files: ["**/*.{js,mjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
  },
  {
    settings: {
      // ESLint 10 removed context.getFilename(); avoid react version auto-detect.
      react: { version: "19" },
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "prefer-const": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
