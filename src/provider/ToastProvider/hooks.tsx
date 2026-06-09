import { TOAST_POSITIONS } from "~/constants/layout"
import { toast, type ToastPosition, type ToastT } from "@tamagui/toast/v2"
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

/** ToastOptions type */
export type ToastOptions = Omit<ToastT, 'id' | 'title'> & {
  title?: React.ReactNode | (() => React.ReactNode)
  position?: ToastPosition
  visibleToasts?: number
  id?: number | string
  duration?: number
  gap?: number
}

/** ToastStateValue type */
export type ToastStateValue = {
  position: ToastPosition
  visibleToasts: number
  duration: number
  gap: number
  setGap: (n: number) => void
  setDuration: (n: number) => void
  setVisibleToasts: (n: number) => void
  setPosition: (p: ToastPosition) => void
  showToast: (options: ToastOptions) => void
}

/** ToastStateContext */
const ToastStateContext = createContext<ToastStateValue | null>(null)

/** useToastStateProviderValue, called only once within ToastProvider */
export function useToastStateProviderValue(): ToastStateValue {
  const [position, setPosition] = useState<ToastPosition>(TOAST_POSITIONS.TOP_CENTER) // Toast position
  const [visibleToasts, setVisibleToasts] = useState(1) // Toast visible toasts count
  const [duration, setDuration] = useState(3000) // Toast duration (ms)
  const [gap, setGap] = useState(14) // Toast gap (px)

  /** Show Toast */
  const showToast = useCallback((options: ToastOptions) => {
    const {
      position: p = TOAST_POSITIONS.TOP_CENTER,
      visibleToasts: vt = 1,
      duration: d = 3000,
      gap: g = 14,
    } = options

    setGap(g)
    setPosition(p)
    setDuration(d)
    setVisibleToasts(vt)

    toast(options.title, {
      icon: options.icon,
      description: options.description,
      closeButton: options.closeButton ?? false,
    })
  }, [])

  /** Toast State Values */
  return useMemo(
    () => ({
      gap,
      position,
      duration,
      visibleToasts,
      setVisibleToasts,
      setPosition,
      setDuration,
      showToast,
      setGap,
    }),
    [position, visibleToasts, duration, gap, showToast],
  )
}

/** useToastState hook */
export const useToastState = () => {
  const ctx = useContext(ToastStateContext)
  if (!ctx) {
    throw new Error("useToastState must be used within ToastProvider")
  }
  return ctx
}

/** ToastStateContextProvider, use for ToastProvider  */
export function ToastStateContextProvider({
  value,
  children,
}: {
  value: ToastStateValue
  children: ReactNode
}) {
  return <ToastStateContext.Provider value={value}>{children}</ToastStateContext.Provider>
}