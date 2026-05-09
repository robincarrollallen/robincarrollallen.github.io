import './root.css'

import { Slot, Stack } from 'one'
import { ROUTES } from '~/router/routes'
import { useClientMounted } from '~/hooks/client'
import { Configuration, isWeb, YStack } from 'tamagui'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiRootProvider } from '~/tamagui/TamaguiRootProvider'
import { useStatusStore } from '~/store/modules/status'
import { PlatformSpecificRootProvider } from '~/interface/platform/PlatformSpecificRootProvider'


export function Layout() {
  const mounted = useClientMounted()
  const loginScreenVisible = useStatusStore(state => state.loginScreenVisible) // 登录弹窗是否显示
  
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
                    {/* <ToastProvider> */}
                      {/* <DialogProvider> */}
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
                        {/* {mounted && loginScreenVisible && <LoginScreen />} */}
                      {/* </DialogProvider> */}
                    {/* </ToastProvider> */}
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
