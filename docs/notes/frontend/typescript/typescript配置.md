---
title: typescript配置
createTime: 2025/07/07 16:28:18
permalink: /frontend/typescript/nn46yr3s/
---

## ts.config.json

常用的配置

```json
{
  "compilerOptions": {
    "target": "ES2016", // 编译后目标代码版本
    "module": "CommonJS", // 设置编译结果中使用的模块化标准
    "lib": ["ES6"], // 运行环境
    "outDir": "./dist", // 编译输出目录
    "strictNullChecks": true, // 可以获得更严格的空类型检查，从此以后null、undefined只能赋值给自身
    "moduleResolution": "Node", // 设置解析模块的模式
    "noImplicitUseStrict": false, // 编译结果中不使用"use strict"
    "removeComments": true, // 编译结果中删除注释
    "noEmitOnError": true, // 错误时不生成错误结果
    "esModuleInterop": true, // 启用es模块化交互非es模块导出
    "strictPropertyInitialization": true // 更加严格的属性初始化检查
  },
  "include": ["./src"] // 需要编译的文件
}
```
