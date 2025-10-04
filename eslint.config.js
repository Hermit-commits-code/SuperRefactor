// Minimal ESLint config for ES modules and Node.js

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        console: "readonly"
      }
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];
