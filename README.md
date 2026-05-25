# Takeout Free - Tamagui + One + Expo Cross-Platform App [简体中文](README.zh-CN.md)

#### Demo Project: https://robincarrollallen.github.io

## Tech Stack Overview

This project is a modern cross-platform application framework built with **Tamagui + Next.js 14 + Expo 53**, supporting Web (SSR/CSR), iOS, and Android native development. It uses a Monorepo (Turborepo) architecture and includes complete multilingual, multi-theme, state management, and data persistence capabilities. It is suitable for mobile app scenarios such as gaming platforms, social apps, and finance.

### Package Manager

- `bun` (v1.3.9) is recommended for dependency management and script execution
- Other mainstream package managers are also optional (`npm`, `pnpm`, `yarn`)

### Requirements

```bash
iOS: macOS, Xcode 16+, and iOS 17.0+ deployment target
Android: Android Studio, JDK 17+, and Android SDK 34+
```

### Quick Start

```bash
bun install
bun dev          # start the web development server at http://localhost:8092
bun android      # run the Android emulator
bun ios          # run the iOS simulator
```

### Core Features

- 🚀 **True cross-platform development**: Unified development for Web + iOS + Android with high code sharing
- 🎨 **Dynamic theme system**: Supports 20+ predefined themes and light/dark mode switching
- 🌍 **Internationalization support**: 7 languages available out of the box, powered by react-i18next
- 💾 **Complete persistence**: Multi-layer storage with Zustand + localStorage/sessionStorage
- 📱 **Mobile optimization**: Native-level performance with Expo ecosystem support
- 🔐 **Type safety**: Comprehensive TypeScript support
- ⚡ **High performance**: Optional SSR/CSR and optimized component rendering with Tamagui

### Core Frameworks

| Technology | Version | Purpose |
|------|------|------|
| **Tamagui** | 2.0.0-rc.34 | Universal UI component library and cross-platform design system |
| **One** | 1.16.5 | Web application framework with SSR/SSG support |
| **Expo** | ^55.0.6 | React Native framework for iOS/Android development |
| **React** | 19.2.0 | Reactive UI development |
| **React Native** | 0.83.2 | Native mobile development |
| **Zustand** | 5.0.13 | Lightweight state management |

### UI Component Libraries

| Technology | Version | Purpose |
|------|------|------|
| **Tamagui** | ^1.130.8 | Cross-platform component library (Button, Input, Stack, etc.) |
| **@tamagui/lucide-icons** | ^1.130.8 | Icon library |
| **@tamagui/themes** | ^1.130.8 | Theme system |
| **@tamagui/animations-react-native** | ^1.130.8 | Animation library |
| **React Native Web** | ^0.20.0 | Web adapter for React Native components |

### Utility Libraries

| Technology | Version | Purpose |
|------|------|------|
| **react-i18next** | ^15.6.0 | Internationalization |
| **i18next** | ^24.4.0 | Core i18n library |
| **dayjs** | ^1.11.18 | Date and time handling |
| **burnt** | ^0.12.2 | Native toast notifications |

### Expo Native Modules

| Module | Purpose |
|------|------|
| **expo-router** | File-system-based routing |
| **@react-navigation/native** | Native navigation |
| **expo-clipboard** | Clipboard API |
| **expo-constants** | Device constants |
| **expo-image** | High-performance image component |
| **expo-linear-gradient** | Gradient component |
| **expo-blur** | Blur effects |
| **expo-splash-screen** | Splash screen |
| **expo-font** | Font loading |

### Development Tools

| Technology | Version | Purpose |
|------|------|------|
| **TypeScript** | ^5.8.3 | Type system |
| **Biome** | ^1.9.3 | Code linting and formatting |
| **Prettier** | ^3.3.3 | Code formatting |
| **Vitest** | ^2.1.1 | Unit testing |
| **Turborepo** | ^1.13.4 | Monorepo task orchestration |
| **Husky** | ^9.1.6 | Git hooks |

### Other Technologies and Tools

- **Expo Application Services (EAS)**: Cloud build and deployment
- **GitHub Actions**: CI/CD automation
- **Vercel**: Web app hosting (optional)

## Internationalization (i18next)

- **Change copy / add keys**: Edit the JSON files under `src/i18n/locales/`. Keys must match the `t('a.b')` calls in code, and all language files should keep the same key set.
- **Add a language**: Add `locales/xxx.json`, import it in `src/i18n/resources.ts`, and add it to `resources` (the key should match `setLanguage` and the language code, such as `zh-CN`). If it should appear in tenant-selectable languages, also add the corresponding `LANGUAGE_*` entry in `src/enums/language.ts`.
- **Use in components**: `import { useI18n } from '~/i18n'`, then `const { t } = useI18n()`, and call `t('tab.home')`, etc.
- **Switch language and persist it**: `import { setLanguage } from '~/i18n'`, then call `setLanguage('zh-CN')` (native writes `lang` to AsyncStorage, Web writes `lang` to Cookie).
- **Stores / utilities and other non-component code**: `import i18n from 'i18next'`, then call `i18n.t('key')`.

Initialization is handled in `app/_layout.tsx` (`initI18n` + `setLanguage`). In normal business code, you usually only need to edit JSON files and call `t` / `setLanguage`.

## License

MIT
