import nextConfig from "eslint-config-next";
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
