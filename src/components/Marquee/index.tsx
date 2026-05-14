import { useSizeTokens } from '~/store/modules/responsive'
import { isWeb, XStack } from 'tamagui'
import { Animated, Easing, type LayoutChangeEvent } from 'react-native'
import type { ComponentProps } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export function MarqueeComponent({ 
  messages, 
  color,
  speed = 50,
  ...props 
}: { 
  messages: Recordable[]
  color?: any
  speed?: number
} & ComponentProps<typeof XStack>) {
  const rem = useSizeTokens()
  const [viewWidth, setViewWidth] = useState(0)
  const [textWidth, setTextWidth] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)
  
  const translateX = useRef(new Animated.Value(0)).current

  const handleViewLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setViewWidth(width)
  }, [])

  const handleTextLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTextWidth(width)
  }, [])

  const duration = useMemo(() => {
    return ((viewWidth + textWidth) / speed) * 1000
  }, [viewWidth, textWidth, speed])

  // 启动动画
  useEffect(() => {
    if (!viewWidth || !textWidth) return

    // 重置位置
    translateX.setValue(viewWidth)

    // 创建动画
    const animation = Animated.timing(translateX, {
      toValue: -textWidth,
      duration,
      useNativeDriver: true, // 使用原生驱动，性能最佳
      easing: Easing.linear,
    })

    // 监听动画完成
    animation.start(({ finished }) => {
      if (finished) {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
      }
    })

    return () => {
      animation.stop()
    }
  }, [viewWidth, textWidth, currentMessage, duration, translateX, messages.length])

  return (
    <XStack
      height="100%"
      overflow="hidden"
      items="center"
      onLayout={handleViewLayout}
      pointerEvents="none"
      {...props}
      {...(isWeb ? { justify: 'center' } : {})}
    >
      <Animated.Text
        numberOfLines={1}
        style={{
          color,
          fontSize: rem[14],
          opacity: viewWidth && textWidth ? 1 : 0,
          transform: [{ translateX }],
          flexShrink: 0,
        }}
        onLayout={handleTextLayout}
      >
        {messages[currentMessage]?.content}
      </Animated.Text>
    </XStack>
  )
}