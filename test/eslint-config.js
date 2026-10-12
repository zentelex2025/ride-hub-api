import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Use "commonjs" if you use require() instead of import
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      // Catches typos in variable/function names (e.g. writing `const myVar = 1; console.log(myVarr);`)
      "no-undef": "error",

      // Catches variables created by mistake that you never use
      "no-unused-vars": "warn",
    },
  },
];
