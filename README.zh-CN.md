# Takeout Free - Tamagui + One + Expo 跨平台应用  [English](README.md)

#### 演示项目: https://robincarrollallen.github.io

## 技术栈概述

本项目是一个基于 **Tamagui + Next.js 14 + Expo 53** 的现代化跨平台应用框架，支持 Web (SSR/CSR)、iOS 和 Android 原生开发。项目采用 Monorepo (Turborepo) 架构设计，具备完整的多语言、多主题、状态管理和数据持久化能力，适用于游戏平台、社交应用、金融等移动应用场景。

### 包管理工具

- 推荐使用 `bun` (v1.3.9) 包管理器进行依赖管理和脚本执行
- 可选其他主流包管理器 (`npm`, `pnpm`, `yarn`)

### 环境要求

```bash
IOS: macOS、Xcode 16+ 以及 iOS 17.0+ 部署目标
Android: Android Studio、JDK 17+ 以及 Android SDK 34+
```

### 快速开始

```bash
bun install
bun dev          # 在 http://localhost:8092 启动 Web 开发服务器
bun android      # 运行 Android 模拟器
bun ios          # 运行 iOS 模拟器
```

### 核心特性

- 🚀 **真正的跨平台**: Web + iOS + Android 统一开发，代码共享率高
- 🎨 **动态主题系统**: 支持 20+ 预定义主题，亮色/暗色模式切换
- 🌍 **国际化支持**: 7 种语言开箱即用，基于 react-i18next
- 💾 **完善的持久化**: Zustand + localStorage/sessionStorage 多层存储
- 📱 **移动端优化**: 原生级性能，Expo 生态支持
- 🔐 **类型安全**: 全面的 TypeScript 支持
- ⚡ **高性能**: SSR/CSR 可选，Tamagui 优化的组件渲染

### 核心框架

| 技术 | 版本 | 用途 |
|------|------|------|
| **Tamagui** | 2.0.0-rc.34 | 通用 UI 组件库，跨平台设计系统 |
| **One** | 1.16.5 | Web 应用框架，支持 SSR/SSG |
| **Expo** | ^55.0.6 | React Native 框架，iOS/Android 开发 |
| **React** | 19.2.0 | 响应式 UI 开发 |
| **React Native** | 0.83.2 | 原生移动端开发 |
| **Zustand** | 5.0.13 | 轻量级状态管理 |

### UI 组件库

| 技术 | 版本 | 用途 |
|------|------|------|
| **Tamagui** | ^1.130.8 | 跨平台组件库 (Button, Input, Stack 等) |
| **@tamagui/lucide-icons** | ^1.130.8 | 图标库 |
| **@tamagui/themes** | ^1.130.8 | 主题系统 |
| **@tamagui/animations-react-native** | ^1.130.8 | 动画库 |
| **React Native Web** | ^0.20.0 | React Native 组件 Web 适配 |

### 工具库

| 技术 | 版本 | 用途 |
|------|------|------|
| **react-i18next** | ^15.6.0 | 国际化 |
| **i18next** | ^24.4.0 | i18n 核心库 |
| **dayjs** | ^1.11.18 | 日期时间处理 |
| **burnt** | ^0.12.2 | 原生 Toast 通知 |

### Expo 原生模块

| 模块 | 用途 |
|------|------|
| **expo-router** | 基于文件系统的路由 |
| **@react-navigation/native** | 原生导航 |
| **expo-clipboard** | 剪贴板 API |
| **expo-constants** | 设备常量 |
| **expo-image** | 高性能图片组件 |
| **expo-linear-gradient** | 渐变组件 |
| **expo-blur** | 模糊效果 |
| **expo-splash-screen** | 启动屏幕 |
| **expo-font** | 字体加载 |

### 开发工具

| 技术 | 版本 | 用途 |
|------|------|------|
| **TypeScript** | ^5.8.3 | 类型系统 |
| **Biome** | ^1.9.3 | 代码检查和格式化 |
| **Prettier** | ^3.3.3 | 代码格式化 |
| **Vitest** | ^2.1.1 | 单元测试 |
| **Turborepo** | ^1.13.4 | Monorepo 任务编排 |
| **Husky** | ^9.1.6 | Git Hooks |

### 其他技术与工具

- **Solito**: 跨平台导航抽象层，统一 Next.js 和 Expo Router
- **Expo Application Services (EAS)**: 云端构建和部署
- **GitHub Actions**: CI/CD 自动化部署
- **Vercel**: Web 应用托管（可选）

## 国际化（i18next）

- **改文案 / 加 key**：编辑 `src/i18n/locales/` 下各语言的 JSON，key 与代码里 `t('a.b')` 一致；各语言文件保持同一套 key。
- **加一种语言**：新增 `locales/xxx.json`，在 `src/i18n/resources.ts` 里 import 并写入 `resources`（键名与 `setLanguage`、语言代码一致，如 `zh-CN`）。若要在租户可选语言里出现，再在 `src/enums/language.ts` 里补 `LANGUAGE_*`。
- **组件里用**：`import { useI18n } from '~/i18n'`，`const { t } = useI18n()`，然后 `t('tab.home')` 等。
- **切换语言并持久化**：`import { setLanguage } from '~/i18n'`，`setLanguage('zh-CN')`（原生写 AsyncStorage `lang`，Web 写 Cookie `lang`）。
- **Store / 工具等非组件**：`import i18n from 'i18next'`，`i18n.t('key')`。

初始化在 `app/_layout.tsx`（`initI18n` + `setLanguage`），一般业务只改 JSON、调 `t` / `setLanguage` 即可。

## 许可证

MIT
