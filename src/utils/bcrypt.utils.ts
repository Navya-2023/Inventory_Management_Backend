import * as bcrypt from 'bcryptjs'

export function encodePassword(rawPassword: string) {
  return bcrypt.hashSync(rawPassword)
}

export function decodePassword(
  rawPassword: string,
  hashedPassword: string,
): boolean {

  return bcrypt.compareSync(rawPassword, hashedPassword);
}

