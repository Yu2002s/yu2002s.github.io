---
title: Vue配置Prettier格式化代码，保证代码美观
createTime: 2024/06/03 13:14:52
permalink: /article/e9gubh3i/
tags: [Prettier]
---

有了 eslint，为什么还要有 prettier？eslint 针对的是 javascript，他是一个检测工具，
包含 js 语法以及少部分格式问题，在 eslint 看来，语法对了就能保证代码正常运行，格式问题属于其次；

<!-- more -->

而 prettier 属于格式化工具，它看不惯格式不统一，所以它就把 eslint 没干好的事接着干，另外，prettier 支持

包含 js 在内的多种语言。

总结起来，**eslint 和 prettier 这俩兄弟一个保证 js 代码质量，一个保证代码美观。**

安装依赖包

```bash
pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
```

.prettierrc.json 添加规则

```json
{
  "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
}
```

规则解释

```javascript
{
  // 一行最多多少个字符
  printWidth: 150,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: false,
  // 在语句末尾是否需要分号
  semi: false,
  // 是否使用单引号
  singleQuote: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: "as-needed",
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: "es5",
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  arrowParens: "always",
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: "preserve",
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: "css",
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  //在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
  //然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
  //对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: "auto",
}
```

.prettierignore 忽略文件

```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```
