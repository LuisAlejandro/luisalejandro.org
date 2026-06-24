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
    ],
  },
  ...nextConfig,
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prefer-const": "warn",
      "no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
      "react-hooks/error-boundaries": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
