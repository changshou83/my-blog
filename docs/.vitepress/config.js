const rustSideBar = [{ text: '学习Rust语法', link: '/rust/learn-syntax' }];
const feBasicSideBar = [{ text: 'html', link: '/fe-basic/index' }];

module.exports = {
    // deploy site at https://username.github.io/my-blog/，default: '/'
    base: '/my-blog/',
    // <html lang="{{}}">,type:string
    lang: 'zh-CN',
    // <title>{{}}</title>，type:string
    title: '长寿的Blog',
    // <meta name="description" content="{{}}">,type:string
    description: "changshou83's blog",
    themeConfig: {
        nav: [
            { text: 'Index', link: '/' },
            { text: 'Rust', link: '/rust/index' },
            { text: '前端基础', link: '/fe-basic/index' },
            { text: 'About', link: '/about/about' },
        ],
        // sidebar: [{ text: 'text', link: '/' }],
        sidebar: {
            '/rust/': rustSideBar,
            '/fe-basic/': feBasicSideBar,
            '/': [{ text: '首页', link: '/' }],
        },
    },
    markdown: {
        lineNumbers: true,
        // markdown-it-anchor 的选项
        anchor: { permalink: false },

        // markdown-it-toc 的选项
        toc: { includeLevel: [1, 2, 3] },

        // config: md => {
        //     // 使用更多的 markdown-it 插件!
        //     md.use(require('markdown-it-xxx'));
        // },
    },
    // 添加搜索框
    // algolia: {
    //     apiKey: 'your_api_key',
    //     indexName: 'index_name',
    //     searchParameters: {
    //         facetFilters: ['tags:guide,api'],
    //     },
    // },
};
