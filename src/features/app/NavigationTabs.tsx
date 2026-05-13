import { ROUTES } from '~/router/routes'
import { useMedia, XStack } from 'tamagui'
import { Link, usePathname, type Href } from 'one'
import { Pressable } from '~/interface/buttons/Pressable'
import { HouseIcon } from '~/interface/icons/phosphor/HouseIcon'
import { UserCircleIcon } from '~/interface/icons/phosphor/UserCircleIcon'

type TabRoute = {
  name: string
  href: Href
  icon: any
}

const routes: TabRoute[] = [
  { name: ROUTES.home.name, href: ROUTES.home.path, icon: HouseIcon },
  { name: ROUTES.profile.name, href: ROUTES.profile.path, icon: UserCircleIcon },
]

export function NavigationTabs() {
  const pathname = usePathname()
  const media = useMedia()
  const iconSize = media.sm ? 24 : 20

  const currentTab =
    routes.find((r) => pathname.startsWith(r.href as string))?.name ?? 'home'

  return (
    <XStack gap="$2">
      {routes.map((route) => {
        const Icon = route.icon
        const isActive = currentTab === route.name
        return (
          <Link key={route.name} href={route.href}>
            <Pressable
              px="$4"
              py="$2"
              rounded="$4"
              bg={isActive ? '$color3' : 'transparent'}
              hoverStyle={{ bg: '$color2' }}
            >
              <Icon size={iconSize} color={isActive ? '$color12' : '$color10'} />
            </Pressable>
          </Link>
        )
      })}
    </XStack>
  )
}
