const { themes } = require('prism-react-renderer');
const { injectTypeDocSidebar } = require('./api-docs.js');

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Baeta',
	tagline: 'Schema first without the hassle',
	url: 'https://baeta.io',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico?v=1',

	organizationName: 'andreisergiu98',
	projectName: 'baeta',

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	markdown: {
		format: 'detect',
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					// sidebarPath: require.resolve('./sidebars.js'),
					async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
						return injectTypeDocSidebar(await defaultSidebarItemsGenerator(args));
					},
				},
				pages: {
					path: 'pages',
				},
				blog: {
					showReadingTime: true,
				},
				theme: {
					customCss: [
						require.resolve('./style/custom.css'),
						require.resolve('./style/utilities.css'),
					],
				},
				sitemap: {
					lastmod: 'date',
					changefreq: 'weekly',
					priority: 0.5,
					ignorePatterns: ['/tags/**'],
					filename: 'sitemap.xml',
					createSitemapItems: async (params) => {
						const { defaultCreateSitemapItems, ...rest } = params;
						const items = await defaultCreateSitemapItems(rest);
						return items.filter((item) => !item.url.includes('/page/'));
					},
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Baeta',
				logo: {
					alt: 'Baeta Logo',
					src: '/img/logo-baeta.svg',
				},
				items: [
					{
						type: 'doc',
						docId: 'intro',
						position: 'left',
						label: 'Docs',
					},
					{
						position: 'left',
						label: 'Examples',
						href: 'https://github.com/andreisergiu98/baeta/tree/main/examples',
					},
					{
						href: 'https://github.com/sponsors/andreisergiu98',
						label: 'Donate',
						position: 'right',
					},
					{
						href: 'https://discord.gg/j6Y8xRc7ep',
						label: 'Discord',
						position: 'right',
					},
					{
						href: 'https://github.com/andreisergiu98/baeta',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				links: [
					{
						title: 'Docs',
						items: [
							{
								label: 'Introduction',
								to: '/docs/intro',
							},
							{
								label: 'Getting Started',
								to: '/docs/getting-started/installation',
							},
							{
								label: 'Examples',
								href: 'https://github.com/andreisergiu98/baeta/tree/main/examples',
							},
						],
					},
					{
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: 'https://github.com/andreisergiu98/baeta',
							},
							{
								label: 'Discord',
								href: 'https://discord.gg/j6Y8xRc7ep',
							},
							{
								label: 'Donate',
								href: 'https://github.com/sponsors/andreisergiu98',
							},
						],
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
			algolia: {
				appId: '4FC0N9XMY9',
				apiKey: '4d2e8517e7336f96a0ef90266f9e0f72',
				indexName: 'baeta',
			},
		}),
	plugins: [
		[
			require.resolve('@docusaurus/plugin-client-redirects'),
			{
				redirects: [
					{
						from: '/docs',
						to: '/docs/intro',
					},
				],
			},
		],
	],
	webpack: {
		jsLoader: (isServer) => ({
			loader: require.resolve('esbuild-loader'),
			options: {
				loader: 'tsx',
				target: isServer ? 'node12' : 'es2017',
			},
		}),
	},
};

module.exports = config;
