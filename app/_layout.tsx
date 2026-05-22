import './root.css'

import { Slot, Stack } from 'one'
import { ROUTES } from '~/router/routes'
import { StyleSheet } from 'react-native'
import { useEffect, useMemo } from 'react'
import { LoginScreen } from '~/modules/login'
import { initI18n, setLanguage } from '~/i18n'
import { LANGUAGE_CODE } from '~/enums/language'
import { useClientMounted } from '~/hooks/client'
import { useStatusStore } from '~/store/modules/status'
import { ToastProvider } from '~/provider/ToastProvider'
import { useLanguageSupported } from '~/store/modules/language'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiRootProvider } from '~/tamagui/TamaguiRootProvider'
import { Configuration, isWeb, useTheme, useThemeName, YStack } from 'tamagui'
import { PlatformSpecificRootProvider } from '~/interface/platform/PlatformSpecificRootProvider'

export function Layout() {
  const mounted = useClientMounted()
  const languageSupported = useLanguageSupported()
  const lang = languageSupported[0]?.value || LANGUAGE_CODE.EN_US
  const loginScreenVisible = useStatusStore(state => state.loginScreenVisible) // 登录弹窗是否显示

  /** Initialize language */
  useEffect(() => {
    initLanguage(lang)
  }, [languageSupported])
  
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:image" content={`${process.env.ONE_SERVER_URL}/og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={`${process.env.ONE_SERVER_URL}/og.jpg`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <link rel="icon" href="/favicon.svg" />
      </head>

      <body>
        <div style={{ display: 'contents' }} data-testid="app-container">
          <PlatformSpecificRootProvider>
            <SafeAreaProvider>
              <TamaguiRootProvider>
                <Configuration disableSSR>
                  {/* <LoadingProvider> */}
                    <ToastProvider>
                      {/* <DialogProvider> */}
                        <BodyView />
                        {mounted && loginScreenVisible && <LoginScreen />}
                      {/* </DialogProvider> */}
                    </ToastProvider>
                  {/* </LoadingProvider> */}
                </Configuration>
              </TamaguiRootProvider>
            </SafeAreaProvider>
          </PlatformSpecificRootProvider>
        </div>
      </body>
    </html>
  )
}

/** Init Language */
const initLanguage = async (lang: string) => {
  await initI18n()
  setLanguage(lang)
}

/** Body */
const BodyView = () => {
  const theme = useTheme()
  const themeName = useThemeName()

  const styles = useMemo(() => StyleSheet.create({
    body: {
      backgroundColor: theme.backgroundBody?.val
    },
    contentStyle: {
      backgroundColor: theme.backgroundBody?.val
    }
  }), [themeName])

  return (
    isWeb
    ? <YStack height="100vh" style={styles.body}>
        <Slot />
      </YStack>
    : <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.contentStyle
        }}
      >
        <Stack.Screen name={ROUTES.tabbar.screen} />
        <Stack.Screen name={ROUTES.search.screen} />
        <Stack.Screen name={ROUTES.game.screen} />
      </Stack>
  )
}
