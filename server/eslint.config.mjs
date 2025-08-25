import eslint from '@eslint/js';
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    plugins:{
    typescriptEslint,
    },
    rules:{
      eslintConfigPrettier,
    },
    extends:["plugin:prettier/recommended"]
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir:"./",
      },
    },
  },
);