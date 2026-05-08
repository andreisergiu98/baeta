import { defineConfig } from 'oxfmt';

export default defineConfig({
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	singleQuote: true,
	jsxSingleQuote: false,
	sortImports: {
		newlinesBetween: false,
	},
	sortPackageJson: {
		sortScripts: true,
	},
	trailingComma: 'all',
	semi: true,
	arrowParens: 'always',
	objectWrap: 'preserve',
	overrides: [
		{
			files: ['*.yaml', '*.yml', '*.md', '*.mdx', '*.css', '*.scss'],
			options: {
				singleQuote: false,
			},
		},
		{
			files: ['*.md', '*.mdx'],
			options: {
				singleQuote: false,
				useTabs: false,
				printWidth: 80,
				tabWidth: 2,
				embeddedLanguageFormatting: 'off',
			},
		},
		{
			files: ['*.json', '*.jsonc'],
			options: {
				useTabs: false,
				tabWidth: 2,
			},
		},
	],
	ignorePatterns: [
		'**/examples/**/modules/baeta-*/*',
		'**/examples/**/modules/index.ts',
		'**/examples/**/__generated__',
		'**/examples/**/typedef.ts',
		'**/e2e/**/modules/baeta-*/*',
		'**/e2e/**/modules/index.ts',
		'**/e2e/**/__generated__',
		'**/e2e/**/typedef.ts',
		'**/e2e/**/types.gen.ts',
		'**/e2e/**/custom-types',
		'**/examples/**/.wrangler',
		'**/.yarn',
	],
});
