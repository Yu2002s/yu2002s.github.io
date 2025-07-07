---
title: webpack配置
createTime: 2025/07/07 15:54:42
permalink: /frontend/webpack/g243cn9h/
---

## 安装

::: npm-to

```shell
# 安装webpack
npm install -D webpack webpack-cli
# 安装typescript和加载器(用于typescript开发的情况下)
npm install -D typescript ts-loader
# 安装webpack热更新工具
npm install -D webpack-dev-server
# 安装babel
npm i -D @babel/core @babel/preset-env
```

:::

## 命令

```shell
# webpack打包命令
webpack --mode production|development
# 热更新并打开默认浏览器
webpack serve --mode development --open
```

## webpack.config.js 配置文件

```js
// 引入包
const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')

// webpack 中所有配置信息
module.exports = {
  // 入口文件
  entry: './src/index.ts',
  mode: 'production',
  // 打包文件所在的目录
  output: {
    // 指定的打包目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件
    filename: 'bundle.js',
    // 重新打包时对生成文件进行清空
    clean: true,
    environment: {
      // 兼容ie
      arrowFunction: false
    }
  },
  // 指定webpack 打包时候使用的模块
  module: {
    // 指定加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          {
            loader: 'babel-loader',
            // 设置 babel
            options: {
              // 设置预定义环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": '88',
                      'ie': '11'
                    },
                    "corejs": '3',
                    // 使用 coreJS 的方式 "usage" 表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 排除的文件
        exclude: /node-moudules/
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    new htmlWebpackPlugin({
      // title: '这是一个自定义的title'
      template: './src/index.html'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}
```

JS 环境配置参考

```js
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
// 插件，打包时生成 html文件
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  // 打包模式 development（开发）和 production（生产）
  mode: 'development',
  // 目标文件的入口
  entry: './src/index.js',
  // 打包输出文件
  output: {
    // 输出到 dist目录
    path: path.resolve(__dirname, 'dist'),
    // 输出为 output.js
    filename: 'output.js',
    clean: true,
    environment: {
      // 兼容ie
      arrowFunction: false,
      const: false
    },
  },
  plugins: [
    new htmlWebpackPlugin({
    title: '我的webpack',
    // 模板路径
    template: './public/index.html',
    // 输出路径
    filename: './index.html',
  }),
    new MiniCssExtractPlugin({
      filename: './index.css',
    }),
  ],
  // 用服务器方式运行的配置
  devServer: {
    // 设置静态页面 false表示默认public文件夹
    static: {
      // 静态文件目录
      directory: path.join(__dirname, 'public'),
    },
    // 是否进行压缩
    compress: true,
    // 指定运行端口
    port: 9000,
    // 在开发调试阶段，建议把devtool的值数组为eval-source-map
    // devtool: 'eval-source-map',
    // 只显示错误行号，不显示源码位置
    devtool: 'inline-source-map'
  },
  module: {
    rules: [
      {
        // 支持加载 css文件
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader']
        // 不能与 style-loader同时使用
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      },
    ],
  },
  // 优化打包
  optimization: {
    // 最小化
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      '...',
      new CssMinimizerPlugin(),
    ],
  },
}

```

## loader

### vue-loader

```js
rules: [
    {
        test: /\.vue$/,
        use: 'vue-loader'
    },
],
plugins: [
    new VueLoaderPlugin()
]
```

### less-loader

```js
rules: [
    {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
    }
]
```