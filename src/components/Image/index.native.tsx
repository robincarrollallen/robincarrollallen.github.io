import { StyleSheet } from 'react-native'
import { ICONS } from '~/assets/modules/icons'
import { View, type ImageProps } from 'tamagui'
import { memo, useCallback, useState } from 'react'
import { Image as ExpoImage, type ImageContentFit, type ImageContentPosition, type ImageErrorEventData } from 'expo-image'

/** Image Native */
export const Image = memo((props: ImageProps) => {
  const [error, setError] = useState(false)

  const {
    src,
    objectFit = 'fill',
    objectPosition = 'center',
    ...params
  } = props

  /** error handler */
  const onError = useCallback((_error: ImageErrorEventData) => {
    setError(true)
  }, [])

  return (
    <View overflow='hidden' position='relative' items='center' justify='center' {...params}>
      {<ExpoImage
        source={src}
        contentFit={objectFit as ImageContentFit}
        contentPosition={objectPosition as ImageContentPosition}
        style={styles.image}
        onError={onError}
      />}
      {error && <ExpoImage source={ICONS.heart} style={styles.error} />}
    </View>
  )
})

/** Stylesheet */
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  error: {
    zIndex: 1,
    height: '35%',
    aspectRatio: 58/51,
    position: 'absolute',
  },
})
