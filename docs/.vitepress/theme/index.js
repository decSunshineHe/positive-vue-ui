import DefaultTheme from "vitepress/theme";
import DemoContainer from "../components/DemoContainer.vue";
import PVComponents from "PVComponents";

import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(PVComponents);
    app.component("DemoContainer", DemoContainer);
  },
};
