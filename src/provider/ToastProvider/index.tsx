import { isWeb } from 'tamagui'
import { XStack, YStack } from 'tamagui'
import { useThemeStore } from '~/store/modules/theme'
import { useClientMounted, useSafeArea } from '~/hooks/client'
import { useToastStateProviderValue, ToastStateContextProvider } from "./hooks"
import { type ToastT, Toast } from '@tamagui/toast/v2'
import { type ThemeMode } from '~/theme'
import { type ReactNode } from 'react'

/** ToastProvider */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { top } = useSafeArea()
  const mounted = useClientMounted()
  const toastState = useToastStateProviderValue()
  const style = useThemeStore(state => state.style) as ThemeMode

  return (
    <ToastStateContextProvider value={toastState}>
      <Toast
        theme={style}
        position={toastState.position}
        gap={Math.round(toastState.gap)}
        visibleToasts={toastState.visibleToasts}
        duration={toastState.duration}
      >
        {mounted && <Toast.Viewport offset={{ top }} portalToRoot={false}>
          <Toast.List
            renderItem={({ toast: t, index }) => (
              <Toast.Item key={t.id} toast={t} index={index} testID="toast-item">
                <ToastContent toast={t} />
              </Toast.Item>
            )}
          />
        </Toast.Viewport>}
        {children}
      </Toast>
    </ToastStateContextProvider>
  )
}

/** ToastContent */
function ToastContent({ toast: t }: { toast: ToastT }) {
  const icon = t.icon ?? null
  const title = typeof t.title === 'function' ? t.title() : t.title ?? ''
  const description = typeof t.description === 'function' ? t.description() : t.description ?? ''

  return (
    <>
      <XStack gap="$3" items="flex-start">
        {!!icon && <Toast.Icon>
          {icon}
        </Toast.Icon>}
        <YStack flex={1} gap="$0.5">
          {!!title && (
            <Toast.Title fontWeight="600" size="$3">
              {title}
            </Toast.Title>
          )}
          {!!description && (
            <Toast.Description color="$color9" size="$2">
              {description}
            </Toast.Description>
          )}
        </YStack>
      </XStack>

      {isWeb && (
        <Toast.Close
          testID="toast-close-button"
          position="absolute"
          y={-12}
          x={-18}
          z={1}
        />
      )}
    </>
  )
}