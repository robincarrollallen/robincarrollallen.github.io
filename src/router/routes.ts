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
  activity: {
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
    path: '/game',
    screen: 'game/[type]/[id]/index',
    auth: false,
  },
  search: {
    name: 'search',
    path: '/search',
    screen: 'search',
    auth: false,
  },
  profile: {
    name: 'profile',
    path: '/profile',
    screen: 'profile',
    auth: false,
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

/** Check if the path matches the route (dynamic path) */
function pathMatchesRoute(actualPath: string, pattern: string): boolean {
  const norm = (p: string) => p.replace(/\/+$/, '') || '/'
  const a = norm(actualPath)
  const b = norm(pattern)

  if (!b.includes('/:')) {
    return a === b
  }

  const aParts = a === '/' ? [] : a.split('/').filter(Boolean)
  const bParts = b === '/' ? [] : b.split('/').filter(Boolean)
  if (aParts.length !== bParts.length) return false

  for (let i = 0; i < bParts.length; i++) {
    if (bParts[i]?.startsWith(':')) continue
    if (aParts[i] !== bParts[i]) return false
  }
  
  return true
}