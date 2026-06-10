import { isWeb } from 'tamagui'
import { useUserStore } from '~/store/modules/user'
import { useMemo, useSyncExternalStore } from 'react'
import { useStatusStore } from '~/store/modules/status'
import { routerStore, useRouter as useOneRouter, type Href } from 'one'
import { ROUTES, isAuthRoute, getRouteForRouteName, PATH_TO_NAME } from './routes'

/**
 * `one`'s route-info store, read through the publicly-exported `routerStore` namespace.
 *
 * We deliberately do NOT use `one`'s `useStoreRouteInfo()` / `usePathname()` here:
 * those hooks call `syncStoreRootState()` first, which — when invoked from the root
 * layout (above the navigator) — resolves the not-yet-ready root navigation state and
 * throws on native iOS ("Cannot read property 'pathname' of undefined", reported at the
 * call site `useStoreRouteInfo()`). The crash happens *inside* the call, so an outer
 * `?.` cannot guard it.
 *
 * Instead we subscribe to the same store via `subscribeToRootState` and read the raw
 * `routeInfoSnapshot`, skipping the throwing sync. The navigator still keeps this store
 * up to date (it notifies these subscribers on every navigation change), so the value
 * is correct once navigation initializes and is simply `undefined` before then.
 */
const routeInfoStore = routerStore as unknown as {
  subscribeToRootState: (onStoreChange: () => void) => () => void
  routeInfoSnapshot: () => { pathname?: string } | undefined
}

/** Null-safe pathname hook (returns '' until navigation is initialized). */
function usePathname(): string {
  const routeInfo = useSyncExternalStore(
    routeInfoStore.subscribeToRootState,
    routeInfoStore.routeInfoSnapshot,
    routeInfoStore.routeInfoSnapshot,
  )
  const pathname = routeInfo?.pathname
  if (typeof pathname !== 'string') return ''
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

/** App Router Hook */
function useRouter() {
  const router = useOneRouter()
  const showLoginPopup = useStatusStore.getState().showLoginPopup

  return useMemo(() => ({
    push: (href: Href | string, options?: any) => {
      const token = useUserStore.getState().token
      const blocked = !token && isAuthRoute(href as string)
      if (blocked) {
        return showLoginPopup();
      }

      if (isWeb && typeof window !== 'undefined') {
        window.history.pushState(window.history.state, '', `${href}`)
        // window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
        // window.location.href = `${href}`
        router.replace(href as Href, options)
        return 
      }

      router.push(href as Href)
    },
    replace: (href: Href | string, options?: any) => {
      const token = useUserStore.getState().token
      const blocked = !token && isAuthRoute(href as string)
      if (blocked) {
        return showLoginPopup();
      }

      router.replace(href as Href, options)
    },
    navigate: (href: Href | string, options?: any) => {
      const token = useUserStore.getState().token
      const blocked = !token && isAuthRoute(href as string)
      if (blocked) {
        return showLoginPopup();
      }

      if (isWeb && typeof window !== 'undefined') {
        return router.push(href as Href, options)
      }

      router.navigate(href as Href)
    },
    back: (...args: Parameters<typeof router.back>) => {
      // On web we drive history manually via pushState in `push`, so the
      // navigator stack only ever holds a single screen. Calling the
      // navigator's `back` there throws "GO_BACK was not handled". Use the
      // browser history instead, which we keep in sync.
      if (isWeb && typeof window !== 'undefined') {
        return window.history.back()
      }

      router.back(...args)
    },
  }), [])
}

export { 
  ROUTES,
  PATH_TO_NAME,
  getRouteForRouteName,
  isAuthRoute,
  useRouter,
  usePathname,
}