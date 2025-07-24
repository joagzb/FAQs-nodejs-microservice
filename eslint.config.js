// eslint.config.js
import plugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['src/**/*.test.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-invalid-this': 'off',
      'no-duplicate-imports': 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'no-alert': 'error',
      'no-global-assign': 'error',
      'spaced-comment': ['error', 'always'],
      'prefer-template': 'error',
      'prefer-const': 'error',
      'array-bracket-newline': ['error', {minItems: 5}],
      'array-element-newline': ['error', {minItems: 5}],
      'multiline-ternary': 0,
      'no-multi-spaces': 'error',
      'newline-per-chained-call': ['error', {ignoreChainWithDepth: 3}],
      'no-useless-escape': 0,
      'brace-style': 'error',
      'no-multiple-empty-lines': 'error',
      'operator-linebreak': ['error', 'none'],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
];
