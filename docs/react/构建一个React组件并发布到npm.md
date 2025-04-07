---
title: 构建一个React组件并发布到npm
createTime: 2025/03/30 12:45:28
permalink: /article/gdqtrftt/
---

使用 `Vite` 构建一个 `React` 组件库，并发布到 `npm`。

<!-- more -->

## 项目结构

::: file-tree

- dist 打包生成的文件目录
  - xxxxx.js
- docs 文档目录
  - xxx.md
- packages 组件目录
  - Tree 树组件
    - index.ts 入口
    - tree.tsx 组件
    - styles.css 样式
    - types.d.ts 类型定义
  - Button 按钮组件
    - index.ts 入口
    - button.tsx 组件
    - styles.css 样式
    - types.d.ts 类型定义
  - index.ts 组件汇总
  - vite.d.ts 类型定义
- example 示例目录
  - index.html 示例页面
  - App.tsx
  - main.tsx
- package.json 包管理
- vite.config.ts Vite 配置
- tsconfig.json TS 配置
- README.md 说明文档

:::

::: tip

`package.json` 可以使用 `npm init -y` 进行生成;

`tsconfig.json` 可以通过 `tsc --init` 进行生成;

:::


## 所需的依赖

::: npm-to

```sh
npm install vite -D # vite 构建工具
npm install @vitejs/plugin-react-swc -D # 插件编译React
npm install vite-plugin-dts -D #生成d.ts文件 声明文件
npm install react #react依赖
npm install react-dom #react依赖
npm install @types/react -D # 类型
npm install @types/react-dom -D # 类型
npm install @types/node -D # 类型
```

:::