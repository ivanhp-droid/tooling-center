import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const isInternalDocsEnabled = process.env.INTERNAL_DOCS === 'true';

const config: Config = {
  title: 'Supernaut EC Guidelines',
  tagline: 'Comprehensive guidelines for External Contributors and Internal Teams',
  favicon: 'img/favicon.ico',

  url: 'https://your-domain.com',
  baseUrl: '/',

  organizationName: 'supernaut',
  projectName: 'ec-guidelines',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs/ec',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ...(isInternalDocsEnabled ? [
      [
        '@docusaurus/plugin-content-docs',
        {
          id: 'internal',
          path: 'docs/internal',
          routeBasePath: 'internal',
          sidebarPath: './sidebars-internal.ts',
          editUrl: undefined,
          showLastUpdateTime: true,
          showLastUpdateAuthor: false,
        },
      ],
    ] : []),
    [
      'docusaurus-lunr-search',
      {
        languages: ['en'],
        indexBaseUrl: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: 'Supernaut EC Guidelines',
      logo: {
        alt: 'Supernaut Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ecSidebar',
          position: 'left',
          label: 'EC Guidelines',
        },
        {
          type: 'dropdown',
          label: 'By Role',
          position: 'left',
          items: [
            {
              label: 'Submitter',
              to: '/roles/submitter/overview',
            },
            {
              label: 'Reviewer',
              to: '/roles/reviewer/overview',
            },
            {
              label: 'Adjudicator',
              to: '/roles/adjudicator/overview',
            },
          ],
        },
        {
          to: '/reference/workflow/step-1-intent',
          label: 'Reference',
          position: 'left',
        },
        {
          to: '/reference/changelog',
          label: 'Changelog',
          position: 'left',
        },
        ...(isInternalDocsEnabled ? [
          {
            type: 'doc',
            docId: 'overview',
            position: 'left',
            label: 'Internal',
            docsPluginId: 'internal',
          },
        ] : []),
        {
          href: 'https://github.com/supernaut/ec-guidelines',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'By Role',
          items: [
            {
              label: 'Submitter',
              to: '/roles/submitter/overview',
            },
            {
              label: 'Reviewer',
              to: '/roles/reviewer/overview',
            },
            {
              label: 'Adjudicator',
              to: '/roles/adjudicator/overview',
            },
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: 'Workflow',
              to: '/reference/workflow/step-1-intent',
            },
            {
              label: 'Failure Modes',
              to: '/reference/failure-modes/overview',
            },
            {
              label: 'Tools',
              to: '/reference/tools/overview',
            },
            {
              label: 'FAQ & Glossary',
              to: '/reference/faq-glossary',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Changelog',
              to: '/reference/changelog',
            },
            ...(isInternalDocsEnabled ? [
              {
                label: 'Internal Docs',
                to: '/internal/overview',
              },
            ] : []),
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Supernaut. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
