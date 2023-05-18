# SwitchStaff

## 代码演示

### 基本使用

::: tip 提示

切换租户后会重载页面，以便获取当前租户的相关数据

:::

:::demo

```vue
<template>
  <div class="switch-staff-box">
    <SwitchStaff />
  </div>
</template>

<style lang="scss">
.switch-staff-box {
  padding: 0 20px;
  line-height: 50px;
  background-color: #1b1b1b;
}
</style>
```

:::

### setup script 使用

:::demo

```vue
<script setup lang="ts">
import { ref } from 'vue';
const showSwitch = ref(false);
</script>

<template>
  <el-checkbox v-model="showSwitch">显示切换按钮</el-checkbox>
  <div class="switch-staff-box">
    <SwitchStaff :showSwitch="showSwitch" />
  </div>
</template>

<style lang="scss">
.switch-staff-box {
  padding: 0 20px;
  line-height: 50px;
  background-color: #1b1b1b;
  margin-top: 20px;
}
</style>
```

:::

---

## API

### Properties

| 参数        | 说明           | 类型      | 默认值 | 版本  |
| ----------- | -------------- | --------- | ------ | ----- |
| showSwitch  | 是否支持切换   | `boolean` | true   | 0.0.1 |
| customClass | 自定义组件类名 | `string`  | -      | 0.0.1 |

### Events

| 事件     | 说明           | 类型                                                                    | 默认值 | 版本  |
| -------- | -------------- | ----------------------------------------------------------------------- | ------ | ----- |
| onChange | 切换租户的回调 | `function` (state: boolean, staff: [StaffProps](./#staffprops)) => void | -      | 0.0.1 |

### StaffProps

| 属性字段         | 说明       | 类型     |
| :--------------- | :--------- | :------- |
| customerName     | 用户名称   | `string` |
| customerFullName | 用户全称   | `string` |
| id               | id         | `number` |
| muid             | 用户 muid  | `string` |
| staffCode        | staff 编码 | `string` |
| tenantMcid       | 租户 mcid  | `string` |
| tenantName       | 租户名称   | `string` |
| customerMcid     | 用户 mcid  | `string` |
