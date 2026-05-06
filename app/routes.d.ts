// deno-lint-ignore-file
/* eslint-disable */
// biome-ignore: needed import
import type { OneRouter } from 'one'

declare module 'one' {
  export namespace OneRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: 
        | `/`
        | `/_sitemap`
        | `/home`
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