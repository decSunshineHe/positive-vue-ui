# SwitchStaff

## 代码演示

### 基本使用

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

---

## API

### SwitchStaff

| 参数         | 说明             | 类型                                                                    | 默认值 | 版本  |
| ------------ | ---------------- | ----------------------------------------------------------------------- | ------ | ----- |
| showSwitch   | 是否支持切换     | `boolean`                                                               | true   | 0.0.1 |
| overlayStyle | 菜单根元素的样式 | `CSSProperties`                                                         | -      | 0.0.1 |
| onChange     | 切换租户的回调   | `function` (state: boolean, staff: [StaffProps](./#staffprops)) => void | -      | 0.0.1 |

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