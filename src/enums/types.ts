/** Input type enum */
export const INPUT_TYPE = {
  ACCOUNT: 'account',
  PHONE: 'phone',
  PASSWORD: 'password',
  TEXT: 'text',
} as const

/** Input type */
export type InputType = typeof INPUT_TYPE[keyof typeof INPUT_TYPE]