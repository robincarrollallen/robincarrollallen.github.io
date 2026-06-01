import { ROUTES } from "~/router/routes"
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import type { TabNavigationState, ParamListBase } from '@react-navigation/native'

/** Tabbar State Hook */
export const useTabbarState = () => {

  return {
    /** Tabbar State */
    state: {
      routeNames: [
        ROUTES.home.name,
        ROUTES.promo.name,
        ROUTES.invite.name,
        ROUTES.deposit.name,
        ROUTES.profile.name
      ]
    } as TabNavigationState<ParamListBase>,
    /** Tabbar Descriptors */
    descriptors: {} as BottomTabBarProps['descriptors']
  }
}
