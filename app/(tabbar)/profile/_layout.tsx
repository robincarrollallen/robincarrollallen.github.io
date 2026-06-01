import { Slot } from "one"
import { isWeb } from "tamagui"
import { ProfilePage } from "."

export const ProfileLayout = () => {
  return (
    isWeb
    ? <ProfilePage />
    : <Slot/>
  )
}