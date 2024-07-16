import jwt from "jsonwebtoken"

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    return decoded
  } catch (error) {
    return null
  }
}
