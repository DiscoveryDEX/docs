// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DiscoveryDEX',
  tagline: 'Discover the amazing docs',
  url: 'https://docs.discoverydex.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DiscoveryDEX', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DiscoveryDEX/docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DiscoveryDEX Docs',
        logo: {
          alt: 'DiscoveryDEX Logo',
          src: 'img/logo_small.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'White Paper',
          },
          {
            type: 'doc',
            docId: 'Roadmap/roadmap',
            position: 'left',
            label: 'Roadmap',
          },
          {to: '/docs/how-it-works', label: 'How it works?', position: 'left'},
          {
            href: 'https://github.com/DiscoveryDEX/docs',
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
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
               {
                label: 'Discord',
                href: 'https://discord.gg/Pbrg5vkQJC',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/DiscoveryDEX',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docs',
                to: '/docs',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/DiscoveryDEX',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DiscoveryDEX, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
