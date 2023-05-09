# 本地开发

## Proxy 代理

需要对 devServer 设置 Proxy 属性，对组件内置请求的 api 和 server 进行代理，解决本地开发的跨域问题，`vite.config.ts` 加入如下代码：

```js
  const serverAddress = "http://localhost:8080"; // 后端地址

  server: {
    port: 3000,
    proxy: {
      "/server": {
        target: serverAddress,
        changeOrigin: true, // 允许跨域
        secure: false,
      },
      "/api": {
        target: serverAddress,
        changeOrigin: true,
        secure: false,
      },
    },
  },
```

## 检测登录态

当内置接口检测未登录时，会弹出框提示，点击确定后会跳转到登录页进行登录，登录后会跳转到选择租户页面，选择租户后会跳转到原页面。

![loginTip](../public/login-tip-vue.jpg)

注意：生产环境下也会检测登录态，但不会弹出框提示，而是直接跳转到登录页。