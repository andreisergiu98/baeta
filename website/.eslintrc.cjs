module.exports = {
  extends: ['@baeta/eslint-config-react'],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
  },
};
