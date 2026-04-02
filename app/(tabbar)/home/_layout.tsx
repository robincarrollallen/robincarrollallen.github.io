import { THEME } from '~/theme'
import { Slot, Stack } from 'one'
import { Menu } from '@tamagui/menu'
import { setLanguage } from '~/i18n'
import { memo, useMemo } from 'react'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { useTranslation } from 'react-i18next'
import { isNative } from '~/constants/platform'
import { LANGUAGE_NAME } from '~/enums/language'
import { Pressable, StyleSheet } from 'react-native'
import { useThemeStore } from '~/store/modules/theme'
import { useTenantStore } from '~/store/modules/tenant'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useSizeTokens } from '~/store/modules/responsive'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Text, YStack, XStack, useTheme, View, Image } from 'tamagui'
import i18n from 'i18next'

/** Main Page Layout */
export const HomeLayout = () => {
  return <>
    <Stack.Screen
      options={{
        headerShown: true,
        header: () => <MainPageHeader />,
      }}
    />
    <Slot />
  </>
}

/** Main Page Header */
const MainPageHeader = memo(() => {
  const insets = useSafeAreaInsets()

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      paddingTop: insets.top,
      backgroundColor: 'red',
    },
  }), [insets])
  
  return (
    <YStack style={styles.wrapper}>
      <MainPagePwaNavigation />
      <MainPageHeaderNavigation />
    </YStack>
  )
})

/** Main Page Header Content */
const MainPagePwaNavigation = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const setStyle = useThemeStore().setStyle

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      width: '100%',
      height: rem[50],
      backgroundColor: theme.backgroundSurfaceLowered?.val,
    },
  }), [rem])

  return (
    <XStack style={styles.wrapper}>
      <Pressable onPress={() => setStyle(THEME.STYLE_25)}>
        <Text>PWA Navigation</Text>
      </Pressable>
    </XStack>
  )
})

/** Main Page Header Content */
const MainPageHeaderNavigation = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const siteLogo = useTenantStore(state => state.tenantInfo.siteLogo)

  /** Stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    wrapper: {
      width: '100%',
      height: rem[50],
      position: 'relative',
      alignItems: 'center',
      paddingInline: rem[12],
      backgroundColor: theme.backgroundTopNavSecondary?.val,
    },
  }), [rem])

  return (
    <XStack style={styles.wrapper}>
      <LinearGradient
        start={[0, 0]}
        end={isNative ? [.8, 4] : [.1, .5]} // 近似125度角
        colors={[
          'transparent',              // 8%
          'rgba(255,255,255,0.06)', // 8%
          'rgba(255,255,255,0)',    // 20%
          'rgba(255,255,255,0.05)', // 20%
          'rgba(255,255,255,0)',    // 32%
          'rgba(255,255,255,0.04)', // 32%
          'rgba(255,255,255,0)',    // 44%
          'rgba(255,255,255,0.03)', // 44%
          'rgba(255,255,255,0)',    // 56%
          'rgba(255,255,255,0.02)', // 56%
          'rgba(255,255,255,0)',    // 68%
          'rgba(255,255,255,0.01)', // 68%
          'rgba(255,255,255,0)',    // 80%
        ]}
        locations={[0.08, 0.08, 0.2, 0.2, 0.32, 0.32, 0.44, 0.44, 0.56, 0.56, 0.68, 0.68, 0.80]}
        pointerEvents="none"
        position="absolute"
        inset={0}
      />
      <Image src={siteLogo} objectFit='contain' objectPosition="left" height={rem[36]} flex={1} />
      <LanguageSelector />
    </XStack>
  )
})

/** Language Selector */
const LanguageSelector = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const { i18n: i18nInstance } = useTranslation(undefined, { i18n })
  const appLanguage = useTenantStore(state => state.tenantInfo.appLanguage)

  return (
    <Menu offset={8}>
      <Menu.Trigger asChild>
        <View borderColor={theme.borderDefault?.val} p={rem[4]} borderWidth={1} borderTopLeftRadius={rem[4]} borderTopRightRadius={rem[4]} borderBottomLeftRadius={rem[4]} borderBottomRightRadius={rem[4]} bg={theme.backgroundSurfaceRaisedL2?.val}>
          <SvgXml xml={SVG.earth} width={rem[20]} height={rem[20]} color={theme.iconDefault?.val} />
        </View>
      </Menu.Trigger>

      <Menu.Portal zIndex={100}>
        <Menu.Content
          transition="100ms"
          enterStyle={{ scale: 0.9, opacity: 0, y: -5 }}
          exitStyle={{ scale: 0.95, opacity: 0, y: -3 }}
          boxShadow="0 4px 5px $shadowColor"
          borderWidth={1}
          borderColor={theme.borderDefault?.val}
          borderTopLeftRadius={rem[8]}
          borderTopRightRadius={rem[8]}
          borderBottomLeftRadius={rem[8]}
          borderBottomRightRadius={rem[8]}
          overflow="hidden"
        >
          <Menu.ScrollView bg={theme.backgroundSurfaceRaisedL1?.val}>
            {appLanguage.map(language => (
              <Menu.Item key={language} onSelect={() => { setLanguage(language) }} gap={rem[4]} p={rem[10]} bg={language === i18nInstance.language ? theme.backgroundSurfaceRaisedL2?.val : 'transparent'}>
                <Menu.ItemIcon>
                  <SvgXml xml={SVG[`${language.split('-')[1]}` as keyof typeof SVG]} style={{ borderRadius: '50%' }} width={rem[16]} height={rem[16]} color={theme.iconDefault?.val} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>
                  {LANGUAGE_NAME[language as keyof typeof LANGUAGE_NAME]}
                </Menu.ItemTitle>
              </Menu.Item>  
            ))}
          </Menu.ScrollView>
        </Menu.Content>
      </Menu.Portal>
    </Menu>
  )
})