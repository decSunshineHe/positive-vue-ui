const path = require("path");
const serverAddress = "http://10.224.32.144:8080/";

module.exports = {
  title: "Positive Vue Components",
  description: "Just playing around.",
  themeConfig: {
    repo: "https://github.com/decSunshineHe/positive-vue-ui",
    sidebar: [
      {
        text: "介绍",
        children: [{ text: "快速使用", link: "/guide/" }],
      },
      {
        text: "页面元素",
        children: [
          { text: "租户切换", link: "/components/SwitchStaff" },
          { text: "头部导航", link: "/components/HeadNavigation" },
        ],
      },
    ],
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
