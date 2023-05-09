import DefaultTheme from 'vitepress/theme';
import './styles/custom.css';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import Demo from 'vitepress-theme-demoblock/dist/client/components/Demo.vue';
import DemoBlock from 'vitepress-theme-demoblock/dist/client/components/DemoBlock.vue';

// 引入开发的组件
import SwitchStaff from 'PostiveUI/switchstaff';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(PostiveUI);
    // app.mixin({
    //   mounted() {
    //     import('positive-ui').then((module) => {
    //       console.log(52666)
    //       app.use(module.default);
    //     });
    //   },
    // });

    // 组件注册
    app.component('SwitchStaff', SwitchStaff);
    app.component('Demo', Demo);
    app.component('DemoBlock', DemoBlock);
  },
};
