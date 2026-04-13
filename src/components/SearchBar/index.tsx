import { memo } from 'react'
import { SVG } from '~/assets/modules/svg'
import { Pressable } from 'react-native'
import { useSizeTokens } from '~/store/modules/responsive'
import { Spinner, useTheme, type ImageProps } from 'tamagui'
import { Field, type FieldProps } from '../Field'
import { SvgXml } from 'react-native-svg'

/** Search Bar Icon Props */
export interface IconProps extends Omit<ImageProps, 'source'> {
  onError?: (error: any) => void;
  onLoad?: () => void;
  uri?: string | number;
  color?: string;
}

/** Search Bar Component */
export const SearchBar = memo(({ loading = false, onPress, ...props }: { loading?: boolean } & FieldProps) => {
  const rem = useSizeTokens()

  return (
    <Field placeholder="Search Games" fontSize={rem[14]} clear={false} suffix={<SearchBarIcon onPress={onPress} loading={loading as never}/>} {...props} />
  )
})

/** Search Bar Icon */
const SearchBarIcon = memo(({ loading = false as never, onPress, ...props }: { loading?: boolean | never } & IconProps) => {
  const theme = useTheme()
  const rem = useSizeTokens()

  return <>
    { loading
      ? <Spinner size="small" color="$color" />
      : <Pressable onPress={onPress}><SvgXml xml={SVG.search} width={rem[20]} height={rem[20]} color={theme.iconDefault?.val} /></Pressable>
    }
  </>
})

SearchBar.displayName = 'SearchBar'