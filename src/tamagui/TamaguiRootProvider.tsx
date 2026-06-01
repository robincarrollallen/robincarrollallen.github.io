import './tamagui.generated.css'

import { config } from './tamagui.config'
import { useEffect, type ReactNode } from 'react'
import { useThemeStore } from '~/store/modules/theme'
import { isWeb, TamaguiProvider, Theme, useTheme } from 'tamagui'
import { MetaTheme, SchemeProvider, useUserScheme } from '@vxrn/color-scheme'

export const TamaguiRootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SchemeProvider>
      <TamaguiInnerProvider>{children}</TamaguiInnerProvider>
    </SchemeProvider>
  )
}

const TamaguiInnerProvider = ({ children }: { children: ReactNode }) => {
  const { set: setScheme } = useUserScheme()
  const style = useThemeStore((state) => state.style)
  const themeMode = useThemeStore((state) => state.themeMode)

  useEffect(() => {
    setScheme(themeMode)
  }, [themeMode, style])

  return (
    <TamaguiProvider config={config} defaultTheme={themeMode}>
      <Theme name={style}> {/* 需要Theme组件设置主题 */}
        {isWeb && <ThemeMetaTag />} {/* 如果是web，则需要添加一个meta标签，用于设置主题颜色 */}
        {children}
      </Theme>
    </TamaguiProvider>
  )
}

const ThemeMetaTag = () => {
  const theme = useTheme()
  return <MetaTheme color={theme.background?.val} darkColor="#000" lightColor="#fff" />
}
