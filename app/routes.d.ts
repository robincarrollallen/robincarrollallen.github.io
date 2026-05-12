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
        | `/(tabbar)/activity`
        | `/(tabbar)/activity/`
        | `/(tabbar)/deposit`
        | `/(tabbar)/deposit/`
        | `/(tabbar)/home`
        | `/(tabbar)/home/`
        | `/(tabbar)/profile`
        | `/(tabbar)/profile/`
        | `/(tabbar)/search`
        | `/(tabbar)/search/`
        | `/_sitemap`
        | `/activity`
        | `/activity/`
        | `/deposit`
        | `/deposit/`
        | `/home`
        | `/home/`
        | `/profile`
        | `/profile/`
        | `/search`
        | `/search/`
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