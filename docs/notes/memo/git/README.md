---
title: 一些Git指令
createTime: 2024/11/17 18:39:00
permalink: /memo/git/
tags: [Git]
---

## 一些常用的指令

基本指令

```bash
# 配置用户信息
git config --global user.name "jdy2002"
git config --global user.email "2475058223@qq.com"
# 获取全局配置项
git config --list --global
# 查看本地帮助手册
git help config
# 查看帮助
git config -h
# 初始化 git
git init
# 从工作区添加到暂存区
git add .
# 从暂存区添加到本地仓库
git commit -m "描述信息"
# 查看日志
git log # --pretty=online --all --graph
# 查看状态
git status
# 简短方式显示状态
git stauts -s
# 取消修改
git restore file
# 撤销文件修改
git checkout -- file
# 从暂存区里移除
git reset HEAD file(.)
# 版本回退
git reset --hard commitId
# 跳过暂存区直接把已跟踪文件提交到git仓库
git commit -a -m ""
# 移除工作区文件和仓库中的文件
git rm -f file
# 移除仓库中的文件
git rm --cached file
# 查看最近两条日志
git log -2
# 查看所有日志
git reflog --pretty=oneline
# 查看所有分支
git branch
# 创建分支
git branch a
# 切换分支
git checkout master
# 创建并切换分支
git checkout -b a
# 合并分支
git merge a
# 删除分支
git branch -d a
# 强制删除分支
git branch -D a
# 生成公钥
# ssh-keygen -t rsa # -b 4096 -C "你的邮箱"
ssh-keygen -t rsa -C "xxxx@xx.com"
# 查看公钥
cat ~/.ssh/id_rsa.pub
# 验证公钥
ssh -T git@gitee.com
# 添加到远程仓库
git remote add origin xxxxx.git
# 查看远程仓库
git remote
# 推送到远程仓库
git push origin master:master
# 查看本地分支和远程分支的关系
git branch -vv
# 推送到远程仓库并设置分支关联
git push --set-upstream origin master:master
# 直接推送
git push
# 查看远程仓库中的所有分支列表
git remote show origin
# 跟踪分支，从远程仓库中，把远程分支下载到本地仓库中
git checkout 远程仓库名称
# 从远程仓库中，把对应的远程分支下载到本地仓库，并把下载的本地分支进行重命名
git checkout -b 本地分支名称 远程仓库名称/远程分支名称
git checkout -b reg origin/register
# 从远程分支拉取代码
git pull
# 删除远程分支
git push origin --delete register
```

## 初始化仓库

已有仓库的情况下

```bash
# 本地仓库与远程仓库进行关联
git remote add origin https://github.com/Yu2002s/project01.git`
# 重命名分支
git branch -M main
# 第一次推送分支到远程仓库
# git push -u 远程仓库别名 本地分支名称:远程仓库名称
git push -u origin main:main
```

未创建仓库的情况下

```shell
# 初始化仓库
git init
# 添加到暂存区
git add .
# 提交
git commit -m "描述"
```

进入当前用户的`.ssh`文件夹，查看是否存在`id_rsa.pub`文件，文件内容就是密钥

```shell
# 检查ssh密钥
cd ~/.ssh
# 查看密钥文件
cat id_rsa.pub
```

## 生成 SSH 密钥

```shell
# 生成ssh密钥
ssh-keygen -t rsa -C "xxxx@xx.com"
```

## 一些可能出现的问题

### 解决无法连接到 github 问题

```shell
# 解决无法连接到github问题
git config --global http.sslVerify "false"
```

## 基本

> 生成公钥

```bash
# 生成公钥
# ssh-keygen -t rsa # -b 4096 -C "你的邮箱"
ssh-keygen -t rsa -C "xxxx@xx.com"
```

> 验证 ssh

```shell
ssh -t git@github.com
```

> 配置用户信息

```bash
# 配置用户信息
git config --global user.name= "jdy2002"  # 用户名
git config --global user.email="2475058223@qq.com" # 邮箱
```

> 获取全局配置

```bash
git config --list --global
```

> 初始化 git

```bash
# 初始化 git
git init
```

> 克隆指定分支到本地

```bash
git clone -b beanch_name xxxx.git
```

```shell
git config --global http.sslVerify "false"
```

## .gitignore

root/ 忽略当前路径下的 bin 文件夹，该文件夹下的所有文件都会被忽略，不忽略 bin 文件

/root 忽略根目录文件

\*.html 忽略制定后缀文件

!不忽略指定文件

\*\*/foo 忽略多级目录

index.html 忽略指定文件

## 暂存区

> 添加单个文件

```bash
git add index.html
```

> 添加多个文件

```bash
git add index.html index.css
```

> 添加目录

```bash
git add root
```

添加所有文件

```bash
git add .
```

## 提交

```bash
git commit -m "描述信息"
```

## 状态

```bash
git status
```

> 简短方式显示

```bash
git status -s
```

## 日志

> 提交日志

```bash
git log # --pretty=online --all --graph
```

> 操作日志

```bash
git reflog
```

## 恢复

> 取消修改

```bash
git restore index.html
```

版本回退

```bash
git reset --hard commitId
```

> 撤销修改

```bash
git revert commentId
```

## 差异

> 工作区和版本库的差异

```bash
git diff
```

## 分支

```shell
# 查看所有分支
git branch
# 切换并创建分支
git checkout -b xxx
# 删除本地分支
git branch -d xxx
```

> 列出本地所有分支

```shell
git branch
```

> 列出所有远程分支

```shell
git branch -r
```

> 列出本地分支和远程分支

```shell
git branch -a
```

> 新建一个本地分支

```shell
git branch [branch-name]
```

> 新建一个分支，并切换到该分支

```shell
git branch -b [branch]
```

> 新建一个分支，指向指定 comment

```shell
git branch [branch] [commit]
```

> 切换分支，并更新工作区

```shell
git checkout [branch]
```

> 合并分支

```
git merge [branch]
```

> 查看本地分支与远程分支的关联

```bash
git branch -vv
```

## 克隆

> 克隆远程仓库

```shell
git clone [url]
```

> 从指定远程分支克隆

```shell
git clone -b beanch_name xxxx.git
```

## 同步

> 显示所有远程仓库

```shell
git remote -v
```

> 显示某个远程仓库的信息

```shell
git remote show [remote]
```

> 添加一个新的远程仓库

```shell
git remote add [shortname] [url]
```

> 拉取远程仓库，并于本地仓库进行合并

```shell
git pull [remote] [branch]
```

> 允许不相关历史提交，并强制合并

```shell
git pull origin master --alow-unrelated-histories
```

> 上传本地指定分支到远程仓库

```shell
git push [remote] [branch]
```

> 强行推送当前分支到远程仓库

```shell
git push [remote] --force
```

> 推送所有分支到远程仓库

```shell
git push [remote] -all
```

> 推送到远程分支并与远程分支设置关联

```bash
git push --set-upstream origin  master:master
```

> 从远程仓库中，把对应远程分支下载到本地仓库，并把下载的分支进行重命名

```bash
git checkout -b [本地分支] [远程仓库]/[远程分支]
```

> 删除远程分支

```bash
git push origin --delete [branch]
```
