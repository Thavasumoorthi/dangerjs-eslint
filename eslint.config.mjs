import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser,
    },
    rules: {
      // Enable rules for strict linting
      "semi": ["error", "always"], // Enforce semicolons
      "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline
      "quotes": ["error", "double"], // Enforce double quotes
      "indent": ["error", 2], // Enforce 2-space indentation
      "no-unused-vars": ["warn"], // Warn for unused variables
      "eqeqeq": ["error"], // Enforce strict equality checks
      "curly": ["error", "all"], // Require curly braces for all control structures
      "no-console": ["warn"], // Warn when console.log is used
    },
  },
  // Add recommended rules from the plugin
  pluginJs.configs.recommended,
];
