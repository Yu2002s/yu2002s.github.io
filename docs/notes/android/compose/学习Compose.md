---
title: 学习Compose
createTime: 2025/08/17 17:14:42
permalink: /android/compose/0ji6ncyv/
---

## 布局

### IntrinsicSize

设置这个属性时，子组件的宽度或高度会根据内容自动调整。

```kotlin
@Composable
fun TwoTexts(modifier: Modifier = Modifier, text1: String, text2: String) {
    Row(modifier = modifier) {
        Text(
            modifier = Modifier
                .weight(1f)
                .padding(start = 4.dp)
                .wrapContentWidth(Alignment.Start),
            text = text1
        )
        VerticalDivider(
            color = Color.Black,
            modifier = Modifier.fillMaxHeight().width(1.dp)
        )
        Text(
            modifier = Modifier
                .weight(1f)
                .padding(end = 4.dp)
                .wrapContentWidth(Alignment.End),

            text = text2
        )
    }
}
```

当设置这个布局显示的时候，中间的分割线会撑满整个布局，不会和文本高度一致，为了解决这个问题，可以给父布局设置 `intrinsicSize` 属性。

```kotlin
 Row(modifier = modifier.height(IntrinsicSize.Min)) { // [!code highlight]
  // ...
 }
```

## remember

`remember` 函数可以缓存一个值，当这个值发生变化时，会重新计算这个值。

```kotlin
val rememberedValue = remember {
    mutableStateOf(0)
}
```

### rememberSaveable

`rememberSaveable` 和 remember 一样，不过当`activity`重启时将保存状态

```kotlin
val rememberedValue = rememberSaveable {
    mutableStateOf(0)
}
```

使用 kotlin 委托，可以免去写多余的 `value` 字段

```kotlin
val rememberedValue by remember {
    mutableStateOf(0)
}

rememberedValue = !rememberedValue
```

## 状态

`mutableStateOf` 函数可以创建一个可观察的状态，当这个状态发生变化时，会重新计算这个值。

```kotlin
val rememberedValue = remember {
    mutableStateOf(0)
}
```