import { useState } from 'react'
import { SizableText, Tabs, YStack, ScrollView, type TabsProps, type GetThemeValueForKey } from 'tamagui'

/** Segment component props */
interface SegmentProps extends Omit<TabsProps, 'shrink'> {
  block?: boolean
  shrink?: boolean
  tabWidth?: number
  fontSize?: number
  tabs?: Recordable[]
  active?: string | number
  color?: GetThemeValueForKey<"color">
  orientation?: 'horizontal' | 'vertical'
  activeColor?: GetThemeValueForKey<"color">
  underlineWidth?: GetThemeValueForKey<"width">
  activeTextColor?: GetThemeValueForKey<"color">
  activeTextWeight?: GetThemeValueForKey<"fontWeight">
  TabComponent?: ({tab, isActive, onPress}: {tab: Recordable, isActive: boolean, onPress: () => void}) => React.ReactNode
  onValueChange?: (value: string | number) => void
}

/** Segment component */
export function Segment({
  tabs = [],
  active = 0,
  height = 50,
  fontSize = 12,
  block = false,
  shrink = false, // 是否收缩
  tabWidth = 100,
  borderWidth = 2,
  underlineWidth = 1,
  borderTopLeftRadius = 0,
  borderTopRightRadius = 0,
  activeTextWeight = '400',
  orientation = 'horizontal', // 排列方向
  borderBottomLeftRadius = 0,
  borderBottomRightRadius = 0,
  color = '$textWeaker' as GetThemeValueForKey<"color">,
  activeTextColor = '$borderSelected' as GetThemeValueForKey<"color">,
  activeColor = '$backgroundSurfaceRaisedL2' as GetThemeValueForKey<"color">,
  bg = '$backgroundSurfaceLowered' as GetThemeValueForKey<"backgroundColor">,
  onValueChange,
  TabComponent,
  ...props
}: SegmentProps) {
  const [activeTab, setActiveTab] = useState(active)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    onValueChange?.(value)
  }

  return (
    // XStack 中使用宽度内容由撑开, YStack 中使用宽度充满父级
    <Tabs orientation={orientation} {...props}>
      <ScrollView
        bg={bg}
        height={height}
        showsHorizontalScrollIndicator={false}
        horizontal={orientation === 'horizontal'}
        borderTopLeftRadius={block ? borderTopLeftRadius : 0}
        borderTopRightRadius={block ? borderTopRightRadius : 0}
        borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
        borderBottomRightRadius={block ? borderBottomRightRadius : 0}
        contentContainerStyle={{ width: shrink ? 'min-content' : '100%' }}
      >
        {tabs.map((tab) => (
          <YStack
            width="max-content"
            key={tab.value}
            height={height}
            bg='transparent'
            p={block ? borderWidth : 0}
          >
            {TabComponent ? <TabComponent tab={tab} isActive={activeTab === tab.value} onPress={() => handleTabChange(tab.value)} /> : (
              <YStack
                height="100%"
                items="flex-end"
                width={block ? tabWidth : '100%'}
                justify={block ? 'center' : 'flex-end'}
                borderTopLeftRadius={block ? borderTopLeftRadius : 0}
                borderTopRightRadius={block ? borderTopRightRadius : 0}
                borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
                borderBottomRightRadius={block ? borderBottomRightRadius : 0}
                bg={block && activeTab === tab.value ? activeColor : 'transparent'}
                borderBottomWidth={activeTab === tab.value && !block ? underlineWidth : 0}
                borderBottomColor={activeTab === tab.value && !block ? activeColor: 'transparent'}
                onPress={() => handleTabChange(tab.value)}
              >
                <SizableText
                  px={block ? 0 : 10}
                  text="center"
                  width="100%"
                  fontSize={fontSize}
                  color={activeTab === tab.value ? activeTextColor : color}
                  fontWeight={activeTab === tab.value ? activeTextWeight : '400'}
                >
                  {tab.label}
                </SizableText>
              </YStack>
            )}
          </YStack>
        ))}
      </ScrollView>
    </Tabs>
  )
}
