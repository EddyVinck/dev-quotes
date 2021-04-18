module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: ["node_modules/*", ".next/*", ".out/*", "!.prettierrc.js"], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended", // TypeScript rules
        "plugin:react/recommended", // React rules
        "plugin:react-hooks/recommended", // React hooks rules
      ],
      rules: {
        "prettier/prettier": ["error", {}, { usePrettierrc: true }], // Includes prettier rules
        // We will use TypeScript's types for component props instead
        "react/prop-types": "off",
        // No need to import React when using Next.js
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },
  ],
};
