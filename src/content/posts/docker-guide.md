---
title: Docker 相关知识介绍
published: 2026-11-22
description: 一篇面向初学者的 Docker 系统入门指南，讲清镜像、容器、仓库三大核心概念，给出 Linux / Windows / macOS 安装方法与国内镜像加速配置，并汇总镜像、容器、数据卷、网络、Dockerfile、Docker Compose 的高频命令与安全实践，附完整实战流程。
image: ./images/docker-guide.avif
tags: [Docker, 容器, 运维, 入门教程, 命令速查]
category: 技术运维
slug: docker-guide
series: "容器技术"
seriesOrder: 1
draft: false
---

> [!NOTE] 摘要
> Docker 是现在做开发和部署绕不开的工具，它把应用连同依赖一起打包成**容器**，实现"一次构建，到处运行"。
>
> 这篇文章想按一条清晰的路径把 Docker 讲明白：先说清楚**镜像、容器、仓库**这三个核心概念和背后的底层原理（Namespace / cgroups / 联合文件系统），然后是 Linux、Windows、macOS 三平台的安装方法和**国内镜像加速配置**，再按场景把镜像、容器、数据卷、网络、Dockerfile、Docker Compose 的高频命令过一遍，最后补上多阶段构建、安全实践和实际工作流。读完就能上手把应用容器化。

> [!TIP] 阅读建议
> 这是一篇"概念 + 安装 + 命令速查"的综合指南。新手建议按顺序读前四章；已经有基础的，可以直接跳到[第六章命令速查](#六docker-命令速查)按需查。Podman、containerd、K8s 这些容器技术的横向对比见姊妹篇《Docker 及相关容器对比》。

## 目录

- [一、Docker 是什么](#一docker-是什么)
- [二、核心概念](#二核心概念)
- [三、安装方法](#三安装方法)
- [四、第一个容器实战](#四第一个容器实战)
- [五、Docker 工作原理](#五docker-工作原理)
- [六、Docker 命令速查](#六docker-命令速查)
- [七、Dockerfile 与镜像构建](#七dockerfile-与镜像构建)
- [八、Docker Compose 多容器编排](#八docker-compose-多容器编排)
- [九、安全与最佳实践](#九安全与最佳实践)
- [十、常见问题排查](#十常见问题排查)
- [资料来源](#资料来源)


---

## 一、Docker 是什么

Docker 是一个用于**构建、分发和运行容器**的开源平台。

要说清楚容器是什么，得先说它不是虚拟机。容器的本质是**加了隔离和资源限制的进程**——它靠 Linux 内核的 Namespace 做隔离、cgroups 限资源、联合文件系统分层存储，让应用在一个独立的"沙箱"里跑，却不用像虚拟机那样背一整套操作系统。

### 容器 vs 虚拟机

| 对比维度 | 容器 | 虚拟机 |
| --- | --- | --- |
| 架构 | 共享宿主机内核，无需 Guest OS | 每个 VM 含完整操作系统 |
| 启动速度 | 秒级甚至毫秒级 | 分钟级 |
| 体积 | MB 级 | GB 级 |
| 性能损耗 | 极低，接近原生 | 较高，需虚拟化层 |
| 隔离性 | 进程级隔离 | 硬件级强隔离 |
| 典型工具 | Docker、Podman | VMware、VirtualBox、KVM |

> [!IMPORTANT] 核心价值
> Docker 真正解决的不是"能不能运行"，而是"**在任何环境都能跑出一致的结果**"——开发、测试、生产用的是同一个镜像，"在我机器上是好的"这类问题从此少了很多。

---

## 二、核心概念

理解三个词，就理解了一半的 Docker。

### 镜像（Image）

镜像是**只读的模板**，里面打包了运行应用需要的一切：代码、运行时、依赖库、环境变量、配置文件。可以理解成容器的"安装包"或"快照"。

镜像采用**分层存储**，每一层都是对上一层的增量修改，多个镜像之间可以共享相同的层，空间省得很可观。

### 容器（Container）

容器是镜像的**运行实例**。镜像是静态定义，容器是动态执行。

每个容器有独立的可写层，对容器的修改不会影响镜像本身。同一个镜像可以同时启动多个互不干扰的容器——这也是它比虚拟机轻便的原因之一。

### 仓库（Repository / Registry）

仓库用来**存放和分发镜像**。最著名的公共仓库是 [Docker Hub](https://hub.docker.com)，此外还有 GitHub Container Registry（ghcr.io）、阿里云容器镜像服务等。国内拉 Docker Hub 通常需要配镜像加速（见[第三章](#三安装方法)）。

### 三者关系

```text
Dockerfile --build--> 镜像(Image) --run--> 容器(Container)
                        |                      |
                    push/pull               stop/start/rm
                        v
                    仓库(Registry)
```

---

## 三、安装方法

### 3.1 Linux（以 Debian / Ubuntu 为例）

官方一键安装脚本（最省事）：

```bash
curl -fsSL https://get.docker.com | bash
```

手动安装（更可控）：

```bash
# 卸载旧版本
sudo apt-get remove -y docker docker-engine docker.io containerd runc

# 安装依赖
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

# 添加官方 GPG 密钥与源
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

让普通用户也能用 Docker（加入 docker 组）：

```bash
sudo usermod -aG docker $USER
newgrp docker    # 或者重新登录一次
docker run hello-world
```

### 3.2 Windows / macOS

- 下载安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)，图形化装完就能用；
- Windows 需要启用 WSL 2（`wsl --install`），Docker Desktop 基于 WSL 2 运行 Linux 容器；
- macOS 同时支持 Intel 和 Apple Silicon（ARM）芯片，装对应版本即可。

### 3.3 国内镜像加速配置

国内拉 Docker Hub 镜像经常超时，编辑 `/etc/docker/daemon.json` 配加速器：

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.1panel.live",
    "https://docker.m.daocloud.io"
  ]
}
```

改完重启生效：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
docker info | grep -A 5 "Registry Mirrors"
```

> [!WARNING] 镜像源会失效
> 公益镜像加速地址变动频繁，建议配 2～3 个并用 `curl -I https://地址/v2/` 实测可用性；云厂商专属加速器需要登录控制台获取。更多可用源见姊妹篇《国内常用加速源 / 镜像源汇总》。

---

## 四、第一个容器实战

用一个 Nginx 容器把完整流程走一遍：

```bash
# 1. 拉取镜像
docker pull nginx:alpine

# 2. 查看本地镜像
docker images

# 3. 运行容器：后台运行、命名、映射 8080 端口
docker run -d --name my-nginx -p 8080:80 nginx:alpine

# 4. 查看运行中的容器
docker ps

# 5. 访问验证
curl http://localhost:8080

# 6. 查看日志
docker logs my-nginx

# 7. 进入容器
docker exec -it my-nginx sh

# 8. 停止并删除
docker stop my-nginx
docker rm my-nginx
```

> [!TIP] `docker run` 常用参数
> `-d` 后台运行 · `-it` 交互式终端 · `--name` 指定名称 · `-p` 宿主:容器 端口映射 · `-v` 挂载数据卷 · `-e` 设置环境变量 · `--restart=always` 自动重启。

---

## 五、Docker 工作原理

理解一次 `docker run nginx` 背后发生了什么：

```text
docker run nginx
      |
      v
Docker CLI --REST API--> Docker 守护进程(dockerd)
      |                       |
      |                  检查本地是否有镜像
      |                  没有则从 Registry 拉取
      |                       |
      |                       v
      |                  containerd（高层运行时）
      |                       |
      |                  准备文件系统、网络、隔离
      |                       |
      |                       v
      |                  runc（底层 OCI 运行时）
      |                       |
      |                  创建并启动容器进程
      v                       v
  命令行输出  <-----------  容器运行中
```

支撑这一切的是三大底层技术：

- **Namespace（命名空间）**：实现 PID、网络、文件系统、用户等维度的隔离，让容器"以为"自己独占整个系统；
- **cgroups（控制组）**：限制和监控 CPU、内存、磁盘 IO、网络带宽等资源用量；
- **联合文件系统（UnionFS）**：把多层镜像叠成一个统一视图，实现分层复用与写时复制（CoW）。

> [!NOTE] 容器不等于轻量虚拟机
> 容器共享宿主机内核，所以 Linux 容器没法直接跑在 Windows 内核上（Docker Desktop 靠 WSL 2 这层虚拟机实现）。这既是容器比虚拟机更轻快的原因，也是它的边界所在。

---

## 六、Docker 命令速查

### 6.1 镜像管理

```bash
docker pull nginx:latest               # 拉取镜像
docker images / docker image ls        # 列出本地镜像
docker build -t myapp:v1 .             # 用 Dockerfile 构建镜像
docker tag myapp:v1 user/myapp:latest # 打标签
docker push user/myapp:latest         # 推送到仓库
docker rmi nginx:latest               # 删除镜像
docker image prune -a                 # 清理所有未使用镜像
docker history nginx                  # 查看镜像分层历史
docker save nginx > nginx.tar         # 导出镜像为 tar
docker load < nginx.tar               # 从 tar 导入镜像
```

### 6.2 容器生命周期

```bash
docker run -d -p 8080:80 nginx         # 创建并后台运行
docker create --name web nginx        # 只创建不启动
docker start web                      # 启动已停止容器
docker stop web                       # 优雅停止（SIGTERM）
docker restart web                    # 重启
docker kill web                       # 强制停止（SIGKILL）
docker pause web / docker unpause web # 暂停 / 恢复
docker rm web                         # 删除已停止容器
docker rm -f web                      # 强制删除运行中容器
docker rename web web2                # 重命名
```

### 6.3 容器查看与调试

```bash
docker ps                             # 查看运行中容器
docker ps -a                          # 查看所有容器（含已停止）
docker logs -f web                    # 实时跟踪日志
docker inspect web                    # 查看容器详细信息（JSON）
docker stats                          # 实时资源占用（CPU/内存/网络）
docker top web                        # 查看容器内进程
docker port web                       # 查看端口映射
docker diff web                       # 查看文件系统改动
```

### 6.4 容器内执行与文件拷贝

```bash
docker exec -it web sh                # 进入容器开 shell
docker exec web ls /                  # 在容器内执行单条命令
docker exec -u root web cmd           # 指定用户执行
docker cp web:/etc/nginx/nginx.conf ./ # 从容器拷出文件
docker cp ./app.conf web:/etc/         # 拷入容器
```

### 6.5 数据卷（持久化存储）

容器默认的可写层会随容器一起删除，要留住数据必须用数据卷。

```bash
docker volume create mydata           # 创建命名卷
docker volume ls                      # 列出数据卷
docker volume inspect mydata          # 查看详情
docker volume rm mydata               # 删除数据卷
docker volume prune                   # 清理未使用卷

# 使用方式一：命名卷（推荐）
docker run -d -v mydata:/var/lib/mysql mysql:8

# 使用方式二：绑定宿主机目录（开发常用）
docker run -d -v $(pwd):/app nginx

# 使用方式三：tmpfs 内存挂载
docker run --tmpfs /tmp nginx
```

> [!TIP] 命名卷 vs 绑定挂载
> **命名卷**由 Docker 管理，位置和系统无关，适合生产环境；**绑定挂载**直接映射宿主机路径，方便本地开发时实时同步代码。

### 6.6 网络

```bash
docker network ls                     # 列出网络
docker network create mynet           # 创建自定义网络
docker network inspect mynet          # 查看网络详情
docker run --network mynet --name app1 nginx   # 指定网络运行
docker network connect mynet app2      # 将容器接入网络
docker network disconnect mynet app2   # 断开网络
docker network rm mynet               # 删除网络
```

> [!NOTE] 为什么用自定义网络
> 默认 bridge 网络里的容器只能通过 IP 互相访问；自定义网络内置 DNS，容器之间可以**直接用容器名找到对方**，这也是 Compose 多容器协作的基础。

### 6.7 系统清理

```bash
docker system df                      # 查看磁盘占用
docker system prune                   # 清理停止容器、无用网络、悬空镜像
docker system prune -a                # 清理所有未使用资源（含镜像，谨慎）
docker container prune                # 删除所有停止的容器
docker image prune -a                 # 删除所有未使用镜像
docker network prune                  # 清理未使用网络
```

> [!CAUTION] 清理需谨慎
> `docker system prune -a` 会删掉所有没被容器使用的镜像，执行前确认没有需要留着的，不然还得重新拉一遍。

### 6.8 仓库登录

```bash
docker login                          # 登录 Docker Hub
docker login registry.example.com     # 登录私有仓库
docker logout                         # 退出登录
docker search nginx                   # 搜索镜像
```

---

## 七、Dockerfile 与镜像构建

Dockerfile 是构建镜像的"配方文件"，用一条条指令描述镜像该怎么生成。

### 7.1 常用指令

```dockerfile
FROM node:22-alpine          # 指定基础镜像
WORKDIR /app                 # 设置工作目录
COPY package*.json ./        # 复制文件
RUN npm ci --only=production # 构建时执行命令
COPY . .                     # 复制全部源码
EXPOSE 3000                  # 声明服务端口（仅文档作用）
ENV NODE_ENV=production      # 设置环境变量
ARG VERSION=1.0              # 构建期变量
USER node                    # 指定运行用户
CMD ["node", "server.js"]    # 容器默认启动命令（可被覆盖）
ENTRYPOINT ["node"]          # 固定入口命令（不易被覆盖）
```

### 7.2 CMD 与 ENTRYPOINT 的区别

- `CMD` 定义默认命令，运行时指定的命令会**覆盖**它；
- `ENTRYPOINT` 把命令设成固定入口，运行时传入的参数会**追加**到它后面；
- 两者通常配合使用：`ENTRYPOINT` 定可执行程序，`CMD` 定默认参数。

### 7.3 多阶段构建（减小镜像体积）

```dockerfile
# 构建阶段
FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# 运行阶段：只拷贝构建产物
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### 7.4 优化技巧

> [!TIP] 构建提速三招
> 1. **用好层缓存**：先 `COPY package*.json` 再 `RUN npm install`，最后才 `COPY . .`，这样代码变动时依赖层不用重建；
> 2. **加 `.dockerignore`**：排除 `node_modules`、`.git`、日志、`.env`，构建上下文能小一大截；
> 3. **选小基础镜像**：优先 `-alpine` 或 `-slim`，体积和攻击面都小很多。

---

## 八、Docker Compose 多容器编排

Compose 用一个 YAML 文件定义和管理多个容器（服务），本地开发和小型部署特别顺手。

### 8.1 compose.yaml 示例

```yaml
services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://db:5432/app
    depends_on:
      - db
    volumes:
      - ./app:/app

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine

volumes:
  postgres_data:
```

### 8.2 常用命令

```bash
docker compose up -d              # 后台创建并启动所有服务
docker compose down               # 停止并移除容器与网络
docker compose down -v            # 同时删除数据卷（危险）
docker compose ps                 # 查看服务状态
docker compose logs -f web        # 跟踪某个服务的日志
docker compose exec web sh        # 进入服务容器
docker compose build              # 构建服务镜像
docker compose pull               # 拉取服务镜像
docker compose restart            # 重启所有服务
docker compose config             # 校验并渲染配置
```

> [!NOTE] compose 与 docker-compose
> 新版 Docker 用插件形式 `docker compose`（空格），旧版是独立二进制 `docker-compose`（连字符）。本文统一用新写法。

---

## 九、安全与最佳实践

1. **用官方或可信镜像**：优先官方镜像和 `-alpine` / `-slim` 小镜像，减少攻击面；
2. **别用 root 跑**：在 Dockerfile 里用 `USER` 切到非 root 用户；
3. **敏感信息不要写进镜像**：密钥、Token 用环境变量文件或 Docker Secrets 注入，`.env` 记得加进 `.dockerignore`；
4. **定期扫漏洞**：用 `docker scan` 或 Trivy 之类的工具检查镜像安全；
5. **限制容器资源**：用 `--memory`、`--cpus` 限制用量，防止单个容器把宿主机资源吃干；
6. **谨慎挂载 Docker Socket**：挂载 `/var/run/docker.sock` 基本等同于给了容器宿主机 root 权限；
7. **保持更新**：及时升级 Docker 和镜像，修掉已知漏洞。

```bash
# 限制资源示例
docker run -d --memory=512m --cpus=1 nginx
```

---

## 十、常见问题排查

| 现象 | 可能原因 | 排查方法 |
| --- | --- | --- |
| 拉取镜像超时 | 未配置镜像加速 / 网络问题 | 配置 `registry-mirrors`，`curl -I` 测试连通性 |
| 端口访问不通 | 端口未映射 / 防火墙拦截 | `docker ps` 看端口、`docker port` 确认、`ss -tulnp` 检查监听 |
| 容器反复重启 | 应用启动失败 | `docker logs 容器名` 查看报错 |
| 数据丢失 | 未使用数据卷 | 用 `-v` 挂载卷或目录持久化 |
| 磁盘爆满 | 大量无用镜像 / 容器 | `docker system df` 查看，`docker system prune` 清理 |
| 权限被拒绝 | 用户不在 docker 组 | `sudo usermod -aG docker $USER` 后重新登录 |
| 容器内中文乱码 | 缺少语言环境 | 设置 `ENV LANG=C.UTF-8` |

> [!WARNING] 免责声明
> 本文为个人技术学习记录，命令与配置请以官方文档为准；容器技术涉及系统底层，生产环境操作前请先备份、并在测试环境验证，由此产生的风险由使用者自行承担。

---

## 资料来源

> [!NOTE] 说明
> 以下为编写本文时参考的公开资料，Docker 版本持续迭代，具体命令与参数请以官方文档为准。

1. [Docker Cheatsheet（Linuxize，2026）](https://linuxize.com/cheatsheet/docker/)
2. [Docker Tutorial for Beginners: Complete Step by Step Guide 2026](https://significanttechno.com/docker-tutorial-for-beginners-complete-step-by-step-guide-2026)
3. [All Docker Commands Explained with Examples (2026 Complete Reference)](https://blogs.hritikranjan.in/docker-commands-cheat-sheet)
4. [Complete Docker Tutorial 2026 - Beginner to Advanced](https://shifttotech.co.in/blog/complete-docker-tutorial-2025)
5. [Docker 官方文档：Get Started / Dockerfile / Compose](https://docs.docker.com/)
