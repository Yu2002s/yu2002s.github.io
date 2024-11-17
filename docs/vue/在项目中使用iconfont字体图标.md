---
title: 在项目中使用iconfont字体图标
createTime: 2024/07/27 08:19:54
permalink: /article/gxvrsdz9/
tags: [iconfont]
---

字体图标网站：[阿里巴巴矢量图标库](https://www.iconfont.cn/)

<!-- more -->

![image.png](https://pic2.ziyuan.wang/user/jdy2002/2024/07/image_e610bfea02e7e.png)

将图标通过购物车添加到项目中，选择下载至本地，下载字体图标所需的资源文件

将资源文件引入至项目中

font.scss

```scss
@font-face {
  font-family: "erabbit";
  src: url("https://at.alicdn.com/t/c/font_4009193_lnbhmo3yos.woff?t=1681201348304")
      format("woff"), url("https://at.alicdn.com/t/c/font_4009193_lnbhmo3yos.ttf?t=1681201348304")
      format("truetype"),
    url("https://at.alicdn.com/t/c/font_4009193_lnbhmo3yos.svg?t=1681201348304#erabbit")
      format("svg");
}
```

> 注意：以上方式使用的是在线地址，建议将对应文件下载到本地或自己服务器中进行引入

`font-family: 'erabbit';` 指定字体名

```scss
[class^="icon-"],
[class*=" icon-"] {
  font-family: "erabbit" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

通过以上方式，设置带 icon-开头的类名将设置对应的字体图标样式

```scss
.icon-mail:before {
  content: "\e644";
}

.icon-weixin:before {
  content: "\e620";
}

.icon-phone:before {
  content: "\e618";
}
```

通过伪类选择器在元素之前设置字体图标

```html
<!-- 搜索条 -->
<view class="search">
  <text class="icon-search">搜索商品</text>
  <text class="icon-scan"></text>
</view>
```

在布局中进行具体使用如上

如果是 uniapp 项目，则在 App.vue 中进行引入

```scss
// 字体图标
@import "@/styles/fonts.scss";
```

如果是普通 vue 项目，则在 main.js 入口文件处进行引入
