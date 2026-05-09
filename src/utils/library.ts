export function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
        timeoutId = null
      }, delay - (currentTime - lastExecTime))
    }
  }
}