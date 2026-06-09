import react from '@eslint-react/eslint-plugin';
import css from '@eslint/css';
import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import packageJson from 'eslint-plugin-package-json';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import ignorePatterns from './shared-ignores.ts';

const JS_TS = '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}';
const TS = '**/*.{ts,mts,cts,tsx}';
const JSX = '**/*.{jsx,tsx}';

export const baseConfig = defineConfig([
	{
		files: [JS_TS],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: {
			globals: globals.node,
		},
	},
	tseslint.configs.recommended,
	{
		files: [JS_TS],
		extends: [importX.flatConfigs.recommended, importX.flatConfigs.typescript],
		settings: {
			'import-x/external-module-folders': ['node_modules', '.yarn'],
		},
		rules: {
			'import-x/no-named-as-default': 'off',
			'import-x/no-named-as-default-member': 'off',
			'import-x/no-cycle': 'error',
			'import-x/no-unresolved': [
				'error',
				{
					ignore: ['^cloudflare:workers$'],
				},
			],
			'import-x/extensions': ['error', 'ignorePackages', { checkTypeImports: false }],
		},
	},
	{
		files: [JS_TS],
		plugins: { 'unused-imports': unusedImports },
		rules: {
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'unused-imports/no-unused-imports': 'warn',
			'no-param-reassign': 'error',
			'no-else-return': 'error',
			'one-var': ['error', 'never'],
		},
	},
	{
		files: [TS],
		languageOptions: {
			parserOptions: { projectService: true },
		},
		rules: {
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/switch-exhaustiveness-check': 'error',
			'@typescript-eslint/only-throw-error': 'error',
			'@typescript-eslint/no-unnecessary-template-expression': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-base-to-string': 'error',
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/no-redundant-type-constituents': 'error',
			'@typescript-eslint/return-await': ['error', 'always'],
			'@typescript-eslint/prefer-optional-chain': 'warn',
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/prefer-enum-initializers': 'error',
			'@typescript-eslint/no-inferrable-types': 'error',
			'@typescript-eslint/no-for-in-array': 'error',
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					fixStyle: 'inline-type-imports',
					disallowTypeAnnotations: false,
				},
			],
		},
	},
	{
		files: ['**/*.css'],
		plugins: { css },
		language: 'css/css',
		extends: ['css/recommended'],
	},
	{
		extends: [packageJson.configs.recommended, packageJson.configs['recommended-publishable']],
		files: ['**/package.json'],
		rules: {
			'package-json/no-redundant-publishConfig': 'off',
			'package-json/sort-collections': 'off',
			'package-json/order-properties': 'off',
			'package-json/require-type': [
				'error',
				{
					ignorePrivate: true,
				},
			],
			'package-json/require-description': [
				'error',
				{
					ignorePrivate: true,
				},
			],
		},
	},
	{
		files: ['packages/create-baeta/templates/**/*', 'examples/**/*', 'e2e/**/*'],
		rules: {
			'import-x/extensions': 'off',
			'import-x/no-unresolved': 'off',
		},
	},
	{
		files: [`.github/workflows-src/${JS_TS}`],
		rules: {
			'@typescript-eslint/no-base-to-string': 'off',
		},
	},
	{
		files: [
			'**/eslint.config.{ts,mts,cts,js,mjs,cjs}',
			'**/eslint.config.*.{ts,mts,cts,js,mjs,cjs}',
		],
		rules: {
			'import-x/extensions': 'off',
		},
	},
]);

export const reactConfig = defineConfig([
	{
		files: [JSX],
		extends: [react.configs['recommended-typescript'], reactHooks.configs.flat.recommended],
	},
]);

const websiteConfig = defineConfig({
	files: [`website/${JS_TS}`],
	extends: [reactConfig],
	languageOptions: { globals: globals.browser },
	settings: {
		'import-x/internal-regex': '^@(docusaurus|theme|site)/',
	},
	rules: {
		'import-x/no-unresolved': [
			'error',
			{
				ignore: ['^@docusaurus/', '^@theme/', '^@site/'],
			},
		],
	},
});

const cliConfig = defineConfig({
	files: [`packages/cli/${JS_TS}`],
	extends: [reactConfig],
});

export default defineConfig([globalIgnores(ignorePatterns), baseConfig, websiteConfig, cliConfig]);
