// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/*.ts', 'src/*.tsx', 'src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'indent': ['error', 2],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'quotes': ['error', 'single']
    }
  }
);