module.exports = {
  extends: [
    '@baeta/eslint-config',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: { tsconfigRootDir: __dirname },
};
