# Taro
taro构建多平台小程序

# React 语法风格
Taro 遵循 React 语法规范，它采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，同时支持使用 JSX 语法，让代码具有更丰富的表现力,
使用 Taro 进行开发可以获得和 React 一致的开发体验。

# 快速开发微信小程序
Taro 立足于微信小程序开发，众所周知小程序的开发体验并不是非常友好，比如小程序中无法使用 npm 来进行第三方库的管理，无法使用一些比较新的 ES 规范等等，
针对小程序端的开发弊端，Taro 具有以下的优秀特性
✅ 支持使用 npm/yarn 安装管理第三方依赖

✅ 支持使用 ES7/ES8 甚至更新的 ES 规范，一切都可自行配置

✅ 支持使用 CSS 预编译器，例如 Sass 等

✅ 支持使用 Redux 进行状态管理

✅ 支持使用 MobX 进行状态管理

✅ 小程序 API 优化，异步 API Promise 化等等

# Taro UI

一款基于 Taro 框架开发的多端 UI 组件库。

Taro UI 特性：

基于 Taro 开发 UI 组件
一套组件可以在 微信小程序，支付宝小程序，百度小程序，H5 多端适配运行（ReactNative 端暂不支持）
提供友好的 API，可灵活的使用组件

# 微信小程序
taro build --type weapp --watch

# 百度小程序
taro build --type swan --watch

# 支付宝小程序
taro build --type alipay --watch

# 字节跳动小程序
taro build --type tt --watch

# QQ 小程序
taro build --type qq --watch
