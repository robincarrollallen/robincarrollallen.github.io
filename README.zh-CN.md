# Takeout

一个全栈、跨平台的入门套件，用于使用 React Native 构建现代 Web 和移动应用程序。

## 前置条件

在开始之前，请确保你已安装：

- **Bun** - [安装 Bun](https://bun.sh)
- **Docker** - [安装 Docker](https://docs.docker.com/get-docker/)（在 macOS 上，
  我们推荐使用 [OrbStack](https://orbstack.dev) 作为更快的替代方案）
- **Git** - 用于版本控制

移动端开发需要：

- **iOS**：macOS 系统，搭配 Xcode 16+
- **Android**：Android Studio，搭配 JDK 17+

## 快速开始

```bash
bun install
bun backend      # 启动 docker 服务（postgres、zero）
bun dev          # 在 http://localhost:8092 启动 Web 开发服务器
```

## 技术栈

总体而言，项目主要使用以下技术：

- [One](https://onestack.dev) - 通用 React 框架
- [Zero](https://zero.rocicorp.dev) - 实时同步
- [Tamagui](https://tamagui.dev) - 通用 UI
- [Better Auth](https://www.better-auth.com) - 身份认证
- [Drizzle ORM](https://orm.drizzle.team) - 数据库模式

## 项目结构

```
takeout-free/
├── app/                   # 基于文件的路由（One 路由器）
│   ├── (app)/             # 已认证的路由
│   │   ├── auth/          # 登录流程
│   │   └── home/          # 主应用标签页
│   └── api/               # API 路由
├── src/
│   ├── features/          # 功能模块（auth、todo、theme）
│   ├── interface/         # 可复用 UI 组件
│   ├── database/          # 数据库模式和迁移
│   ├── data/              # Zero 模式、模型和查询
│   ├── zero/              # 实时同步配置
│   ├── server/            # 服务端代码
│   └── tamagui/           # 主题配置
├── scripts/               # CI/CD 和辅助脚本
├── docs/                  # 文档
└── assets/                # 图片、字体、启动屏
```

## 常用命令

```bash
# 开发
bun dev                      # 启动 Web + 移动端开发服务器
bun ios                      # 运行 iOS 模拟器
bun android                  # 运行 Android 模拟器
bun backend                  # 启动 docker 服务

# 代码质量
bun check                    # TypeScript 类型检查
bun lint                     # 运行 oxlint
bun lint:fix                 # 自动修复 lint 问题

# 测试
bun test:unit                # 单元测试
bun test:integration         # 集成测试

# 数据库
bun migrate                  # 构建并运行迁移

# 部署
bun ci --dry-run             # 运行完整的 CI 流水线但不部署
bun ci                       # 完整的 CI/CD 并部署
```

## 数据库

### 本地开发

PostgreSQL 在 Docker 中运行，端口为 5444：

- 主数据库：`postgresql://user:password@localhost:5444/postgres`
- Zero 同步数据库：`zero_cvr` 和 `zero_cdb`

### 迁移

在以下位置更新你的数据库模式：

- `src/database/schema-public.ts` - 公共表（暴露给 Zero/客户端）
- `src/database/schema-private.ts` - 私有表

然后运行：

```bash
bun migrate
```

## 环境配置

### 文件结构

- `.env.development` - 开发环境默认值（已提交）
- `.env` - 当前激活的环境（自动生成，已加入 gitignore）
- `.env.local` - 个人密钥/覆盖项（已加入 gitignore）
- `.env.production` - 生产环境配置（已加入 gitignore）
- `.env.production.example` - 生产环境模板（已提交）

### 关键变量

```bash
# 身份认证
BETTER_AUTH_SECRET=<secret>
BETTER_AUTH_URL=<url>

# 服务器
ONE_SERVER_URL=<url>

# zero
ZERO_UPSTREAM_DB=<connection-string>
ZERO_CVR_DB=<connection-string>
ZERO_CHANGE_DB=<connection-string>

# 存储（S3/R2）
CLOUDFLARE_R2_ENDPOINT=<endpoint>
CLOUDFLARE_R2_ACCESS_KEY=<key>
CLOUDFLARE_R2_SECRET_KEY=<secret>
```

完整的生产环境配置请参见 `.env.production.example`。

## 移动应用

### iOS

```bash
bun ios          # 在模拟器中运行
```

需要 macOS、Xcode 16+ 以及 iOS 17.0+ 部署目标。

### Android

```bash
bun android      # 在模拟器中运行
```

需要 Android Studio、JDK 17+ 以及 Android SDK 34+。

## 添加功能

### 数据模型

1. 在 `src/database/schema-public.ts` 中添加模式
2. 运行 `bun migrate`
3. 在 `src/data/models/` 中添加 Zero 模型
4. 运行 `bun zero:generate`
5. 在你的组件中使用查询

### UI 组件

可复用组件位于 `src/interface/`。在可能的情况下，请使用此处的组件，
而不是直接从 Tamagui 导入。

### 图标

本项目使用 [Phosphor Icons](https://phosphoricons.com/)。图标位于
`src/interface/icons/phosphor/`。

## 许可证

MIT
