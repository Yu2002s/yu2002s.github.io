---
title: nodemon使用方法
createTime: 2025/07/13 14:14:57
permalink: /frontend/nodejs/4fhpfsza/
---

## 安装

```shell
npm install -g nodemon
```

## 常用命令

```shell
nodemon index.js
```

## 运行typescript

监听代码修改并且执行 ts-node 进行运行ts

```shell
npm install -g ts-node
nodemon --watch src -e ts --exec ts-node src/index.ts
```

## 编译typescript

删除 dist 文件夹，并执行编译

```shell
rd /s /q dist & tsc
```
