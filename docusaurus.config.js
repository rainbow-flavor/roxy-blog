// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'ROXY',
    tagline: "FB DEVELO4's BLOG",
    url: 'https://roxy.iro.ooo',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    staticDirectories: ['public', 'static'],
    favicon: 'img/favicon.ico',
    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'https://github.com/rainbow-flavor',
    projectName: 'DEVELO4', // Usually your repo name.

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang.
    i18n: {
        defaultLocale: 'ko',
        locales: ['ko', 'en'],
    },
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],

    plugins: [
        [
            '@docusaurus/plugin-content-blog',
            {
                /**
                 * 멀티 인스턴스 플러그인 적용 시 필수값으로 설정해야 합니다.
                 */
                id: 'irostub-blog',
                /**
                 * 사이트에서 블로그 연결 시 사용할 URL 경로를 설정합니다.
                 * *절대* URL 끝에 슬래시를 붙이지 마세요.
                 */
                routeBasePath: 'irostub',
                // showReadingTime: true,
                /**
                 * 사이트 디렉터리 기준으로 상대 경로를 지정합니다.
                 */
                path: './irostub',
            },
        ],
        [
            '@docusaurus/plugin-content-blog',
            {
                /**
                 * 멀티 인스턴스 플러그인 적용 시 필수값으로 설정해야 합니다.
                 */
                id: 'hank-blog',
                /**
                 * 사이트에서 블로그 연결 시 사용할 URL 경로를 설정합니다.
                 * *절대* URL 끝에 슬래시를 붙이지 마세요.
                 */
                routeBasePath: 'hank',
                showReadingTime: true,
                /**
                 * 사이트 디렉터리 기준으로 상대 경로를 지정합니다.
                 */
                path: './hank',
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'front',
                path: 'front',
                routeBasePath: 'front',
                sidebarPath: require.resolve('./sidebars.js'),
                // ... other options
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'back',
                path: 'back',
                routeBasePath: 'back',
                sidebarPath: require.resolve('./sidebars.js'),
                // ... other options
            },
        ],
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                googleAnalytics: {
                    trackingID: 'G-FT5YDE3QE7',
                    anonymizeIP: true,
                },
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

        ({
            //블로그 검색 엔진 설정
            algolia: {
                // 알골리아에서 제공한 appId를 사용하세요.
                appId: 'FI1VJVX8N6',

                // 공개 API 키: 커밋해도 문제가 생기지 않습니다.
                apiKey: 'c6cc4312079589c8e6f6d3071f7e8426',

                indexName: 'YOUR_INDEX_NAME',

                // 옵션: 아래 문서를 참고
                contextualSearch: true,

                // 옵션: history.push 대신 window.location을 통해 탐색해야 하는 도메인을 지정합니다. 여러 문서 사이트를 크롤링하고 window.location.href를 사용하여 해당 사이트로 이동하려는 경우에 유용한 알골리아 설정입니다.
                externalUrlRegex: 'external\\.com|domain\\.com',

                // 옵션: 알골리아 검색 파라미터
                searchParameters: {},

                // 옵션: 기본적으로 활성화된 검색 페이지 경로(비활성화하려면 `false`로 설정)
                searchPagePath: 'search',

                //... 다른 알골리아 파라미터
            },

            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            navbar: {
                title: 'ROXY',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo_light.png',
                    srcDark: 'img/logo_dark.png',
                },
                items: [
                    // {
                    //     type: 'doc',
                    //     docId: 'intro',
                    //     position: 'left',
                    //     label: 'Docs',
                    // },
                    { to: '/irostub', label: 'Irostub', position: 'left' },
                    { to: '/hank', label: 'Hank', position: 'left' },
                    {
                        type: 'docSidebar',
                        position: 'left',
                        sidebarId: 'front',
                        label: 'Front',
                        docsPluginId: 'front'
                    },
                    {
                        type: 'docSidebar',
                        position: 'left',
                        sidebarId: 'back',
                        label: 'Back',
                        docsPluginId: 'back'
                    },
                    {
                        href: 'https://github.com/facebook/docusaurus',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                copyright: `Copyright © ${new Date().getFullYear()} Rainbow-Flavor, written by Hank & Irostub.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
