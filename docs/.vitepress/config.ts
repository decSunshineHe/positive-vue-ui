import { demoBlockPlugin } from 'vitepress-theme-demoblock';

const path = require('path');
const serverAddress = 'http://10.224.32.144:8080/';

const sidebar = {
  '/guide/': [
    {
      text: '指南',
      items: [
        { text: '安装', link: '/guide/' },
        { text: '快速上手', link: '/guide/use' },
        { text: '本地开发', link: '/guide/local' },
        { text: '更新日志', link: '/guide/log' },
      ],
    },
  ],
  '/components/': [
    {
      text: '页面组件',
      items: [
        { text: 'SwitchStaff 租户切换', link: '/components/switchstaff/' },
        {
          text: 'HeadNavigation 头部导航',
          link: '/components/headnavigation/',
        },
        { text: 'SiderMenu 侧边栏菜单', link: '/components/sidermenu/' },
        { text: 'UserContent 用户信息', link: '/components/usercontent/' },
      ],
    },
    {
      text: '主题',
      items: [{ text: 'Theme 主题', link: '/components/theme/' }],
    },
  ],
};

module.exports = {
  title: 'Positive-Map',
  description: 'Just playing around.',
  lang: 'zh-CN',
  lastUpdated: true,

  themeConfig: {
    repo: 'https://github.com/decSunshineHe/positive-vue-ui',

    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',

    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      {
        text: '组件',
        link: '/components/switchstaff/',
        activeMatch: '/components/',
      },
    ],
    sidebar,
    editLink: {
      pattern: 'https://github.com/decSunshineHe/positive-vue-ui/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
  },

  markdown: {
    theme: {
      light: 'rose-pine-dawn',
      dark: 'rose-pine-moon',
    },
    config: md => {
      // 添加DemoBlock插槽
      md.use(demoBlockPlugin);
    },
  },

  vite: {
    resolve: {
      alias: {
        PostiveUI: path.resolve(__dirname, './../../src/components'),
      },
      dedupe: ['vue'], // avoid error when using dependencies that also use Vue
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: serverAddress,
          changeOrigin: true,
          secure: false,
        },
        '/server': {
          target: serverAddress,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
};
