---
title: 国内常用加速源 / 镜像源汇总（2026 收藏版）
published: 2026-11-21
description: 按用途汇总 2026 年国内可用的公益加速代理与官方镜像站，覆盖 jsDelivr CDN、Gravatar 头像、GitHub 文件下载、Hugging Face 模型、Docker 容器镜像以及 apt / pip / npm 包管理器，并附选型建议与连通性探测方法，适合开发、运维和博客建设时快速切换备用。
image: ./images/mirror-sources.avif
tags: [镜像源, 加速源, GitHub, Docker, 开发工具, 收藏]
category: 技术运维
slug: china-mirror-sources
series: "运维实践"
seriesOrder: 2
draft: false
---

> [!NOTE] 摘要
> 在国内访问 GitHub、Docker Hub、Hugging Face、Gravatar、npm、PyPI 这些站点，超时、龟速甚至直接打不开都很常见。折腾久了就会发现，这类问题基本都能靠"换个加速代理"绕过去。
>
> 本文按用途把常见的加速方案分成六类整理：静态资源 CDN、头像代理、GitHub 文件下载、模型仓库、容器镜像、系统包管理器，另外补充了 GitHub 全场景加速方案、连通性探测方法和选型建议。适合开发、服务器运维和博客搭建时快速切换备用。
>
> 先说一句实话：下面除高校和云厂商的官方镜像站外，多数是**社区公益服务**，随时可能限流、宕机或换域名。收藏起来当备用就好，别当唯一选项。

> [!CAUTION] 重要风险提示
>
> - 文中多数为**社区公益第三方服务**，非官方运营，随时可能限流、宕机、更换域名或停止维护；
> - 公益代理只适合转发**公开资源**，禁止在里面传 Token、Cookie、账号密码、私有仓库地址等敏感凭据；
> - 生产环境和正式业务优先用云厂商官方专属镜像，别把公益域名硬编码进长期脚本；
> - 用之前先 `curl` 测一下连通性和返回状态，失效了就及时换；镜像站只用来下载和浏览，**不要在上面登录账号**。

## 目录

- [一、jsDelivr 静态资源 CDN 加速](#一jsdelivr-静态资源-cdn-加速)
- [二、Gravatar 头像镜像](#二gravatar-头像镜像)
- [三、GitHub 文件 / Release 代理加速](#三github-文件--release-代理加速)
- [四、GitHub 全场景加速方案](#四github-全场景加速方案)
- [五、Hugging Face 模型仓库镜像](#五hugging-face-模型仓库镜像)
- [六、Docker 容器镜像加速](#六docker-容器镜像加速)
- [七、系统与包管理器国内镜像](#七系统与包管理器国内镜像)
- [八、典型使用示例](#八典型使用示例)
- [九、镜像源连通性探测](#九镜像源连通性探测)
- [十、使用建议与注意事项](#十使用建议与注意事项)
- [资料来源](#资料来源)


---

## 一、jsDelivr 静态资源 CDN 加速

jsDelivr 官方源 `https://cdn.jsdelivr.net` 能加速 npm 包、GitHub 仓库里的静态 JS / CSS / 字体等小文件。国内访问不稳的时候，把域名前缀换成下面的公益镜像就行。

> [!IMPORTANT] 限制说明
> jsDelivr 系列镜像适合**单个体积较小的静态文件**，不支持 `git clone`，也不适合下载 Release 大文件——大文件请用后面第三节的 GitHub 代理。

### 可用镜像地址

| 服务 | 地址 | 备注 |
| --- | --- | --- |
| JSDMirror | `https://cdn.jsdmirror.com/npm/` | 主域名，另有备用 `cdn.jsdmirror.cn` |
| 顶想云 | `https://jsdelivr.topthink.com/npm/` | 会重定向回官方 jsDelivr |
| 渺软公益 CDN | `https://jsd.onmicrosoft.cn/npm/` | 同时提供 Gravatar 头像代理 |
| 其他 | `https://jsdelivr.b-cdn.net/`、`https://cdn.iocdn.net/` | 社区维护，实测后再用 |

### 替换示例

```text
# 原始官方地址
https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js

# 替换为公益镜像
https://cdn.jsdmirror.com/npm/vue@3/dist/vue.global.prod.js
```

> [!TIP] 下载 GitHub 仓库中的单个源码文件
> jsDelivr 的格式是 `https://cdn.jsdelivr.net/gh/用户名/仓库名@分支/文件路径`，注意是 `gh/用户名/仓库名@分支/路径` 这样拼接，不是把原链接整条贴上去。

---

## 二、Gravatar 头像镜像

Gravatar 官方地址 `https://www.gravatar.com/avatar/` 在国内基本加载不出来，博客和评论区头像基本都靠替换域名前缀解决。下面的镜像都兼容 Gravatar 的参数（`?s=80`、`?d=` 之类）。

| 服务 | 地址 | 节点 / 备注 |
| --- | --- | --- |
| Zeruns's Blog | `https://gravatar.zeruns.tech/avatar/` | 多吉云 CDN + 海外 Cloudflare / EdgeOne |
| WeAvatar | `https://weavatar.com/avatar/` | 全球 EdgeOne 节点，完全兼容 Gravatar 参数 |
| September | `https://cdn.sep.cc/avatar/` | 华为云 CDN + Cloudflare，缓存约 1 年 |
| 渺软公益 CDN | `https://jsd.onmicrosoft.cn/avatar/` | Vercel 中转回源 |
| MoeLTY | `https://api.lty.fun/avatar/` | 华为云 CDN + Cloudflare |

### 替换示例

```text
# 原始官方地址
https://www.gravatar.com/avatar/xxxxxx?s=80

# 替换为镜像
https://gravatar.zeruns.tech/avatar/xxxxxx?s=80
```

---

## 三、GitHub 文件 / Release 代理加速

GitHub 代理的用法很简单：**代理域名 + 完整的 GitHub 原始链接**，源码文件、Release 附件、仓库 ZIP 包都能这么下。不支持 SSH 方式的 `git clone`。

### 2026 年实测可用代理

下面这些在 2026 年 11 月实测中，`raw` 文件、Release 附件、`git clone` 三种方式都能通：

- `https://ghfast.top/`
- `https://gh-proxy.com/`
- `https://ghproxy.net/`
- `https://hub.glowp.xyz/`
- `https://github.chenc.dev/`
- `https://www.gh-proxy.cn/github/`

> [!TIP] 大文件优先
> 零散的小文件优先走 jsDelivr 镜像；Release 二进制、源码压缩包这类大文件优先用本节的 GitHub 代理，而且大文件建议从前两个（`ghfast.top`、`gh-proxy.com`）里选。

### 下载示例

```bash
# 原始下载地址
wget https://github.com/xxx/xxx/archive/refs/heads/main.zip

# 拼接代理前缀后下载
wget https://ghfast.top/https://github.com/xxx/xxx/archive/refs/heads/main.zip

# 加速 raw 源码文件
https://ghfast.top/https://raw.githubusercontent.com/用户名/仓库名/分支/文件路径

# 加速 Release 附件
https://ghfast.top/https://github.com/用户名/仓库名/releases/download/版本号/文件名
```

> [!WARNING] 校验文件完整性
> 通过第三方代理下载可执行文件之后，建议用 `shasum -a 256 文件名` 或 `sha256sum 文件名` 算一下哈希，跟 Release 页面公布的校验值对一遍，防止文件被掉包。

---

## 四、GitHub 全场景加速方案

GitHub 访问慢通常是**DNS 污染、CDN 资源加载失败、跨洋链路延迟高**三个问题叠加。场景不同，方案也不同，按需选：

### 方案速查表

| 场景 | 推荐方案 | 上手难度 |
| --- | --- | --- |
| 偶尔看看仓库代码 | 改 hosts 或用网页镜像 | 简单 |
| 下载 Release 安装包 | `gh-proxy.com` / `ghfast.top` 加速下载 | 简单 |
| clone 大仓库 | Gitee 中转导入 | 中等 |
| 日常开发 push / pull | Git 配置代理 | 中等 |
| 完全不想折腾 | Watt Toolkit 一键加速 | 简单 |

### 方案一：改 hosts（解决日常浏览）

原理是跳过被污染的 DNS，直接把 GitHub 服务器的正确 IP 写进 hosts。推荐用 **GitHub520** 这个开源项目，它自动维护 hosts 列表：

```text
https://raw.hellogithub.com/hosts
```

把拿到的内容追加到 hosts 文件末尾：

- Windows：`C:\Windows\System32\drivers\etc\hosts`
- macOS / Linux：`/etc/hosts`

然后刷新 DNS 缓存：

```bash
# Windows
ipconfig /flushdns
# macOS
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
# Linux
sudo systemd-resolve --flush-caches
```

> [!NOTE] hosts 不是一劳永逸
> GitHub 的 CDN IP 会定期变更，建议用 SwitchHosts 这类工具设置自动更新，或者每隔一两个月手动更新一次。

### 方案二：网页浏览镜像

把原地址里的 `github.com` 换成镜像域名就能直接浏览仓库：

- `https://kkgithub.com/` —— 支持看 Issue 和评论
- `https://bgithub.xyz/` —— 界面和官网基本一致

### 方案三：Gitee 中转（clone 大仓库最稳）

1. 注册 Gitee 账号并绑定 GitHub；
2. 在 GitHub 上 fork 目标项目到自己账号；
3. Gitee 新建仓库 →「导入已有仓库」→ 粘贴 fork 后的地址；
4. 从 Gitee 克隆：`git clone https://gitee.com/你的用户名/仓库.git`

Gitee 还支持「仓库镜像管理」自动同步上游更新，不用每次手动导入。

### 方案四：Git 配置代理（开发者进阶）

本地有代理工具（比如 Clash）的话，让 Git 走代理通道，一次配置长期有效：

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 只对 GitHub 走代理，不影响其他仓库
git config --global http.https://github.com.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方案五：Watt Toolkit（小白友好）

Watt Toolkit（原 Steam++）是免费开源工具，内置 GitHub 加速：装好之后在「网络加速」里勾选 GitHub，点「一键加速」就行，浏览器访问、clone、下载 Release 全都自动走加速通道。用的时候记得关掉其他代理软件，避免冲突。

> [!CAUTION] 镜像站安全提醒
> 镜像站只用来下载和浏览，**绝不登录账号**。凡是要求注册、扫码、输密码的"镜像站"直接关掉。同时只启用一个加速工具，多个代理一起跑容易冲突；clone 大仓库时加 `--depth=1` 能快很多，代价是拿不到完整提交历史。

---

## 五、Hugging Face 模型仓库镜像

Hugging Face 官方站点 `https://huggingface.co` 在国内下模型权重经常下到一半断掉，可以用这几个代理前缀加速：

- `https://hf-mirror.com/` —— 社区维护的 HF 专用镜像（首选）
- `https://hub.ilatency.com/`
- `https://github.hzshop.shop/`

典型用法是设一个环境变量走镜像：

```bash
export HF_ENDPOINT=https://hf-mirror.com
huggingface-cli download 模型名
```

> [!NOTE] 大模型下载建议
> 模型文件通常体积很大，代理稳定性也受公益服务的状态影响。重要模型建议挑网络好的时段下载，并且保留本地缓存，避免重复拉取。

---

## 六、Docker 容器镜像加速

Docker 镜像加速有两种用法：

1. **全局配置**：在 `/etc/docker/daemon.json` 的 `registry-mirrors` 里填镜像地址，拉 Docker Hub 镜像时自动走加速；
2. **改写前缀**：直接在镜像名前加代理域名前缀拉取，适合临时用，或者加速其他仓库（ghcr、gcr、quay、k8s）。

### 6.1 Docker Hub

| 镜像地址 | 类型 | 备注 |
| --- | --- | --- |
| `https://docker.1ms.run` | 社区 | 老牌公益源，同步频率高，日常够用 |
| `https://docker.1panel.live` | 社区 | 1Panel 团队维护，更新频率高 |
| `https://docker.m.daocloud.io` | 社区 | DaoCloud 公共源，老牌稳定 |
| `https://hub.rat.dev` | 社区 | 公共镜像代理 |
| `https://docker.xuanyuan.me` | 社区 | 近期速度不错，别用在生产 |
| `https://dockerproxy.net` | 社区 | 适合当备用源 |
| `https://mirror.ccs.tencentyun.com` | 云厂商 | **仅腾讯云服务器内网可用**，公网无效 |
| `https://docker.mirrors.sjtug.sjtu.edu.cn` | 教育网 | 上海交大镜像站 |

> [!WARNING] 已失效地址，请勿再配置
> 网易云 `https://hub-mirror.c.163.com` 已经停用；阿里云 `https://xxx.mirror.aliyuncs.com` 这类个人专属地址的同步策略也有调整，得以控制台说明为准。`daemon.json` 里如果还留着这些，建议删掉再重启 Docker。

### 6.2 其他仓库加速

**ghcr.io（GitHub Container Registry）**

- `https://ghcr.1ms.run`
- `https://ghcr.nju.edu.cn`（南京大学镜像）
- `https://hub.glowp.xyz/`

**gcr.io（Google Container Registry）**

- `https://github.chenc.dev/`

**Quay.io / registry.k8s.io**

- `https://hub.glowp.xyz/`

### 6.3 daemon.json 配置示例

```json
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.1panel.live",
    "https://docker.m.daocloud.io"
  ]
}
```

改完重启 Docker 生效：

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

> [!TIP] 多源备份
> 别只配一个源，建议从表里挑 **2～3 个**填进去。Docker 拉取时会依次尝试，前面的源挂了自动切到下一个，成功率能高不少。

---

## 七、系统与包管理器国内镜像

这一节是高校和云厂商**官方运营**的开源镜像站，稳定性远高于公益代理，适合长期配在服务器和开发机上。

### 7.1 综合开源镜像站

| 镜像站 | 地址 | 说明 |
| --- | --- | --- |
| 清华大学 TUNA | `https://mirrors.tuna.tsinghua.edu.cn` | 收录最全，支持 IPv4 / IPv6 分线路 |
| 中科大 USTC | `https://mirrors.ustc.edu.cn` | 教育网主力镜像，按运营商分线路 |
| 阿里云 | `https://mirrors.aliyun.com` | 云厂商官方，公网速度稳定 |
| 腾讯云 | `https://mirrors.cloud.tencent.com` | 腾讯云内网可走内网源 |
| 华为云 | `https://repo.huaweicloud.com` | 云厂商官方镜像 |
| 北京外国语大学 | `https://mirrors.bfsu.edu.cn` | TUNA 同源站，教育网补充 |

### 7.2 apt（Debian / Ubuntu）

以 Ubuntu 换清华源为例：

```bash
# 先备份原配置
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 替换为清华源（新版 Ubuntu 用 sources.list.d/ubuntu.sources）
sudo sed -i 's|http://archive.ubuntu.com/ubuntu/|https://mirrors.tuna.tsinghua.edu.cn/ubuntu/|g' /etc/apt/sources.list

# 更新索引
sudo apt update
```

常用的 apt 镜像前缀：

- 清华：`https://mirrors.tuna.tsinghua.edu.cn/ubuntu/`
- 中科大：`https://mirrors.ustc.edu.cn/ubuntu/`
- 阿里云：`https://mirrors.aliyun.com/ubuntu/`
- 腾讯云：`https://mirrors.cloud.tencent.com/ubuntu/`

### 7.3 pip（Python）

**临时用**（单次安装指定源）：

```bash
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple 包名
```

**设为默认源**：

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

常用的 PyPI 镜像：

- 清华 TUNA：`https://pypi.tuna.tsinghua.edu.cn/simple`
- 中科大 USTC：`https://pypi.mirrors.ustc.edu.cn/simple`
- 阿里云：`https://mirrors.aliyun.com/pypi/simple/`
- 华为云：`https://repo.huaweicloud.com/repository/pypi/simple`

### 7.4 npm（Node.js）

**临时用 / 设为默认**：

```bash
npm install --registry=https://registry.npmmirror.com
npm config set registry https://registry.npmmirror.com
npm config get registry        # 查看当前源
```

常用的 npm 镜像：

- 淘宝 npmmirror：`https://registry.npmmirror.com`
- 腾讯云：`https://mirrors.cloud.tencent.com/npm/`

---

## 八、典型使用示例

### 8.1 测试镜像连通性

```bash
# 测试 HTTP 状态码与响应时间
curl -I -m 10 https://docker.1ms.run
```

### 8.2 拉取 Docker Hub 镜像（改写前缀）

```bash
docker pull nginx:latest                          # 原始镜像
docker pull docker.1ms.run/library/nginx:latest   # 通过代理前缀拉取
```

### 8.3 下载 GitHub Release 文件

```bash
curl -L -O https://ghfast.top/https://github.com/作者/仓库/releases/download/版本/文件名
```

### 8.4 备份与恢复系统源

切换包管理器源之前先把原配置备份一份；出问题就用备份还原，再重新 `apt update`。

---

## 九、镜像源连通性探测

"可用列表"每年都会变——高校公益站靠有限带宽维持，云厂商公共地址可能因业务调整关闭，证书策略变化也会让配置失效。与其每年等别人更新列表，不如自己学会探测。

### 探测 Registry 接口

把 Docker 加速地址写进 `daemon.json` 之前，先用 `/v2/` 接口探一下：

```bash
curl -I -m 10 https://docker.1ms.run/v2/
# 返回 HTTP/1.1 200 OK 或 401 Unauthorized 说明加速器本体可用
```

### 实测拉取

```bash
# 计时拉取一个小镜像，能拉下来且速度可接受即可用
time docker pull docker.1ms.run/library/alpine:latest
```

### 探测 GitHub 代理

```bash
curl -I -L -m 15 https://ghfast.top/https://github.com/用户名/仓库/releases/download/v1.0/file.zip
```

> [!NOTE] 探测心法
> 别人能通不代表你这边也流畅——可用性受本地运营商、服务器地域，甚至一天中不同时段影响。挑地址时优先选**有主体背景、长期运营**的服务，别选来路不明的个人站点。

---

## 十、使用建议与注意事项

1. **优先官方镜像**：系统包管理器和正式业务尽量用高校或云厂商官方镜像站，公益代理只当临时备用。
2. **多源备份**：同一类资源收藏 2～3 个可用地址，某个源失效时能快速切换。
3. **不要硬编码公益域名**：公益服务稳定性不可控，长期维护的脚本和 Docker Compose 应该预留可配置的镜像地址。
4. **注意安全边界**：第三方代理能观测转发内容，别通过它传私有仓库、认证凭据、密钥之类的敏感信息；下载后记得校验哈希。
5. **区分适用范围**：jsDelivr 只适合小静态文件，GitHub 代理适合 Release 和源码包，Docker 代理用于容器镜像，模型仓库单独用 HF 镜像，别混着用。
6. **定期更新本文**：公益镜像域名变动频繁，建议隔一段时间实测各源可用性，把失效地址清掉。

> [!WARNING] 免责声明
> 本文仅作技术学习与日常备用参考，不保证所列公益服务长期可用或绝对安全；请遵守当地网络相关法律法规，使用第三方镜像产生的风险由使用者自行承担。

---

## 资料来源

> [!NOTE] 说明
> 以下为编写本文时参考的公开资料，镜像 / 代理地址变动频繁，请以各服务官方公告与实测结果为准。

1. [2026 最新可用 Docker 国内镜像源实测列表与配置指南](https://blog.csdn.net/weixin_32308101/article/details/165326043)
2. [2026 最新国内 Docker 镜像源加速列表（11 月 10 日更新）· 轩辕镜像](https://xuanyuan.cloud/blog/2026-11-docker)
3. [2026 最新 Docker 国内镜像加速源配置指南](https://blog.csdn.net/weixin_33326218/article/details/165462376)
4. [dongyubin/DockerHub：国内可用 Docker 镜像源汇总](https://community.qtorque.io/dongyubin/DockerHub)
5. [GitHub 加速镜像最新可用地址（2026 年 11 月实测）](https://zachthinking.github.io/posts/github-proxy-mirror)
6. [weekoo2025/ghproxy：中国区 GitHub 和 Docker 加速镜像](https://github.com/weekoo2025/ghproxy)
7. [GitHub 国内使用完全手册：2026 年方案汇总](http://mp.weixin.qq.com/s?__biz=MzY4MjQ3MTIxMw==&mid=2247484477&idx=1&sn=db6be7d3cb2ec18573d5ca88e7fc6b81&chksm=f272b0c43a67eefbc79cbabc48eb107b4c53fe9cef2f28875117bef434f41e5bf269a4124d51#rd)
8. [Google-Mirrors 镜像导航](https://mirror.js.org/#/)
9. [清华大学开源软件镜像站 / 阿里云开源镜像站等官方站点](https://mirrors.tuna.tsinghua.edu.cn/)
