// @ts-check

/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
	'*': 'oxfmt --no-error-on-unmatched-pattern',
	'.github/{workflows,workflows-src}/**': () => 'yarn actions:check',
};
