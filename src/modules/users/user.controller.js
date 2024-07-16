import { userModel } from "../../../DB/models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body
  const isUserExist = await userModel.findOne({ email })
  if (isUserExist) {
    return next(new Error("user already exists", { cause: 400 }))
  }
  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
  const user = new userModel({
    name,
    email,
    password: hashedPassword,
  })
  await user.save()
  res.status(201).json({ message: "Done", user })
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  const isUserExist = await userModel.findOne({ email })
  if (!isUserExist) {
    return next(new Error("in-valid login credentails", { cause: 400 }))
  }
  const isPassMatch = bcrypt.compareSync(password, isUserExist.password)
  if (!isPassMatch) {
    return res.status(400).json({ message: "in-valid login credentails" })
  }
  const userToken = jwt.sign(
    {
      username: isUserExist.username,
      email,
      _id: isUserExist._id,
    },
    process.env.TOKEN_SECRET_KEY
  )
  await isUserExist.save()
  res.status(200).json({ message: "User logged in successfully", userToken })
}
