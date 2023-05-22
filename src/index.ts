import { App } from 'vue';
import * as components from './components';
import SwitchStaff from './components/switchstaff/SwitchStaff.vue';

function install(app: App): void {
  for (const key in components) {
    app.component(key, components[key as keyof typeof components]);
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    SwitchStaff: typeof SwitchStaff;
  }
}

export default { install };

export * from './components';
export * from './constants';
export * from './utils';
