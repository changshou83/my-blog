import { rustSideBar } from './content/rust';
import { feBasicSideBar } from './content/feBasic';
import { MOOCSideBar } from './content/MOOC';
import { essaySideBar } from './content/essay';
import { vueSideBar } from './content/learnvue';

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
      { text: '概述', link: '/' },
      { text: 'Rust', link: '/rust/index' },
      { text: '前端基础', link: '/fe-basic/index' },
      { text: '网课笔记', link: '/MOOC/index' },
      { text: 'Vue', link: '/vue/docs/route' },
      { text: '杂文', link: '/essay/美化PowerShell' },
      { text: 'About', link: '/about' },
      {
        text: 'Github',
        link: 'https://github.com/changshou83/my-blog/tree/gh-pages',
      },
    ],
    sidebar: {
      '/rust/': rustSideBar,
      '/fe-basic/': feBasicSideBar,
      '/MOOC/': MOOCSideBar,
      '/essay/': essaySideBar,
      '/vue/': vueSideBar,
      '/': [{ text: '首页', link: '/' }],
    },
  },
  markdown: {
    lineNumbers: true,
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3] },
  },
};
