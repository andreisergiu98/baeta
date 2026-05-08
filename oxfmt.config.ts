import { defineConfig } from 'oxfmt';
import ignorePatterns from './shared-ignores.ts';

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
	ignorePatterns,
});
