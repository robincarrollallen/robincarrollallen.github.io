import '~/features/storage/setupStorage'
import '~/helpers/crypto/polyfill'

import { setupDev } from 'tamagui'

console.info(`[client] start (SHA: ${process.env.GIT_SHA})`)

if (process.env.NODE_ENV === 'development') {
  // hold down option in dev mode to see Tamagui dev visualizer
  setupDev({
    visualizer: true,
  })

  // 含 undefined 参数的地址不写入 history
  if (typeof window !== 'undefined') {
    const blockBad = (orig: typeof history.replaceState, name: string) =>
      function (this: History, ...args: Parameters<typeof history.replaceState>) {
        const url = args[2]
        if (typeof url === 'string' && /\/undefined(\/|$|\?)/.test(url)) {
          console.warn(`[history.${name}] blocked malformed url:`, url)
          return
        }
        return orig.apply(this, args)
      }
    history.replaceState = blockBad(history.replaceState, 'replaceState')
    history.pushState = blockBad(history.pushState, 'pushState')
  }
}
