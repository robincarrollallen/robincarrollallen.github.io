import { isWeb } from 'tamagui'
import { useEffect, useState } from 'react'
import { useSafeAreaInsets, type useSafeAreaInsets as nativeHook } from 'react-native-safe-area-context'

/** Use Client Mounted Hook for web CSR and native */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

/** Use Safe Area Insets Hook */
export function useSafeArea(): ReturnType<typeof nativeHook> {
  if (isWeb) {
    return {
      top: getSafeAreaInset('top'),
      bottom: getSafeAreaInset('bottom'),
      left: getSafeAreaInset('left'),
      right: getSafeAreaInset('right'),
    }
  }
  
  return useSafeAreaInsets()
}

/** Get Safe Area Inset for web */
const getSafeAreaInset = (side: 'top' | 'bottom' | 'left' | 'right'): number => {
  if (typeof window === 'undefined') return 0
  
  const div = document.createElement('div') // 创建临时元素，应用 env()
  div.style.paddingTop = `env(safe-area-inset-${side}, 0px)`
  document.body.appendChild(div)
  
  const value = parseFloat(getComputedStyle(div).paddingTop) || 0 // 读取计算后的值
  
  document.body.removeChild(div)
  return value
}
