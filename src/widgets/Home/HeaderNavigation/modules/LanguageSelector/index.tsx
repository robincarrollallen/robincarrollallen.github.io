import { memo, useMemo } from "react"
import { SvgXml } from "react-native-svg"
import { StyleSheet } from "react-native"
import { SVG } from "~/assets/modules/svg"
import { setLanguage, useI18n } from "~/i18n"
import { useTenantStore } from "~/store/modules/tenant"
import { useSizeTokens } from "~/store/modules/responsive"
import { Menu, useTheme, View, useThemeName } from "tamagui"
import { LANGUAGE_NAME } from "~/enums/language"

/** Language Selector */
export const MainPageLanguageSelector = memo(() => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const themeName = useThemeName()
  const appLanguage = useTenantStore(state => state.tenantInfo.appLanguage)
  const { i18n } = useI18n()

  /** stylesheet */
  const styles = useMemo(() => StyleSheet.create({
    menuWrapper: {
      borderColor: theme.borderDefault?.val,
      backgroundColor: theme.backgroundSurfaceRaisedL2?.val,
    },
    flagIcon: {
      borderRadius: '50%'
    },
  }), [themeName]);

  return (
    <Menu offset={8}>
      <Menu.Trigger asChild>
        <View>
          <View cursor="pointer" style={styles.menuWrapper} p={rem[4]} borderWidth={1} borderTopLeftRadius={rem[4]} borderTopRightRadius={rem[4]} borderBottomLeftRadius={rem[4]} borderBottomRightRadius={rem[4]}>
            <SvgXml xml={SVG.earth} width={rem[20]} height={rem[20]} color={theme.iconDefault?.val} />
          </View>
        </View>
      </Menu.Trigger>

      <Menu.Portal zIndex={100}>
        <Menu.Content
          borderWidth={1}
          overflow="hidden"
          transition="100ms"
          borderTopLeftRadius={rem[8]}
          borderTopRightRadius={rem[8]}
          borderBottomLeftRadius={rem[8]}
          borderBottomRightRadius={rem[8]}
          boxShadow="0 4px 5px $shadowColor"
          borderColor={theme.borderDefault?.val}
          enterStyle={{ scale: 0.9, opacity: 0, y: -5 }}
          exitStyle={{ scale: 0.95, opacity: 0, y: -3 }}
        >
          <Menu.ScrollView bg={theme.backgroundSurfaceRaisedL1?.val}>
            {appLanguage.map(language => (
              <Menu.Item key={language} onSelect={() => { setLanguage(language) }} gap={rem[4]} p={rem[10]} bg={language === i18n.language ? theme.backgroundSurfaceRaisedL2?.val : 'transparent'}>
                <Menu.ItemIcon>
                  <SvgXml xml={SVG[`${language.split('-')[1]}` as keyof typeof SVG]} width={rem[16]} height={rem[16]} color={theme.iconDefault?.val} style={styles.flagIcon} />
                </Menu.ItemIcon>
                <Menu.ItemTitle fontSize={rem[12]}>
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