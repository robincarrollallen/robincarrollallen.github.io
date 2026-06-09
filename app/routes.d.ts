// deno-lint-ignore-file
/* eslint-disable */
// biome-ignore: needed import
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: 
        | `/`
        | `/(tabbar)`
        | `/(tabbar)/deposit`
        | `/(tabbar)/deposit/`
        | `/(tabbar)/home`
        | `/(tabbar)/home/`
        | `/(tabbar)/invite`
        | `/(tabbar)/invite/`
        | `/(tabbar)/profile`
        | `/(tabbar)/profile/`
        | `/(tabbar)/profile/modules/navigation`
        | `/(tabbar)/profile/modules/navigation/components/LanguageContent`
        | `/(tabbar)/profile/modules/navigation/components/LogoutDialog`
        | `/(tabbar)/profile/modules/userInfo`
        | `/(tabbar)/profile/modules/userInfo/components/ConfirmDialog`
        | `/(tabbar)/profile/modules/userInfo/state`
        | `/(tabbar)/promo`
        | `/(tabbar)/promo/`
        | `/(tabbar)/promo/segments/list`
        | `/(tabbar)/promo/segments/list/data`
        | `/(tabbar)/promo/segments/unclaimed`
        | `/(tabbar)/promo/segments/unclaimed/logic`
        | `/(tabbar)/promo/segments/unclaimed/state`
        | `/_sitemap`
        | `/deposit`
        | `/deposit/`
        | `/home`
        | `/home/`
        | `/invite`
        | `/invite/`
        | `/profile`
        | `/profile/`
        | `/profile/modules/navigation`
        | `/profile/modules/navigation/components/LanguageContent`
        | `/profile/modules/navigation/components/LogoutDialog`
        | `/profile/modules/userInfo`
        | `/profile/modules/userInfo/components/ConfirmDialog`
        | `/profile/modules/userInfo/state`
        | `/promo`
        | `/promo/`
        | `/promo/segments/list`
        | `/promo/segments/list/data`
        | `/promo/segments/unclaimed`
        | `/promo/segments/unclaimed/logic`
        | `/promo/segments/unclaimed/state`
        | `/search`
      DynamicRoutes: `/game/${OneRouter.SingleRoutePart<T>}/${OneRouter.SingleRoutePart<T>}`
      DynamicRouteTemplate: `/game/[type]/[id]`
      IsTyped: true
      RouteTypes: {
        '/game/[type]/[id]': RouteInfo<{ type: string; id: string }>
      }
    }
  }
}

/**
 * Helper type for route information
 */
type RouteInfo<Params = Record<string, never>> = {
  Params: Params
  LoaderProps: { path: string; search?: string; subdomain?: string; params: Params; request?: Request }
}