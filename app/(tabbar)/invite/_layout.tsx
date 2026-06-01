import { Slot } from "one"
import { InvitePage } from "."
import { isWeb } from "tamagui"

export const InviteLayout = () => {
  return (
    isWeb
    ? <InvitePage />
    : <Slot/>
  )
}
