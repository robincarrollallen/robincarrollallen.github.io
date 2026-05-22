/** Regular expressions */
export const REGULAR = {
	account: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z][a-zA-Z0-9]{7,15}$/,
	password: /^(?!.*\s).{6,16}$/,
	phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
	BR: /^[1-9][0-9]{10}$/,
}

/** Regular key type */
export type RegularKeyType = keyof typeof REGULAR
