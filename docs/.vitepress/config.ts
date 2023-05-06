const path = require("path");
const serverAddress = "http://10.224.32.144:8080/";

const sidebar = {
  "/guide/": [
    {
      text: "指南",
      items: [
        { text: "安装", link: "/guide/" },
        { text: "快速上手", link: "/guide/use" },
      ],
    },
  ],
  "/components/": [
    {
      text: "页面组件",
      items: [
        { text: "SwitchStaff 租户切换", link: "/components/switchstaff/" },
        {
          text: "HeadNavigation 头部导航",
          link: "/components/headnavigation/",
        },
        { text: "SiderMenu 侧边栏菜单", link: "/components/sidermenu/" },
        { text: "UserContent 用户信息", link: "/components/usercontent/" },
      ],
    },
    {
      text: "主题",
      items: [{ text: "Theme 主题", link: "/components/theme/" }],
    },
  ],
};

module.exports = {
  title: "Positive-Map",
  description: "Just playing around.",

  themeConfig: {
    repo: "https://github.com/decSunshineHe/positive-vue-ui",
    nav: [
      { text: "指南", link: "/guide/", activeMatch: "/guide/" },
      {
        text: "组件",
        link: "/components/switchstaff/",
        activeMatch: "/components/",
      },
    ],
    sidebar,
  },
  vite: {
    resolve: {
      alias: {
        PVComponents: path.resolve(__dirname, "../../src"),
      },
      dedupe: ["vue"], // avoid error when using dependencies that also use Vue
    },
    server: {
      proxy: {
        "/api/cors": {
          target: serverAddress,
          changeOrigin: true,
          secure: false,
        },
        "/api": {
          target: serverAddress,
          changeOrigin: true,
          secure: false,
        },
        "/server": {
          target: serverAddress,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  },
};
