require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/array-type': ['warn', { default: 'array-simple' }],
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'no-public',
      },
    ],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': 'off',
    eqeqeq: ['warn', 'smart'],
    'guard-for-in': 'error',
    'no-console': 'error',
    'no-return-await': 'warn',
    'no-unreachable-loop': 'error',
    'no-throw-literal': 'error',
    'no-var': 'error',
    'object-shorthand': 'warn',
  },
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
};
