const path = require("path");

module.exports = {
  title: "Positive Vue Components",
  description: "Just playing around.",
  themeConfig: {
    repo: "https://github.com/decSunshineHe/positive-vue-ui",
    sidebar: [
      {
        text: "Introduction",
        children: [
          { text: "What is PV-Components?", link: "/" },
          { text: "Getting Started", link: "/guide/" },
        ],
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
  },
};
