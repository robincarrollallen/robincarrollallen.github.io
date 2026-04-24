import { Text } from 'tamagui'
import { useRef } from 'react'
import { useSafeArea } from '~/hooks/client'
import { Button, Label, SizableText, Slider, XStack, YStack } from 'tamagui'
import { useToastState, type ToastOptions } from '~/provider/ToastProvider/hooks'
import { type ToastPosition } from '@tamagui/toast/v2'

export const ProfilePage = () => {
  const { top } = useSafeArea()
  const { position, visibleToasts, duration, gap, setGap, setVisibleToasts, setDuration } = useToastState()
  const count = useRef(0)
  
  return (
    <YStack gap="$3" self="center" width={280} pt={top}>
      {/* Position buttons */}
      <YStack gap="$2" self="center">
        <XStack gap="$2">
          <PositionButton
            position="top-left"
            current={position}
            options={{
              position: 'top-left',
              visibleToasts,
              duration,
              gap,
              description: <Text>Top Left</Text>
            }}
            text="Top Left"
          />
          <PositionButton
            position="top-center"
            current={position}
            options={{
              position: 'top-center',
              visibleToasts,
              duration,
              gap,
              description: <Text>Top Center</Text>
            }}
            text="Top Center"
          />
          <PositionButton
            position="top-right"
            current={position}
            options={{
              position: 'top-right',
              visibleToasts,
              duration,
              gap,
              title: <Text>Top Right</Text>
            }}
            text="Top Right"
            testID="toast-top-right-button"
          />
        </XStack>
        <XStack gap="$2">
          <PositionButton
            position="bottom-left"
            current={position}
            options={{
              position: 'bottom-left',
              visibleToasts,
              duration,
              gap,
              description: <Text>Bottom Left</Text>
            }}
            text="Bottom Center"
          />
          <PositionButton
            position="bottom-center"
            current={position}
            options={{
              position: 'bottom-center',
              visibleToasts,
              duration,
              gap,
              title: <Text>Bottom Center</Text>
            }}
            text="Bottom Right"
          />
          <PositionButton
            position="bottom-right"
            current={position}
            options={{
              position: 'bottom-right',
              visibleToasts,
              duration,
              gap,
              title: <Text>Bottom Right</Text>
            }}
            text="Bottom Right"
            testID="toast-show-button"
          />
        </XStack>
      </YStack>

      {/* Controls */}
      <YStack gap="$1" pt="$1">
        <DemoSlider
          label="Gap"
          value={gap}
          min={0}
          max={30}
          step={0.1}
          onChange={setGap}
        />
        <DemoSlider
          label="Visible"
          value={visibleToasts}
          min={1}
          max={8}
          step={1}
          onChange={setVisibleToasts}
        />
        <DemoSlider
          label="Duration"
          value={duration}
          min={1000}
          max={10000}
          step={100}
          onChange={setDuration}
          format={(v) => `${(v / 1000).toFixed(1)}s`}
        />
      </YStack>
    </YStack>
  )
}

function DemoSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format?: (v: number) => string
}) {
  return (
    <XStack gap="$2" items="center">
      <Label size="$2" width={55}>
        {label}
      </Label>
      <Slider
        flex={1}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v ?? 0)}
      >
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb theme="accent" size={16} rounded={100} index={0} />
      </Slider>
      <SizableText select="none" size="$2" width={35} text="right">
        {format ? format(value) : Math.round(value)}
      </SizableText>
    </XStack>
  )
}

const PositionButton = ({
  position,
  options,
  current,
  testID,
  text
}: {
  position: ToastPosition
  options: ToastOptions
  current: ToastPosition
  testID?: string
  text: string
}) => {
  const isActive = position === current
  const { showToast } = useToastState()

  return (
    <Button
      circular
      theme={isActive ? 'accent' : undefined}
      onPress={() => showToast(options)}
      testID={testID}
    >
      {text}
    </Button>
  )
}