import { forwardRef } from "react"
import { StyleSheet } from "react-native"
import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { XStack, YStack, Text, useTheme, type XStackProps, type TamaguiElement } from "tamagui"

export const GameWrapperFooter = forwardRef<TamaguiElement, XStackProps & { showAll?: boolean, onPress?: () => void }>((
  {
    showAll,
    onPress,
    ...props
  },
  ref
) => {
  const theme = useTheme()

  return (
    <XStack gap={10} justify="center" items="center" py={12} ref={ref} {...props}>
      <Text fontSize={12}>{showAll ? 'Collapse' : 'Display All'}</Text>
      <YStack height={10} width={10} bg={theme.iconBrandSecondary?.val} style={styles.border} onPress={onPress}>
        {
          showAll
          ? <SvgXml xml={SVG.chevron} width={10} height={10} color={theme.background?.val} style={styles.chevronUp} />
          : <SvgXml xml={SVG.chevron} width={10} height={10} color={theme.background?.val} />
        }
      </YStack>
    </XStack>
  )
})

/** Stylesheet */
const styles = StyleSheet.create({
  border: {
    borderRadius: '50%',
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
  },
})