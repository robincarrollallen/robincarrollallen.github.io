import { useMemo } from 'react'
import { type Href } from 'one'
import { useRouter } from '~/router'
import { getRouteForRouteName, ROUTES } from '~/router/routes'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'

/** Tabbar Navigation Hook */
export function useTabbarNavigation() {
  const router = useRouter()

  return useMemo(() => ({
    navigate: (routeName: string, options: { replace: boolean } = { replace: false }) => {
      const routePath = getRouteForRouteName(routeName)?.path ?? ROUTES.root.path as Href

      if (options.replace) {
        router.replace(routePath)
      } else {
        router.push(routePath)
      }
    }
  }) as BottomTabBarProps['navigation'], [router])
}
