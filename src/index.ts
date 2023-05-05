import { App } from "vue";

import SwitchStaff from "../src/components/switchstaff";
import HeadNavigation from "../src/components/headnavigation";

const components = [SwitchStaff, HeadNavigation];

const install = (app: App): void => {
  // 遍历注册所有组件
  /*
      component.__name ts报错
      Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
      Type 'undefined' is not assignable to type 'string'.ts(2345)
      解决方式一：使用// @ts-ignore
      解决方式二：使用类型断言 尖括号语法(<string>component.__name) 或 as语法(component.__name as string)
    */
  components.forEach((component) =>
    app.component(component.__name as string, component)
  );
};

export { SwitchStaff, HeadNavigation };

export * from "./constants";
export * from "./utils";

const PVComponents = { install };
export default PVComponents;
