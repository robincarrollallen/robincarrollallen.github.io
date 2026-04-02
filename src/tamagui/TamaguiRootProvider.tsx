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
  const userTheme = useUserScheme()
  const { style, themeMode } = useThemeStore()

  useEffect(() => {
    userTheme.set(themeMode)
  }, [themeMode])

  return (
    <TamaguiProvider disableInjectCSS config={config} defaultTheme={style}>
      {isWeb && <ThemeMetaTag />}
      {children}
    </TamaguiProvider>
  )
}

const ThemeMetaTag = () => {
  const theme = useTheme()
  return <MetaTheme color={theme.background.val} darkColor={'#000'} lightColor="#fff" />
}
