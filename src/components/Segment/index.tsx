import { Pressable } from 'react-native'
import { useState, useRef, useCallback } from 'react'
import { SizableText, isWeb, Tabs, YStack, ScrollView, type TabsProps, type GetThemeValueForKey } from 'tamagui'

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
  const startXRef = useRef(0)
  const scrollXRef = useRef(0)
  const movedRef = useRef(false)
  const startScrollXRef = useRef(0)
  const scrollRef = useRef<any>(null)
  const isPressingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeTab, setActiveTab] = useState(active)
  const LONG_PRESS_MS = 180 // long press time

  /** tab change handler */
  const handleTabChange = useCallback((value: string) => {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    setActiveTab(value)
    onValueChange?.(value)
  }, [])

  /** clear press timer */
  const clearPressTimer = useCallback(() => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
  }, [])

  /** mouse down handler */
  const handleMouseDown = useCallback((e: any) => {
    if (!isWeb || e.button !== 0) return
    isPressingRef.current = true
    movedRef.current = false
    startXRef.current = e.clientX
    startScrollXRef.current = scrollXRef.current

    clearPressTimer()
    pressTimerRef.current = setTimeout(() => {
      if (isPressingRef.current) isDraggingRef.current = true
    }, LONG_PRESS_MS)
  }, [])

  /** mouse move handler */
  const handleMouseMove = useCallback((e: any) => {
    if (!isWeb || !isDraggingRef.current) return
    const dx = e.clientX - startXRef.current
    if (Math.abs(dx) > 2) movedRef.current = true
    scrollRef.current?.scrollTo?.({
      x: Math.max(0, startScrollXRef.current - dx),
      animated: false,
    })
  }, [])

  /** mouse up or leave handler */
  const handleMouseUpOrLeave = useCallback(() => {
    isPressingRef.current = false
    isDraggingRef.current = false
    clearPressTimer()
  }, [])

  return (
    <Tabs orientation={orientation} {...props}>
      <ScrollView
        bg={bg}
        height={height}
        ref={scrollRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        horizontal={orientation === 'horizontal'}
        borderTopLeftRadius={block ? borderTopLeftRadius : 0}
        borderTopRightRadius={block ? borderTopRightRadius : 0}
        borderBottomLeftRadius={block ? borderBottomLeftRadius : 0}
        borderBottomRightRadius={block ? borderBottomRightRadius : 0}
        contentContainerStyle={{ width: shrink ? 'min-content' : '100%' }}
        onScroll={(e) => { scrollXRef.current = e.nativeEvent.contentOffset.x }}
        {...(isWeb ? { onMouseDown: handleMouseDown, onMouseMove: handleMouseMove, onMouseUp: handleMouseUpOrLeave, onMouseLeave: handleMouseUpOrLeave } : {})}
      >
        {tabs.map((tab) => (
          <YStack
            key={tab.value}
            height={height}
            bg='transparent'
            width="max-content"
            p={block ? borderWidth : 0}
          >
            {!!TabComponent ? <TabComponent tab={tab} isActive={activeTab === tab.value} onPress={() => handleTabChange(tab.value)} /> : (
              <Pressable onPress={() => handleTabChange(tab.value)} style={{ height: '100%' }}>
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
              </Pressable>
            )}
          </YStack>
        ))}
      </ScrollView>
    </Tabs>
  )
}
