import { SvgXml } from "react-native-svg"
import { SVG } from "~/assets/modules/svg"
import { memo, useMemo, useState } from "react"
import { SidebarHeader } from "./modules/header"
import { SidebarBanner } from "./modules/banner"
import { SidebarActivity } from "./modules/activity"
import { Pressable, StyleSheet } from 'react-native'
import { SidebarCategories } from "./modules/categories"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useScreenSpace, useSizeTokens } from "~/store/modules/responsive"
import { Dialog, ScrollView, useTheme, VisuallyHidden, useThemeName } from "tamagui"

/** Right Drawer */
export const SlideDialog = memo(({ side = 'left' }: { side: 'right' | 'left' }) => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const isLeft = side === 'left'
  const themeName = useThemeName()
  const screenSpace = useScreenSpace()
  const [open, setOpen] = useState(false)

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    trigger: {
      borderWidth: 1,
      padding: rem[6],
      borderTopLeftRadius: rem[4],
      borderTopRightRadius: rem[4],
      borderBottomLeftRadius: rem[4],
      borderBottomRightRadius: rem[4],
      borderColor: theme.borderDefault?.val,
      backgroundColor: theme.backgroundSurfaceRaisedL2?.val,
    },
  }), [rem, themeName])
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/*
        Avoid Dialog.Trigger asChild + RN Pressable on iOS: merged onPress from Tamagui
        often does not fire. Control open explicitly and let SvgXml ignore pointer events.
      */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        style={styles.trigger}
        onPress={() => setOpen((prev) => !prev)}
      >
        <SvgXml
          pointerEvents="none"
          xml={SVG.menu}
          width={rem[16]}
          height={rem[16]}
          color={theme.iconDefault?.val}
        />
      </Pressable>

      <Dialog.Portal>
        <Dialog.Overlay
          opacity={0.5}
          transition="100ms" // [slow, lazy, medium, slow, bouncy, tooltip, spin, 100ms]
          key="RightSlideOverlay"
          exitStyle={{ opacity: 0 }}
          enterStyle={{ opacity: 0 }}
        >
          <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}/>
        </Dialog.Overlay>
        <Dialog.Content
          animateOnly={screenSpace ? ['opacity'] : ['transform', 'opacity']}
          enterStyle={{ x: isLeft ? '-100%' : '100%', opacity: 0 }} // 从右边进入
          exitStyle={{ x: isLeft ? '-100%' : '100%', opacity: 0 }} // 向右边退出
          l={isLeft ? screenSpace ? screenSpace : 0 : null} // 定位在左边
          r={isLeft ? null : screenSpace ? screenSpace : 0} // 定位在右边
          borderBottomLeftRadius={rem[12]}
          bg={theme.backgroundBody?.val}
          borderTopLeftRadius={rem[12]}
          borderBottomRightRadius={0}
          borderTopRightRadius={0}
          key="RightSlideContent"
          position="absolute"
          transition="100ms"
          width={rem[300]}
          p={rem[10]}
          opacity={1}
          scale={1}
          elevate
          t={0}
          b={0}
          x={0}
          y={0}
        >
          <VisuallyHidden>
            <Dialog.Title>title</Dialog.Title>
          </VisuallyHidden>
          {/* 对话框内容 */}
          <SidebarWidget />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
})

/** Sidebar Widget */
const SidebarWidget = () => {
  
  return (
    <SafeAreaProvider>
      {/* 头部(Logo/关闭按钮) */}
      <SidebarHeader />
      <ScrollView
        flex={1}
        overScrollMode="never"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* 模块 - 顶部内容 */}
        <SidebarBanner />
        {/* 模块 - 活动内容 */}
        <SidebarActivity />
        {/* 模块 - 分类内容 */}
        <SidebarCategories />
      </ScrollView>
    </SafeAreaProvider>
  )
}