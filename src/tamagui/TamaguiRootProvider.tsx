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
      <Theme name={style}>
        {isWeb && <ThemeMetaTag />}
        {children}
      </Theme>
    </TamaguiProvider>
  )
}

const ThemeMetaTag = () => {
  const theme = useTheme()
  return <MetaTheme color={theme.background?.val} darkColor="#000" lightColor="#fff" />
}
