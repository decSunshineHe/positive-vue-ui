import type { App } from 'vue';
import HeadNavigation from './HeadNavigation.vue';

// 使用install方法，在app.use挂载
HeadNavigation.install = (app: App) => {
  app.component(HeadNavigation.__name as string, HeadNavigation);
};

export default HeadNavigation;
