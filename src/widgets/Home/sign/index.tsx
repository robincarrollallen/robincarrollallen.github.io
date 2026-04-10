import { memo } from "react"
import { useRouter } from "one"
import { Image } from "expo-image"
import { Svg } from "~/components/Svg"
import { ICONS } from "~/assets/modules/icons"
import { useUserStore } from "~/store/modules/user"
import { useStatusStore } from "~/store/modules/status"
import { LinearGradient } from "tamagui/linear-gradient"
import { useResponsiveStore, useSizeTokens } from "~/store/modules/responsive"
import { XStack, Text, Square, Avatar, YStack, type XStackProps, useTheme } from "tamagui"

/** Home Page Sign */
export const HomePageSign = memo((props: XStackProps) => {
  const theme = useTheme()
  const router = useRouter()
  const rem = useSizeTokens()
  const userInfo = useUserStore(state => state.userInfo)
  const screenWidth = useResponsiveStore.getState().screenWidth
  const showLoginPopup = useStatusStore(state => state.showLoginPopup)
  const showRegisterPopup = useStatusStore(state => state.showRegisterPopup)

  const handleDeposit = () => {
    router.replace('/deposit')
  }

  return (
    <XStack pl={rem[38]} pr={rem[18]} mt={rem[12]} mb={rem[24]} position='relative' {...props}>
      <XStack flex={1} items='center' justify='space-between' height={rem[60]}>
        <Svg.SkewBorder position='absolute' z={-1} width={screenWidth - rem[38] - rem[18]} />
        <XStack gap={rem[12]} items='center' m={-rem[16]}>
          {userInfo.id
          ? <Avatar circular size={rem[56]}>
              <Avatar.Image src={userInfo.avatar} />
            </Avatar>
          : <Square overflow="hidden" borderTopLeftRadius={rem[16]} borderTopRightRadius={rem[16]} borderBottomLeftRadius={rem[16]} borderBottomRightRadius={rem[16]}>
              <LinearGradient
                start={[0, 0]}
                end={[1, 1]}
                p={rem[9]}
                colors={['$gradientsPrimaryA', '$gradientsPrimaryB']}
              >
                <Svg.UserIcon size={rem[18]} style={{ zIndex: 1 }}/>
              </LinearGradient>
            </Square>}
          {
            userInfo.id
            ? <YStack>
                <XStack items="center" gap={rem[8]}>
                  <Image source={ICONS.assets_25} style={{ width: rem[20], height: rem[20] }} />
                  <Text fontSize={rem[12]}>Balance</Text>
                </XStack>
                <Text color={theme.textWarning?.val} fontWeight="bold" fontSize={rem[14]}>R$ 10,000.00</Text>
            </YStack>
            : <Text fontSize={rem[16]}>Welcome</Text>
          }
        </XStack>
        <XStack gap={4} pr={rem[12]}>
          {!userInfo.id && <Svg.SkewButton height={rem[30]} minW={rem[74]} onPress={showLoginPopup}>
            <Text fontSize={rem[12]}>Login</Text>
          </Svg.SkewButton>}
          {!userInfo.id && <Svg.SkewButton
            minW={rem[74]}
            height={rem[30]}
            primaryColor="$inverse600"
            secondaryColor="$inverse500"
            strokeColor="$btnBorderLevel3"
            onPress={showRegisterPopup}
          >
            <Text fontSize={rem[12]}>Register</Text>
          </Svg.SkewButton>}
          {userInfo.id && <Svg.SkewButton height={rem[30]} minW={rem[74]} onPress={handleDeposit}>
            <Text fontSize={rem[12]}>Deposit</Text>
          </Svg.SkewButton>}
        </XStack>
      </XStack>
    </XStack>
  )
})