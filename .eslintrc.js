module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    ignorePatterns: ["node_modules/", "dist/", "app.ts"],
    env: {
        node: true,
        mocha: true,
    },
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "ethers": "off",
        "no-undef": "off",
    },
  };
