import { isWeb } from "tamagui"
import { useCallback } from "react"
import { setStringAsync } from 'expo-clipboard'
import { useToastState } from "~/provider/ToastProvider/hooks"

/** 复制到剪贴板 */
export const useCopy = () => {
  const { showToast } = useToastState()
	
	const copy = useCallback(async (text: string | number): Promise<boolean> => {
		const content = `${text}`

    try {
      if (isWeb) {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(content)
          showToast({ title: 'Copy success!' })
          return true
        } else {
          copyToClipboardLegacy(content) // 降级方案：使用旧的 document.execCommand
          showToast({ title: 'Copy success!' })
          return true
        }
      } else {
        await setStringAsync(content) // Native 使用 expo-clipboard
        showToast({ title: 'Copy success!' })
        return true
      }
    } catch (error) {
      console.error('复制失败:', error)
      return false
    }
  }, [])

	return copy
}

// 复制降级方案函数
const copyToClipboardLegacy = (text: string): boolean => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const success = document.execCommand('copy')
  document.body.removeChild(textarea)
  return success
}