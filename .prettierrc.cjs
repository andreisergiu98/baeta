module.exports = {
  singleQuote: true,
  printWidth: 100,
  overrides: [
    {
      files: ['.vscode/**/*.json'],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        singleQuote: false,
        tabWidth: 2,
      },
    },
  ],
  plugins: [require('prettier-plugin-organize-imports'), require('prettier-plugin-packagejson')],
};
