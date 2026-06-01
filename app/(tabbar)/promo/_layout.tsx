import { Slot } from "one"
import { PromoPage } from "."
import { isWeb } from "tamagui"

export const PromoLayout = () => {
  return (
    isWeb
    ? <PromoPage />
    : <Slot/>
  )
}