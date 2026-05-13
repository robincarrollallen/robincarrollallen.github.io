import './tamagui.generated.css'

import { config } from './tamagui.config'
import { useEffect, type ReactNode } from 'react'
import { useThemeStore } from '~/store/modules/theme'
import { isWeb, TamaguiProvider, useTheme } from 'tamagui'
import { MetaTheme, SchemeProvider, useUserScheme } from '@vxrn/color-scheme'

export const TamaguiRootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SchemeProvider>
      <TamaguiInnerProvider>{children}</TamaguiInnerProvider>
    </SchemeProvider>
  )
}

const TamaguiInnerProvider = ({ children }: { children: ReactNode }) => {
  const userScheme = useUserScheme()
  const style = useThemeStore((state) => state.style)
  const themeMode = useThemeStore((state) => state.themeMode)

  useEffect(() => {
    userScheme.set(themeMode)
  }, [themeMode])

  return (
    <TamaguiProvider config={config} defaultTheme={style}>
      {isWeb && <ThemeMetaTag />}
      {children}
    </TamaguiProvider>
  )
}

const ThemeMetaTag = () => {
  const theme = useTheme()
  return <MetaTheme color={theme.background.val} darkColor="#000" lightColor="#fff" />
}
