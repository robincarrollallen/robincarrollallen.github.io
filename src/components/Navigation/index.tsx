import { memo, type JSX } from "react"
import { Icon } from "~/components/Icon"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { useSizeTokens } from "~/store/modules/responsive"
import { Text, useTheme, XStack, type XStackProps } from "tamagui"

interface NavigationProps extends Omit<XStackProps, 'content'> {
  icon?: string
  title: string
  iconSize?: number
  iconColor?: string
  content?: JSX.Element
  onPress?: () => void
}

export const Navigation = memo(({
  icon,
  title,
  content,
  iconSize = 24,
  iconColor,
  onPress = () => {},
  ...props
}: NavigationProps) => {
  const rem = useSizeTokens()
  const theme = useTheme()

  return (
    <XStack
      p={rem[12]}
      gap={rem[8]}
      items="center"
      borderTopLeftRadius={rem[6]}
      borderTopRightRadius={rem[6]}
      borderBottomLeftRadius={rem[6]}
      borderBottomRightRadius={rem[6]}
      bg={theme.backgroundSurfaceRaisedL1?.val}
      onPress={onPress}
      {...props}
    >
      <Icon src={icon} color={iconColor || theme.$iconWeaker?.get()} width={iconSize} height={iconSize} />
      <Text flex={content ? 0 : 1} fontSize={rem[12]}>{title}</Text>
      {content && <XStack flex={1} justify="flex-end">{content}</XStack>}
      <SvgXml xml={SVG.chevron} width={rem[20]} height={rem[20]} color={theme.iconDefault?.val} transform={`rotate(270)`}/>
    </XStack>
  )
})