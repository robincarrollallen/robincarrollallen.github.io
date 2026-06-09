import { Image } from "expo-image";
import { Icon } from "~/components/Icon";
import { StyleSheet } from "react-native";
import { SVG } from "~/assets/modules/svg";
import { ICONS } from "~/assets/modules/icons";
import { XStack, Text, type YStackProps } from "tamagui";
import { useSizeTokens } from "~/store/modules/responsive";


export function VipTag({ level = 0, size = 24, fontSize = 10, ...props }: { level?: number, size?: number, fontSize?: number } & YStackProps) {
  const rem = useSizeTokens()

  // StyleSheet
  const styles = StyleSheet.create({
    icon: {
      position: 'absolute',
      left: rem[size as keyof typeof rem] / 2,
    },
  })

  return (
    <XStack gap={rem[4]} items="center" height={rem[size as keyof typeof rem]} position="relative" {...props}>
      <Icon
        src={SVG[`bg_vip_${Math.ceil((level + 1) / 5)}` as keyof typeof SVG]}
        width={rem[size as keyof typeof rem] * 2}
        height={rem[size as keyof typeof rem]}
        style={styles.icon}
      />
      <Image source={ICONS[`vip_${level + 1}` as keyof typeof ICONS]} style={{ height: '100%', aspectRatio: 1 }} />
      <XStack gap={rem[2]}>
        <Text fontSize={rem[fontSize as keyof typeof rem]} fontStyle="italic">VIP</Text>
        <Text fontSize={rem[fontSize as keyof typeof rem]} fontWeight="bold" fontStyle="italic">{level}</Text>
      </XStack>
    </XStack>
  ) 
}