import { useMemo } from 'react'
import { type Href } from 'one'
import { useRouter } from '~/router'
import { getRouteForRouteName, ROUTES } from '~/router/routes'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Navigation Hook */
export function useTabbarNavigation() {
  const router = useRouter()

  return useMemo(() => ({
    navigate: (routeName: string) => {
      const route = getRouteForRouteName(routeName)
      const path = route?.path ?? ROUTES.root.path

      router.push(path as Href)
    }
  }) as BottomTabBarProps['navigation'], [router])
}
