---
title: Linux / Windows 一键部署 & 运维命令合集
published: 2026-11-21
description: 一份面向服务器部署与日常运维场景的命令速查手册，涵盖 Linux 包管理、网络下载、文件权限、系统监控、管道重定向与 Shell 语法，并整理十余种一键部署脚本、生产高频组合命令与 Windows PowerShell 常用运维命令，随查随用。
image: ./images/ops-commands.avif
tags: [Linux, Windows, 运维, 部署命令, 速查表]
category: 技术运维
slug: ops-commands
series: "运维实践"
seriesOrder: 1
draft: false
---

> [!NOTE] 摘要
> 这份合集是我自己在折腾服务器时一点点攒下来的。现在网上关于 Linux 命令的教程要么太浅，要么长到看不下去，真正用得上的往往就那么几十条。与其每次排查时到处翻，不如整理成一份能随手翻的手册——按场景分类，命令后面直接跟解释，需要的时候瞄一眼就知道该敲什么。
>
> 覆盖范围大致是：Debian / Ubuntu 的包管理、网络下载、文件权限与目录操作、系统信息与性能监控、管道重定向和 Shell 特殊符号，之后是一键部署脚本合集、生产环境常用组合命令、Windows PowerShell 对照，最后给出一套我排查问题时的固定顺序。
>
> 一句话提醒：**每条命令执行前都先看懂它要干什么**，尤其是带 `rm`、`curl | bash` 的。

> [!CAUTION] 安全提示
> 直接执行远程脚本是有风险的。养成一个习惯：先单独跑 `curl -Ls 链接` 把源码打出来看一遍，确认没问题再执行。另外不少脚本托管在 GitHub，国内机器直连大概率超时，必要时可以配合镜像加速。

## 目录

- [一、基础包管理（Debian / Ubuntu）](#一基础包管理debian--ubuntu)
- [二、网络下载相关](#二网络下载相关)
- [三、文件权限与执行](#三文件权限与执行)
- [四、文件与目录基础操作](#四文件与目录基础操作)
- [五、系统信息查看与性能监控](#五系统信息查看与性能监控)
- [六、管道与重定向语法](#六管道与重定向语法)
- [七、Shell 特殊符号速查](#七shell-特殊符号速查)
- [八、一键部署命令合集](#八一键部署命令合集)
- [九、生产高频组合命令](#九生产高频组合命令)
- [十、Windows PowerShell 常用运维命令](#十windows-powershell-常用运维命令)
- [十一、运维排查标准思路](#十一运维排查标准思路)
- [十二、补充说明](#十二补充说明)
- [资料来源](#资料来源)


---

## 一、基础包管理（Debian / Ubuntu）

服务器上装东西基本绕不开 `apt`，先把它和几个高频命令理清楚。

### `apt update`

```bash
apt update
```

更新软件源索引，把每个源里可用的软件包版本信息拉一份本地下来。**它本身不会升级任何软件**，只是刷新一下"仓库里现在有什么"的清单。装新东西前先跑这条，否则很可能装到旧版本。

### `apt upgrade`

```bash
apt upgrade -y
```

真正执行升级，把已安装且有新版的包更新过去。`-y` 是替你把确认提示全按了 yes。

一句话区分：`update` 更新索引，`upgrade` 更新软件。

### `apt install / remove`

```bash
apt install -y sudo curl unzip
apt remove -y 包名          # 卸载，但保留配置文件
apt purge -y 包名           # 连配置文件一起删
apt autoremove -y           # 清理已经没谁依赖的孤儿包
```

`remove` 和 `purge` 的区别值得记一下：配置文件里往往有你自己改过的内容，用 `remove` 留着，万一要回滚还能捡回来。

### `apt search / list`

```bash
apt search 关键词            # 搜包名
apt list --upgradable        # 看哪些可以升级
```

### `sudo`

```bash
sudo apt update
```

临时借用 root 权限执行一条命令。普通用户默认不能改系统，需要先把用户加进 sudo 授权列表。

### 常见发行版包管理器对照

换台机器就得换套命令，记一张表省事：

| 发行版 | 包管理器 | 安装命令 | 更新索引 |
| --- | --- | --- | --- |
| Debian / Ubuntu | apt | `apt install -y 包名` | `apt update` |
| CentOS / Rocky | yum / dnf | `dnf install -y 包名` | `dnf makecache` |
| Arch / Manjaro | pacman | `pacman -S 包名` | `pacman -Syu` |
| Alpine | apk | `apk add 包名` | `apk update` |

Alpine 特别说明一下：它是 musl libc 而不是 glibc，容器里很常见，但有些二进制程序跑不起来，选镜像时要留意。

---

## 二、网络下载相关

### `curl`

```bash
curl [选项] 网址
```

服务器上用得最多的下载工具，参数组合也最多：

| 参数 | 作用 |
| --- | --- |
| `-s` | 静默模式，关闭进度输出 |
| `-S` | 配合 `-s`，出错时仍然输出报错信息 |
| `-L` | 自动跟随 HTTP 重定向 |
| `-f` | 请求失败返回错误码，不输出服务端错误页面 |
| `-o` | 保存为指定文件名 |
| `-O` | 按 URL 里的文件名保存 |
| `-I` | 只请求响应头，用来探测连通性 |
| `-C -` | 断点续传 |
| `-H` | 自定义请求头 |
| `-X` | 指定请求方法（POST / PUT 等） |

几个实际用得多的组合：

```bash
curl -sSL https://example.com -o file.txt       # 静默跟随重定向并保存
curl -I -m 10 https://example.com               # 10 秒超时，只看响应头
curl -X POST -d "key=value" https://api.xxx.com # 发 POST
```

排查网络时 `-I` 特别顺手，一眼就能看出是 DNS 不通、连接被拒还是返回了错误状态码。

### `wget`

```bash
wget [选项] 网址
```

另一个经典选择，跟 `curl` 的定位略有不同：它更擅长直接下文件到本地，断点续传和后台下载是内置的。

```bash
wget -c https://example.com/bigfile.zip         # 断点续传
wget -b https://example.com/bigfile.zip         # 后台下载，日志写到 wget-log
wget -O newname.zip https://example.com/file    # 指定保存的文件名
```

---

## 三、文件权限与执行

### `chmod +x`

```bash
chmod +x ecs.sh
```

给文件加上可执行位。Linux 下脚本必须带执行位才能直接 `./xxx.sh` 跑起来，缺了它会直接报 Permission denied。

### `chmod 755`

```bash
chmod 755 ecs.sh
chmod 644 config.txt
```

三位数字依次代表**所有者 / 所属组 / 其他用户**，每位是 `r(4) + w(2) + x(1)` 相加：

| 数字 | 权限 | 含义 |
| --- | --- | --- |
| `7` | rwx | 读、写、执行 |
| `6` | rw- | 读、写 |
| `5` | r-x | 读、执行 |
| `4` | r-- | 只读 |

`755` 给脚本和目录，`644` 给普通配置文���——这两个基本够用。特别提醒一句，**别图省事写 `777`**，那等于把文件对所有人开放读写。

### `chown`

```bash
chown nginx:nginx /var/log/nginx     # 改属主和属组
chown -R www:www /data/www           # -R 递归改整个目录
```

服务启动报 "Permission denied" 时，十有八九是文件属主不对，用它改回来。

---

## 四、文件与目录基础操作

### `ls`

```bash
ls -la
ls -lh          # 人性化显示文件大小
ls -lt          # 按修改时间倒序，快速找最新文件
```

`-l` 是长格式，会带出权限、属主、大小、修改时间；`-a` 把 `.` 开头的隐藏文件也显示出来。`-lt` 组合在一起在排查"刚才是什么改了这个文件"时特别有用。

### `pwd` / `cd`

```bash
pwd             # 打印当前目录的完整路径
cd ~            # 回到用户家目录
cd -            # 返回上一个目录
```

`cd -` 这个功能知道的人不多，但在多层目录里来回跳的时候能省不少事。

### `mkdir`

```bash
mkdir testdir
mkdir -p a/b/c
```

`-p` 会递归创建多级目录，而且目录已经存在时不报错——这个特性让脚本可以放心重复执行。

### `cp` / `mv` / `touch`

```bash
cp -r /源目录 /目标目录         # 递归复制文件夹，备份配置常用
mv 旧文件名 新文件名            # 重命名
mv 文件 /目标路径              # 移动文件
touch newfile.txt              # 创建空文件 / 更新时间戳
```

### `rm`

```bash
rm file.txt
rm -rf dirname
```

`-r` 递归删目录，`-f` 强制删且不提示。

`rm -rf` 是**高危命令**，没有撤销机制。我的习惯是：先 `ls` 一遍确认路径，再敲删除；路径里能带变量的时候（比如 `rm -rf $VAR/`）格外小心，宁可多打几个字写全路径。

### `unzip` / `tar`

```bash
unzip file.zip                  # 解压 zip
tar -czf archive.tar.gz dir/    # 打包并 gzip 压缩
tar -xzf archive.tar.gz         # 解包
tar -tzf archive.tar.gz         # 只看内容不解包
```

`tar` 记住两组组合就够用了：`czf` 打包、`xzf` 解包。`-t` 那个"只看不解"在不知道包里有什么时特别有用。

### `cat` / `less` / `head`

```bash
cat file.txt                    # 一次性输出全部，适合小文件
less access.log                 # 分页看大日志，可以搜索（q 退出）
head -n 20 file.log             # 看前 20 行
```

日志文件别用 `cat`，用 `less`。

### `grep`

```bash
grep "关键词" file.log
grep -i "error" log.txt         # -i 忽略大小写
grep -v "info" log.txt          # -v 反向过滤，把正常信息排掉
grep "error" -rn /var/log/      # -r 递归搜目录，-n 显示行号
```

`-A` 和 `-B` 也很常用，分别显示匹配行之后和之前的内容，配合上下文看问题。

### `tail -f`

```bash
tail -f /var/log/syslog         # 实时跟踪日志新增内容
tail -n 200 error.log           # 看最后 200 行
```

服务出问题时挂着这个窗口看，比反复 `cat` 省事得多。`Ctrl + C` 退出。

### `find` / `du`

```bash
find /var/log -name "*.log"     # 按名称查找
find /data -mtime +7 -delete    # 删除 7 天前的文件，定时清理常用
find . -size +100M              # 找大于 100M 的文件
du -sh /var/log/* | sort -rh    # 统计目录大小并排序，定位大文件
```

最后那条是排查磁盘满的第一反应命令。

---

## 五、系统信息查看与性能监控

### `uname -a`

```bash
uname -a
```

输出内核版本、系统版本和 CPU 架构。下载安装包之前跑一下，就知道该拿 x86 的还是 ARM 的。

### `df -h` / `free -h`

```bash
df -h                           # 磁盘分区占用，-h 转成 GB/MB
free -h                         # 物理内存与 Swap 占用
du -sh /*                       # 根目录下各目录占用
```

### `uptime` / `top` / `htop`

```bash
uptime                          # 开机时长与 1/5/15 分钟平均负载
top                             # 实时看进程 CPU、内存占用
htop                            # top 的增强版，彩色界面、支持鼠标
```

机器卡的时候，我基本是 `uptime` 和 `top` 一起看：先看负载趋势，再判断是 CPU 打满还是内存不够。`top` 里按 `P` 按 CPU 排序、按 `M` 按内存排序，几秒就能揪出吃资源的进程。

### `ps` / `kill`

```bash
ps -ef | grep nginx             # 查看指定服务的进程
ps aux                          # 全部进程，带 CPU / 内存占比
kill -15 PID                    # 优雅终止，等程序收尾
kill -9 PID                     # 强制杀，仅在进程卡死时用
```

`-15` 是 SIGTERM，程序会收到信号后自己做清理（关连接、刷数据）。`-9` 是 SIGKILL，直接 SIGKILL 掉，程序没机会善后。**默认用 `-15`**，实在不行再上 `-9`。

### `ss` / `ip` / `ping`

```bash
ss -tulnp                       # 监听端口与对应进程，比 netstat 快
netstat -tulpn                  # 老系统兼容写法
ip a                            # 查看网卡 IP
ip route                        # 查看路由表
ping -c 4 example.com           # 测连通性和丢包
```

### `journalctl`

```bash
journalctl -u nginx -f          # 实时看某个 systemd 服务的日志
journalctl -xe                  # 最近的系统错误日志
```

服务起不来的时候，`journalctl -u 服务名` 基本能直接看到报错原因。

### 其他性能工具

```bash
vmstat 1                        # CPU、内存、IO、上下文切换
iostat -x 1                     # 磁盘 IO 利用率与等待时间
lsof -i :80                     # 谁占着 80 端口
dig example.com                 # 详细 DNS 解析查询
tcpdump -i eth0 port 80         # 抓包排查网络问题
```

---

## 六、管道与重定向语法

### `|` 管道符

```bash
ps aux | grep bash
```

把前一条命令的输出交给后一条当输入，把几件事串起来处理。

### `>` 覆盖输出

```bash
echo "test" > log.txt
```

写入文件，**直接覆盖原有内容**。

### `>>` 追加输出

```bash
echo "test" >> log.txt
```

追加到末尾，不覆盖。日志文件用这个，不然每跑一次前面的记录就没了。

### `2>&1`

```bash
command > output.log 2>&1
```

标准错误（stderr，编号 2）重定向到标准输出（stdout，编号 1），正常信息和报错一起写进日志。

### `<` 输入重定向

```bash
bash < install.sh
```

把文件内容作为命令输入。

### `tee`

```bash
command | tee output.log        # 屏幕上显示的同时写入文件
command | tee -a output.log     # -a 追加模式
```

既想看输出又想留一份，`tee` 是标准答案。

### `xargs`

```bash
cat urls.txt | xargs -n 1 curl -O    # 每行内容作为参数逐个传给 curl
find . -name "*.log" | xargs rm -f   # 批量删除查找结果
```

把管道输出转成命令参数，通常跟 `find`、`grep` 搭配做批量操作。

---

## 七、Shell 特殊符号速查

| 符号 | 作用 |
| --- | --- |
| `&` | 放到命令末尾，程序转入后台运行 |
| `&&` | 前一条成功才执行下一条 |
| `\|\|` | 前一条失败才执行下一条 |
| `;` | 连续执行多条，不管前面有没有报错 |
| `$()` | 命令替换，捕获命令返回结果 |
| `<( )` | 进程替换，生成临时伪文件 |
| `*` | 通配符，匹配任意字符 |
| `?` | 通配符，匹配单个字符 |
| `~` | 当前用户家目录 |
| `$?` | 上一条命令的退出状态码（0 表示成功） |

`&&` 和 `;` 的区别在写部署脚本时经常用到：`apt update && apt install -y xxx` 在更新失败时就不会继续装东西，比用 `;` 安全。

---

## 八、一键部署命令合集

> [!WARNING] 执行前须知
> 下面的命令都会下载并直接运行第三方脚本，请先在测试机上验证一遍。GitHub 直连经常超时，可以配合前面提到的镜像加速方式；大部分命令需要 root 权限。

### 面板管理类

**1Panel**

```bash
bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/v2/quick_start.sh)"
```

`curl -sSL` 静默跟随重定向把官方安装脚本拉下来，`$()` 捕获内容交给 `bash -c` 执行。

**3x-ui**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/mhsanaei/3x-ui/master/install.sh)
```

从 GitHub 取脚本直接跑，部署管理面板。

**s-ui**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/alireza0/s-ui/master/install.sh))
```

同上，拉取 s-ui 安装脚本完成部署。

**彩虹 DNS 管理器**

```bash
docker run -d \
  --name dnsmgr-web \
  -p 8081:80 \
  -v ./web:/app/www \
  -i -t \
  netcccyun/dnsmgr
```

`\` 是续行符，让长命令能分行写；`--name` 指定容器名；`-p 8081:80` 把宿主机 8081 映射到容器 80；`-v` 挂载网页目录；`-i -t` 分配终端。

### 容器部署类

**Docker（走国内镜像）**

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```

`<( )` 进程替换，把下载的脚本当成临时文件交给 bash，通过国内镜像源装 Docker。

**subconverter**

```bash
docker run -d --restart=always -p 25500:25500 asdlokj1qpi23/subconverter:latest
```

`-d` 后台运行，`--restart=always` 异常退出或开机自动重启，`-p` 端口映射。

**substore**

```bash
docker run -it -d --restart=always \
  -e "SUB_STORE_CRON=50 23 *" \
  -e SUB_STORE_FRONTEND_BACKEND_PATH=/substore \
  -p 3008:3001 \
  -v /etc/sub-store:/opt/app/data \
  --name Sub2Store xream/sub-store:latest
```

`-e` 注入环境变量（这里用来配定时任务和访问路径），`-v` 挂载数据卷持久化配置，`--name` 自定义容器名。

> [!TIP] Docker 常用参数小结
> `-d` 后台运行 · `-p` 端口映射 · `-v` 数据持久化挂载 · `-e` 环境变量 · `--restart=always` 自动重启 · `--name` 指定容器名。

### 网络与检测类

**UDP 转发**

```bash
iptables -t nat -A PREROUTING -p udp --dport 58000:60000 -j REDIRECT --to-ports 20001
ip6tables -t nat -A PREROUTING -p udp --dport 58000:60000 -j REDIRECT --to-ports 20001
```

`-t nat` 指定 nat 表，`-A PREROUTING` 在数据包进主机前处理，`-p udp` 匹配 UDP 协议，`--dport 58000:60000` 匹配端口范围，`-j REDIRECT --to-ports 20001` 重定向到 20001。第二条是 IPv6 版本。

**UDP 转发持久化**

```bash
apt-get install -y iptables-persistent
```

装上这个工具，iptables 规则重启后能自动加载，不然转发规则每次重启都没了。

**IP / 网络 / 硬件质量检测**

```bash
bash <(curl -Ls https://Check.Place) -I    # IP 质量检测
bash <(curl -Ls https://Check.Place) -N    # 网络质量检测
bash <(curl -Ls https://Check.Place) -H    # 硬件质量检测
```

同一个脚本用不同参数跑不同的检测项。

### 其他工具

**OpenWrt OpenClash 自动安装**

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/slobys/openclash-auto-installer/main/menu.sh)"
```

`curl` 取内容，命令替换交给 `sh -c` 执行。

**DSH 启动**

```bash
npx @deepseek-ai/dsh web
```

`npx` 是 Node.js 自带的工具，不用全局装包，直接拉下来跑起 Web 界面。

**mili**

```bash
bash <(curl -Ls https://raw.githubusercontent.com/baoweise-bot/aimili-vpngate/main/install.sh)
```

**科技 lion 工具箱**

```bash
bash <(curl -sL kejilion.sh)
```

静默跟随重定向下载脚本，一键启动。

---

## 九、生产高频组合命令

单条命令效率有限，组合起来才是提效的关键。下面这些可以直接复制：

```bash
# 查找目录下的大文件并按大小排序
du -sh /data/* | sort -rh | head -20

# 实时监控日志中的报错
tail -f error.log | grep "Exception"

# 统计 Nginx 日志中访问 IP 的 Top 10
awk '{print $1}' nginx.log | sort | uniq -c | sort -nr | head -10

# 统计今日错误日志行数
grep "error" app.log | grep "$(date +%Y-%m-%d)" | wc -l

# 批量终止指定进程（优雅退出）
ps -ef | grep java | grep -v grep | awk '{print $2}' | xargs kill -15

# 查看监听端口及对应进程
ss -tulpn | grep -E ':80|:443'

# 同步并清理系统缓存（内存紧张时临时应急）
sync && echo 3 > /proc/sys/vm/drop_caches
```

其中 `grep -v grep` 那一行值得单独说：管道里 `grep java` 会把 grep 自己那条命令也匹配上，用 `-v grep` 把它滤掉，拿到的才是干净的进程列表。

---

## 十、Windows PowerShell 常用运维命令

手上如果有 Windows 服务器，等价的操作在 PowerShell 里基本都有。

### 基础网络与下载

```powershell
irm https://example.com/script.ps1 | iex        # 下载远程脚本并立即执行
Invoke-WebRequest -Uri 网址 -OutFile 文件        # 下载文件（别名 wget / curl）
Test-NetConnection 主机 -Port 端口              # 测试端口连通性
```

`irm`（`Invoke-RestMethod`）下载，`iex`（`Invoke-Expression`）执行——和 Linux 的 `curl | bash` 是一个套路，风险也一样，务必先预览源码。

### 进程与服务

```powershell
Get-Process                                    # 查看进程
Stop-Process -Name 进程名 -Force               # 终止进程
Get-Service                                    # 查看服务
Start-Service 服务名 / Stop-Service 服务名      # 启停服务
```

### 端口与文件

```powershell
netstat -ano | findstr :8080                   # 查看端口占用
Get-ChildItem                                  # 列出目录（别名 ls / dir）
Copy-Item / Move-Item / Remove-Item            # 复制 / 移动 / 删除
```

### PhoneBox Windows 启动

```powershell
irm https://raw.githubusercontent.com/ersinkoc/phonebox/main/setup.ps1 | iex
```

---

## 十一、运维排查标准思路

单条命令会背了，遇到问题还是容易乱。真正管用的是一套固定顺序——我排查时基本按这个走：

> [!IMPORTANT] 排查六步法
> **看系统状态** → **查磁盘内存** → **看进程占用** → **分析日志报错** → **排查网络连通** → **修复问题**

1. **看负载**：`uptime`、`top` 确认 1/5/15 分钟负载趋势，判断是 CPU 还是内存吃紧；
2. **查磁盘内存**：`df -h`、`free -h`、`du -sh` 逐层下钻，定位满盘或内存不足；
3. **看进程**：`ps -ef`、`ss -tulpn` 确认进程在不在、端口监听是否正常；
4. **分析日志**：`tail -f` 跟实时输出，`grep` 配合 `-A/-B` 看上下文，`journalctl -u` 看服务日志；
5. **排查网络**：`ping`、`curl -I`、`nc -zv` 逐层确认连通性，`dig` 查 DNS；
6. **修复验证**：改配置后重启服务，再用上面的命令确认问题是否真的解决了。

顺序不能乱：跳过第 1 步直接看日志，往往是在错的方向上耗时间。

---

## 十二、补充说明

1. **安全优先**：执行远程脚本前，先 `curl -Ls 链接` 预览源码。
2. **网络问题**：GitHub 直连经常超时，可以配合镜像加速（见《国内常用加速源 / 镜像源汇总》）。
3. **权限**：大部分部署命令需要 root，普通用户记得加 `sudo`。
4. **备份先行**：改 `/etc` 下的配置前先备份一份，出问题能快速回滚。
5. **理解再执行**：`rm -rf`、`chmod -R 777`、`dd` 这类命令破坏性极强，敲回车前多看一眼路径。

> [!WARNING] 免责声明
> 本文仅作为技术学习记录，不保证脚本安全；部分内容仅限个人测试，请遵守当地法律法规，使用相关命令与脚本产生的风险由使用者自行承担。

---

## 资料来源

> [!NOTE] 说明
> 以下为编写本文时参考的公开资料，部分为第三方站点，内容与链接可能随时间变化，请以各项目官方文档为准。

1. [【干货收藏】最全 50 个常用 Linux 命令汇总](https://didiplus.blog.csdn.net/article/details/148717287)
2. [Linux 运维岗位从零起步要掌握哪些核心命令](https://m.zpedu.com/it/gjrz/48978.html)
3. [Linux 常用运维工具大全（日常排查 / 监控 / 网络 / 磁盘 / 进程）](https://www.cnblogs.com/gougou1981/p/22562096)
4. [Linux 运维高频命令大全：一线工程师日常排查必备](http://mp.weixin.qq.com/s?__biz=MzkwNTYxNTQ2NA==&mid=2247484381&idx=1&sn=9c438c5a54d5e9b1a54b262f19afd006&chksm=c1ea7ab00f7b8f68b24dc8718d437e128d5f9707f462a124b5b5fd2bac7f62bc41d0f6a3aab1#rd)
5. [Must-Know Linux Commands and Tools: The Complete Reference](https://kwikserver.com/tutorials?p=1945)
6. [GNU Bash / Coreutils 等命令手册（man pages）](https://www.gnu.org/software/coreutils/manual/)
