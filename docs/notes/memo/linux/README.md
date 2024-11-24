---
title: Linux常用指令
createTime: 2024/11/22 22:05:45
permalink: /memo/linux/
---

## 内存

查看内存容量

```bash
free
```

### 虚拟内存

配置虚拟内存

```bash
# 选择虚拟内存创建位置
mkdir swap  #新建文件夹
cd swap

# bs 为块的大小，count 创建多少个块 这里创建2gb
sudo dd if=/dev/zero of=swapfile bs=1M count=2048

# 修改权限
sudo chmod 0600 swapfile

#把生成的文件转换成 Swap 文件
sudo mkswap swapfile

# 激活文件
sudo swapon swapfile
```

释放虚拟内存

```bash
# 执行命令后，删除创建的swap目录即可
sudo swapoff swapfile
```

开启自启，自动使用虚拟内存

```bash
# 此时开的虚拟内存会在开机后消失,如果永久保持下去,
# 在/etc/fstab文件尾添加一下信息(没有文件则创建):
swapfilepath swap swap defaults 0 0
# 例如:我的我是在/root/进行的配置,因此添加了下面内容
/data/swap/swapfile swap swap defaults 0 0

# 保存并退出即可
```

::: warning
虚拟内存相较于物理内存，读写速度慢，且占用物理内存
:::
