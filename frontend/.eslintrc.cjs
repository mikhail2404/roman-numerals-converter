module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "sonarjs", "react-hooks", "import"],
  rules: {
    "prettier/prettier": "error",
    "no-var": "warn",
    "no-console": "warn",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "prefer-const": "warn",
    "prefer-template": "error",
    "no-unused-vars": "off",
    "no-duplicate-imports": [
      "error",
      {
        includeExports: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        variables: false,
      },
    ],
    "sonarjs/cognitive-complexity": "off",
    "sort-imports": "off",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling"]],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
    "import/newline-after-import": ["warn", { count: 1 }],
    "@typescript-eslint/no-non-null-assertion": "off",
  },
  settings: {
    "import/extensions": [".ts", ".tsx"],
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    react: {
      version: "detect",
    },
  },
};
