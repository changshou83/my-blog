const eola = num => '/MOOC/essential-of-linear-algebra/chapter'+num;
const threejsDir = subdir => '/MOOC/threejs-journey/'+subdir;

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
    text: 'Essential of Linear Algebra',
    link: eola(1),
    collapsable: true,
    children: [
      { text: '向量究竟是什么？', link: eola(1) },
      { text: '线性组合，基向量', link: eola(2) },
      { text: '线性变换及矩阵', link: eola(3) },
      { text: '以矩阵乘法的形式理解组合变换', link: eola(4) },
      { text: '行列式', link: eola(5) },
      { text: '逆矩阵，列空间与零空间', link: eola(6) },
      { text: '点积与对偶性', link: eola(7) },
      { text: '叉乘', link: eola(8) },
      { text: '基变换', link: eola(9) },
      { text: '特征向量与特征值', link: eola(10) },
      { text: '抽象向量空间', link: eola(11) }
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
    text: 'Three.js Journey',
    link: threejsDir('links'),
    collapsable: true,
    children: [
      { text: '基础篇绪论', link: threejsDir('01_Basics/Index') },
      { text: '场景', link: threejsDir('01_Basics/Scene') },
      { text: '工程化', link: threejsDir('01_Basics/Vite') },
      { text: '变换', link: threejsDir('01_Basics/Transform-Objects') },
      { text: '动画', link: threejsDir('01_Basics/Animations') },
      { text: '相机与操控', link: threejsDir('01_Basics/Cameras-and-Controls') },
      { text: '全屏与窗口缩放', link: threejsDir('01_Basics/Fullscreen-and-Resizing') },
      { text: '几何', link: threejsDir('01_Basics/Geometries') },
      { text: 'DebugUI', link: threejsDir('01_Basics/DebugUI') },
      { text: '纹理', link: threejsDir('01_Basics/Textures') },
      { text: '材质', link: threejsDir('01_Basics/Material') },
      { text: '部署到Vercel', link: threejsDir('01_Basics/Deploy-to-Vercel') },
      { text: '经典技术篇绪论', link: threejsDir('02_Classic-techniques/Index') },
      { text: '光源', link: threejsDir('02_Classic-techniques/Lights') },
      { text: '阴影', link: threejsDir('02_Classic-techniques/Shadows') },
      { text: '射线', link: threejsDir('02_Classic-techniques/Raycast') },
      { text: '基于滚动的动画', link: threejsDir('02_Classic-techniques/Scroll-Based-Animation') },
      { text: '进阶技术篇绪论', link: threejsDir('03_Advanced-techniques/Index') },
      { text: '大型项目的代码结构', link: threejsDir('03_Advanced-techniques/Code-Structuring-for-Bigger-Projects') },
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
