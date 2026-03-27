import { ScrollView, SizableText, Theme, XStack, YStack } from 'tamagui'
import { H1, H3 } from '~/interface/text/Headings'

export function ActivityPage() {
  return (
    <ScrollView flex={1} bg="red">
      <YStack px="$4" pt="$6" pb="$10" gap="$5" maxW={560} width="100%" mx="auto">
        <YStack gap="$2">
          <H1 size="$8">Tabbar 主入口</H1>
          <SizableText size="$4" color="$color10">
            用于检查字体、间距、主题色与安全区在 Tab 下的显示是否正常。
          </SizableText>
        </YStack>

        <XStack gap="$3" flexWrap="wrap">
          <YStack flex={1} minW={100} p="$3" bg="$color3" rounded="$4" items="center">
            <SizableText size="$2" color="$color10">
              区块 A
            </SizableText>
            <SizableText size="$6" fontWeight="700">
              12
            </SizableText>
          </YStack>
          <YStack flex={1} minW={100} p="$3" bg="$color3" rounded="$4" items="center">
            <SizableText size="$2" color="$color10">
              区块 B
            </SizableText>
            <SizableText size="$6" fontWeight="700">
              34
            </SizableText>
          </YStack>
        </XStack>

        <Theme name="blue">
          <YStack p="$4" bg="$color3" rounded="$4" borderWidth={1} borderColor="$color6" gap="$2">
            <H3 size="$6" color="$color11">
              主题卡片（blue）
            </H3>
            <SizableText size="$4" color="$color11" opacity={0.85}>
              背景与边框使用 Tamagui 语义色，可用来对比明暗模式。
            </SizableText>
          </YStack>
        </Theme>

        <Theme name="yellow">
          <YStack p="$4" bg="$color3" rounded="$4" gap="$2">
            <H3 size="$6">强调区域（yellow）</H3>
            <SizableText size="$4" opacity={0.9}>
              正文多行示例：外卖列表、订单状态、按钮组合等都可以先在这里试版式。
            </SizableText>
          </YStack>
        </Theme>
      </YStack>
    </ScrollView>
  )
}
