import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const isInternalDocs = process.env.INTERNAL_DOCS === 'true';

const config: Config = {
  title: 'AI Project Guidelines',
  tagline: 'Single source of truth for project guidelines',
  favicon: 'img/favicon.ico',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'ai-project', 
  projectName: 'documentation-site', 

  onBrokenLinks: 'warn', // Changing to warn to avoid build failures on stubs
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
          showLastUpdateTime: true,
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'internal',
        path: 'docs/internal',
        routeBasePath: 'internal',
        sidebarPath: './sidebarsInternal.ts',
        showLastUpdateTime: true,
      },
    ],
    [
        '@easyops-cn/docusaurus-search-local',
        {
            hashed: true,
            docsRouteBasePath: ['/', 'internal'],
            indexBlog: false,
        }
    ]
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI Guidelines',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'EC Guidelines',
          to: '/roles/submitter/overview', // Default landing for EC Guidelines link? Or just /
          position: 'left',
          activeBaseRegex: '^/(?!internal)',
        },
        {
          type: 'dropdown',
          label: 'By Role',
          position: 'left',
          items: [
            {label: 'Submitter', to: '/roles/submitter/overview'},
            {label: 'Reviewer', to: '/roles/reviewer/overview'},
            {label: 'Adjudicator', to: '/roles/adjudicator/overview'},
          ]
        },
        {
          label: 'Reference',
          to: '/reference/workflow/step-1-intent', 
          position: 'left',
        },
        {
          label: 'Changelog',
          to: '/reference/changelog',
          position: 'left',
        },
        ...(isInternalDocs ? [{
            label: 'Internal',
            to: '/internal/overview',
            position: 'left',
        }] : []),
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} AI Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
