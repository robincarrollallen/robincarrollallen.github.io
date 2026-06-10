import { SVG } from "~/assets/modules/svg"
import { useTheme, YStack } from "tamagui"
import { useState, type JSX } from "react"
import { Navigation } from "~/components/Navigation"
import { LogoutDialog } from "./components/LogoutDialog"
import { useSizeTokens } from "~/store/modules/responsive"
import { LanguageContent } from "./components/LanguageContent"

export function NavigationWrapper() {
  const theme = useTheme()
  const [logoutOpen, setLogoutOpen] = useState(false)
  const rem = useSizeTokens()

  const items: Array<{ title: string, icon: string, iconSize: number, content?: JSX.Element, onPress?: () => void }> = [
    { title: "Report", icon: SVG.report, iconSize: rem[24] },
    { title: "Invite", icon: SVG.invite, iconSize: rem[24] },
    { title: "Redeem", icon: SVG.redeem, iconSize: rem[24] },
    { title: "Security Center", icon: SVG.security, iconSize: rem[24] },
    { title: "Language", icon: SVG.language, iconSize: rem[24], content: <LanguageContent /> },
    { title: "Logout", icon: SVG.logout, iconSize: rem[24], onPress: () => { setLogoutOpen(true) } },
  ]

  return (
    <YStack gap={rem[12]} p={rem[12]}>
      <Navigation title="Support" icon={SVG.support} iconSize={rem[24]} iconColor={theme.textSuccess?.val} />
      <YStack bg={theme.backgroundSurfaceRaisedL1?.val} borderTopLeftRadius={rem[6]} borderTopRightRadius={rem[6]} borderBottomLeftRadius={rem[6]} borderBottomRightRadius={rem[6]}>
        {items.map((item) => (
          <Navigation onPress={item.onPress} key={item.title} title={item.title} icon={item.icon} iconSize={item.iconSize} content={item.content} />
        ))}
      </YStack>
      <LogoutDialog open={logoutOpen} setOpen={setLogoutOpen} />
    </YStack>
  )
}
