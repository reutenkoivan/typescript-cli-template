import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",
	favicon: "img/favicon.ico",
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",
	plugins: [
		"@docusaurus/plugin-content-docs",
		[
			"@docusaurus/plugin-content-blog",
			{
				feedOptions: {
					type: ["rss", "atom"],
					xslt: true,
				},
				onInlineAuthors: "warn",
				onInlineTags: "warn",
				onUntruncatedBlogPosts: "warn",
				showReadingTime: true,
			},
		],
		"@docusaurus/plugin-svgr",
		"@docusaurus/plugin-content-pages",
		[
			"@docusaurus/theme-classic",
			{
				customCss: "./src/css/custom.css",
			},
		],
	],
	tagline: "Dinosaurs are cool",
	themeConfig: {
		footer: {
			copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
			links: [
				{
					items: [
						{
							label: "Tutorial",
							to: "/docs/intro",
						},
					],
					title: "Docs",
				},
				{
					items: [
						{
							href: "https://stackoverflow.com/questions/tagged/docusaurus",
							label: "Stack Overflow",
						},
						{
							href: "https://discordapp.com/invite/docusaurus",
							label: "Discord",
						},
						{
							href: "https://x.com/docusaurus",
							label: "X",
						},
					],
					title: "Community",
				},
				{
					items: [
						{
							label: "Blog",
							to: "/blog",
						},
						{
							href: "https://github.com/facebook/docusaurus",
							label: "GitHub",
						},
					],
					title: "More",
				},
			],
			style: "dark",
		},
		image: "img/docusaurus-social-card.jpg",
		navbar: {
			items: [
				{
					label: "Tutorial",
					position: "left",
					sidebarId: "defaultSidebar",
					type: "docSidebar",
				},
				{ label: "Blog", position: "left", to: "/blog" },
				{
					href: "https://github.com/facebook/docusaurus",
					label: "GitHub",
					position: "right",
				},
			],
			logo: {
				alt: "My Site Logo",
				src: "img/logo.svg",
			},
			title: "My Site",
		},
		prism: {
			darkTheme: prismThemes.dracula,
			theme: prismThemes.github,
		},
	},
	title: "My Site",

	// Set the production url of your site here
	url: "https://your-docusaurus-site.example.com",
};

export default config;
