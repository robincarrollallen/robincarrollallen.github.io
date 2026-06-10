import { delay } from '~/utils/time'
import { useRouter } from '~/router'
import { ROUTES } from '~/router/routes'
import { memo, useCallback, useState } from 'react'
import { useUserStore } from '~/store/modules/user'
import { ActionButton } from '~/components/ActionButton'
import { useSizeTokens } from '~/store/modules/responsive'
import { AlertDialog, Button, useTheme, XStack, YStack } from 'tamagui'

export const LogoutDialog = memo(({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {
  const [loading, setLoading] = useState(false)
  const size = useSizeTokens()
  const router = useRouter()
  const theme = useTheme()

  /** 退出登录回调事件 */
  const onLogout = useCallback(async () => {
    setLoading(true)
    await delay(2000)
    setOpen(false)
    setLoading(false)
    router.replace(ROUTES.home.path)
    setTimeout(() => {
      useUserStore.getState().clearToken()
    }, 100)
  }, [])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          opacity={0.5}
          transition="100ms"
          exitStyle={{ opacity: 0 }}
          enterStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          x={0}
          y={0}
          elevate
          bordered
          scale={1}
          opacity={1}
          key="content"
          borderWidth={0}
          width={size[366]}
          borderColor="transparent"
          borderTopLeftRadius={size[10]}
          borderTopRightRadius={size[10]}
          borderBottomLeftRadius={size[10]}
          borderBottomRightRadius={size[10]}
          animateOnly={['opacity', 'transform']}
          bg={theme.backgroundSurfaceRaisedL1?.val}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          transition={[
            '100ms',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <YStack gap={size[32]}>
            <AlertDialog.Title fontSize={size[24]} fontWeight="bold" text={"center" as any}>Log out</AlertDialog.Title>
            <AlertDialog.Description color={theme.textWeaker?.val} text={"center" as any}>
              Are you sure you want to log out?
            </AlertDialog.Description>
            <XStack gap={size[10]}>
              <AlertDialog.Cancel asChild>
                <Button
                  height={size[50]}
                  aspectRatio={3/1}
                  borderTopLeftRadius={size[6]}
                  borderTopRightRadius={size[6]}
                  borderBottomLeftRadius={size[6]}
                  borderBottomRightRadius={size[6]}
                  bg={theme.surfaceRaisedL2?.val}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <ActionButton
                height={size[50]}
                width={size[150]}
                loading={loading}
                onPress={onLogout}
                color={theme.textInverse?.val}
                bg={theme.gradientsPrimaryB?.val}
              >
                Logout
              </ActionButton>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
})