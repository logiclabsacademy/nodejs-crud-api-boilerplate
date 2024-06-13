module.exports = {
    env: {
      browser: false,
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'consistent-return': 'error',
      'eqeqeq': ['error', 'always'],
    },
  };
  