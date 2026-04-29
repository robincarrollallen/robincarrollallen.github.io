import './root.css'
import '@tamagui/native/setup-zeego'

import { useEffect } from 'react'
import { Slot, Stack } from 'one'
import { ROUTES } from '~/navigation/routes'
import { LoginScreen } from '~/modules/login'
import { initI18n, setLanguage } from '~/i18n'
import { LANGUAGE_CODE } from '~/enums/language'
import { useClientMounted } from '~/hooks/client'
import { Configuration, isWeb, YStack } from 'tamagui'
import { useStatusStore } from '~/store/modules/status'
import { ToastProvider } from '~/provider/ToastProvider'
import { DialogProvider } from '~/interface/dialogs/Dialog'
import { LoadingProvider } from '~/provider/LoadingProvider'
import { useLanguageSupported } from '~/store/modules/language'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiRootProvider } from '~/tamagui/TamaguiRootProvider'
import { PlatformSpecificRootProvider } from '~/interface/platform/PlatformSpecificRootProvider'

/** Root Layout */
export function RootLayout() {
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
                    <LoadingProvider>
                      <ToastProvider>
                        <DialogProvider>
                          {isWeb ? (
                            <YStack height="100vh">
                              <Slot />
                            </YStack>
                          ) : (
                            <Stack screenOptions={{ headerShown: false }}>
                              <Stack.Screen name={ROUTES.tabbar.name} />
                              <Stack.Screen name={ROUTES.game.name} />
                            </Stack>
                          )}
                          {mounted && loginScreenVisible && <LoginScreen />}
                        </DialogProvider>
                      </ToastProvider>
                    </LoadingProvider>
                  </Configuration>
              </TamaguiRootProvider>
            </SafeAreaProvider>
          </PlatformSpecificRootProvider>
        </div>
      </body>
    </html>
  )
}

const initLanguage = async (lang: string) => {
  await initI18n()
  setLanguage(lang)
}