import { XStack, View, Input, useTheme } from 'tamagui'
import { useSizeTokens } from '~/store/modules/responsive'
import { useRef, useState, useEffect, useMemo, memo, forwardRef } from 'react'
import type { TextInput } from 'react-native'

interface PasswordInputProps {
  length?: number // 密码长度
  autofocus?: boolean // 自动聚焦
  onInput?: (value: string) => void // input 事件
  onChange?: (value: string) => void // update:modelValue 事件
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  (
    {
      length = 6,
      autofocus = false,
      onInput,
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput | null>(null)
    const [password, setPassword] = useState('')
    const [focusIndex, setFocusIndex] = useState(-1)
    const size = useSizeTokens()
    const theme = useTheme()

    // 密码点数组（用于显示密码点）
    const passwordArray = useMemo(() => {
      const arr = Array(length).fill(null)
      password
        .toString()
        .split('')
        .forEach((char, index) => {
          arr[index] = char
        })
      return arr
    }, [password, length])

    // 自动聚焦
    useEffect(() => {
      if (autofocus && inputRef.current) {
        inputRef.current.focus()
      }
    }, [autofocus])

    // 输入事件回调
    const handleInput = (passwordStr: string) => {
      if (!/^\d*$/.test(passwordStr)) {
        const cleaned = passwordStr.replace(/\D/g, '')
        setPassword(cleaned)
        onInput?.(cleaned)
        onChange?.(cleaned)
        return
      }
      
      const truncated = passwordStr.slice(0, length)
      setPassword(truncated)
      setFocusIndex(truncated.length)
      
      onInput?.(truncated)
      onChange?.(truncated)
    }

    // 聚焦事件回调
    const handleFocus = () => {
      setFocusIndex(password.length)
    }

    // 失焦事件回调
    const handleBlur = () => {
      setFocusIndex(-1)
    }

    return (
      <XStack
        items="center"
        width="100%"
        gap="4%"
      >
        {passwordArray.map((item, index) => (
          <View
            key={index}
            flex={1}
            aspectRatio={1}
            justify="center"
          >
            <View
              width="100%"
              height="100%"
              items="center"
              justify="center"
              borderTopLeftRadius={size[4]}
              borderTopRightRadius={size[4]}
              borderBottomLeftRadius={size[4]}
              borderBottomRightRadius={size[4]}
              bg={theme.backgroundSurfaceRaisedL2?.val}
            >
              {item !== null ? (
                // 密码点
                <View
                  width='25%'
                  height='25%'
                  bg={theme.color?.val}
                  borderTopLeftRadius={size[10]}
                  borderTopRightRadius={size[10]}
                  borderBottomLeftRadius={size[10]}
                  borderBottomRightRadius={size[10]}
                />
              ) : focusIndex === index ? (
                // 光标
                <Cursor />
              ) : <View width='25%' height='25%' />}
            </View>
          </View>
        ))}

        {/* 隐藏的输入框 */}
        <Input
          ref={(el) => {
            const node = el as unknown as TextInput | null
            inputRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          width="100%"
          inputMode="numeric"
          maxLength={length}
          value={password}
          onFocus={handleFocus}
          onChangeText={handleInput}
          onBlur={handleBlur}
          caretHidden
          color="transparent"
          bg="transparent"
          borderWidth={0}
          outlineWidth={0}
          outlineColor="transparent"
          outlineStyle="none"
          focusStyle={{
            outlineColor: 'transparent',
          }}
          position="absolute"
          {...props}
        />
      </XStack>
    )
  },
)

/** 光标 */
const Cursor = memo(() => {
  const theme = useTheme()
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(!show)
    }, 500)
    return () => clearInterval(interval)
  }, [show])

  return (
    <View
      width={1}
      bg={theme.color?.val}
      height='40%'
      opacity={show ? 1 : 0}
    />
  )
})

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput