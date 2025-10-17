import { themes } from 'prism-react-renderer';
import { injectTypeDocSidebar } from './docusaurus.sidebars.ts';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const config: Config = {
	title: 'Baeta',
	tagline:
		'Baeta is a modern, type-safe, schema first GraphQL framework that enables developers to build powerful and scalable GraphQL APIs with ease.',
	url: 'https://baeta.io',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	favicon: 'img/favicon.ico?v=1',

	organizationName: 'andreisergiu98',
	projectName: 'baeta',

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	markdown: {
		format: 'detect',
		hooks: {
			onBrokenMarkdownLinks: 'throw',
		},
	},

	presets: [
		[
			'classic',
			{
				docs: {
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
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
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
		image: 'img/banner.png',
		metadata: [
			{
				name: 'keywords',
				content: 'baeta, graphql, schema, types, typescript, framework, builder',
			},
			{ name: 'twitter:card', content: 'img/banner.png' },
		],
		prism: {
			theme: lightCodeTheme,
			darkTheme: darkCodeTheme,
		},
		colorMode: {
			defaultMode: 'dark',
		},
		algolia: {
			appId: '4FC0N9XMY9',
			apiKey: '4d2e8517e7336f96a0ef90266f9e0f72',
			indexName: 'baeta',
		},
	} satisfies Preset.ThemeConfig,

	headTags: [
		{
			tagName: 'link',
			attributes: {
				rel: 'preconnect',
				href: 'https://baeta.io',
			},
		},
	],
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
	future: {
		v4: true,
		experimental_faster: true,
	},
};

export default config;
