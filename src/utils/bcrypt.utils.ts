import * as bcrypt from 'bcrypt'
export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync()
  return bcrypt.hashSync(rawPassword, SALT)
}
export function decodePassword(
  rawPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(rawPassword, hashedPassword)
}
