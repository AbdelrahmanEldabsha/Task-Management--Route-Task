import { userModel } from "../../DB/models/user.model.js"
import { verifyToken } from "../utils/auth.js"

export const isAuth = () => {
  try {
    return async (req, res, next) => {
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(400).json({ message: "Please login first" })
      }
      if (!authorization.startsWith(process.env.TOKEN_PREFIX)) {
        return res.status(400).json({ message: "invalid token prefix" })
      }

      const splitedToken = authorization.split(" ")[1]

      const decodedData = verifyToken(splitedToken)
      if (decodedData == null) {
        return res.status(400).json({ message: "invalid token" })
      }
      const findUser = await userModel.findById(decodedData._id, "-password")
      if (!findUser) {
        return next(
          new Error("user not found, please signUp first", { cause: 400 })
        )
      }
      // retrun findUser
      req.authUser = findUser
      next()
    }
  } catch (error) {
    return res.status(500).json({ message: "Fail" })
  }
}
