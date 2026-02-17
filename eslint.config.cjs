const nextConfig = require("eslint-config-next")
const react = require("eslint-plugin-react")
const tailwindcss = require("eslint-plugin-tailwindcss")

module.exports = [
  ...nextConfig,
  ...tailwindcss.configs["flat/recommended"],
  {
    plugins: {
      react,
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
      "react-hooks/static-components": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "error",
      "react/no-unescaped-entities": "error",
    },
    settings: {
      tailwindcss: {
        callees: ["cn"],
        config: "tailwind.config.js",
      },
      next: {
        rootDir: true,
      },
    },
  },
]
