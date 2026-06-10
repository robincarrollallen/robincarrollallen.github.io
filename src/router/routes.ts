/** Routes Map */
export const ROUTES = {
  root: {
    name: 'root',
    path: '/',
    screen: 'root',
    auth: false,
  },
  tabbar: {
    name: '(tabbar)',
    path: '/(tabbar)',
    screen: '(tabbar)',
    auth: false,
  },
  home: {
    name: 'home',
    path: '/home',
    screen: 'home',
    auth: false,
  },
  promo: {
    name: 'promo',
    path: '/promo',
    screen: 'promo',
    auth: false,
  },
  deposit: {
    name: 'deposit',
    path: '/deposit',
    screen: 'deposit',
    auth: true,
  },
  invite: {
    name: 'invite',
    path: '/invite',
    screen: 'invite',
    auth: false,
  },
  game: {
    name: 'game',
    path: '/game/[type]/[id]',
    screen: 'game/[type]/[id]/index',
    auth: false,
  },
  search: {
    name: 'search',
    path: '/search',
    screen: 'search/index',
    auth: false,
  },
  profile: {
    name: 'profile',
    path: '/profile',
    screen: 'profile',
    auth: true,
  },
  withdrawPin: {
    name: 'withdrawPin',
    path: '/withdraw/pin',
    screen: 'withdraw/pin/index',
    auth: true,
  },
} as const

/** Tab / stack `name` → file-router `path` */
export function getRouteForRouteName(routeName: string) {
  return Object.values(ROUTES).find((r) => r.name === routeName)
}

/** Path to Name Map */
export const PATH_TO_NAME = Object.fromEntries(
  Object.values(ROUTES).map((route) => [route.path, route.name])
) as {
  readonly [K in keyof typeof ROUTES as (typeof ROUTES)[K]['path']]: (typeof ROUTES)[K]['name']
}

/** Check if the route path needs authentication */
export function isAuthRoute(path: string): boolean {
  /** First match static path */
  const route = Object.values(ROUTES).find((route) => route.path === path)
  if (route) {
    return route.auth !== false // If the route is not configured, it is considered to need login
  }
  
  /** Then match dynamic path */
  for (const route of Object.values(ROUTES)) {
    if (pathMatchesRoute(path, route.path)) {
      return route.auth !== false // If the route is not configured, it is considered to need login
    }
  }

  return true // Conservative: if not configured, it is considered to need login
}

/** A dynamic segment is either `:param` (colon) or `[param]` / `[...rest]` (Expo Router) */
function isDynamicSegment(segment: string): boolean {
  return segment.startsWith(':') || (segment.startsWith('[') && segment.endsWith(']'))
}

/** A catch-all segment matches the rest of the path, e.g. `[...slug]` */
function isCatchAllSegment(segment: string): boolean {
  return segment.startsWith('[...') && segment.endsWith(']')
}

/** Check if the path matches the route (supports `:param`, `[param]` and `[...rest]`) */
function pathMatchesRoute(actualPath: string, pattern: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/'
  const a = norm(actualPath)
  const b = norm(pattern)

  const aParts = a === '/' ? [] : a.split('/').filter(Boolean)
  const bParts = b === '/' ? [] : b.split('/').filter(Boolean)

  /** No dynamic segments → exact match */
  if (!bParts.some(isDynamicSegment)) {
    return a === b
  }

  for (let i = 0; i < bParts.length; i++) {
    const seg = bParts[i]!
    /** Catch-all matches every remaining segment (requires at least one) */
    if (isCatchAllSegment(seg)) {
      return aParts.length >= i + 1
    }
    /** Dynamic segment matches any single value */
    if (isDynamicSegment(seg)) {
      if (aParts[i] === undefined) return false
      continue
    }
    if (aParts[i] !== seg) return false
  }

  /** All pattern segments matched → lengths must line up exactly */
  return aParts.length === bParts.length
}