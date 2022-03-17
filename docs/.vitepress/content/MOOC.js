const MOOCSideBar = [
  {
    text: 'TypeScript入门',
    link: '/MOOC/TypeScript入门/index',
    collapsable: true,
    children: [
      { text: '第一个TS程序', link: '/MOOC/TypeScript入门/first-ts-file' },
      { text: '类型', link: '/MOOC/TypeScript入门/types' },
      { text: '函数', link: '/MOOC/TypeScript入门/function' },
      { text: '类', link: '/MOOC/TypeScript入门/class' },
      { text: '接口', link: '/MOOC/TypeScript入门/interface' },
      { text: '泛型', link: '/MOOC/TypeScript入门/generic' },
      { text: '外部模块', link: '/MOOC/TypeScript入门/module' },
      { text: '命名空间(内部模块)', link: '/MOOC/TypeScript入门/namespace' },
      { text: '装饰器', link: '/MOOC/TypeScript入门/decorator' },
    ],
  },
  {
    text: '学习如何学习',
    link: '/MOOC/how-to-learn/index',
    collapsable: true,
    children: [
      { text: '集中与发散', link: '/MOOC/how-to-learn/what-is-learning' },
      { text: '组块', link: '/MOOC/how-to-learn/chunking' },
      {
        text: '拖延与学习',
        link: '/MOOC/how-to-learn/procrastination-memory',
      },
      {
        text: '复兴式学习',
        link: '/MOOC/how-to-learn/renaissance-learning',
      },
    ],
  },
];

export { MOOCSideBar };
