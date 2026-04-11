// deno-lint-ignore-file
/* eslint-disable */
// biome-ignore: needed import
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: 
        | `/`
        | `/(app)`
        | `/(app)/auth`
        | `/(app)/auth/login`
        | `/(app)/auth/login/password`
        | `/(app)/start`
        | `/(app)/start/(tabs)`
        | `/(app)/start/(tabs)/feed`
        | `/(app)/start/(tabs)/feed/`
        | `/(app)/start/feed`
        | `/(app)/start/feed/`
        | `/(app)/start/settings`
        | `/(app)/start/settings/`
        | `/(app)/start/settings/blocked-users`
        | `/(app)/start/settings/edit-profile`
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
        | `/auth`
        | `/auth/login`
        | `/auth/login/password`
        | `/deposit`
        | `/deposit/`
        | `/game`
        | `/game/search`
        | `/game/search/`
        | `/home`
        | `/home/`
        | `/profile`
        | `/profile/`
        | `/search`
        | `/search/`
        | `/start`
        | `/start/(tabs)`
        | `/start/(tabs)/feed`
        | `/start/(tabs)/feed/`
        | `/start/feed`
        | `/start/feed/`
        | `/start/settings`
        | `/start/settings/`
        | `/start/settings/blocked-users`
        | `/start/settings/edit-profile`
      DynamicRoutes: 
        | `/(app)/auth/signup/${OneRouter.SingleRoutePart<T>}`
        | `/auth/signup/${OneRouter.SingleRoutePart<T>}`
      DynamicRouteTemplate: 
        | `/(app)/auth/signup/[method]`
        | `/auth/signup/[method]`
      IsTyped: true
      RouteTypes: {
        '/(app)/auth/signup/[method]': RouteInfo<{ method: string }>
        '/auth/signup/[method]': RouteInfo<{ method: string }>
      }
    }
  }
}

/**
 * Helper type for route information
 */
type RouteInfo<Params = Record<string, never>> = {
  Params: Params
  LoaderProps: { path: string; params: Params; request?: Request }
}