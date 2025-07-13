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

## 常用命令行

```shell
nohup command & # 创建进程持续运行

tail -f -n 10 nohup.out # 查看日志

kill -9 22899 # 杀死 进程的 pid ，关闭程序。

cat info.log # 查看文件

ps -ef | grep java # 查看 java 运行的几个进程 pid

clear # 清除命令行

# 清空命令行
clear
# 查看文件内容
cat xxx
# 查看IP
ip addr show
ip a
hostname -I
# 查看当前系统时间
date
# 注销
logout
# 关机
shutdown
# 重启
reboot
# 清屏
clear
# 查看当前目录下的文件
ls
# 查看指定目录下的文件
ls /
# 查看详细信息
ls -l
ll
# 查看隐藏文件
ls -a
#参数并用
ls -la
# 指定目录新建文件
mkdir -p 文件名
whereis mysql # 查看软件安装路径
which mysql # 查看mysql的运行路径

adduser # 添加用户
passwd # 设置用户密码
localectl set-locale LANG=zh_CN.UTF8 # 设置语言为中文
```

## 防火墙

解决 wsl2 执行 systemctl 报错问题

```shell
sudo apt-get install daemonize
sudo daemonize /usr/bin/unshare --fork --pid --mount-proc /lib/systemd/systemd --system-unit=basic.target
exec sudo nsenter -t $(pidof systemd) -a su - $LOGNAME
```

安装

```shell
apt install firewalld
```

### 查看防火墙状态

```shell
sudo service status firewalld
firewall-cmd state
```

### 启动防火墙

```shell
service firewalld start

# systemctl start firewalld.service
```

- 关闭一个服务：`systemctl stop firewalld.service`
- 重启一个服务：`systemctl restart firewalld.service`
- 显示一个服务的状态：`systemctl status firewalld.service`
- 在开机时启用一个服务：`systemctl enable firewalld.service`
- 在开机时禁用一个服务：`systemctl disable firewalld.service`
- 查看服务是否开机启动：`systemctl is-enabled firewalld.service`
- 查看已启动的服务列表：`systemctl list-unit-files|grep enabled`
- 查看启动失败的服务列表：`systemctl --failed`

### 配置 firewalld-cmd

查看版本： `firewall-cmd --version`

查看帮助： `firewall-cmd --help`

显示状态： `firewall-cmd --state`

查看所有打开的端口： `firewall-cmd --zone=public --list-ports`

更新防火墙规则： `firewall-cmd --reload`

查看区域信息: `firewall-cmd --get-active-zones`

查看指定接口所属区域： `firewall-cmd --get-zone-of-interface=eth0`

拒绝所有包：`firewall-cmd --panic-on`

取消拒绝状态： `firewall-cmd --panic-off`

查看是否拒绝： `firewall-cmd --query-panic`

### 端口

添加

`firewall-cmd --zone=public --add-port=80/tcp --permanent` （--permanent 永久生效，没有此参数重启后失效）

重新载入

`firewall-cmd --reload`

查看

`firewall-cmd --zone=public --query-port=80/tcp`

删除

`firewall-cmd --zone=public --remove-port=80/tcp --permanent`
