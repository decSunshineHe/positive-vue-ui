import type { App } from "vue";
import SwitchStaff from "./SwitchStaff.vue";

// 使用install方法，在app.use挂载
SwitchStaff.install = (app: App) => {
  app.component(SwitchStaff.__name as string, SwitchStaff);
};

export default SwitchStaff;
