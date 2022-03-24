const vueSideBar = [
  {
    text: 'Vue Docs',
    link: '/vue/docs/route',
    children: [
      { text: '路线', link: '/vue/docs/route' },
      { text: '尝试教程', link: '/vue/docs/getting-started/try' },
      { text: '举例教程', link: '/vue/docs/getting-started/example' },
      { text: '基础', link: '/vue/docs/getting-started/basic' },
      { text: '深入组件', link: '/vue/docs/getting-started/component' },
    ],
  },
  {
    text: 'Vue.js 设计与实现',
    link: '/vue/books/Vue.js Design/Main/index',
    children: [
      { text: '目录', link: '/vue/books/Vue.js Design/Main/index' },
      { text: '设计概览', link: '/vue/books/Vue.js Design/Main/01 设计概览' },
      {
        text: '响应系统',
        link: '/vue/books/Vue.js Design/Main/02 响应系统/02 响应系统',
        // TODO
      },
    ],
  },
];

export { vueSideBar };
