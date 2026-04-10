import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { validateInput } from '~/utils/validate'
import { useInputErrorMessage } from "~/hooks/input"
import { useSizeTokens } from '~/store/modules/responsive'
import { forwardRef, memo, useEffect, useMemo, useState } from 'react'
import { YStack, Text, XStack, Input, useTheme , type InputProps} from 'tamagui'

/** Field component props */
export interface FieldProps extends InputProps {
  type?: string
  bordered?: boolean
  label?: React.ReactNode
  errorMessage?: string
  required?: boolean
  error?: boolean
  clear?: boolean
  suffix?: React.ReactNode
  onValidate?: (value: boolean) => void
}

/** Field component */
export const Field = memo(forwardRef<
  React.ComponentRef<typeof Input>,
  FieldProps
>(({ label, errorMessage, required, error = false, suffix, bordered = true, clear = true, type = 'text', onValidate = () => {}, ...props }, ref) => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const inputErrorMessage = useInputErrorMessage()
  const [errorText, setErrorText] = useState(errorMessage)
  const [showPassword, setShowPassword] = useState(false)
  const [emptyError, setEmptyError] = useState(false)

  /** 是否显示密码 */
  const secureTextEntry = useMemo(() => {
    return type === 'password' && !showPassword
  }, [type, showPassword])

  /** 是否显示错误 */
  const hasError = useMemo(() => {
    if (error) {
      if (errorMessage) {
        setErrorText(errorMessage)
        return true
      }

      if (props.value) {
        const result = validateInput(props.value as string, type as keyof typeof inputErrorMessage)

        if (!result) {
          setErrorText(inputErrorMessage[type as keyof typeof inputErrorMessage] || '')
          return true
        }
      }
    }

    return false
  }, [error, props.value, type])

  /** 失去焦点 */
  const onBlur = () => {
    if (required && !props.value) {
      setEmptyError(true)
    }
  }

  useEffect(() => {
    if (hasError) {
      onValidate(false)
    } else {
      onValidate(true)
    }
  }, [hasError])
  
  return (
    <>
      <XStack
        gap="$2"
        p={rem[12]}
        width="100%"
        items="center"
        bg={theme.backgroundSurfaceLowered?.val}
        borderColor={theme.borderDefault?.val}
        style={{ borderRadius: rem[6] }}
        borderWidth={bordered ? rem[1] : 0}
      >
        { Label({ label }) }
        <Input
          py={0}
          px={rem[3]}
          flex={1}
          height={rem[22]}
          bg="transparent"
          borderWidth={0}
          secureTextEntry={secureTextEntry}
          focusStyle={{ outlineWidth: 0 }}
          placeholderTextColor={emptyError ? theme.danger?.val : theme.textWeaker?.val}
          onBlur={onBlur}
          {...props}
        />
        { clear && props.value
          ? <ClearButton onClear={() => props.onChangeText?.('')} />
          : null }
        { suffix ? suffix : null }
        { type === 'password'
          ? <YStack onPress={() => setShowPassword(!showPassword)}>{
              showPassword
              ? <SvgXml xml={SVG.eye} width={rem[20]} height={rem[20]} />
              : <SvgXml xml={SVG.eye_closed} width={rem[20]} height={rem[20]} />
            }</YStack>
          : null
        }
      </XStack>
      {error && <XStack items="center" gap="$2" opacity={hasError ? 1 : 0}>
        {<SvgXml xml={SVG.circle_alert} width={rem[12]} height={rem[12]} color={theme.danger?.val} />}
        <Text fontSize="$2" color={theme.danger?.val}>{errorText}</Text>
      </XStack>}
    </>
  )
}))

Field.displayName = 'Field'

const ClearButton = ({ onClear }: { onClear: () => void | undefined }) => {
  const theme = useTheme()
  const rem = useSizeTokens()

  return (
    <YStack aspectRatio={1} p={rem[5]} bg={theme.textWeakest?.val} style={{ borderRadius: "50%" }} onPress={onClear}>
      <SvgXml xml={SVG.close} width={rem[12]} height={rem[12]} />
    </YStack>
  )
}

const Label = ({ label }: { label?: React.ReactNode }) => {
  if (!label) return null
  
  if (typeof label === 'string') {
    return (
      <Text> {label} </Text>
    )
  }
  
  return label
}