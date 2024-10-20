import globals from "globals";
import js from "@eslint/js";
import stylisticjs from "@stylistic/eslint-plugin-js";


export default [
  js.configs.recommended,
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest",
    },
    plugins: {
      '@stylisticjs': stylisticjs,
    },
    rules:{
      '@stylisticjs/indent': ['error', 2],
      '@stylisticjs/quotes': ['error', 'single'],
      '@stylisticjs/semi': ['error', 'never'],
      '@stylisticjs/linebreak-style': ['error', 'unix'],
      'eqeqeq': ['error'],
      'no-trailing-spaces': ['error'],
      'arrow-spacing': ['error'],
      'no-console': ['off'],
    },
  },
  {
    ignores: ["node_modules/**", "dist/**", "playground-1.mongodb.js", "package-lock.json"],
  }, 
];