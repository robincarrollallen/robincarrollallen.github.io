import { StyleSheet } from 'react-native'
import { ICONS } from '~/assets/modules/icons'
import { memo, useCallback, useState } from 'react'
import { Image as TamaguiImage, View, type ImageProps } from 'tamagui'

/** Image component */
export const Image = memo((props: ImageProps) => {
  const [error, setError] = useState(false)

  const { loading, ...params } = props
  
  /** error handler */
  const onError = useCallback((_error: any) => {
    setError(true)
  }, [])
  
  return <>
    {
      error
      ? <View width="100%" height="100%" items="center" justify="center" {...params}>
          <TamaguiImage src={ICONS.heart} style={styles.error} loading={loading} />
        </View>
      : <TamaguiImage select="none" draggable={false} loading={loading} {...params} onError={onError} />
    }
  </>
})

/** Stylesheet */
const styles = StyleSheet.create({
  error: {
    height: '35%',
    aspectRatio: 58/51,
  },
})