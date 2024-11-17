---
title: Vue配置Eslint
createTime: 2024/06/03 14:26:32
permalink: /article/b2lzw796/
tags: [Eslint]
---

#### 关于 Eslint

`Eslint`中文官网：[eslint](http://eslint.cn)

**它的目标是提供一个插件化的** **javascript 代码检测工具**

<!-- more -->

#### 安装

安装`eslint`，使用`pnpm`进行按照，注意使用**开发依赖**方式安装

```bash
pnpm i eslint -D
```

#### 生成配置文件

`eslint.cjs`

```bash
npx eslint --init # 进行初始化
# 或
npm init @eslint/config
# 或
pnpm eslint --init
```

#### Vue3 环境代码校验插件

```bash
# 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-node": "^11.1.0",
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier": "^4.2.1",
# vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南
"eslint-plugin-vue": "^9.9.0",
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser": "^7.19.1",
```

安装依赖

```bash
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```

#### `.eslintrc.cjs`配置

```js
module.exports = {
  //运行环境
  env: {
    browser: true, //浏览器端
    es2021: true, //es2021
  },
  //规则继承
  extends: [
    //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
    //比如:函数不能重名、对象不能出现重复key
    "eslint:recommended",
    //vue3语法规则
    "plugin:vue/vue3-essential",
    //ts语法规则
    "plugin:@typescript-eslint/recommended",
  ],
  //要为特定类型的文件指定处理器
  overrides: [],
  //指定解析器:解析器
  //Esprima 默认解析器
  //Babel-ESLint babel解析器
  //@typescript-eslint/parser ts解析器
  parser: "@typescript-eslint/parser",
  //指定解析器选项
  parserOptions: {
    ecmaVersion: "latest", //校验ECMA最新版本
    sourceType: "module", //设置为"script"（默认），或者"module"代码在ECMAScript模块中
  },
  //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
  //该eslint-plugin-前缀可以从插件名称被省略
  plugins: ["vue", "@typescript-eslint"],
  //eslint规则
  rules: {
    /* "off" 或 0    ==>  关闭规则
     * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
     * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
     */
    // eslint（https://eslint.bootcss.com/docs/rules/）
    // eslint（https://eslint.bootcss.com/docs/rules/）
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unexpected-multiline": "error", // 禁止空余的多行
    "no-useless-escape": "off", // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/semi": "off",

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
    "vue/no-mutating-props": "off", // 不允许组件 prop的改变
    "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
  },
}
```

#### `.eslintignore`忽略文件

```bash
dist
node_modules
```

#### 运行脚本

```json
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix",
}
```
