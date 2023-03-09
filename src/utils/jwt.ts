import jwt from 'jsonwebtoken'
import errorHandler from '../controllers/errorHandler'

export const signJwt = (
  payload: string | object | Buffer,
  Key: string | number,
  options: any
) => {
  // @ts-ignore
  const privateKey = Buffer.from(process.env[Key], 'base64').toString('ascii')
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const verifyJwt = (token: string, Key: string | number) => {
  try {
    // @ts-ignore
    const publicKey = Buffer.from(process.env[Key], 'base64').toString('ascii')
    const decoded = jwt.verify(token, publicKey)
    return decoded
  } catch (error) {
    errorHandler(error)
  }
}
