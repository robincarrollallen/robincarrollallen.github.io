import { Image } from 'expo-image'
import { useCallback } from 'react'
import { useRouter } from '~/router'
import { useUserInfoState } from '../state'
import { IMAGES } from '~/assets/modules/images'
import { LinearGradient } from 'tamagui/linear-gradient'
import { ActionButton } from '~/components/ActionButton'
import { useSizeTokens } from '~/store/modules/responsive'
import { AlertDialog, Button, YStack, XStack, useTheme } from 'tamagui'

/**
 * 确认对话框
 * @param showCancel 是否显示取消按钮
 * @returns 
 */
export const ConfirmDialog = ({ showCancel = false }: { showCancel?: boolean }) => {
  const theme = useTheme()
  const router = useRouter()
  const size = useSizeTokens()
  const confirmDialogOpen = useUserInfoState(state => state.confirmDialogOpen)
  const setConfirmDialogOpen = useUserInfoState.getState().setConfirmDialogOpen

  const onConfirm = useCallback(async () => {
    setConfirmDialogOpen(false)
    router.push('/withdraw/pin')
  }, [])

  return (
    <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
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
          p={0}
          elevate
          bordered
          scale={1}
          opacity={1}
          key="content"
          borderWidth={0}
          bg="transparent"
          width={size[340]}
          borderColor="transparent"
          borderTopLeftRadius={size[10]}
          borderTopRightRadius={size[10]}
          borderBottomLeftRadius={size[10]}
          borderBottomRightRadius={size[10]}
          animateOnly={['opacity', 'transform']}
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
          <YStack
            pt={size[70]}
          >
            <Image source={IMAGES.bg_dialog_confirm} style={{ width: '100%', height: size[170], position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
            <YStack
              pb={size[16]}
              gap={size[32]}
              items="center"
              overflow="hidden"
              borderTopLeftRadius={size[10]}
              borderTopRightRadius={size[10]}
              borderBottomLeftRadius={size[10]}
              borderBottomRightRadius={size[10]}
              bg={theme.backgroundSurfaceRaisedL1?.val}
            >
              <AlertDialog.Title fontSize={size[24]} fontWeight="bold" width="100%">
                <YStack width="100%" height={size[100]} bg={theme.red10?.val}>
                  <LinearGradient
                    width="100%"
                    height="100%"
                    end={[1, 1]}
                    start={[0, 0]}
                    locations={[0, 0.5, 1]}
                    colors={['#74DBFE', '#8BB7FF', '#CB89FE']}
                  >
                  <YStack width="100%" height="100%" bg="rgba(0, 0, 0, .5)"/>
                </LinearGradient>
                </YStack>
              </AlertDialog.Title>
              <AlertDialog.Description fontSize={size[14]} px={size[16]} color={theme.textWeak?.val} text={"center" as any}>
                For your fund's safety, please set up a fund password first
              </AlertDialog.Description>
              <XStack justify={showCancel ? 'space-between' : 'center'} gap={size[10]} bg={theme.backgroundSurfaceRaisedL2?.val}>
                {showCancel && <AlertDialog.Cancel asChild>
                    <Button
                      flex={1}
                      width={size[150]}
                      height={size[46]}
                      borderTopLeftRadius={size[6]}
                      borderTopRightRadius={size[6]}
                      borderBottomLeftRadius={size[6]}
                      borderBottomRightRadius={size[6]}
                      bg={theme.surfaceRaisedL2?.val}
                    >
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                }
                <ActionButton
                  width={size[150]}
                  height={size[46]}
                  onPress={onConfirm}
                  borderTopLeftRadius={size[6]}
                  borderTopRightRadius={size[6]}
                  borderBottomLeftRadius={size[6]}
                  borderBottomRightRadius={size[6]}
                >
                  Confirm
                </ActionButton>
              </XStack>
            </YStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  )
}