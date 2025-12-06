import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prefer-const": "warn",
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
