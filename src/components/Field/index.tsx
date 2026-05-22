import { Pressable } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { SVG } from '~/assets/modules/svg'
import { INPUT_TYPE } from '~/enums/types'
import { validateInput } from '~/utils/validate'
import { useSizeTokens } from '~/store/modules/responsive'
import { forwardRef, memo, useEffect, useMemo, useState } from 'react'
import { YStack, Text, XStack, Input, useTheme , type InputProps} from 'tamagui'
import { useInputErrorMessage, type InputErrorMessageKeyType } from "~/hooks/input"
import type { RegularKeyType } from '~/enums/regular'

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
>(({ label, errorMessage, required, error = false, suffix, bordered = true, clear = true, type = INPUT_TYPE.TEXT, onValidate = () => {}, ...props }, ref) => {
  const theme = useTheme()
  const rem = useSizeTokens()
  const inputErrorMessage = useInputErrorMessage()
  const [showPassword, setShowPassword] = useState(false)
  const [emptyError, setEmptyError] = useState(false)

  const isPassword = useMemo(() => {
    return type === INPUT_TYPE.PASSWORD
  }, [type])

  /** Is show password */
  const secureTextEntry = useMemo(() => {
    return type === INPUT_TYPE.PASSWORD && !showPassword
  }, [type, showPassword])

  /** Computed input error text */
  const computedErrorText = useMemo(() => {
    if (!error) return ''
    if (errorMessage) return errorMessage
    if (!props.value) return ''
    const valid = validateInput(props.value as string, type as RegularKeyType)
    return valid ? '' : (inputErrorMessage[type as InputErrorMessageKeyType] || '')
  }, [error, errorMessage, props.value, type, inputErrorMessage])

  /** Is show error */
  const hasError = useMemo(() => {
    return !!computedErrorText
  }, [computedErrorText])

  /** On blur */
  const onBlur = () => {
    if (required && !props.value) {
      setEmptyError(true)
    }
  }

  /** Notify external validation input is valid */
  useEffect(() => {
    onValidate(!hasError)
  }, [hasError, onValidate])
  
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
          type={isPassword && secureTextEntry ? INPUT_TYPE.PASSWORD : INPUT_TYPE.TEXT}
          onBlur={onBlur}
          {...props}
        />
        { clear && props.value
          ? <ClearButton onClear={() => props.onChangeText?.('')} />
          : null }
        { suffix ? suffix : null }
        { isPassword
          ? <Pressable onPress={() => setShowPassword(!showPassword)}>
              <YStack>{
                showPassword
                ? <SvgXml xml={SVG.eye} color={theme.textWeaker?.val} width={rem[24]} height={rem[24]} />
                : <SvgXml xml={SVG.eye_closed} color={theme.textWeaker?.val} width={rem[24]} height={rem[24]} />
              }</YStack>
            </Pressable>
          : null
        }
      </XStack>
      {error && <XStack items="center" gap="$2" opacity={hasError ? 1 : 0}>
        {<SvgXml xml={SVG.circle_alert} width={rem[12]} height={rem[12]} color={theme.danger?.val} />}
        <Text fontSize="$2" color={theme.danger?.val}>{computedErrorText}</Text>
      </XStack>}
    </>
  )
}))

Field.displayName = 'Field' // Display name for debugging

/** Clear button component */
const ClearButton = ({ onClear }: { onClear: () => void | undefined }) => {
  const theme = useTheme()
  const rem = useSizeTokens()

  return (
    <YStack aspectRatio={1} p={rem[5]} bg={theme.textWeakest?.val} style={{ borderRadius: "50%" }} onPress={onClear}>
      <SvgXml xml={SVG.close} width={rem[12]} height={rem[12]} />
    </YStack>
  )
}

/** Label component */
const Label = ({ label }: { label?: React.ReactNode }) => {
  if (!label) return null
  
  if (typeof label === 'string') {
    return (
      <Text> {label} </Text>
    )
  }
  
  return label
}