---
title: CSS中的Flex弹性布局
createTime: 2024/08/17 13:30:51
permalink: /article/bx7ictx4/
tags: [flex]
---

只写开发中一些不常用到的，方便记忆

<!-- more -->

#### align-content

align-content：多根轴线对齐方式。如果元素只有一根轴线，该属性不起作用。它有六个属性值：

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around |
    stretch;
}
```

那这个轴线数怎么确定呢？实际上这主要是由 flex-wrap 属性决定的，当 flex-wrap 设置为 nowrap 时，容器仅存在一根轴线，因为项目不会换行，就不会产生多条轴线。当 flex-wrap 设置为 wrap 时，容器可能会出现多条轴线，这时就需要去设置多条轴线之间的对齐方式。
这里以水平方向为主轴时举例，即：flex-direction: row; flex-wrap: wrap;
（1）align-content: stretch：默认值，轴线占满整个交叉轴。这里我们先设置每个项目都是固定宽度，效果如下：

![455fa2e5821c4465adbc209fd5ea12c7tplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/455fa2e5821c4465adbc209fd5ea12c7~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_8ee7678f4b9bc.webp)

下面就去掉每个项目的高度，它会占满整个交叉轴，效果如下：

![88222e483e654d69ac70444e890744e7tplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/88222e483e654d69ac70444e890744e7~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_c7b242f13a323.webp)

（2）`align-content: flex-start`：从交叉轴开始位置填充

![36f3c8e8e1df4b858cd8144fca3d4edetplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/36f3c8e8e1df4b858cd8144fca3d4ede~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_30a3866ad7bee.webp)

（3）`align-content: flex-end`：从交叉轴结尾位置填充

![9489c57005f146629f982db640d40c9etplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/9489c57005f146629f982db640d40c9e~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_b7d49edd54338.webp)

（4）`align-content: center`：与交叉轴中点对齐

![bd83d07830984feba19bae71bfee7f33tplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/bd83d07830984feba19bae71bfee7f33~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_462edc318c3f5.webp)

（5）`align-content: space-between`：与交叉轴两端对齐，轴线之前的间隔平均分布

![41fdc96eca474cf2b803206608ad8a1etplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/41fdc96eca474cf2b803206608ad8a1e~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_aedf3c7c9743d.webp)

#### 子元素属性

子元素有以下六个属性：

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

##### 1. order

`order`属性用来定义项目的排列顺序。数值越小，排列越靠前，默认为`0`。使用形式如下：

```css
.item {
  order: <integer>;
}
```

##### 2. flex-basis

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间，浏览器会根据这个属性来计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。使用形式如下：

```css
.item {
  flex-basis: <length> | auto;
}
```

当主轴设置为水平时，当设置了 flex-basis，设置的项目宽度值会失效，`flex-basis` 需要跟 `flex-grow` 和 `flex-shrink` 配合使用才能生效。有两种特殊的值：

- 当 `flex-basis` 值为 0 % 时，项目尺寸会被认为是 0，因此无论项目尺寸设置多少都用；
- 当 `flex-basis` 值为 auto 时，则跟根据尺寸的设定值来设置大小。

##### flex-grow

`flex-grow`属性定义项目的放大比例，默认为 0，即如果存在剩余空间时也不放大。

当容器中所有的项目都设置了 flex-basis 属性时，如果仍有是剩余的空间，设置的 `flex-grow` 属性才能生效。

- 如果所有项目的 flex-grow 属性都设置为 1，那么它们会均分剩余的空间，如下图所示：

![456c2cc123a7481399c6e5a6259a2656tplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/456c2cc123a7481399c6e5a6259a2656~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_bb7a5a9ecb0b1.webp)

- 如果其中一个项目的 flex-grow 属性设置为 2，其他均为 1，那么它占据的剩余空间就是其他项目的两倍，如下图所示：

![d02cd89cabd444c097fa0b4e7c134df2tplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/d02cd89cabd444c097fa0b4e7c134df2~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_33a7a93d70a71.webp)

### flex-shrink

`flex-shrink`属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。不能设置负值，使用形式如下：

- 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小，如下图所示：

![ea54a8cb618b4c35881c6b1548dc878btplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/ea54a8cb618b4c35881c6b1548dc878b~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_de51fbda261fb.webp)

- 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小，如下图所示：

![dea7c53d3eeb4287b4765a20436c47a4tplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/dea7c53d3eeb4287b4765a20436c47a4~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_3a62ac4d797cd.webp)

##### flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，后两个属性可选。默认值为：`flex:0 1 auto。`使用形式如下：

```css
.item {
  flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" >];
}
```

对于 flex 的取值有几种常用的特殊情况： （1）默认值：flex:0 1 auto，即在有剩余空间时，只放大不缩小

```css
.item {
  flex: 0 1 auto;
}
.item {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
}
```

（2）flex: none，即有剩余空间时，不放大也不缩小，最终尺寸通常表现为最大内容宽度。

```css
.item {
  flex: 0 0 auto;
}
.item {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}
```

（4）flex: auto，即元素尺寸可以弹性增大，也可以弹性变小，具有十足的弹性，但在尺寸不足时会优先最大化内容尺寸。

```css
.item {
  flex: 1 1 auto;
}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

（5）flex: 1，即元素尺寸可以弹性增大，也可以弹性变小，具有十足的弹性，但是在尺寸不足时会优先最小化内容尺寸，

```css
.item {
  flex: 1 1 0%;
}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

### align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表

示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

这个属性和 align-items 属性的效果是一样的，只不过这个属性只对单个项目生效，而 align-items 是对容器中所有的项目生效。

设置容器的 align-items 属性为 flex-start，容器中第三个项目的 align-self 属性为 flex-end，效果如下：

![c6e0951a23ad44fcb5cf359bf07b1dectplvk3u1fbpfcpzoomincropmark_1512_0_0_0.webp](https://pic2.ziyuan.wang/user/jdy2002/2024/08/c6e0951a23ad44fcb5cf359bf07b1dec~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0_acb29f808c8cd.webp)
