import { useEffect, useState } from 'react'

/** 仅在浏览器完成首次挂载后为 true，SSR 与首帧均为 false */
export function useClientMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}