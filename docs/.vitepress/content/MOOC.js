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
    text: 'Learning how to learn',
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
  {
    text: 'Games 101',
    link: '/MOOC/Games101/01_overview',
    collapsable: true,
    children: [
      { text: '绪论', link: '/MOOC/Games101/01_overview' },
      { text: '线性代数', link: '/MOOC/Games101/02_review-linear-algebra' },
      { text: '变换', link: '/MOOC/Games101/03-04_transformation' },
      { text: '光栅化', link: '/MOOC/Games101/05-06_rasterization' },
      { text: '着色', link: '/MOOC/Games101/07-09_shading' },
    ],
  },
  {
    text: 'Introduction to Psychology',
    link: '/MOOC/IntroductiontoPsychology/01概述',
    collapsable: true,
    children: [
      { text: '概述', link: '/MOOC/IntroductiontoPsychology/01概述' },
      { text: '发展', link: '/MOOC/IntroductiontoPsychology/02发展' },
      { text: '认知过程', link: '/MOOC/IntroductiontoPsychology/03认知过程' },
      { text: '动机过程', link: '/MOOC/IntroductiontoPsychology/04动机过程' },
      { text: '情绪过程', link: '/MOOC/IntroductiontoPsychology/05情绪过程' },
      {
        text: '人格心理学',
        link: '/MOOC/IntroductiontoPsychology/06人格心理学',
      },
      {
        text: '社会心理学',
        link: '/MOOC/IntroductiontoPsychology/07社会心理学',
      },
    ],
  },
  {
    text: 'Docker for Beginner',
    link: '/MOOC/Docker for Beginner/index',
    collapsable: true,
    children: [
      { text: '命令', link: '/MOOC/Docker for Beginner/01commands' },
      { text: 'run', link: '/MOOC/Docker for Beginner/02dockerrun' },
      { text: '映像', link: '/MOOC/Docker for Beginner/03images' },
      { text: 'Docker Compose', link: '/MOOC/Docker for Beginner/04compose' },
      {
        text: 'Docker 引擎与存储系统',
        link: '/MOOC/Docker for Beginner/05dockerengine与storage',
      },
      {
        text: 'Docker 网络',
        link: '/MOOC/Docker for Beginner/06dockernetwork',
      },
      {
        text: 'Docker 码头',
        link: '/MOOC/Docker for Beginner/07dockerregistry',
      },
      {
        text: 'Docker On Windows',
        link: '/MOOC/Docker for Beginner/08dockeronwindows',
      },
      {
        text: 'Docker 容器集运站',
        link: '/MOOC/Docker for Beginner/09容器集运站',
      },
      { text: '小结', link: '/MOOC/Docker for Beginner/小结' },
    ],
  },
];

export { MOOCSideBar };
