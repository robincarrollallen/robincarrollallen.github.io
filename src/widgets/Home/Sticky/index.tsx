import { memo, useMemo } from "react"
import { Sprite } from "~/components/Sprite"
import { Segment } from "~/components/Segment"
import { ImageBackground } from "react-native"
import { IMAGES } from "~/assets/modules/images"
import { useRouter } from "~/router"
import { useGameStore } from "~/store/modules/game"
import { SPRITE_NAME } from "~/assets/modules/sprite"
import { useSizeTokens } from "~/store/modules/responsive"
import { StyleSheet, type ImageSourcePropType } from "react-native"
import { YStack, View, Text, useTheme, type XStackProps } from "tamagui"

/** Games Tab Sticky */
export function Sticky(props: XStackProps) {
  const theme = useTheme()
  const rem = useSizeTokens()
  const router = useRouter()
  const homeList = useGameStore(state => state.homeList)

  /** 切换 tab */
  const handleTabChange = (value: string | number) => {
    router.push(`/game/search/1212`)
  }

  return (
    <YStack pb={rem[12]} position="relative" {...props}>
      <Segment
        shrink
        bg={theme.backgroundBody?.val}
        height={rem[80]}
        TabComponent={TabComponent}
        onValueChange={handleTabChange}
        tabs={homeList.map((item) => ({ label: item.name, value: item.code }))}
      />
    </YStack>
  )
}

/** Tab Component */
const TabComponent = memo<{ tab: Recordable, isActive: boolean, onPress: () => void }>(({ tab, onPress }) => {
  const rem = useSizeTokens()

  const styles = useMemo(() => StyleSheet.create({
    imageBackground: {
      gap: rem[2],
      aspectRatio: 1,
      height: "100%",
      marginLeft: rem[8],
      alignItems: "center",
      justifyContent: "center",
    },
  }), [rem])

  return (
    <View onPress={onPress} height="100%">
      <ImageBackground
        imageStyle={{ borderRadius: rem[8] }}
        source={IMAGES.category_game_bg_25[tab.value as keyof typeof IMAGES.category_game_bg_25] as ImageSourcePropType}
        style={styles.imageBackground}
      >
        <Sprite iconName={tab.value} source={SPRITE_NAME.CATEGORY_GAME_25} width={rem[46]} height={rem[46]} />
        <Text fontSize={rem[12]} numberOfLines={1}>{tab.label}</Text>
      </ImageBackground>
    </View>
  )
})