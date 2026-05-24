import { useMemo } from 'react'
import { useRouter, type Href } from 'one'
import { getRouteForRouteName, ROUTES } from '~/router/routes'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Navigation Hook */
export function useTabbarNavigation() {
  const router = useRouter()

  return useMemo(() => ({
    navigate: (routeName: string) => {
      const route = getRouteForRouteName(routeName)
      router.push(route?.path as Href ?? ROUTES.root.path)
    }
  }) as BottomTabBarProps['navigation'], [router])
}
