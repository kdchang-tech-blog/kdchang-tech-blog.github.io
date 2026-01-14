import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "KD Tech Blog 技術部落格",
  tagline:
    "軟體工程和產品專案管理現場觀察：關於軟體開發/程式設計/工程思維的技術部落格",
  favicon: "https://tech.kdchang.net/img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://tech.kdchang.net",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,
  deploymentBranch: "gh-pages",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kdchang-tech-blog", // Usually your GitHub org/user name.
  projectName: "kdchang-tech-blog.github.io", // repo

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        googleTagManager: {
          containerId: "GTM-NM3JS43H", // GTM
        },
        gtag: {
          trackingID: "G-FN9X92SM77",
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/resources",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: "ALL",
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        // index hash
        hashed: true,
        // language
        language: ["en", "zh"],
        // highlight term
        highlightSearchTermsOnTargetPage: false,
        // docs route base path
        docsRouteBasePath: "/resources",
        blogRouteBasePath: "/blog",
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: "https://tech.kdchang.net/img/logo.png",
    // colorMode: {
    //   respectPrefersColorScheme: true,
    // },
    // algolia: {
    //   appId: "HHT6LFI2CT",
    //   apiKey: "ff0205c345c78cc43d0b19adf2c47826",
    //   indexName: "prod_NAME",
    //   contextualSearch: true,
    //   searchPagePath: "search",
    // },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "KD Tech Blog",
      // logo: {
      //   alt: "KD Tech Blog Logo",
      //   src: "img/logo.png",
      // },
      items: [
        { to: "blog", label: "最新文章", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "resourceSidebar",
          position: "left",
          label: "學習資源",
        },
        { to: "/about", label: "關於本站", position: "left" },

        // {`
        //   type: "docSidebar",
        //   sidebarId: "tutorialSidebar",
        //   position: "left",
        //   label: "職涯技能樹",
        // },
        // {
        //   href: "https://facebook.com/groups/kdchang.net",
        //   label: "技術個人成長社群",
        //   position: "left",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "學習資源",
              to: "/resources",
            },
            {
              label: "熱門文章",
              to: "/blog/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Facebook Group",
              href: "https://facebook.com/groups/kdchang.net",
            },
            {
              label: "Follow us on Facebook",
              href: "https://www.facebook.com/tech.kdchang.net",
            },
            {
              label: "Follow us on Instagram",
              href: "https://www.instagram.com/kdchang_net",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Contact Us",
              to: "mailto:kdchang.net@gmail.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} KD Tech Blog. Built with ❤️ in Taiwan.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
