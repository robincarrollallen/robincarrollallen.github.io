
import { delay } from '~/utils/time'
import { useSafeAreaInsets } from 'one'
import { Pressable } from 'react-native'
import { useCopy } from '~/hooks/message'
import { StyleSheet } from 'react-native'
import { SVG } from '~/assets/modules/svg'
import { useUserInfoState } from './state'
import { useCallback, useMemo} from 'react'
import { VipTag } from '~/components/VipTag'
import { ImageBackground } from 'expo-image'
import { IMAGES } from '~/assets/modules/images'
import { useVipStore } from '~/store/modules/vip'
import { useUserStore } from '~/store/modules/user'
import { ConfirmDialog } from './components/ConfirmDialog'
import { useSizeTokens } from '~/store/modules/responsive'
import { useGlobalLoading } from '~/provider/LoadingProvider'
import { YStack, XStack, Avatar, Text, useTheme, isWeb, styled } from 'tamagui'
import { Svg, Defs, RadialGradient, Stop, Rect, SvgXml } from 'react-native-svg';

export function UserInfo() {
  const copy= useCopy()
  const theme = useTheme()
  const rem = useSizeTokens()
  const loading = useGlobalLoading()
  const safeAreaInsets = useSafeAreaInsets()
  const vipInfo = useVipStore(state => state.vipInfo)
  const userInfo = useUserStore(state => state.userInfo)

  /** Withdraw callback */
  const handleWithdraw = useCallback(async () => {
    loading.show()
    await delay(2000)
    useUserInfoState.getState().setConfirmDialogOpen(true)
    loading.hide()
  }, [])

  const styles = useMemo(() => StyleSheet.create({
    withdrawButton: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: rem[4],
    },
  }), [rem])
  
  return (
    <ImageBackground
      source={IMAGES.yellow_dark_top_bg}
      style={{
        width: '100%',
        paddingHorizontal: rem[12],
        paddingTop: safeAreaInsets.top + rem[32],
        backgroundColor: theme.background?.get()
      }}
    >
      {/* 用户信息 */}
      <XStack gap={rem[12]}>
        <Avatar circular size={rem[56]}>
          <Avatar.Image src={userInfo.avatar} />
        </Avatar>
        <YStack gap={rem[4]} justify="center">
          <XStack items="center" gap={rem[10]}>
            <Text>{userInfo.userName}</Text>
            <VipTag level={vipInfo.currentVipLevel?.level ?? 0} />
          </XStack>
          <XStack items="center" gap={rem[10]}>
            <Text color={theme.textWeaker?.val} fontSize={rem[12]}>ID: {userInfo.id}</Text>
            <Pressable onPress={() => copy(userInfo.id)}>
              <SvgXml xml={SVG.copy} width={rem[12]} height={rem[12]} color={theme.iconBrandPrimary?.val} />
            </Pressable>
          </XStack>
        </YStack>
      </XStack>
      {/* 余额信息 */}
      <XStack width="100%" overflow="hidden" py={rem[16]} borderBottomColor={theme.borderDefault?.val} borderBottomWidth={rem[1]}>
        <YStack width="50%" gap={rem[4]} items="center" justify="center" position="relative">
          <Text color={theme.textWeaker?.val} fontSize={rem[10]}>Balance</Text>
          <XStack items="center" gap={rem[4]}>
            <Text fontSize={rem[16]}>R$</Text>
            <Text fontSize={rem[16]}>10,000.00</Text>
          </XStack>
          <ShadowGradient />
        </YStack>
        <YStack width="50%" gap={rem[4]} items="center" justify="center" position="relative">
          <Text color={theme.textWeaker?.val} fontSize={rem[10]}>The bonus received today</Text>
          <Text fontSize={rem[16]}>0.00</Text>
          <ShadowGradient />
        </YStack>
      </XStack>
      {/* 资金操作 */}
      <XStack width="100%" overflow="hidden" gap={rem[12]} py={rem[18]}>
        <YStack
          flex={1}
          py={rem[8]}
          px={rem[16]}
          gap={rem[4]}
          items="center"
          justify="center"
          borderTopLeftRadius={rem[8]}
          borderTopRightRadius={rem[8]}
          borderBottomLeftRadius={rem[8]}
          borderBottomRightRadius={rem[8]}
          bg={theme.backgroundSurfaceRaisedL2?.val}
          boxShadow={`0 ${-rem[26]}px ${rem[20]}px ${-rem[24]}px ${theme.glowSecondaryOpacity40?.val} inset`}
        >
          <XStack items="center" gap={rem[4]}>
            <SvgXml xml={SVG.pig} width={rem[30]} height={rem[30]} color={theme.iconBrandPrimary?.val} />
            <Text fontSize={rem[14]} fontWeight="600">{`Deposit`}</Text>
          </XStack>
        </YStack>
        <YStack
          flex={1}
          py={rem[8]}
          px={rem[16]}
          gap={rem[4]}
          items="center"
          justify="center"
          bg={theme.backgroundSurfaceRaisedL2?.val}
          style={{ borderRadius: rem[8] }}
          boxShadow={`0 ${-rem[26]}px ${rem[20]}px ${-rem[24]}px ${theme.glowSecondaryOpacity40?.val} inset`}
        >
          <Pressable style={styles.withdrawButton} onPress={handleWithdraw}>
            <SvgXml xml={SVG.wallet} width={rem[30]} height={rem[30]} color={theme.iconBrandPrimary?.val} />
            <Text fontSize={rem[14]} fontWeight="600">{`Withdraw`}</Text>
          </Pressable>
        </YStack>
      </XStack>
      <ConfirmDialog />
    </ImageBackground>
  )
}

/** 阴影渐变 */
function ShadowGradient() {
  const theme = useTheme()

  return (
    <Svg width='100%' style={{ position: 'absolute', bottom: '-180%', zIndex: -1 }}>
      <Defs>
        <RadialGradient
          id="radialGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="0%" stopColor={theme.glowPrimaryOpacity40?.val} stopOpacity={isWeb ? .5 : .4}/>
          <Stop offset="100%" stopColor="transparent" stopOpacity="0"/>
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#radialGradient)" />
    </Svg>
  )
}