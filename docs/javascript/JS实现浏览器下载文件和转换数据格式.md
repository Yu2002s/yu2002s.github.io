---
title: JS实现浏览器下载文件和转换数据格式
createTime: 2024/11/24 09:25:48
permalink: /article/oi7jgato/
---

实际开发中难免会遇到下载文件的需求，比如下载图片、下载视频、下载 PDF 等。
现在使用 js 手动实现这个功能。并且可能会对数据格式进行转换。

<!-- more -->

## 外部下载

对于一些有跨域限制的下载地址，在浏览器内部下载显然是不现实的，但是可以通过 `a` 标签实现下载功能
原理很简单，就是创建一个 `a` 标签，设置其 `href` 属性为下载地址，然后触发点击事件。
如果对跨域进行了处理，设置了 `Access-Control-Allow-Origin` 响应头头，那么也能 [内部下载](#内部下载)

### 通过 `a` 标签下载

通过 `a` 标签手动触发点击事件下载文件，浏览器会自动下载文件

```js
// 创建一个 a 标签
const link = document.createElement("a")
// 设置下载的文件地址
link.href = "https://example.com/file.pdf"
// 设置下载的文件名，浏览器也会根据下载的文件名来命名文件
link.download = "file.pdf"
// 触发点击事件
link.click()
```

手动调用 `a` 标签的 `click` 方法，浏览器会自动下载文件

### 通过 `window` 的 API 实现下载

浏览器提供了 `window.open` 方法，可以打开一个新的窗口，并指定下载的文件地址

```js
window.open("https://example.com/file.pdf", "_blank")
```

也可以使用 `window.location.href` 来实现下载

```js
window.location.href = "https://example.com/file.pdf"
```

这种实现是在当前窗口打开下载地址，如果需要下载的文件是跨域的，那么需要服务器端设置 `Access-Control-Allow-Origin` 头信息

## 内部下载

如果下载的文件是同源的，那么可以在浏览器内部下载，参考浏览器的 [同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

:::tip

如果下载的文件是跨域的，那么需要服务器端设置 `Access-Control-Allow-Origin` 头信息

:::

### 使用 `Blob` 下载

请求下载地址，获取文件的二进制数据，然后使用 `Blob` 对象来创建下载的文件

::: code-tabs
@tab 使用 fetch 请求

```js
// 请求下载地址，获取文件的二进制数据
const response = await fetch("https://example.com/file.pdf")
// 使用 Blob 对象来创建下载的文件
const blob = await response.blob()
// 创建一个 a 标签
const link = document.createElement("a")
// 设置下载的文件地址
link.href = URL.createObjectURL(blob)
// 设置下载的文件名
link.download = "file.pdf"
// 触发点击事件
link.click()
// 释放内存
URL.revokeObjectURL(link.href)
```

@tab 使用 axios 请求

```js
axios({
  url: "www.baidu.pdf",
  method: "GET",
  responseType: "blob", // 这里就是转化为blob文件流，指定响应类型为二进制数据
  headers: {
    // 'Content-Type': 'application/json; application/octet-stream',
    token: "token", // 可以携带token
  },
}).then((res) => {
  // 转换为 blob 地址，这是在内存中的地址，blob: 协议
  const href = URL.createObjectURL(res.data)
  const link = document.createElement("a")
  link.download = "附件.pdf"
  link.href = href
  link.click()
  URL.revokeObjectURL(href) // 释放内存
})
```

:::

### 多线程下载

在浏览器环境中使用多线程下载，并监听下载进度

```js
function getDownloadFile(file, block) {
  return new Promise(async resolve => {
    const response = await fetch(file.url, {
      headers: {
        "Connection": "keep-alive",
      },
      cache: "no-store",
      mode: "cors",
      credentials: "omit"
    })
    // 获取到 Reader 对象
    const reader = response.body.getReader()
    // 获取文件大小
    const contentLength = +response.headers.get('Content-Length')

    // 已接收的数据长度
    let receivedLength = 0
    // 保存的字节数据
    let chunks = []

    // 循环读取文件
    while (true) {
      // 读取文件
      const { done, value } = await reader.read()

      // 读取完成
      if (done) break

      // 保存字节数据
      chunks.push(value)
      // 已接收的数据长度
      receivedLength += value.length

      // 回调函数，返回读取到的长度用于外部计算进度
      block(value.length)
      // 计算下载进度百分比
      // const progress = (receivedLength / contentLength) * 100
      // console.log(`文件 ${file.index + 1} 下载进度: ${progress.toFixed(2)}%`)
    }

    // 创建一个 Uint8Array 对象，用于保存接收到的字节数据
    const buffer = new Uint8Array(receivedLength)
    // 保存字节数据的偏移量
    let position = 0
    // 循环保存字节数据
    for (let chunk of chunks) {
      // 保存字节数据
      buffer.set(chunk, position)
      // 更新偏移量
      position += chunk.length
    }

    resolve({
      ...file
      buffer
    })
  })

// 下载分片文件
async function downloadSplitFile(data) {
  console.log(data)
  // 需要下载的文件信息
  // files 对象结构 [{ index: 0, url: 'http://example.com/file.pdf', start: 0 }, { index: 1, url: 'http://example.com/file2.pdf', start: 11220 }]
  // index：第几个分片， url：下载地址，start：数据保存的偏移值（后面可以自己计算这个偏移值）
  const files = data.files
  // 下载的总大小
  let downloadTotal = 0
  // 定时器，用于监听下载进度
  let timer = setInterval(() => {
    // 计算进度
    const progress = downloadTotal * 100 / data.length
    // 更新下载进度
    downloadProgressEl.textContent = `${downloadTotal}/${data.length}(${progress.toFixed(2)}%)`
  }, 1000)
  // 下载分片文件
  const promises = files.map(file => getDownloadFile(file, (size) => {
    // 更新下载的总大小
      downloadTotal += size
    })
  )
  // 等待所有分片文件下载完成
  // Promise.all 是并行的，实现多线程下载文件，速度更快
  const results = await Promise.all(promises).finally(() => {
    // 下载完成，清除定时器
    clearInterval(timer)
  }).catch(err => {
    downloadProgressEl.textContent = err.message
  })
  const resultBuffer = new Uint8Array(data.length)
  // 对分片进行排序，并把分片的
  results.sort((a, b) => a.index - b.index).forEach(file => {
    // 这里偷懒了一下，这里是可以自己计算出偏移值的
    resultBuffer.set(file.buffer, file.start)
    // 没有 start 属性可以这样设置
    // resultBuffer.set(file.buffer, file.index * buffer.length)
  })
  downloadProgressEl.textContent = '下载完成'

  // 创建 blob 对象
  const blob = new Blob([resultBuffer], { type: 'application/octet-stream' })
  // 创建 a 标签
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = fileNameEl.textContent
  a.click()
  // 释放内存
  URL.revokeObjectURL(blob)
}
```

### 关于 `Blob`

`Blob` 对象表示一个不可变原始二进制数据对象。`Blob` 表示的不一定是 `JavaScript` 原生格式的数据。`File` 接口基于 `Blob`，继承了 `blob` 的功能并将其扩展使其支持用户系统上的文件。

### 创建 `Blob`

```js
const blob = new Blob([res.data], { type: "application/pdf" })
```

### URL.createObjectURL

`URL.createObjectURL` 方法会返回一个 `DOMString`，包含一个表示参数中给出的对象的 `URL`。这个 `URL` 的生命周期和创建它的窗口中的 `document` 绑定。这个新的 `URL` 对象表示指定的 `File` 对象或 `Blob` 对象。

::: tip

`URL.createObjectURL` 方法返回的 `URL` 是内存中的地址，`blob: 协议`，浏览器不会对它进行缓存，所以需要手动释放内存。

内存限制：每个 `origin` 的内存限制为 **50 MB**，超过限制会抛出 `NS_ERROR_FILE_TOO_BIG` 错误。

:::

### ArrayBuffer

`ArrayBuffer` 对象用来表示通用的、固定长度的原始二进制数据缓冲区。`ArrayBuffer` 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区中的数据。

下载文件，使用 `fetch` 转换为 `ArrayBuffer` 数据

```js
// 转换为 ArrayBuffer
const arrayBuffer = fetch(url).then((res) => res.arrayBuffer())
// 使用 blob 下载
// 创建 blob 对象，type 为文件的 mimeType 类型
const blob = new Blob([arrayBuffer], { type: "application/octet-stream" })
const a = document.createElement("a")
a.href = URL.createObjectURL(blob)
a.download = "file.pdf"
a.click()
URL.revokeObjectURL(blob)
```

### FileReader

`FileReader` 是 `HTML5 File API` 的一部分，它允许在客户端对用户选择的文件进行异步读取。使用 `FileReader`，我们可以读取用户的文件，并基于其内容执行各种操作，如预览图片、读取文本文件等。

`Reader` 对象可以读取文件，并将其转换为 `ArrayBuffer` 数据

```js
const reader = new FileReader()
reader.readAsArrayBuffer(file)
```

#### `FileReader` 的主要方法：

- `readAsArrayBuffer(file)`  - 读取文件并将其内容解读为二进制数据的 `ArrayBuffer` 对象。
- `readAsBinaryString(file)`  - 读取文件并将其内容解读为二进制字符串。
- `readAsDataURL(file)`  - 读取文件并将其内容解读为一个基于数据 `URL` 格式的字符串。
- `readAsText(file, [encoding])`  - 读取文件并将其内容解读为纯文本。`encoding` 参数是可选的，表示文本的编码。

#### 事件处理：

- `loadstart` - 开始读取文件时触发。
- `progress` - 读取文件过程中触发，可以用来实现加载进度条。
- `load` - 文件读取操作成功完成时触发。
- `abort` - 文件读取操作被中断时触发。
- `error` - 文件读取操作出错时触发。
- `loadend` - 文件读取操作完成，无论成功或失败都会触发。

#### 使用 `FileReader` 的步骤：

- 创建一个  `<input type="file">`  元素，允许用户选择文件。
- 监听 `change` 事件，当文件选择发生变化时触发。
- 使用 `FileReader` 对象读取文件。
- `FileReader` 对象的基本用法：

1. 创建 `FileReader` 对象：

```js
const reader = new FileReader()
```

2. 监听 `load` 事件，当文件读取操作成功完成时触发：

```js
reader.onload = (event) => {
  console.log(event.target.result)
}
```

3. 读取文件：

```js
// 以文本方式读取
reader.readAsText(file)
// 以 DataURL 读取
reader.readAsDataURL(file)
// 二进制读取
reader.readAsArrayBuffer(file)
// readAsBinaryString等
```

#### 示例

下面是简单的使用示例

::: code-tabs
@tab index.html

```html
<input type="file" id="fileInput" />
<pre id="fileContent">选择文件以显示内容...</pre>
```

@tab index.js

```js
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    var file = event.target.files[0] // 获取文件列表中的第一个文件对象
    if (file) {
      var reader = new FileReader()

      // 当读取操作成功完成时触发
      reader.onload = function (e) {
        document.getElementById("fileContent").textContent = e.target.result
      }

      // 选择文本格式读取文件
      reader.readAsText(file)
    }
  })
```

:::

::: warning

**1.FileReader 的局限性：**
`FileReader` 是异步的，不能获取读取进度。

**2.安全性限制**：出于安全考虑，`FileReader API` 只能在由用户触发的事件处理函数中被调用，例如在响应一个按钮点击或文件选择事件时。

**3.FileReader 的替代品**：
`Blob` 对象：可以用来处理二进制文件数据。
`Fetch API`：可以与  `Response.arrayBuffer()`  方法结合使用，读取本地或网络上的二进制文件。
使用 `FileReader` 是处理用户文件上传内容的一种有效方式，但请记住，对于大型文件，读取操作可能需要一些时间，因此提供适当的用户反馈（如加载指示器）是很重要的。

:::

## `Blob`、`File`、`ArrayBuffer`、`Uint8Array` 等转换

假如后端传过来一个 `a.jpg` 图片文件，但这个文件的数据类型是 `ArrayBuffer`，想要用 `URL.createObjectURL` 展示图片，如何做到？

`createObjectURL` 函数的参数是 `File` 对象、`Blob` 对象或者 `MediaSource` 对象。​ 因此就要将 `ArrayBuffer` 转成这三者中的其一类型。

### ArrayBuffer、File 相互转换

ArrayBuffer 转成 File 直接调用 new File 构造函数即可：

```js
function bufToFile(buf, filename) {
  return new File([buf], filename)
}
```

`File` 函数的第一个参数是一个包含 `ArrayBuffer`，`ArrayBufferView`，`Blob`，或者 `DOMString` 对象的数组，第二个参数表示文件名称。

`File` 转成 `ArrayBuffer` 需要借助 `FileReader` 类。

```js
function fileToBuf(file, cb) {
  // 创建 FileReader 对象
  var fr = new FileReader()
  var filename = file.name

  // 读取 ArrayBuffer 二进制数据
  fr.readAsArrayBuffer(file)
  // 监听事件
  fr.addEventListener(
    "loadend",
    (e) => {
      var buf = e.target.result
      // 回调函数
      cb(buf, filename)
    },
    false
  )
}
```

上面函数中，fr 是 `FileReader` 的实例，`readAsArrayBuffer` 可以读取指定的 `Blob` 或 `File` 内容，
当读取完成后会触发 `loadend` 事件，同时 `result` 属性中将包含一个 `ArrayBuffer` 对象以表示所读取文件的数据。
我们的 `fileToBuf` 接受一个回调，它接受 `ArrayBuffer` 和 `filename` 两个参数。

### `ArrayBuffer` 与 `Blob` 互转

首先说一下 `ArrayBuffer` 转成 `Blob`。跟 `ArrayBuffer` 转成 `File` 很像。也是调用 `new Blob` 构造函数：

```js
function bufToBlob(buf, mimeType) {
  // 创建 Blob 对象
  return new Blob([buf], { type: mimeType })
}
```

`Blob` 函数的第二个参数与 `File` 函数的第二个参数略有不同，`Blob` 是一个对象，
对象中有一个 `type` 属性，默认值为 “”，它代表了将会被放入到 `blob` 中的数组内容的 `MIME` 类型。
`Blob` 的第一个参数也是一个由 `ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 等对象构成的数组。

::: tip

`DOMString` 是 `DOM` 字符串，比如：`<a id="a"><b id="b">hey!</b></a>`。它的 `type` 则是：`text/html`。

:::

然后是 `Blob` 转成 ArrayBuffer。

Blob 转成 ArrayBuffer 也是通过 FileReader 类进行转换。上面的 File 转 ArrayBuffer 我们稍微更改一下即可：

```js
function blobToBuf(blob, cb) {
  var fr = new FileReader()
  var type = blob.type

  fr.readAsArrayBuffer(blob)
  fr.addEventListener(
    "loadend",
    (e) => {
      var buf = e.target.result
      cb(buf, type)
    },
    false
  )
}
```

### Blob 与 File 互转

`File` 对象其实是特殊类型的 Blob，且可以用在任意的 Blob 类型的上下文中。
比如说，FileReader, `URL.createObjectURL()`, `createImageBitmap()`,
及 `XMLHttpRequest.send()` 都能处理 Blob 和 File。File 接口也继承了 Blob 接口的属性。
这两个东西互转感觉没必要，如果要转的话，可以利用 FileReader 作为桥梁，
先转成 ArrayBuffer，然后在转成相应的 Blob 或者 File。

::: code-tabs
@tab 使用 XHR 请求

```js
var xhr = new XMLHttpRequest()
xhr.open("GET", "/myfile.png", true)
// 指定接受类型
xhr.responseType = "blob"

xhr.onload = function (oEvent) {
  var blob = xhr.response
  // ...
}

xhr.send()
```

@tab 使用 fetch 请求

```js
fetch(url)
  .then((res) => res.blob())
  .then((blob) => {
    console.log(blob)
  })
```

:::

### Uint8Array

`Uint8Array` 是 `ArrayBuffer` 的视图，用于操作二进制数据。

#### 1. `TextEncoder` => `ArrayBuffer`

```js
let encoder = new TextEncoder()
// 字符 转 Uint8Array
let uint8Array = encoder.encode("你好啊")
// Uint8Array 转 ArrayBuffer
let arrayBuffer = uint8Array.buffer
```

#### Uint8Array 使用

使用 `Reader` 对象，将 `response.body` 读取为 `Uint8Array` 数组

```js
// ... 省略请求代
const response = fetch("http://example.com")
// 获取 Reader 对象
const reader = response.body.getReader()
const contentLength = +response.headers.get("Content-Length")

let receivedLength = 0
// 存储 Uint8Array 数组
let chunks = []

while (true) {
  // 读取数据，value: 读取到的是 Uint8Array
  const { done, value } = await reader.read()

  if (done) break

  chunks.push(value)
  receivedLength += value.length

  block(value.length)
  // 计算下载进度百分比
  // const progress = (receivedLength / contentLength) * 100
  // console.log(`文件 ${file.index + 1} 下载进度: ${progress.toFixed(2)}%`)
}

// 将 Uint8Array 数组拼接成一个 Uint8Array
const buffer = new Uint8Array(receivedLength)
let position = 0
for (let chunk of chunks) {
  // 将 Uint8Array 数组拼接成一个 Uint8Array
  buffer.set(chunk, position)
  // 更新位置
  position += chunk.length
}
```

### 将 `file` 转换成 `DataURL`

#### 1. 使用 `URL.createObjectURL`

```js
let img = document.getElementById("img")
let file = document.getElementById("file")
file.onchange = function () {
  let imgFile = this.files[0]
  img.src = URL.createObjectURL(imgFile)
  img.onload = function () {
    URL.revokeObjectURL(this.src)
  }
}
```

#### 2. 使用 `FileReader`

```js
let img = document.getElementById("img")
let file = document.getElementById("file")
file.onchange = function (e) {
  let imgFile = this.files[0]
  let fileReader = new FileReader()
  fileReader.readAsDataURL(imgFile)
  fileReader.onload = function () {
    img.src = this.result
  }
}
```

### 将 `DataURL` 转换成 `File`

```js
function dataURLToFile(dataUrl, fileName) {
  const dataArr = dataUrl.split(",")
  const mime = dataArr[0].match(/:(.*);/)[1]
  const originStr = atob(dataArr[1])
  return new File([originStr], fileName, { type: mime })
}
dataURLToFile("data:text/plain;base64,YWFhYWFhYQ==", "测试文件")

// File {name: '测试文件', lastModified: 1640784525620, lastModifiedDate: Wed Dec 29 2021 21:28:45 GMT+0800
```

### 将 `canvas` 转成 `DataURL`

```js
document.querySelector("#file").onchange = function () {
  canvasToDataURL(this.files[0]).then((res) => console.log(res))
}
function canvasToDataURL(file) {
  return new Promise((resolve) => {
    const img = document.createElement("img")
    img.src = URL.createObjectURL(file)
    img.onload = function () {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL("image/png", 1))
    }
  })
}
```

### 将 `DataURL` 转成 `canvas`

```js
function dataUrlToCanvas(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = dataUrl
    img.onload = function () {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(this, 0, 0)
      resolve(canvas)
    }
  })
}
const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUh..."
dataUrlToCanvas(dataUrl).then((res) => document.body.appendChild(res))
```
