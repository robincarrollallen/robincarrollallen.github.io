import { Slot } from "one"
import { isWeb } from "tamagui"
import { DepositPage } from "."

export const DepositLayout = () => {
  return (
    isWeb
    ? <DepositPage />
    : <Slot/>
  )
}